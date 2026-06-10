import { getTripState } from '@/lib/tripState';
import { buildLeaderboard } from '@/lib/scoring';
import LeaderboardTable from '@/components/LeaderboardTable';

export default function LeaderboardPage() {
  const state = getTripState();
  const entries = buildLeaderboard(state.players, state.rounds);
  const noScoresYet = entries.every((e) => e.totalNet === null);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="eyebrow">Standings</p>
        <h1 className="page-title">Leaderboard</h1>
      </div>

      <div className="card overflow-hidden">
        <LeaderboardTable entries={entries} roundCount={state.rounds.length} />
      </div>

      <p className="text-center text-xs text-ink-soft/80 dark:text-chalk/40">
        Net = Gross − Handicap · Sorted by total net score (lowest wins)
      </p>

      {noScoresYet && (
        <p className="text-center text-sm text-ink-soft dark:text-chalk/60">No scores entered yet.</p>
      )}
    </div>
  );
}
