import { TripState } from './types';
import { STORAGE_KEY, DEFAULT_SCHEDULE, DEFAULT_ROUNDS, DEFAULT_PLAYERS } from './constants';

export const defaultTripState: TripState = {
  players: DEFAULT_PLAYERS,
  rounds: DEFAULT_ROUNDS,
  schedule: DEFAULT_SCHEDULE,
  currentStatus: '',
  activeDayIndex: 0,
  activeDayFollowCalendar: true,
};

export function normalizeTripState(raw: unknown): TripState {
  if (!raw || typeof raw !== 'object') {
    return { ...defaultTripState };
  }
  const p = raw as Partial<TripState>;
  const schedule = Array.isArray(p.schedule) && p.schedule.length > 0 ? p.schedule : defaultTripState.schedule;
  const maxDay = Math.max(0, schedule.length - 1);
  let activeDayIndex =
    typeof p.activeDayIndex === 'number' && Number.isFinite(p.activeDayIndex)
      ? Math.min(Math.max(0, Math.floor(p.activeDayIndex)), maxDay)
      : defaultTripState.activeDayIndex;

  return {
    players: Array.isArray(p.players) && p.players.length > 0 ? p.players : defaultTripState.players,
    rounds: Array.isArray(p.rounds) && p.rounds.length > 0 ? p.rounds : defaultTripState.rounds,
    schedule,
    currentStatus: typeof p.currentStatus === 'string' ? p.currentStatus : defaultTripState.currentStatus,
    activeDayIndex,
    activeDayFollowCalendar:
      typeof p.activeDayFollowCalendar === 'boolean' ? p.activeDayFollowCalendar : true,
  };
}

export function getTripState(): TripState {
  if (typeof window === 'undefined') return defaultTripState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultTripState };
    return normalizeTripState(JSON.parse(raw));
  } catch (err) {
    console.error('[cfstt] Failed to read trip state from localStorage; falling back to defaults.', err);
    return { ...defaultTripState };
  }
}

export function setTripState(state: TripState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    // Hitting quota or disabled storage (e.g., Safari private mode) should not crash the app.
    console.error('[cfstt] Failed to persist trip state to localStorage.', err);
  }
}

export function clearTripState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
