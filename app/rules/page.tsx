'use client';

import { TRIP_NAME } from '@/lib/constants';
import { FlagIcon, BookIcon } from '@/components/icons';

const dayRules = [
  {
    day: 'Friday',
    course: 'Champions Pointe',
    game: 'Individual stroke play — gross',
    points: [
      'Lowest gross score wins. No tiers, no strokes, no handicaps — just count every shot.',
      'White tees, 6,484 yards.',
    ],
  },
  {
    day: 'Saturday',
    course: 'Covered Bridge',
    game: 'Stableford — most points wins',
    points: [
      'Points per hole: double eagle 9 · eagle 6 · birdie 4 · par 2 · bogey 1 · double bogey or worse 0.',
      '2× Longest Drive (holes 9 & 18) and 2× Closest to the Pin (holes 3 & 17) side contests.',
      'Gold tees, 6,453 yards.',
    ],
  },
  {
    day: 'Sunday',
    course: 'Valley View',
    game: 'Team scramble',
    points: [
      'Teams play one ball: everyone hits, pick the best shot, all play from there.',
      'No individual cards or handicaps — itʼs all about the team.',
      'Green tees, 6,508 yards.',
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="eyebrow">{TRIP_NAME}</p>
        <h1 className="page-title">House Rules</h1>
        <p className="text-sm text-ink-soft dark:text-chalk/60">
          Each day is its own game with its own winner — thereʼs no overall weekend champion.
          Play it where it lies, keep it moving, and have fun.
        </p>
      </div>

      {/* Putt everything out — the one rule we don't skip */}
      <div className="card relative overflow-hidden border-accent/70 p-4 pl-5 dark:border-accent/50">
        <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden />
        <div className="mb-2 flex items-center gap-2">
          <FlagIcon className="h-5 w-5 text-copper dark:text-accent" />
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-char-900">
            No gimmes
          </span>
        </div>
        <h2 className="font-display text-lg font-bold">Putt everything out</h2>
        <p className="text-sm text-ink-soft dark:text-chalk/70">
          No gimmes, no &ldquo;thatʼs good,&rdquo; no scooping it up two feet out. Everyone putts
          every ball into the hole, every hole, all weekend. The short ones count too — finish them.
        </p>
      </div>

      {/* Per-day games */}
      <div className="space-y-2">
        <h2 className="eyebrow">The Games</h2>
        {dayRules.map((rule) => (
          <div key={rule.day} className="card p-4">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-lg font-bold">{rule.day}</span>
              <span className="text-sm text-ink-soft dark:text-chalk/60">· {rule.course}</span>
            </div>
            <p className="mt-0.5 text-sm font-semibold text-primary dark:text-accent">{rule.game}</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-soft marker:text-accent dark:text-chalk/70">
              {rule.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Merch reminder */}
      <div className="card p-4">
        <div className="mb-2 flex items-center gap-2">
          <BookIcon className="h-5 w-5 text-copper dark:text-accent" />
          <h2 className="font-display text-lg font-bold">Hit the pro shop</h2>
        </div>
        <p className="text-sm text-ink-soft dark:text-chalk/70">
          Friendly reminder: stop by the clubhouse and buy some merch! Grab a hat, a towel, a
          divot tool — and pick something up for the kids back home, too. These courses are
          hosting us all weekend, so letʼs show them some love (and bring home the goods).
        </p>
      </div>
    </div>
  );
}
