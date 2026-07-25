'use client';

import { TRIP_NAME } from '@/lib/constants';
import { FlagIcon, BookIcon } from '@/components/icons';

const dayRules = [
  {
    day: 'Friday',
    course: 'Champions Pointe',
    game: '3-2-1 Best Ball — team format',
    points: [
      'Played in a foursome. On each hole the team counts its best 1, 2, or 3 balls toward the team score.',
      'You get six “3” holes, six “2” holes, and six “1” holes — eighteen holes, six of each.',
      'Pick the count for the NEXT hole before anyone tees off on it. Once the first ball is struck, itʼs locked.',
      'Everyone plays their own ball; lowest team total wins.',
      'White tees, 6,484 yards.',
    ],
  },
  {
    day: 'Saturday',
    course: 'Covered Bridge + Hidden Creek — 36 holes',
    game: '2-man scramble (AM), then a casual game (PM)',
    points: [
      'Morning — Covered Bridge: 2-man scramble. Teams: Rogers & Hippy Mike · Huber & Kennedy · Sweeney & OʼCallahan · Wakeland & Karns.',
      'Scramble = both partners hit, play the best ball, repeat. Lowest team score wins.',
      'Afternoon — Hidden Creek: a more casual game, format to be decided with the group.',
      '2× Longest Drive (holes 9 & 18) and 2× Closest to the Pin (holes 3 & 17) contests at Covered Bridge.',
      'Both rounds: Gold tees. Covered Bridge 6,453 yards (par 72) · Hidden Creek 6,282 yards (par 70).',
    ],
  },
  {
    day: 'Sunday',
    course: 'Valley View',
    game: '4-person team scramble',
    points: [
      'Teams of four play one ball: everyone hits, pick the best shot, all play from there.',
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

      {/* Breakfast ball — one do-over, then play it as it lies */}
      <div className="card relative overflow-hidden border-accent/70 p-4 pl-5 dark:border-accent/50">
        <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden />
        <div className="mb-2 flex items-center gap-2">
          <FlagIcon className="h-5 w-5 text-copper dark:text-accent" />
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-char-900">
            Breakfast ball
          </span>
        </div>
        <h2 className="font-display text-lg font-bold">One breakfast ball — no mulligans</h2>
        <p className="text-sm text-ink-soft dark:text-chalk/70">
          Everyone gets a breakfast ball: one free do-over on your very first tee shot of the day.
          After that, no mulligans — play it as it lies and keep it moving.
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
