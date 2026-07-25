'use client';

import { useSession } from 'next-auth/react';
import { getTripState } from '@/lib/tripState';
import { DAY_LABELS, GAME_LABELS } from '@/lib/constants';
import { UsersIcon } from './icons';

/**
 * "Your pairings" — shows the signed-in golfer their team/partners for each
 * round. Renders nothing while auth is disabled, the visitor is signed out, or
 * the account isn't matched to a golfer (session loads client-side so the page
 * stays static).
 */
export default function MyPairings() {
  const { data: session } = useSession();
  const playerId = session?.user?.playerId;
  if (!playerId) return null;

  const state = getTripState();
  const me = state.players.find((p) => p.id === playerId);
  const nameFor = (id: string) => state.players.find((p) => p.id === id)?.name ?? id;

  const numbered = state.rounds.map((round, i) => ({ round, number: i + 1 }));
  const inAnyTeam = numbered.some(({ round }) =>
    (round.teams ?? []).some((t) => t.playerIds.includes(playerId)),
  );
  if (!inAnyTeam) return null;

  const dayIndexes = Array.from(new Set(state.rounds.map((r) => r.dayIndex)));

  return (
    <section className="card p-4">
      <div className="flex items-center gap-2">
        <UsersIcon className="h-5 w-5 text-copper dark:text-accent" />
        <h2 className="font-display text-lg font-bold">Your pairings</h2>
      </div>
      {me ? (
        <p className="mt-0.5 text-sm text-ink-soft dark:text-chalk/60">
          {me.name} — here&rsquo;s who you&rsquo;re with each day.
        </p>
      ) : null}

      <div className="mt-3 space-y-3">
        {dayIndexes.map((dayIndex) => {
          const rounds = numbered.filter(({ round }) => round.dayIndex === dayIndex);
          return (
            <div key={dayIndex}>
              <p className="eyebrow mb-1">{DAY_LABELS[dayIndex]}</p>
              <ul className="space-y-2">
                {rounds.map(({ round, number }) => {
                  const team = (round.teams ?? []).find((t) => t.playerIds.includes(playerId));
                  const partners = team
                    ? team.playerIds.filter((id) => id !== playerId).map(nameFor)
                    : [];
                  const showTeamName = team ? team.name.startsWith('Team ') : false;
                  return (
                    <li
                      key={round.id}
                      className="rounded-lg border border-linen bg-parchment/40 p-3 dark:border-char-700 dark:bg-char-800/40"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                        <span className="font-semibold">
                          <span className="mr-1.5 text-copper dark:text-accent">R{number}</span>
                          {round.courseName}
                        </span>
                        <span className="text-xs text-ink-soft dark:text-chalk/50">
                          {GAME_LABELS[round.game]}
                        </span>
                      </div>
                      {team ? (
                        <p className="mt-1 text-sm text-ink-soft dark:text-chalk/70">
                          {showTeamName ? (
                            <span className="font-medium text-primary dark:text-accent">
                              {team.name}
                            </span>
                          ) : null}
                          {showTeamName ? ' · ' : ''}
                          {partners.length > 0 ? `With ${partners.join(', ')}` : 'Playing solo'}
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-ink-soft/70 dark:text-chalk/40">
                          Casual round — no set teams yet.
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
