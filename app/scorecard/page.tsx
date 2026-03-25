'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';

export default function ScorecardIndexPage() {
  const [state, , hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-64 rounded-xl bg-gray-100 dark:bg-gray-800" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-primary">Scorecards</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View-only. Trip admins enter scores from the{' '}
          <Link href="/admin" className="font-medium text-primary underline">
            Admin
          </Link>{' '}
          page.
        </p>
      </div>

      <div className="space-y-3">
        {state.rounds.map((round, i) => {
          const day = state.schedule[round.dayIndex];
          const courseLabel = round.courseName === 'TBD' ? 'Course TBD' : round.courseName;
          return (
            <Link
              key={round.id}
              href={`/scorecard/${round.id}`}
              className="block min-h-[6rem] touch-manipulation rounded-xl border border-gray-200 bg-white p-4 transition-colors active:border-primary active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700/80 md:hover:border-primary"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Round {i + 1}</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{DAY_LABELS[round.dayIndex]}</span>
                  </div>
                  {day ? (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{formatTripDayDate(day.date)}</p>
                      {day.city ? (
                        <p className="text-sm font-semibold text-primary">{day.city}</p>
                      ) : null}
                      <p className="text-sm text-gray-600 dark:text-gray-400">{day.label}</p>
                    </>
                  ) : null}
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{courseLabel}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tee: {round.teeTime}</p>
                </div>
                <div className="shrink-0 text-right sm:pt-1">
                  <div className="text-sm font-medium text-primary">Open scorecard →</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {state.players.length === 0 && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Add players on the{' '}
          <Link href="/players" className="inline-flex min-h-[44px] items-center text-primary underline">
            Players page
          </Link>{' '}
          to start scoring.
        </p>
      )}
    </div>
  );
}
