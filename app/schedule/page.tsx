'use client';

import { useLocalStorage } from '@/lib/useLocalStorage';
import { TRIP_NAME } from '@/lib/constants';
import { isScheduleDayCalendarToday } from '@/lib/activeDay';
import ScheduleDayReadOnly from '@/components/ScheduleDayReadOnly';
import StatusBanner from '@/components/StatusBanner';
import LodgingCard from '@/components/LodgingCard';

export default function SchedulePage() {
  const [state, , hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-96 rounded-xl bg-gray-100 dark:bg-gray-800" />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-primary">{TRIP_NAME} — Schedule</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Thu 7/30 Lexington → Fri–Sun Louisville · July 30 – August 2, 2026
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Only the day whose calendar date matches today on your device (local time) is highlighted. Outside the trip dates, no day is highlighted.
        </p>
      </div>

      <LodgingCard />

      {state.currentStatus ? <StatusBanner status={state.currentStatus} /> : null}

      <div className="space-y-4">
        {state.schedule.map((day, i) => (
          <ScheduleDayReadOnly
            key={day.date}
            day={day}
            dayIndex={i}
            isActiveDay={isScheduleDayCalendarToday(day)}
          />
        ))}
      </div>
    </div>
  );
}
