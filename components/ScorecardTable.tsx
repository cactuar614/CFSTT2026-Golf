'use client';

import { useMemo } from 'react';
import { Player, Round } from '@/lib/types';
import { sumPar, scoreRelativeToPar } from '@/lib/scoring';
import ScoreInput from './ScoreInput';

type ScorecardTableProps = {
  round: Round;
  players: Player[];
  readOnly?: boolean;
  onScoreChange: (playerId: string, hole: number, strokes: number | null) => void;
  onParChange: (hole: number, par: number) => void;
  onCourseNameChange: (name: string) => void;
  onTeeTimeChange: (time: string) => void;
};

function cellColorClass(strokes: number | null, par: number): string {
  if (strokes === null) return '';
  const diff = scoreRelativeToPar(strokes, par);
  if (diff === null) return '';
  if (diff <= -1) return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
  if (diff === 0) return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400';
  if (diff === 1) return 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400';
  return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
}

export default function ScorecardTable({
  round,
  players,
  readOnly = false,
  onScoreChange,
  onParChange,
  onCourseNameChange,
  onTeeTimeChange,
}: ScorecardTableProps) {
  const frontHoles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const backHoles = [10, 11, 12, 13, 14, 15, 16, 17, 18];

  const emptyStrokes = useMemo(() => Array.from({ length: 18 }, () => null as number | null), []);
  const strokesByPlayerId = useMemo(() => {
    const map: Record<string, Array<number | null>> = {};
    for (const pr of round.playerRounds) {
      const strokes = Array.from({ length: 18 }, () => null as number | null);
      for (const hs of pr.scores) {
        if (hs.hole >= 1 && hs.hole <= 18) strokes[hs.hole - 1] = hs.strokes;
      }
      map[pr.playerId] = strokes;
    }
    return map;
  }, [round.playerRounds]);

  const sumStrokesForRange = (strokes: Array<number | null>, fromHole: number, toHole: number): number | null => {
    let sum = 0;
    let any = false;
    for (let hole = fromHole; hole <= toHole; hole++) {
      const v = strokes[hole - 1];
      if (v !== null) {
        sum += v;
        any = true;
      }
    }
    return any ? sum : null;
  };

  const renderHalf = (holes: number[], label: string) => (
    <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1">
      <table className="w-full min-w-[520px] border-collapse text-sm md:text-xs">
        <thead>
          <tr className="bg-primary text-white">
            <th className="w-24 min-w-[5.5rem] px-2 py-2 text-left text-sm font-medium md:py-1 md:text-xs">
              Hole
            </th>
            {holes.map((h) => (
              <th key={h} className="w-11 min-w-[2.75rem] px-0.5 py-2 text-center text-sm font-medium md:w-10 md:py-1 md:text-xs">
                {h}
              </th>
            ))}
            <th className="w-14 min-w-[3rem] px-2 py-2 text-center text-sm font-bold md:py-1 md:text-xs">{label}</th>
          </tr>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <td className="px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 md:py-1 md:text-xs">Par</td>
            {holes.map((h) => (
              <td key={h} className="px-0.5 py-1.5 text-center md:py-1">
                {readOnly ? (
                  <span className="inline-block min-w-[2.75rem] text-center text-sm tabular-nums md:text-xs">
                    {round.coursePar[h - 1]}
                  </span>
                ) : (
                  <input
                    type="number"
                    inputMode="numeric"
                    value={round.coursePar[h - 1]}
                    onChange={(e) => onParChange(h, parseInt(e.target.value, 10) || 3)}
                    className="h-10 w-11 min-h-[44px] rounded border border-gray-200 bg-white text-center text-base outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100 md:h-6 md:min-h-0 md:w-10 md:text-xs"
                    min="3"
                    max="5"
                    aria-label={`Par hole ${h}`}
                  />
                )}
              </td>
            ))}
            <td className="px-2 py-2 text-center text-sm font-bold text-gray-700 dark:text-gray-300 md:py-1 md:text-xs">
              {sumPar(round.coursePar, holes[0], holes[holes.length - 1])}
            </td>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            const strokes = strokesByPlayerId[player.id] ?? emptyStrokes;
            const half =
              holes[0] === 1
                ? sumStrokesForRange(strokes, 1, 9)
                : sumStrokesForRange(strokes, 10, 18);
            return (
              <tr
                key={player.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="max-w-[7rem] truncate px-2 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 md:py-1 md:text-xs">
                  {player.name}
                </td>
                {holes.map((h) => {
                  const v = strokes[h - 1];
                  const par = round.coursePar[h - 1];
                  return (
                    <td key={h} className="px-0.5 py-1.5 text-center md:py-1">
                      {readOnly ? (
                        <span
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-base tabular-nums dark:border-gray-600 md:h-8 md:w-10 md:text-sm ${cellColorClass(v, par)}`}
                        >
                          {v ?? '—'}
                        </span>
                      ) : (
                        <ScoreInput
                          value={v}
                          par={par}
                          onChange={(nv) => onScoreChange(player.id, h, nv)}
                        />
                      )}
                    </td>
                  );
                })}
                <td className="px-2 py-2 text-center text-sm font-bold text-gray-800 dark:text-gray-200 md:py-1 md:text-xs">
                  {half ?? '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
        <div className="min-w-0 flex-1">
          <span className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Course</span>
          {readOnly ? (
            <p className="min-h-[48px] rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-base font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-100 md:min-h-0 md:border-0 md:bg-transparent md:px-0 md:py-1 md:text-lg">
              {round.courseName === 'TBD' ? 'TBD' : round.courseName}
            </p>
          ) : (
            <label className="block">
              <input
                type="text"
                value={round.courseName}
                onChange={(e) => onCourseNameChange(e.target.value)}
                className="min-h-[48px] w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base font-semibold text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 md:min-h-0 md:border-0 md:border-b-2 md:border-dashed md:bg-transparent md:px-0 md:py-1 md:text-lg"
                placeholder="Course name"
                autoComplete="off"
              />
            </label>
          )}
        </div>
        <div className="w-full sm:w-auto sm:min-w-[11rem]">
          <span className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Tee time</span>
          {readOnly ? (
            <p className="min-h-[48px] rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-base text-gray-800 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-100 md:min-h-0 md:border-0 md:bg-transparent md:px-0 md:py-1 md:text-sm">
              {round.teeTime}
            </p>
          ) : (
            <label className="block">
              <input
                type="text"
                value={round.teeTime}
                onChange={(e) => onTeeTimeChange(e.target.value)}
                className="min-h-[48px] w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 md:min-h-0 md:border-0 md:border-b md:border-dashed md:bg-transparent md:px-0 md:py-1 md:text-sm"
                placeholder="e.g. 10:30 AM"
                autoComplete="off"
              />
            </label>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-1 text-sm font-semibold text-gray-500 dark:text-gray-400">Front 9</h3>
        {renderHalf(frontHoles, 'OUT')}
      </div>

      <div>
        <h3 className="mb-1 text-sm font-semibold text-gray-500 dark:text-gray-400">Back 9</h3>
        {renderHalf(backHoles, 'IN')}
      </div>

      <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1">
        <table className="w-full min-w-[320px] border-collapse text-sm md:text-xs">
          <thead>
            <tr className="bg-accent text-white">
              <th className="w-24 px-2 py-3 text-left text-sm font-medium md:py-2 md:text-xs">Totals</th>
              <th className="px-2 py-3 text-center text-sm md:py-2 md:text-xs">OUT</th>
              <th className="px-2 py-3 text-center text-sm md:py-2 md:text-xs">IN</th>
              <th className="px-2 py-3 text-center text-sm md:py-2 md:text-xs">GROSS</th>
              <th className="px-2 py-3 text-center text-sm md:py-2 md:text-xs">HCP</th>
              <th className="px-2 py-3 text-center text-sm md:py-2 md:text-xs">NET</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const strokes = strokesByPlayerId[player.id] ?? emptyStrokes;
              const f = sumStrokesForRange(strokes, 1, 9);
              const b = sumStrokesForRange(strokes, 10, 18);
              const gross = f === null && b === null ? null : (f ?? 0) + (b ?? 0);
              const net = gross === null ? null : gross - player.handicap;
              return (
                <tr key={player.id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="max-w-[6rem] truncate px-2 py-3 text-sm font-medium md:py-2 md:text-xs">{player.name}</td>
                  <td className="px-2 py-3 text-center text-sm tabular-nums md:py-2 md:text-xs">{f ?? '—'}</td>
                  <td className="px-2 py-3 text-center text-sm tabular-nums md:py-2 md:text-xs">{b ?? '—'}</td>
                  <td className="px-2 py-3 text-center text-sm font-bold tabular-nums md:py-2 md:text-xs">{gross ?? '—'}</td>
                  <td className="px-2 py-3 text-center text-sm text-gray-500 tabular-nums dark:text-gray-400 md:py-2 md:text-xs">
                    {player.handicap}
                  </td>
                  <td className="px-2 py-3 text-center text-sm font-bold tabular-nums text-primary md:py-2 md:text-xs">
                    {net ?? '—'}
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
