'use client';

import { useLocalStorage } from '@/lib/useLocalStorage';
import { TRIP_NAME, LODGING } from '@/lib/constants';
import DayCard from '@/components/DayCard';
import StatusBanner from '@/components/StatusBanner';

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
      <h1 className="text-xl font-bold text-primary">{TRIP_NAME} — Schedule</h1>

      {/* Live Status Editor */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live Status</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={state.currentStatus}
            onChange={(e) => updateStatus(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 dark:text-gray-100"
            placeholder='e.g. "Bourbon Run — Castle & Key" or "Round 2 — Hole 14"'
          />
        </div>
        {state.currentStatus && (
          <div className="mt-2">
            <StatusBanner status={state.currentStatus} />
          </div>
        )}
      </div>

      {/* Lodging */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏨</span>
            <h2 className="font-bold">{LODGING.name}</h2>
          </div>
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-medium">
            {LODGING.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {LODGING.checkIn} &rarr; {LODGING.checkOut} &middot; {LODGING.rooms}
        </p>
      </div>

      {/* Day Cards */}
      <div className="space-y-4">
        {state.schedule.map((day, i) => (
          <DayCard
            key={i}
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
