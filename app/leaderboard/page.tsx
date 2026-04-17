import { getTripState } from '@/lib/tripState';
import { buildLeaderboard } from '@/lib/scoring';
import LeaderboardTable from '@/components/LeaderboardTable';

export default function LeaderboardPage() {
  const state = getTripState();
  const entries = buildLeaderboard(state.players, state.rounds);
  const noScoresYet = entries.every((e) => e.totalNet === null);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-primary">Leaderboard</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <LeaderboardTable entries={entries} roundCount={state.rounds.length} />
      </div>

      <p className="text-center text-xs text-gray-400">
        Net = Gross − Handicap · Sorted by total net score (lowest wins)
      </p>

      {noScoresYet && (
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">No scores entered yet.</p>
      )}
    </div>
  );
}
