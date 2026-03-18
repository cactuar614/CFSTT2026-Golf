'use client';

import { useState } from 'react';
import { Player } from '@/lib/types';

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
    onSave(name.trim(), parseInt(handicap) || 0);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 dark:text-gray-100"
          placeholder="Player name"
          autoFocus
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Handicap</label>
        <input
          type="number"
          value={handicap}
          onChange={(e) => setHandicap(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 dark:text-gray-100"
          min="0"
          max="54"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-primary text-white rounded-lg py-2 text-sm font-medium hover:bg-primary-light transition-colors"
        >
          {player ? 'Update' : 'Add Player'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
