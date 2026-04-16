import { TripState } from './types';
import {
  DEFAULT_PLAYERS,
  DEFAULT_ROUNDS,
  DEFAULT_SCHEDULE,
  TRIP_STATUS,
} from './constants';
import { getActiveDayIndexForToday } from './activeDay';

/** Static trip data. `activeDayIndex` is derived from the device calendar. */
export function getTripState(): TripState {
  return {
    players: DEFAULT_PLAYERS,
    rounds: DEFAULT_ROUNDS,
    schedule: DEFAULT_SCHEDULE,
    currentStatus: TRIP_STATUS,
    activeDayIndex: getActiveDayIndexForToday(DEFAULT_SCHEDULE),
  };
}
