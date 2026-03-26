import { TripDay } from './types';

/** Local calendar date as YYYY-MM-DD (for matching `TripDay.date`). */
export function localDateISO(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Index of the schedule day that should be "active" for the given calendar date.
 * On a trip day, that day; before the trip, first day; after the trip, last day.
 */
export function getActiveDayIndexForDate(schedule: TripDay[], date: Date): number {
  if (!schedule.length) return 0;
  const iso = localDateISO(date);
  const idx = schedule.findIndex((day) => day.date === iso);
  if (idx !== -1) return idx;
  if (iso < schedule[0].date) return 0;
  if (iso > schedule[schedule.length - 1].date) return schedule.length - 1;
  return 0;
}

export function getActiveDayIndexForToday(schedule: TripDay[]): number {
  return getActiveDayIndexForDate(schedule, new Date());
}

/** Index of the schedule row whose date equals local today, or null if today is not a trip day. */
export function scheduleIndexMatchingLocalToday(schedule: TripDay[], date: Date = new Date()): number | null {
  const iso = localDateISO(date);
  const idx = schedule.findIndex((d) => d.date === iso);
  return idx === -1 ? null : idx;
}

/** True only when this row’s ISO date is today (local) — use for “today” highlight on the schedule. */
export function isScheduleDayCalendarToday(day: TripDay, date: Date = new Date()): boolean {
  return day.date === localDateISO(date);
}
