import { TripState } from './types';
import {
  DEFAULT_PLAYERS,
  DEFAULT_ROUNDS,
  DEFAULT_SCHEDULE,
  TRIP_STATUS,
} from './constants';
import { getCurrentTripDayIndex } from './activeDay';

/** Static trip data. `activeDayIndex` is the index of today's trip day, or null. */
export function getTripState(): TripState {
  return {
    players: DEFAULT_PLAYERS,
    rounds: DEFAULT_ROUNDS,
    schedule: DEFAULT_SCHEDULE,
    currentStatus: TRIP_STATUS,
    activeDayIndex: getCurrentTripDayIndex(DEFAULT_SCHEDULE),
  };
}
