'use client';

import { scoreRelativeToPar } from '@/lib/scoring';

type ScoreInputProps = {
  value: number | null;
  par: number;
  onChange: (value: number | null) => void;
};

function getCellColor(strokes: number | null, par: number): string {
  if (strokes === null) return '';
  const diff = scoreRelativeToPar(strokes, par);
  if (diff === null) return '';
  if (diff <= -1) return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'; // birdie or better
  if (diff === 0) return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'; // par
  if (diff === 1) return 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'; // bogey
  return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'; // double+
}

const MIN_STROKES = 1;
const MAX_STROKES = 15;

export default function ScoreInput({ value, par, onChange }: ScoreInputProps) {
  return (
    <input
      type="number"
      inputMode="numeric"
      enterKeyHint="done"
      value={value ?? ''}
      onChange={(e) => {
        const raw = e.target.value;
        if (raw === '') {
          onChange(null);
          return;
        }
        const parsed = parseInt(raw, 10);
        if (!Number.isFinite(parsed)) {
          onChange(null);
          return;
        }
        onChange(Math.min(MAX_STROKES, Math.max(MIN_STROKES, parsed)));
      }}
      className={`h-11 w-11 min-h-[44px] min-w-[44px] rounded-md border border-gray-300 text-center text-base tabular-nums outline-none focus:border-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 md:h-8 md:w-10 md:min-h-0 md:min-w-0 md:text-sm ${getCellColor(value, par)}`}
      min={MIN_STROKES}
      max={MAX_STROKES}
      aria-label={`Strokes, par ${par}`}
    />
  );
}
