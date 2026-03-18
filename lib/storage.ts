import { TripState } from './types';
import { STORAGE_KEY, DEFAULT_SCHEDULE, DEFAULT_ROUNDS, DEFAULT_PLAYERS } from './constants';

export const defaultTripState: TripState = {
  players: DEFAULT_PLAYERS,
  rounds: DEFAULT_ROUNDS,
  schedule: DEFAULT_SCHEDULE,
  currentStatus: '',
  activeDayIndex: 0,
};

export function getTripState(): TripState {
  if (typeof window === 'undefined') return defaultTripState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultTripState;
    return JSON.parse(raw) as TripState;
  } catch {
    return defaultTripState;
  }
}

export function setTripState(state: TripState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearTripState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
