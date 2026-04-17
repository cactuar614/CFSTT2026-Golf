import { TripDay } from './types';

/** Local calendar date as YYYY-MM-DD (for matching `TripDay.date`). */
export function localDateISO(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Index of the schedule day that matches the given calendar date,
 * or null if today isn't one of the trip days.
 */
export function getCurrentTripDayIndex(
  schedule: TripDay[],
  date: Date = new Date()
): number | null {
  if (!schedule.length) return null;
  const iso = localDateISO(date);
  const idx = schedule.findIndex((day) => day.date === iso);
  return idx === -1 ? null : idx;
}
