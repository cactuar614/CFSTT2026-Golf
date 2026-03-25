'use client';

import { TripDay } from '@/lib/types';
import { DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';

type DayCardProps = {
  day: TripDay;
  dayIndex: number;
  isActiveDay: boolean;
  onSetActive: () => void;
  onUpdateDescription: (desc: string) => void;
};

export default function DayCard({
  day,
  dayIndex,
  isActiveDay,
  onSetActive,
  onUpdateDescription,
}: DayCardProps) {
  return (
    <div
      className={`rounded-xl border-2 p-4 transition-colors ${
        isActiveDay
          ? 'border-primary bg-green-50 dark:bg-green-950'
          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      }`}
    >
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-lg font-bold">{DAY_LABELS[dayIndex]}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{formatTripDayDate(day.date)}</p>
          {day.city ? (
            <p className="mt-0.5 text-sm font-medium text-gray-600 dark:text-gray-300">{day.city}</p>
          ) : null}
          <p className="mt-1 text-base font-semibold text-primary sm:text-sm">{day.label}</p>
        </div>
        <button
          type="button"
          onClick={onSetActive}
          className={`shrink-0 touch-manipulation rounded-full px-4 py-2.5 text-sm font-medium transition-colors active:opacity-90 sm:min-h-0 sm:py-2 ${
            isActiveDay
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 active:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:active:bg-gray-600'
          }`}
        >
          {isActiveDay ? 'Active' : 'Set Active'}
        </button>
      </div>

      <input
        type="text"
        value={day.description}
        onChange={(e) => onUpdateDescription(e.target.value)}
        className="mb-3 min-h-[44px] w-full rounded-lg border border-transparent bg-gray-50 px-3 py-2 text-base text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-900/50 dark:text-gray-300 md:min-h-0 md:border-0 md:border-b md:border-dashed md:border-gray-300 md:bg-transparent md:px-0 md:py-1 md:text-sm dark:md:border-gray-600"
        placeholder="Description..."
      />

      <ul className="list-inside list-disc space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
        {day.activities.filter((a) => a.trim()).map((activity, i) => (
          <li key={i}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}
