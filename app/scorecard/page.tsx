import Link from 'next/link';
import { getTripState } from '@/lib/tripState';
import { DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';

export default function ScorecardIndexPage() {
  const state = getTripState();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="eyebrow">View-only</p>
        <h1 className="page-title">Scorecards</h1>
      </div>

      <div className="space-y-3">
        {state.rounds.map((round, i) => {
          const day = state.schedule[round.dayIndex];
          const courseLabel = round.courseName === 'TBD' ? 'Course TBD' : round.courseName;
          return (
            <Link
              key={round.id}
              href={`/scorecard/${round.id}`}
              className="card block min-h-[6rem] touch-manipulation p-4 transition-colors active:bg-parchment dark:active:bg-char-700 md:hover:border-accent"
            >
              <div className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/60 font-display text-lg font-bold text-primary dark:text-accent">
                  {i + 1}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                      <h2 className="font-display text-lg font-bold">{courseLabel}</h2>
                      <span className="text-sm text-ink-soft dark:text-chalk/60">{DAY_LABELS[round.dayIndex]}</span>
                    </div>
                    {day ? (
                      <>
                        <p className="text-sm text-ink-soft dark:text-chalk/70">
                          {formatTripDayDate(day.date)}
                          {day.city ? ` · ${day.city}` : ''}
                        </p>
                        <p className="text-sm text-ink-soft dark:text-chalk/60">{day.label}</p>
                      </>
                    ) : null}
                    <p className="text-sm text-ink-soft dark:text-chalk/60">Tee: {round.teeTime}</p>
                  </div>
                  <div className="shrink-0 text-right sm:pt-1">
                    <div className="text-sm font-semibold text-copper dark:text-accent">Open scorecard →</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
