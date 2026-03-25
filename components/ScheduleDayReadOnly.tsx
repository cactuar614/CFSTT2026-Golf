'use client';

import { TripDay } from '@/lib/types';
import { DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';

type Props = {
  day: TripDay;
  dayIndex: number;
  isActiveDay: boolean;
};

export default function ScheduleDayReadOnly({ day, dayIndex, isActiveDay }: Props) {
  return (
    <div
      className={`rounded-xl border-2 p-4 transition-colors ${
        isActiveDay
          ? 'border-primary bg-green-50 dark:bg-green-950'
          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      }`}
    >
      <div className="mb-2 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold">{DAY_LABELS[dayIndex]}</h3>
          {isActiveDay ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">Today</span>
          ) : null}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{formatTripDayDate(day.date)}</p>
        {day.city ? (
          <p className="mt-0.5 text-sm font-medium text-gray-600 dark:text-gray-300">{day.city}</p>
        ) : null}
        <p className="mt-1 text-base font-semibold text-primary sm:text-sm">{day.label}</p>
      </div>

      {day.description ? (
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{day.description}</p>
      ) : null}

      <ul className="list-inside list-disc space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
        {day.activities.filter((a) => a.trim()).map((activity, i) => (
          <li key={i}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}
