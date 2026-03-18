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
  if (diff <= -1) return 'bg-red-100 text-red-700'; // birdie or better
  if (diff === 0) return 'bg-green-100 text-green-700'; // par
  if (diff === 1) return 'bg-blue-50 text-blue-600'; // bogey
  return 'bg-blue-100 text-blue-800'; // double+
}

export default function ScoreInput({ value, par, onChange }: ScoreInputProps) {
  return (
    <input
      type="number"
      value={value ?? ''}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v === '' ? null : parseInt(v));
      }}
      className={`w-10 h-8 text-center text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none ${getCellColor(value, par)}`}
      min="1"
      max="15"
    />
  );
}
