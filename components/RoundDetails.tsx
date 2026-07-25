'use client';

import { Round } from '@/lib/types';
import { GAME_LABELS } from '@/lib/constants';
import MapLink from './MapLink';

export type NumberedRound = Round & { number: number };

/** How the round's game reads on the schedule — keeps the "2-man/4-person" nuance. */
function gameLabel(round: Round): string {
  if (round.game === 'scramble' && round.teams && round.teams.length > 0) {
    const size = round.teams[0].playerIds.length;
    return `${size}-person scramble`;
  }
  return GAME_LABELS[round.game];
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-ink-soft dark:text-chalk/50">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </>
  );
}

/** Structured, scannable per-round detail blocks (course + tee/tees/game). */
export default function RoundDetails({ rounds }: { rounds: NumberedRound[] }) {
  if (rounds.length === 0) return null;
  return (
    <div className="space-y-2">
      {rounds.map((round) => (
        <div
          key={round.id}
          className="rounded-lg border border-linen bg-parchment/40 p-3 dark:border-char-700 dark:bg-char-800/40"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border border-accent/60 px-1.5 font-display text-xs font-bold text-primary dark:text-accent">
                R{round.number}
              </span>
              <h4 className="min-w-0 font-display text-base font-bold leading-tight">
                {round.courseName === 'TBD' ? 'Course TBD' : round.courseName}
              </h4>
            </div>
            {round.mapUrl ? <MapLink href={round.mapUrl} label="Map" /> : null}
          </div>
          <dl className="mt-2 grid grid-cols-[3.5rem_1fr] gap-x-3 gap-y-1 text-sm">
            <DetailRow label="Tee" value={round.teeTime} />
            {round.tees ? <DetailRow label="Tees" value={round.tees} /> : null}
            <DetailRow label="Game" value={gameLabel(round)} />
          </dl>
        </div>
      ))}
    </div>
  );
}
