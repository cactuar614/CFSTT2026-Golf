'use client';

import { useLocalStorage } from '@/lib/useLocalStorage';
import { TRIP_NAME } from '@/lib/constants';
import DayCard from '@/components/DayCard';
import StatusBanner from '@/components/StatusBanner';
import LodgingCard from '@/components/LodgingCard';

export default function SchedulePage() {
  const [state, updateState, hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-96 bg-gray-100 dark:bg-gray-800 rounded-xl" />;
  }

  const setActiveDay = (dayIndex: number) => {
    updateState((prev) => ({ ...prev, activeDayIndex: dayIndex }));
  };

  const updateActivities = (dayIndex: number, activities: string[]) => {
    updateState((prev) => {
      const schedule = [...prev.schedule];
      schedule[dayIndex] = { ...schedule[dayIndex], activities };
      return { ...prev, schedule };
    });
  };

  const updateDescription = (dayIndex: number, description: string) => {
    updateState((prev) => {
      const schedule = [...prev.schedule];
      schedule[dayIndex] = { ...schedule[dayIndex], description };
      return { ...prev, schedule };
    });
  };

  const updateStatus = (status: string) => {
    updateState((prev) => ({ ...prev, currentStatus: status }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-primary">{TRIP_NAME} — Schedule</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Thu 7/30 Lexington → Fri–Sun Louisville · July 30 – August 2, 2026
        </p>
      </div>

      <LodgingCard />

      {/* Live Status Editor */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Live Status</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={state.currentStatus}
            onChange={(e) => updateStatus(e.target.value)}
            className="min-h-[48px] flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base outline-none focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 md:min-h-0 md:py-2 md:text-sm"
            placeholder='e.g. "Shuttle to Champions Pointe" or "Round 2 — Hole 14"'
            autoComplete="off"
          />
        </div>
        {state.currentStatus && (
          <div className="mt-2">
            <StatusBanner status={state.currentStatus} />
          </div>
        )}
      </div>

      {/* Day Cards */}
      <div className="space-y-4">
        {state.schedule.map((day, i) => (
          <DayCard
            key={day.date}
            day={day}
            dayIndex={i}
            isActiveDay={state.activeDayIndex === i}
            onSetActive={() => setActiveDay(i)}
            onUpdateActivities={(activities) => updateActivities(i, activities)}
            onUpdateDescription={(desc) => updateDescription(i, desc)}
          />
        ))}
      </div>
    </div>
  );
}
