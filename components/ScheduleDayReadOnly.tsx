'use client';

import { TripDay } from '@/lib/types';
import { DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';
import RoundDetails, { NumberedRound } from './RoundDetails';

type Props = {
  day: TripDay;
  dayIndex: number;
  isActiveDay: boolean;
  /** Rounds played this day, numbered by play order. */
  rounds?: NumberedRound[];
};

export default function ScheduleDayReadOnly({ day, dayIndex, isActiveDay, rounds = [] }: Props) {
  const extras = day.activities.filter((a) => a.trim());
  return (
    <div
      className={`card relative overflow-hidden p-4 transition-colors ${
        isActiveDay ? 'border-accent/70 bg-parchment pl-5 dark:border-accent/50 dark:bg-char-800' : ''
      }`}
    >
      {isActiveDay ? <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden /> : null}
      <div className="mb-3 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg font-bold">{DAY_LABELS[dayIndex]}</h3>
          {isActiveDay ? (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-char-900">
              Today
            </span>
          ) : null}
        </div>
        <p className="text-xs text-ink-soft dark:text-chalk/50">{formatTripDayDate(day.date)}</p>
        {day.city ? (
          <p className="mt-0.5 text-sm font-medium text-ink-soft dark:text-chalk/70">{day.city}</p>
        ) : null}
        <p className="mt-1 text-base font-semibold text-primary dark:text-accent sm:text-sm">{day.label}</p>
      </div>

      <RoundDetails rounds={rounds} />

      {extras.length > 0 ? (
        <div className={rounds.length > 0 ? 'mt-3 border-t border-linen pt-3 dark:border-char-700' : ''}>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-ink-soft marker:text-accent dark:text-chalk/70">
            {extras.map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
