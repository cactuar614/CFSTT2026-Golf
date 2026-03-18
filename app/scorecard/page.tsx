'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { DAY_LABELS } from '@/lib/constants';

export default function ScorecardIndexPage() {
  const [state, , hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-64 bg-gray-100 rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-primary">Scorecards</h1>

      <div className="space-y-3">
        {state.rounds.map((round, i) => (
          <Link
            key={round.id}
            href={`/scorecard/${round.id}`}
            className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-primary transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">Round {i + 1}</h2>
                <p className="text-sm text-gray-500">
                  {round.courseName === 'TBD' ? 'Course TBD' : round.courseName}
                  {round.teeTime !== 'TBD' && ` — Tee: ${round.teeTime}`}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400">{DAY_LABELS[i + 1]}</span>
                <div className="text-primary font-medium text-sm mt-1">View →</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {state.players.length === 0 && (
        <p className="text-center text-gray-500 text-sm">
          Add players on the{' '}
          <Link href="/players" className="text-primary underline">
            Players page
          </Link>{' '}
          to start scoring.
        </p>
      )}
    </div>
  );
}
