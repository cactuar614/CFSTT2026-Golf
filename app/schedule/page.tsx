'use client';

import { getTripState } from '@/lib/tripState';
import { TRIP_NAME } from '@/lib/constants';
import ScheduleDayReadOnly from '@/components/ScheduleDayReadOnly';
import StatusBanner from '@/components/StatusBanner';
import LodgingCard from '@/components/LodgingCard';
import { CalendarIcon } from '@/components/icons';

export default function SchedulePage() {
  const state = getTripState();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="eyebrow">{TRIP_NAME}</p>
        <h1 className="page-title">Schedule</h1>
        <p className="text-sm text-ink-soft dark:text-chalk/60">
          Fri–Sun Louisville · July 31 – August 2, 2026
        </p>
        <p className="text-xs text-ink-soft/80 dark:text-chalk/40">
          A day is highlighted only on its actual calendar date (local time).
        </p>
      </div>

      <a
        href="/schedule.ics"
        className="inline-flex items-center gap-2 rounded-xl border border-linen bg-parchment/50 px-4 py-2.5 text-sm font-semibold text-primary transition-colors touch-manipulation active:bg-parchment dark:border-char-700 dark:bg-char-800/50 dark:text-accent md:hover:border-accent"
      >
        <CalendarIcon className="h-4 w-4" />
        Add tee times to your calendar
      </a>

      <LodgingCard />

      {state.currentStatus ? <StatusBanner status={state.currentStatus} /> : null}

      <div className="space-y-4">
        {state.schedule.map((day, i) => {
          const rounds = state.rounds
            .map((r, idx) => ({ ...r, number: idx + 1 }))
            .filter((r) => r.dayIndex === i);
          return (
            <ScheduleDayReadOnly
              key={day.date}
              day={day}
              dayIndex={i}
              isActiveDay={state.activeDayIndex === i}
              rounds={rounds}
            />
          );
        })}
      </div>
    </div>
  );
}
