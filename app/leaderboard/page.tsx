'use client';

import { useLocalStorage } from '@/lib/useLocalStorage';
import { buildLeaderboard } from '@/lib/scoring';
import LeaderboardTable from '@/components/LeaderboardTable';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [state, , hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-64 bg-gray-100 rounded-xl" />;
  }

  const entries = buildLeaderboard(state.players, state.rounds);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-primary">Leaderboard</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <LeaderboardTable entries={entries} />
      </div>

      <p className="text-center text-xs text-gray-400">
        Net = Gross − Handicap · Sorted by total net score (lowest wins)
      </p>

      {state.players.length > 0 && entries.every((e) => e.totalNet === null) && (
        <p className="text-center text-gray-500 text-sm">
          No scores entered yet.{' '}
          <Link href="/scorecard" className="text-primary underline">
            Enter scores
          </Link>
        </p>
      )}
    </div>
  );
}
