'use client';

import { getTripState } from '@/lib/tripState';
import { TRIP_NAME } from '@/lib/constants';
import ScheduleDayReadOnly from '@/components/ScheduleDayReadOnly';
import StatusBanner from '@/components/StatusBanner';
import LodgingCard from '@/components/LodgingCard';

export default function SchedulePage() {
  const state = getTripState();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-primary">{TRIP_NAME} — Schedule</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Thu 7/30 Lexington → Fri–Sun Louisville · July 30 – August 2, 2026
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          The highlighted day matches today on the calendar (local time). Before the trip it shows Day 1; after the trip, the last day.
        </p>
      </div>

      <LodgingCard />

      {state.currentStatus ? <StatusBanner status={state.currentStatus} /> : null}

      <div className="space-y-4">
        {state.schedule.map((day, i) => {
          const round = state.rounds.find((r) => r.dayIndex === i);
          return (
            <ScheduleDayReadOnly
              key={day.date}
              day={day}
              dayIndex={i}
              isActiveDay={state.activeDayIndex === i}
              courseName={round?.courseName}
              courseMapUrl={round?.mapUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
