'use client';

import { TripDay } from '@/lib/types';
import { DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';
import MapLink from './MapLink';

type Props = {
  day: TripDay;
  dayIndex: number;
  isActiveDay: boolean;
  courseName?: string;
  courseMapUrl?: string;
};

export default function ScheduleDayReadOnly({ day, dayIndex, isActiveDay, courseName, courseMapUrl }: Props) {
  return (
    <div
      className={`card relative overflow-hidden p-4 transition-colors ${
        isActiveDay ? 'border-accent/70 bg-parchment pl-5 dark:border-accent/50 dark:bg-char-800' : ''
      }`}
    >
      {isActiveDay ? <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden /> : null}
      <div className="mb-2 min-w-0">
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

      {day.description ? (
        <p className="mb-3 text-sm text-ink-soft dark:text-chalk/70">{day.description}</p>
      ) : null}

      <ul className="list-inside list-disc space-y-1.5 text-sm marker:text-accent">
        {day.activities.filter((a) => a.trim()).map((activity, i) => (
          <li key={i}>{activity}</li>
        ))}
      </ul>

      {courseMapUrl ? (
        <div className="mt-3">
          <MapLink href={courseMapUrl} label={courseName ? `Map · ${courseName}` : 'Map'} />
        </div>
      ) : null}
    </div>
  );
}
