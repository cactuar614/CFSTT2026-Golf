'use client';

import { useState } from 'react';

type Row = {
  key: string; // playerId or team name
  label: string; // display name
  strokes: (number | null)[]; // 18
};

export type AdminRound = {
  id: string;
  courseName: string;
  teeTime: string;
  gameLabel: string;
  coursePar: number[];
  mode: 'players' | 'teams';
  rows: Row[];
};

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

const FRONT = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const BACK = [10, 11, 12, 13, 14, 15, 16, 17, 18];

function sumRange(strokes: (number | null)[], holes: number[]): number | null {
  let sum = 0;
  let any = false;
  for (const h of holes) {
    const v = strokes[h - 1];
    if (typeof v === 'number') {
      sum += v;
      any = true;
    }
  }
  return any ? sum : null;
}

export default function AdminScoreEditor({ rounds }: { rounds: AdminRound[] }) {
  return (
    <div className="space-y-8">
      {rounds.map((round) => (
        <RoundEditor key={round.id} round={round} />
      ))}
      <p className="text-xs text-ink-soft/80 dark:text-chalk/40">
        Leave a hole blank for no score. Best-ball &amp; casual rounds record each
        golfer&apos;s card; scramble rounds record one card per team.
      </p>
    </div>
  );
}

function RoundEditor({ round }: { round: AdminRound }) {
  const [rows, setRows] = useState<Row[]>(() =>
    round.rows.map((r) => ({ ...r, strokes: [...r.strokes] }))
  );
  const [state, setState] = useState<SaveState>('idle');
  const [message, setMessage] = useState('');

  const setStroke = (rowIndex: number, hole: number, raw: string) => {
    const value = raw.trim() === '' ? null : Math.max(1, Math.min(20, Number(raw)));
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== rowIndex) return row;
        const strokes = [...row.strokes];
        strokes[hole - 1] = value === null || Number.isNaN(value) ? null : value;
        return { ...row, strokes };
      })
    );
    if (state !== 'idle') setState('idle');
  };

  const save = async () => {
    setState('saving');
    setMessage('');
    const payload = {
      roundId: round.id,
      mode: round.mode,
      rows: rows.map((r) => ({ key: r.key, strokes: r.strokes })),
    };
    try {
      const res = await fetch('/api/admin/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState('error');
        setMessage(data?.error ?? `Save failed (${res.status}).`);
        return;
      }
      setState('saved');
      setMessage('Saved. Scores go live after the redeploy (~1 min).');
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Network error.');
    }
  };

  return (
    <section className="card p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-bold">{round.courseName}</h2>
          <p className="text-xs text-ink-soft dark:text-chalk/50">
            {round.gameLabel} · Tee {round.teeTime}
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={state === 'saving'}
          className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-cream transition-colors active:opacity-80 disabled:opacity-50 dark:bg-accent dark:text-char-900"
        >
          {state === 'saving' ? 'Saving…' : 'Save round'}
        </button>
      </div>

      {message ? (
        <p
          className={`mt-2 text-sm ${
            state === 'error' ? 'text-red-600 dark:text-red-400' : 'text-primary dark:text-accent'
          }`}
        >
          {message}
        </p>
      ) : null}

      <div className="mt-3 space-y-4">
        <HalfGrid label="Front 9" holes={FRONT} round={round} rows={rows} setStroke={setStroke} />
        <HalfGrid label="Back 9" holes={BACK} round={round} rows={rows} setStroke={setStroke} />
      </div>
    </section>
  );
}

function HalfGrid({
  label,
  holes,
  round,
  rows,
  setStroke,
}: {
  label: string;
  holes: number[];
  round: AdminRound;
  rows: Row[];
  setStroke: (rowIndex: number, hole: number, raw: string) => void;
}) {
  const rowIndexByKey = (key: string) => round.rows.findIndex((r) => r.key === key);
  return (
    <div>
      <h3 className="eyebrow mb-1">{label}</h3>
      <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-primary-dark text-cream">
              <th className="w-28 min-w-[6rem] px-2 py-2 text-left text-xs font-medium">
                {round.mode === 'teams' ? 'Team' : 'Player'}
              </th>
              {holes.map((h) => (
                <th key={h} className="w-12 min-w-[3rem] px-0.5 py-2 text-center text-xs font-medium">
                  {h}
                </th>
              ))}
              <th className="w-14 min-w-[3.25rem] px-2 py-2 text-center text-xs font-bold text-accent-light">
                {label === 'Front 9' ? 'OUT' : 'IN'}
              </th>
            </tr>
            <tr className="bg-parchment dark:bg-char-700">
              <td className="px-2 py-1 text-xs font-medium text-ink-soft dark:text-chalk/70">Par</td>
              {holes.map((h) => (
                <td key={h} className="px-0.5 py-1 text-center text-xs tabular-nums">
                  {round.coursePar[h - 1]}
                </td>
              ))}
              <td className="px-2 py-1 text-center text-xs font-bold text-ink-soft dark:text-chalk/70">
                {holes.reduce((sum, h) => sum + round.coursePar[h - 1], 0)}
              </td>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const rowIndex = rowIndexByKey(row.key);
              const half = sumRange(row.strokes, holes);
              return (
                <tr key={row.key} className="border-b border-linen dark:border-char-700">
                  <td className="max-w-[8rem] truncate px-2 py-1 text-xs font-medium">{row.label}</td>
                  {holes.map((h) => (
                    <td key={h} className="px-0.5 py-1 text-center">
                      <input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={20}
                        value={row.strokes[h - 1] ?? ''}
                        onChange={(e) => setStroke(rowIndex, h, e.target.value)}
                        aria-label={`${row.label} hole ${h}`}
                        className="h-10 w-11 rounded-md border border-linen bg-cream text-center text-base tabular-nums text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-char-600 dark:bg-char-800 dark:text-chalk md:h-8 md:w-9 md:text-sm"
                      />
                    </td>
                  ))}
                  <td className="px-2 py-1 text-center text-sm font-bold tabular-nums">
                    {half ?? '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
