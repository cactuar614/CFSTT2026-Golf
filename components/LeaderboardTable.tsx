'use client';

import { LeaderboardEntry } from '@/lib/scoring';

type LeaderboardTableProps = {
  entries: LeaderboardEntry[];
  /** Must match number of rounds (columns R1…Rn). */
  roundCount: number;
};

export default function LeaderboardTable({ entries, roundCount }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <p className="py-8 text-center text-ink-soft dark:text-chalk/60">No players yet.</p>
    );
  }

  const nRounds = Math.max(roundCount, entries[0]?.roundNets.length ?? 0);

  return (
    <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1">
      <table className="w-full min-w-[340px] border-collapse text-sm md:text-sm">
        <thead>
          <tr className="bg-primary-dark text-[11px] uppercase tracking-wider text-accent-light">
            <th className="px-3 py-3 text-left md:py-2">#</th>
            <th className="px-3 py-3 text-left md:py-2">Player</th>
            {Array.from({ length: nRounds }, (_, ri) => (
              <th key={ri} className="px-3 py-3 text-center tabular-nums md:py-2">
                R{ri + 1}
              </th>
            ))}
            <th className="px-3 py-3 text-center md:py-2">Net</th>
            <th className="px-3 py-3 text-center md:py-2">Gross</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const isLeader = i === 0 && entry.totalNet !== null;
            return (
              <tr
                key={entry.player.id}
                className={`border-b border-linen dark:border-char-700 ${
                  isLeader
                    ? 'bg-accent/15 font-semibold dark:bg-accent/10'
                    : 'hover:bg-parchment/60 dark:hover:bg-char-800'
                }`}
              >
                <td className="px-3 py-3 tabular-nums text-ink-soft dark:text-chalk/60 md:py-2">
                  {isLeader ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent font-display text-xs font-bold text-char-900">
                      1
                    </span>
                  ) : (
                    i + 1
                  )}
                </td>
                <td className="max-w-[9rem] truncate px-3 py-3 font-medium md:py-2">{entry.player.name}</td>
                {Array.from({ length: nRounds }, (_, ri) => (
                  <td key={ri} className="px-3 py-3 text-center tabular-nums md:py-2">
                    {entry.roundNets[ri] ?? '—'}
                  </td>
                ))}
                <td className="px-3 py-3 text-center text-base font-bold tabular-nums text-copper dark:text-accent md:py-2 md:text-sm">
                  {entry.totalNet ?? '—'}
                </td>
                <td className="px-3 py-3 text-center tabular-nums md:py-2">{entry.totalGross ?? '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
