'use client';

import { useMemo } from 'react';
import { Player, Round } from '@/lib/types';
import { sumPar } from '@/lib/scoring';
import ScoreInput from './ScoreInput';

type ScorecardTableProps = {
  round: Round;
  players: Player[];
  onScoreChange: (playerId: string, hole: number, strokes: number | null) => void;
  onParChange: (hole: number, par: number) => void;
  onCourseNameChange: (name: string) => void;
  onTeeTimeChange: (time: string) => void;
};

export default function ScorecardTable({
  round,
  players,
  onScoreChange,
  onParChange,
  onCourseNameChange,
  onTeeTimeChange,
}: ScorecardTableProps) {
  const frontHoles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const backHoles = [10, 11, 12, 13, 14, 15, 16, 17, 18];

  // Map playerId -> strokes[holeIndex] for O(1) lookups while rendering the table.
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
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse min-w-[500px]">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-1 px-2 text-left font-medium w-20">Hole</th>
            {holes.map((h) => (
              <th key={h} className="py-1 px-1 text-center font-medium w-10">
                {h}
              </th>
            ))}
            <th className="py-1 px-2 text-center font-bold w-12">{label}</th>
          </tr>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <td className="py-1 px-2 font-medium text-gray-600 dark:text-gray-300">Par</td>
            {holes.map((h) => (
              <td key={h} className="py-1 px-1 text-center">
                <input
                  type="number"
                  value={round.coursePar[h - 1]}
                  onChange={(e) => onParChange(h, parseInt(e.target.value) || 3)}
                  className="w-10 h-6 text-center text-xs border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-600 dark:text-gray-100 focus:ring-1 focus:ring-primary outline-none"
                  min="3"
                  max="5"
                />
              </td>
            ))}
            <td className="py-1 px-2 text-center font-bold text-gray-700 dark:text-gray-300">
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
              <tr key={player.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="py-1 px-2 font-medium text-gray-800 dark:text-gray-200 truncate max-w-[80px]">
                  {player.name}
                </td>
                {holes.map((h) => (
                  <td key={h} className="py-1 px-1 text-center">
                    <ScoreInput
                      value={strokes[h - 1]}
                      par={round.coursePar[h - 1]}
                      onChange={(v) => onScoreChange(player.id, h, v)}
                    />
                  </td>
                ))}
                <td className="py-1 px-2 text-center font-bold text-gray-800 dark:text-gray-200">
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
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="text"
          value={round.courseName}
          onChange={(e) => onCourseNameChange(e.target.value)}
          className="text-lg font-bold bg-transparent border-b-2 border-dashed border-gray-300 dark:border-gray-600 focus:border-primary outline-none"
          placeholder="Course Name"
        />
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Tee:</span>
          <input
            type="text"
            value={round.teeTime}
            onChange={(e) => onTeeTimeChange(e.target.value)}
            className="bg-transparent border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary outline-none w-24"
            placeholder="Tee time"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Front 9</h3>
        {renderHalf(frontHoles, 'OUT')}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Back 9</h3>
        {renderHalf(backHoles, 'IN')}
      </div>

      {/* Totals */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-accent text-white">
              <th className="py-2 px-2 text-left font-medium w-20">Totals</th>
              <th className="py-2 px-2 text-center">OUT</th>
              <th className="py-2 px-2 text-center">IN</th>
              <th className="py-2 px-2 text-center">GROSS</th>
              <th className="py-2 px-2 text-center">HCP</th>
              <th className="py-2 px-2 text-center">NET</th>
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
                  <td className="py-2 px-2 font-medium">{player.name}</td>
                  <td className="py-2 px-2 text-center">{f ?? '—'}</td>
                  <td className="py-2 px-2 text-center">{b ?? '—'}</td>
                  <td className="py-2 px-2 text-center font-bold">{gross ?? '—'}</td>
                  <td className="py-2 px-2 text-center text-gray-500 dark:text-gray-400">{player.handicap}</td>
                  <td className="py-2 px-2 text-center font-bold text-primary">{net ?? '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
