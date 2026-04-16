'use client';

import Link from 'next/link';
import { getTripState } from '@/lib/tripState';
import { TRIP_NAME, TRIP_DATES, TRIP_LOCATION, DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';
import StatusBanner from '@/components/StatusBanner';
import LodgingCard from '@/components/LodgingCard';

export default function Dashboard() {
  const state = getTripState();
  const activeDay = state.schedule[state.activeDayIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400" aria-hidden>
          ⛳️
        </p>
        <h1 className="text-2xl font-bold text-primary">{TRIP_NAME}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {TRIP_DATES} &middot; {TRIP_LOCATION}
        </p>
      </div>

      <LodgingCard />

      {/* Status Banner */}
      <StatusBanner status={state.currentStatus} />

      {/* Today / Active Day Card */}
      {activeDay && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-primary p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
              ACTIVE
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{DAY_LABELS[state.activeDayIndex]}</span>
          </div>
          <h2 className="text-lg font-bold">{activeDay.label}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{activeDay.description}</p>
          {activeDay.activities.length > 0 && (
            <ul className="mt-2 space-y-1">
              {activeDay.activities.filter(a => a).map((a, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-400">• {a}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/schedule"
          className="flex min-h-[5.5rem] touch-manipulation flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center transition-colors active:border-primary active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700/80 md:hover:border-primary"
        >
          <div className="mb-1 text-2xl" aria-hidden>
            📅
          </div>
          <div className="text-sm font-medium">Schedule</div>
        </Link>
        <Link
          href="/players"
          className="flex min-h-[5.5rem] touch-manipulation flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center transition-colors active:border-primary active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700/80 md:hover:border-primary"
        >
          <div className="mb-1 text-2xl" aria-hidden>
            👥
          </div>
          <div className="text-sm font-medium">Players ({state.players.length})</div>
        </Link>
        <Link
          href="/scorecard"
          className="flex min-h-[5.5rem] touch-manipulation flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center transition-colors active:border-primary active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700/80 md:hover:border-primary"
        >
          <div className="mb-1 text-2xl" aria-hidden>
            📝
          </div>
          <div className="text-sm font-medium">Scorecards</div>
        </Link>
        <Link
          href="/leaderboard"
          className="flex min-h-[5.5rem] touch-manipulation flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center transition-colors active:border-primary active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700/80 md:hover:border-primary"
        >
          <div className="mb-1 text-2xl" aria-hidden>
            🏆
          </div>
          <div className="text-sm font-medium">Leaderboard</div>
        </Link>
      </div>

      {/* Round Summaries */}
      <div className="space-y-2">
        <h2 className="font-bold text-gray-700 dark:text-gray-300">Rounds</h2>
        {state.rounds.map((round, i) => {
          const day = state.schedule[round.dayIndex];
          return (
            <Link
              key={round.id}
              href={`/scorecard/${round.id}`}
              className="block min-h-[4.5rem] touch-manipulation rounded-lg border border-gray-200 bg-white p-4 transition-colors active:border-primary active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700/80 md:hover:border-primary"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-medium">Round {i + 1}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {round.courseName === 'TBD' ? 'Course TBD' : round.courseName}
                    </span>
                  </div>
                  {day ? (
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {formatTripDayDate(day.date)}
                      {day.city ? ` · ${day.city}` : ''}
                    </p>
                  ) : null}
                  <p className="text-xs text-gray-400">Tee: {round.teeTime}</p>
                </div>
                <span className="shrink-0 text-xs text-gray-400 sm:text-right">{DAY_LABELS[round.dayIndex]}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
