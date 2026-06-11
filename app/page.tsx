'use client';

import Link from 'next/link';
import { getTripState } from '@/lib/tripState';
import { TRIP_NAME, TRIP_DATES, TRIP_LOCATION, DAY_LABELS, GAME_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';
import StatusBanner from '@/components/StatusBanner';
import LodgingCard from '@/components/LodgingCard';
import MapLink from '@/components/MapLink';
import { CalendarIcon, ScorecardIcon, TrophyIcon } from '@/components/icons';

const quickLinks = [
  { href: '/schedule', label: 'Schedule', Icon: CalendarIcon },
  { href: '/scorecard', label: 'Scorecards', Icon: ScorecardIcon },
  { href: '/leaderboard', label: 'Leaderboard', Icon: TrophyIcon },
];

export default function Dashboard() {
  const state = getTripState();
  const activeDay = state.activeDayIndex !== null ? state.schedule[state.activeDayIndex] : null;
  const activeRound =
    state.activeDayIndex !== null
      ? state.rounds.find((r) => r.dayIndex === state.activeDayIndex)
      : undefined;

  return (
    <div className="space-y-6">
      {/* Hero — bourbon-label style header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-primary-dark to-primary px-6 py-8 text-center shadow-card">
        <div className="pointer-events-none absolute inset-2 rounded-xl border border-accent/40" aria-hidden />
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
          Est. 2026 &middot; {TRIP_LOCATION}
        </p>
        <h1 className="mx-auto mt-2 max-w-md font-display text-3xl font-bold tracking-tight text-cream">
          {TRIP_NAME}
        </h1>
        <div className="mx-auto mt-4 flex max-w-[14rem] items-center gap-3 text-xs text-accent" aria-hidden>
          <span className="h-px flex-1 bg-accent/50" />
          <span>&#9670;</span>
          <span className="h-px flex-1 bg-accent/50" />
        </div>
        <p className="mt-3 text-sm text-cream/80">{TRIP_DATES} &middot; Three days, three games</p>
      </header>

      <LodgingCard />

      {/* Status Banner */}
      <StatusBanner status={state.currentStatus} />

      {/* Today / Active Day Card — only when today is one of the trip days */}
      {activeDay && state.activeDayIndex !== null && (
        <div className="card relative overflow-hidden border-accent/70 p-4 pl-5 dark:border-accent/50">
          <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden />
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-char-900">
              On the tee
            </span>
            <span className="text-sm text-ink-soft dark:text-chalk/60">{DAY_LABELS[state.activeDayIndex]}</span>
          </div>
          <h2 className="font-display text-lg font-bold">{activeDay.label}</h2>
          <p className="text-sm text-ink-soft dark:text-chalk/70">{activeDay.description}</p>
          {activeDay.activities.length > 0 && (
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-soft marker:text-accent dark:text-chalk/70">
              {activeDay.activities.filter(a => a).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          )}
          {activeRound?.mapUrl ? (
            <div className="mt-3">
              <MapLink href={activeRound.mapUrl} label={`Map · ${activeRound.courseName}`} />
            </div>
          ) : null}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-3">
        {quickLinks.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="card flex min-h-[5.5rem] touch-manipulation flex-col items-center justify-center gap-1.5 p-3 text-center transition-colors active:bg-parchment dark:active:bg-char-700 md:hover:border-accent"
          >
            <Icon className="h-6 w-6 text-copper dark:text-accent" />
            <span className="text-sm font-semibold">{label}</span>
          </Link>
        ))}
      </div>

      {/* Round Summaries */}
      <div className="space-y-2">
        <h2 className="eyebrow">The Rounds</h2>
        {state.rounds.map((round, i) => {
          const day = state.schedule[round.dayIndex];
          return (
            <div
              key={round.id}
              className="card flex items-stretch overflow-hidden transition-colors md:hover:border-accent"
            >
              <Link
                href={`/scorecard/${round.id}`}
                className="min-h-[4.5rem] flex-1 touch-manipulation p-4 active:bg-parchment dark:active:bg-char-700"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/60 font-display text-lg font-bold text-primary dark:text-accent">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-semibold">
                        {round.courseName === 'TBD' ? 'Course TBD' : round.courseName}
                      </span>
                    </div>
                    {day ? (
                      <p className="mt-0.5 text-xs text-ink-soft dark:text-chalk/60">
                        {formatTripDayDate(day.date)}
                        {day.city ? ` · ${day.city}` : ''}
                      </p>
                    ) : null}
                    <p className="text-xs text-ink-soft/80 dark:text-chalk/50">
                      Tee: {round.teeTime} · {GAME_LABELS[round.game]}
                    </p>
                  </div>
                  <span className="hidden shrink-0 text-xs text-ink-soft/80 dark:text-chalk/50 sm:block">
                    {DAY_LABELS[round.dayIndex]}
                  </span>
                </div>
              </Link>
              {round.mapUrl ? (
                <div className="flex items-center border-l border-linen px-3 dark:border-char-700">
                  <MapLink href={round.mapUrl} label="Map" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
