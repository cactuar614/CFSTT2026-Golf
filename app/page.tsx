'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { TRIP_NAME, TRIP_DATES, TRIP_LOCATION, DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';
import { localDateISO } from '@/lib/activeDay';
import StatusBanner from '@/components/StatusBanner';
import LodgingCard from '@/components/LodgingCard';

export default function Dashboard() {
  const [state, , hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-64 bg-gray-100 dark:bg-gray-800 rounded-xl" />;
  }

  const todayIso = localDateISO();
  const sched = state.schedule;
  const todayIdx = sched.findIndex((d) => d.date === todayIso);
  const firstDay = sched[0];
  const lastDay = sched.length ? sched[sched.length - 1] : null;

  let featured: { day: (typeof sched)[0]; dayIdx: number; badge: string; borderClass: string } | null = null;
  if (todayIdx !== -1) {
    featured = {
      day: sched[todayIdx],
      dayIdx: todayIdx,
      badge: 'TODAY',
      borderClass: 'border-primary',
    };
  } else if (firstDay && todayIso < firstDay.date) {
    featured = {
      day: firstDay,
      dayIdx: 0,
      badge: 'UP NEXT',
      borderClass: 'border-gray-200 dark:border-gray-700',
    };
  } else if (lastDay && todayIso > lastDay.date) {
    featured = {
      day: lastDay,
      dayIdx: sched.length - 1,
      badge: 'LAST DAY',
      borderClass: 'border-gray-200 dark:border-gray-700',
    };
  }

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

      {/* Featured day: true “today” only on a trip calendar day; otherwise preview */}
      {featured && (
        <div className={`rounded-xl border-2 bg-white p-4 dark:bg-gray-800 ${featured.borderClass}`}>
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold text-white ${
                featured.badge === 'TODAY' ? 'bg-primary' : 'bg-gray-500 dark:bg-gray-600'
              }`}
            >
              {featured.badge}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{DAY_LABELS[featured.dayIdx]}</span>
          </div>
          <h2 className="text-lg font-bold">{featured.day.label}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{featured.day.description}</p>
          {featured.day.activities.length > 0 && (
            <ul className="mt-2 space-y-1">
              {featured.day.activities
                .filter((a) => a)
                .map((a, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400">
                    • {a}
                  </li>
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
