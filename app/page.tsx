'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { TRIP_NAME, TRIP_DATES, TRIP_LOCATION, DAY_LABELS } from '@/lib/constants';
import StatusBanner from '@/components/StatusBanner';

export default function Dashboard() {
  const [state, , hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-64 bg-gray-100 rounded-xl" />;
  }

  const activeDay = state.schedule[state.activeDayIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary">{TRIP_NAME}</h1>
        <p className="text-gray-500 text-sm">
          {TRIP_DATES} &middot; {TRIP_LOCATION}
        </p>
      </div>

      {/* Status Banner */}
      <StatusBanner status={state.currentStatus} />

      {/* Today / Active Day Card */}
      {activeDay && (
        <div className="bg-white rounded-xl border-2 border-primary p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
              ACTIVE
            </span>
            <span className="text-sm text-gray-500">{DAY_LABELS[state.activeDayIndex]}</span>
          </div>
          <h2 className="text-lg font-bold">{activeDay.label}</h2>
          <p className="text-sm text-gray-600">{activeDay.description}</p>
          {activeDay.activities.length > 0 && (
            <ul className="mt-2 space-y-1">
              {activeDay.activities.filter(a => a).map((a, i) => (
                <li key={i} className="text-sm text-gray-600">• {a}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/schedule"
          className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-primary transition-colors"
        >
          <div className="text-2xl mb-1">📅</div>
          <div className="text-sm font-medium">Schedule</div>
        </Link>
        <Link
          href="/players"
          className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-primary transition-colors"
        >
          <div className="text-2xl mb-1">👥</div>
          <div className="text-sm font-medium">Players ({state.players.length})</div>
        </Link>
        <Link
          href="/scorecard"
          className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-primary transition-colors"
        >
          <div className="text-2xl mb-1">📝</div>
          <div className="text-sm font-medium">Scorecards</div>
        </Link>
        <Link
          href="/leaderboard"
          className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-primary transition-colors"
        >
          <div className="text-2xl mb-1">🏆</div>
          <div className="text-sm font-medium">Leaderboard</div>
        </Link>
      </div>

      {/* Round Summaries */}
      <div className="space-y-2">
        <h2 className="font-bold text-gray-700">Rounds</h2>
        {state.rounds.map((round, i) => (
          <Link
            key={round.id}
            href={`/scorecard/${round.id}`}
            className="block bg-white rounded-lg border border-gray-200 p-3 hover:border-primary transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Round {i + 1}</span>
                <span className="text-gray-500 text-sm ml-2">
                  {round.courseName === 'TBD' ? 'Course TBD' : round.courseName}
                </span>
              </div>
              <span className="text-xs text-gray-400">{DAY_LABELS[i + 1]}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
