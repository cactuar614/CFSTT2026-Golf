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

export default function PlayerForm({ player, onSave, onCancel }: PlayerFormProps) {
  const [name, setName] = useState(player?.name ?? '');
  const [handicap, setHandicap] = useState(player?.handicap?.toString() ?? '0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), parseInt(handicap, 10) || 0);
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
          min="0"
          max="54"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="min-h-[48px] flex-1 touch-manipulation rounded-lg bg-primary py-3 text-base font-medium text-white transition-colors active:bg-primary-light md:min-h-0 md:py-2 md:text-sm"
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
