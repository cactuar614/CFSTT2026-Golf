'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useAuth } from '@/lib/AuthContext';
import { Player } from '@/lib/types';
import PlayerForm from '@/components/PlayerForm';

export default function PlayersPage() {
  const [state, updateState, hydrated] = useLocalStorage();
  const { user } = useAuth();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  if (!hydrated) {
    return <div className="animate-pulse h-96 bg-gray-100 dark:bg-gray-800 rounded-xl" />;
  }

  const myClaimedPlayer = user
    ? state.players.find((p) => p.firebaseUid === user.uid)
    : null;

  const addPlayer = (name: string, handicap: number) => {
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name,
      handicap,
    };
    updateState((prev) => ({
      ...prev,
      players: [...prev.players, newPlayer],
    }));
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
    updateState((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== id),
    }));
  };

  const claimPlayer = (playerId: string) => {
    if (!user) return;
    updateState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId ? { ...p, firebaseUid: user.uid } : p
      ),
    }));
  };

  const unclaimPlayer = (playerId: string) => {
    updateState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId ? { ...p, firebaseUid: undefined } : p
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Players</h1>
        <button
          onClick={() => {
            setShowAdd(true);
            setEditingId(null);
          }}
          className="bg-primary text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors"
        >
          + Add Player
        </button>
      </div>

      {showAdd && (
        <PlayerForm onSave={addPlayer} onCancel={() => setShowAdd(false)} />
      )}

      {state.players.length === 0 && !showAdd ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No players yet. Add up to 8 players to get started.
        </p>
      ) : (
        <div className="space-y-2">
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
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{player.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">HCP: {player.handicap}</span>
                  {player.firebaseUid === user?.uid && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      You
                    </span>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  {user && !myClaimedPlayer && !player.firebaseUid && (
                    <button
                      onClick={() => claimPlayer(player.id)}
                      className="text-sm text-accent hover:text-accent/80 font-medium"
                    >
                      Claim
                    </button>
                  )}
                  {player.firebaseUid === user?.uid && (
                    <button
                      onClick={() => unclaimPlayer(player.id)}
                      className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-medium"
                    >
                      Unclaim
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingId(player.id);
                      setShowAdd(false);
                    }}
                    className="text-sm text-primary hover:text-primary-light font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
