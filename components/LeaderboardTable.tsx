'use client';

import { LeaderboardEntry } from '@/lib/scoring';

type LeaderboardTableProps = {
  entries: LeaderboardEntry[];
  /** Must match number of rounds (columns R0…R{n-1}). */
  roundCount: number;
};

export default function LeaderboardTable({ entries, roundCount }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500 dark:text-gray-400">
        No players yet. Add players on the Players page.
      </p>
    );
  }

  const nRounds = Math.max(roundCount, entries[0]?.roundNets.length ?? 0);

  return (
    <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1">
      <table className="w-full min-w-[340px] border-collapse text-sm md:text-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th scope="col" className="px-3 py-3 text-left text-sm md:py-2">#</th>
            <th scope="col" className="px-3 py-3 text-left text-sm md:py-2">Player</th>
            {Array.from({ length: nRounds }, (_, ri) => (
              <th scope="col" key={ri} className="px-3 py-3 text-center text-sm tabular-nums md:py-2">
                R{ri}
              </th>
            ))}
            <th scope="col" className="px-3 py-3 text-center text-sm md:py-2">Net</th>
            <th scope="col" className="px-3 py-3 text-center text-sm md:py-2">Gross</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr
              key={entry.player.id}
              className={`border-b border-gray-100 dark:border-gray-700 ${
                i === 0 && entry.totalNet !== null
                  ? 'bg-yellow-50 font-semibold dark:bg-yellow-900/30'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <td className="px-3 py-3 text-gray-500 tabular-nums dark:text-gray-400 md:py-2">{i + 1}</td>
              <th scope="row" className="max-w-[7rem] truncate px-3 py-3 text-left font-medium md:py-2">
                {entry.player.name}
              </th>
              {Array.from({ length: nRounds }, (_, ri) => (
                <td key={ri} className="px-3 py-3 text-center tabular-nums md:py-2">
                  {entry.roundNets[ri] ?? '—'}
                </td>
              ))}
              <td className="px-3 py-3 text-center text-base font-bold text-primary tabular-nums md:py-2 md:text-sm">
                {entry.totalNet ?? '—'}
              </td>
              <td className="px-3 py-3 text-center tabular-nums md:py-2">{entry.totalGross ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
