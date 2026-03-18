'use client';

import { TripDay } from '@/lib/types';
import { DAY_LABELS } from '@/lib/constants';

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
        isActiveDay ? 'border-primary bg-green-50 dark:bg-green-950' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-lg">{DAY_LABELS[dayIndex]}</h3>
          <p className="text-sm text-primary font-semibold">{day.label}</p>
        </div>
        <button
          onClick={onSetActive}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
            isActiveDay
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {isActiveDay ? 'Active' : 'Set Active'}
        </button>
      </div>

      <input
        type="text"
        value={day.description}
        onChange={(e) => onUpdateDescription(e.target.value)}
        className="w-full text-sm text-gray-600 dark:text-gray-400 bg-transparent border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary focus:outline-none mb-3 pb-1"
        placeholder="Description..."
      />

      <ul className="space-y-1">
        {day.activities.map((activity, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">•</span>
            <input
              type="text"
              value={activity}
              onChange={(e) => {
                const updated = [...day.activities];
                updated[i] = e.target.value;
                onUpdateActivities(updated);
              }}
              className="flex-1 text-sm bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:outline-none py-0.5"
            />
            <button
              onClick={() => {
                const updated = day.activities.filter((_, idx) => idx !== i);
                onUpdateActivities(updated);
              }}
              className="text-gray-300 hover:text-red-400 text-xs"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onUpdateActivities([...day.activities, ''])}
        className="mt-2 text-xs text-primary hover:text-primary-light font-medium"
      >
        + Add item
      </button>
    </div>
  );
}
