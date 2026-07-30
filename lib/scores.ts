import scoreData from '@/data/scores.json';
import { HoleScore, PlayerRound, TeamScore } from './types';

/**
 * Editable scores live in `data/scores.json` (NOT in constants.ts), so the
 * admin score editor can overwrite that one file with a single GitHub commit
 * without ever rewriting TypeScript. The file is imported at build time and
 * overlaid onto the rounds in `getTripState()`, so a new commit → a new Vercel
 * deploy → the updated scores are live.
 *
 * Shape (all hole arrays are 18 long, each entry a stroke count or null):
 *   {
 *     "round-1": { "players": { "player-1": [4,5,3, …18] } },
 *     "round-2": { "teams":   { "Huber & Kennedy": [4,5,3, …18] } }
 *   }
 * A missing round / player / team simply means "no scores yet" (dashes).
 */
type HoleArray = (number | null)[];
type RoundScores = {
  players?: Record<string, HoleArray>;
  teams?: Record<string, HoleArray>;
};

const DATA = scoreData as Record<string, RoundScores>;

function toHoleScores(arr: HoleArray | undefined): HoleScore[] {
  return Array.from({ length: 18 }, (_, i) => {
    const raw = arr ? arr[i] : null;
    return { hole: i + 1, strokes: typeof raw === 'number' ? raw : null };
  });
}

/** Individual player cards recorded for a round (best-ball / tbd / stroke). */
export function playerRoundsFor(roundId: string): PlayerRound[] {
  const players = DATA[roundId]?.players ?? {};
  return Object.entries(players).map(([playerId, arr]) => ({
    playerId,
    scores: toHoleScores(arr),
  }));
}

/** Team cards recorded for a scramble round. */
export function teamScoresFor(roundId: string): TeamScore[] {
  const teams = DATA[roundId]?.teams ?? {};
  return Object.entries(teams).map(([teamName, arr]) => ({
    teamName,
    scores: toHoleScores(arr),
  }));
}
