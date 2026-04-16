'use client';

import { useState } from 'react';
import { Player } from '@/lib/types';

const inputClass =
  'min-h-[48px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base outline-none focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 md:min-h-0 md:py-2 md:text-sm';

type PlayerFormProps = {
  player?: Player;
  onSave: (name: string, handicap: number) => void;
  onCancel: () => void;
};

const MIN_HANDICAP = 0;
const MAX_HANDICAP = 54;

export default function PlayerForm({ player, onSave, onCancel }: PlayerFormProps) {
  const [name, setName] = useState(player?.name ?? '');
  const [handicap, setHandicap] = useState(player?.handicap?.toString() ?? '0');
  const [error, setError] = useState<string | null>(null);

  const trimmedName = name.trim();
  const parsedHandicap = parseInt(handicap, 10);
  const handicapValid =
    Number.isFinite(parsedHandicap) &&
    parsedHandicap >= MIN_HANDICAP &&
    parsedHandicap <= MAX_HANDICAP;
  const canSubmit = trimmedName.length > 0 && handicapValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmedName) {
      setError('Name is required.');
      return;
    }
    if (!handicapValid) {
      setError(`Handicap must be a whole number between ${MIN_HANDICAP} and ${MAX_HANDICAP}.`);
      return;
    }
    setError(null);
    onSave(trimmedName, parsedHandicap);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Player name"
          autoComplete="name"
          autoFocus
          maxLength={80}
          required
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Handicap</label>
        <input
          type="number"
          inputMode="numeric"
          value={handicap}
          onChange={(e) => setHandicap(e.target.value)}
          className={inputClass}
          min={MIN_HANDICAP}
          max={MAX_HANDICAP}
          step={1}
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          className="min-h-[48px] flex-1 touch-manipulation rounded-lg bg-primary py-3 text-base font-medium text-white transition-colors active:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50 md:min-h-0 md:py-2 md:text-sm"
        >
          {player ? 'Update' : 'Add Player'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-[48px] flex-1 touch-manipulation rounded-lg bg-gray-100 py-3 text-base font-medium text-gray-700 transition-colors active:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:active:bg-gray-600 md:min-h-0 md:py-2 md:text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
