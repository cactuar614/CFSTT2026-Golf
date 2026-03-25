'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';

export default function PlayersPage() {
  const [state, , hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-96 rounded-xl bg-gray-100 dark:bg-gray-800" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-primary">Players</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Roster is read-only here. Trip admins edit names and handicaps on the{' '}
          <Link href="/admin" className="font-medium text-primary underline">
            Admin
          </Link>{' '}
          page.
        </p>
      </div>

      {state.players.length === 0 ? (
        <p className="py-8 text-center text-gray-500 dark:text-gray-400">No players listed yet.</p>
      ) : (
        <div className="space-y-2">
          {state.players.map((player) => (
            <div
              key={player.id}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <span className="text-base font-medium">{player.name}</span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">HCP: {player.handicap}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
