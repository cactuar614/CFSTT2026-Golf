import { TripState } from './types';
import {
  DEFAULT_PLAYERS,
  DEFAULT_ROUNDS,
  DEFAULT_SCHEDULE,
  TRIP_STATUS,
} from './constants';
import { getCurrentTripDayIndex } from './activeDay';
import { playerRoundsFor, teamScoresFor } from './scores';

/**
 * Static trip data. `activeDayIndex` is the index of today's trip day, or null.
 * Scores are overlaid from `data/scores.json` (the admin-editable file) onto the
 * rounds defined in constants — so the round definitions stay declarative and
 * scores are a single file the admin editor can commit.
 */
export function getTripState(): TripState {
  return {
    players: DEFAULT_PLAYERS,
    rounds: DEFAULT_ROUNDS.map((round) => ({
      ...round,
      playerRounds: playerRoundsFor(round.id),
      teamScores: teamScoresFor(round.id),
    })),
    schedule: DEFAULT_SCHEDULE,
    currentStatus: TRIP_STATUS,
    activeDayIndex: getCurrentTripDayIndex(DEFAULT_SCHEDULE),
  };
}
