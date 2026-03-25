'use client';

import { TripDay } from '@/lib/types';
import { DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';

type DayCardProps = {
  day: TripDay;
  dayIndex: number;
  isActiveDay: boolean;
  onSetActive: () => void;
  onUpdateActivities: (activities: string[]) => void;
  onUpdateDescription: (desc: string) => void;
};

export default function DayCard({
  day,
  dayIndex,
  isActiveDay,
  onSetActive,
  onUpdateActivities,
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

      <ul className="space-y-2">
        {day.activities.map((activity, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="shrink-0 text-gray-400" aria-hidden>
              •
            </span>
            <input
              type="text"
              value={activity}
              onChange={(e) => {
                const updated = [...day.activities];
                updated[i] = e.target.value;
                onUpdateActivities(updated);
              }}
              className="min-h-[44px] flex-1 rounded-md border border-transparent bg-transparent px-1 py-2 text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-gray-200 md:min-h-0 md:border-b md:border-dashed md:py-1 md:text-sm md:hover:border-gray-300 dark:md:hover:border-gray-600"
            />
            <button
              type="button"
              onClick={() => {
                const updated = day.activities.filter((_, idx) => idx !== i);
                onUpdateActivities(updated);
              }}
              className="flex h-11 min-w-[44px] shrink-0 touch-manipulation items-center justify-center rounded-lg text-lg text-gray-400 transition-colors active:bg-red-50 active:text-red-500 dark:active:bg-red-950/50"
              aria-label="Remove activity"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onUpdateActivities([...day.activities, ''])}
        className="mt-3 min-h-[44px] w-full touch-manipulation rounded-lg border border-dashed border-primary/40 py-2.5 text-sm font-medium text-primary transition-colors active:bg-primary/10 md:min-h-0 md:w-auto md:border-0 md:py-2"
      >
        + Add item
      </button>
    </div>
  );
}
