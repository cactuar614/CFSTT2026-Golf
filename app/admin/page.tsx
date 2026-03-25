'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/lib/AdminContext';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { Player } from '@/lib/types';
import PlayerForm from '@/components/PlayerForm';
import { DAY_LABELS } from '@/lib/constants';
import { getActiveDayIndexForToday } from '@/lib/activeDay';

export default function AdminPage() {
  const { isAdmin, accessConfigured, login, logout } = useAdmin();
  const [state, updateState, hydrated] = useLocalStorage();
  const [code, setCode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const onLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    if (!login(code)) setLoginError(true);
  };

  if (!hydrated) {
    return <div className="animate-pulse h-64 rounded-xl bg-gray-100 dark:bg-gray-800" />;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md space-y-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-primary">Admin</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Trip content (schedule, live status, players, scores) is edited here. Public pages are read-only.
          </p>
          {!accessConfigured ? (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
              Set <code className="rounded bg-black/10 px-1">NEXT_PUBLIC_ADMIN_ACCESS_CODE</code> in{' '}
              <code className="rounded bg-black/10 px-1">.env.local</code> (and Vercel env) to enable sign-in. Replace
              with real auth when you are ready.
            </p>
          ) : null}
        </div>
        <form onSubmit={onLogin} className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Access code</label>
          <input
            type="password"
            autoComplete="off"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-[48px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter code"
          />
          {loginError ? <p className="text-sm text-red-600 dark:text-red-400">Incorrect code.</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 text-base font-medium text-white touch-manipulation active:bg-primary-light"
          >
            Sign in
          </button>
        </form>
        <Link href="/" className="block text-center text-sm text-primary underline">
          ← Back to app
        </Link>
      </div>
    );
  }

  const addPlayer = (name: string, handicap: number) => {
    const newPlayer: Player = { id: `player-${Date.now()}`, name, handicap };
    updateState((prev) => ({ ...prev, players: [...prev.players, newPlayer] }));
    setShowAdd(false);
  };

  const updatePlayer = (id: string, name: string, handicap: number) => {
    updateState((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === id ? { ...p, name, handicap } : p)),
    }));
    setEditingId(null);
  };

  const removePlayer = (id: string) => {
    updateState((prev) => ({ ...prev, players: prev.players.filter((p) => p.id !== id) }));
  };

  const updateDayField = (i: number, patch: Partial<(typeof state.schedule)[0]>) => {
    updateState((prev) => {
      const schedule = [...prev.schedule];
      schedule[i] = { ...schedule[i], ...patch };
      return { ...prev, schedule };
    });
  };

  const setActivitiesFromText = (i: number, text: string) => {
    const activities = text.split('\n').map((l) => l.trimEnd());
    updateDayField(i, { activities });
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">Admin</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">All trip edits happen here.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-300"
          >
            View app
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 dark:border-red-900 dark:text-red-400"
          >
            Sign out
          </button>
        </div>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-3 font-bold text-gray-900 dark:text-gray-100">Live status</h2>
        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Shown on Home and Schedule when non-empty.</p>
        <input
          type="text"
          value={state.currentStatus}
          onChange={(e) => updateState((prev) => ({ ...prev, currentStatus: e.target.value }))}
          className="min-h-[48px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          placeholder='e.g. "Shuttle to Champions Pointe"'
          autoComplete="off"
        />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-3 font-bold text-gray-900 dark:text-gray-100">Active schedule day</h2>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={state.activeDayFollowCalendar}
            onChange={(e) => {
              const follow = e.target.checked;
              updateState((prev) => ({
                ...prev,
                activeDayFollowCalendar: follow,
                activeDayIndex: follow ? getActiveDayIndexForToday(prev.schedule) : prev.activeDayIndex,
              }));
            }}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          Follow today&apos;s date (recommended)
        </label>
        {!state.activeDayFollowCalendar ? (
          <div className="mt-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Pinned day</label>
            <select
              value={state.activeDayIndex}
              onChange={(e) =>
                updateState((prev) => ({ ...prev, activeDayIndex: parseInt(e.target.value, 10) }))
              }
              className="min-h-[44px] w-full max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2 text-base dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            >
              {state.schedule.map((_, i) => (
                <option key={i} value={i}>
                  {DAY_LABELS[i] ?? `Day ${i + 1}`}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Schedule (by day)</h2>
        {state.schedule.map((day, i) => (
          <div
            key={day.date}
            className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <p className="text-sm font-semibold text-primary">{DAY_LABELS[i]}</p>
            <p className="text-xs text-gray-500">Date (ISO): {day.date}</p>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">City</label>
              <input
                type="text"
                value={day.city ?? ''}
                onChange={(e) => updateDayField(i, { city: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Label</label>
              <input
                type="text"
                value={day.label}
                onChange={(e) => updateDayField(i, { label: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Description</label>
              <input
                type="text"
                value={day.description}
                onChange={(e) => updateDayField(i, { description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Agenda (one line per bullet)</label>
              <textarea
                value={day.activities.join('\n')}
                onChange={(e) => setActivitiesFromText(i, e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-3 font-bold text-gray-900 dark:text-gray-100">Scorecards</h2>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">Edit pars, course, tee times, and strokes per round.</p>
        <ul className="space-y-2">
          {state.rounds.map((r, i) => (
            <li key={r.id}>
              <Link href={`/admin/scorecard/${r.id}`} className="text-primary underline">
                Round {i + 1} — {r.courseName}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-bold text-gray-900 dark:text-gray-100">Players</h2>
          <button
            type="button"
            onClick={() => {
              setShowAdd(true);
              setEditingId(null);
            }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            + Add player
          </button>
        </div>

        {showAdd && <PlayerForm onSave={addPlayer} onCancel={() => setShowAdd(false)} />}

        <div className="mt-3 space-y-2">
          {state.players.map((player) =>
            editingId === player.id ? (
              <PlayerForm
                key={player.id}
                player={player}
                onSave={(name, handicap) => updatePlayer(player.id, name, handicap)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                key={player.id}
                className="flex flex-col gap-2 rounded-lg border border-gray-100 p-3 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="font-medium">{player.name}</span>
                  <span className="ml-2 text-sm text-gray-500">HCP {player.handicap}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(player.id);
                      setShowAdd(false);
                    }}
                    className="text-sm text-primary underline"
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => removePlayer(player.id)} className="text-sm text-red-600 underline">
                    Remove
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
