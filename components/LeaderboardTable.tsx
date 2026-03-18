'use client';

import { LeaderboardEntry } from '@/lib/scoring';

type LeaderboardTableProps = {
  entries: LeaderboardEntry[];
};

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
        No players yet. Add players on the Players page.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-2 px-3 text-left">#</th>
            <th className="py-2 px-3 text-left">Player</th>
            <th className="py-2 px-3 text-center">R1</th>
            <th className="py-2 px-3 text-center">R2</th>
            <th className="py-2 px-3 text-center">R3</th>
            <th className="py-2 px-3 text-center">Net</th>
            <th className="py-2 px-3 text-center">Gross</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr
              key={entry.player.id}
              className={`border-b border-gray-100 dark:border-gray-700 ${
                i === 0 && entry.totalNet !== null ? 'bg-yellow-50 dark:bg-yellow-900/30 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <td className="py-2 px-3 text-gray-500 dark:text-gray-400">{i + 1}</td>
              <td className="py-2 px-3 font-medium">{entry.player.name}</td>
              <td className="py-2 px-3 text-center">{entry.roundNets[0] ?? '—'}</td>
              <td className="py-2 px-3 text-center">{entry.roundNets[1] ?? '—'}</td>
              <td className="py-2 px-3 text-center">{entry.roundNets[2] ?? '—'}</td>
              <td className="py-2 px-3 text-center font-bold text-primary">
                {entry.totalNet ?? '—'}
              </td>
              <td className="py-2 px-3 text-center">{entry.totalGross ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
