'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { HoleScore, PlayerRound } from '@/lib/types';
import { DAY_LABELS } from '@/lib/constants';
import ScorecardTable from '@/components/ScorecardTable';

function ensurePlayerRound(playerId: string): PlayerRound {
  const scores: HoleScore[] = Array.from({ length: 18 }, (_, i) => ({
    hole: i + 1,
    strokes: null,
  }));
  return { playerId, scores };
}

export default function RoundScorecardPage() {
  const params = useParams();
  const roundId = params.roundId as string;
  const [state, updateState, hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-96 bg-gray-100 rounded-xl" />;
  }

  const roundIndex = state.rounds.findIndex((r) => r.id === roundId);
  if (roundIndex === -1) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Round not found.</p>
        <Link href="/scorecard" className="text-primary underline text-sm">
          Back to rounds
        </Link>
      </div>
    );
  }

  const round = state.rounds[roundIndex];

  const handleScoreChange = (playerId: string, hole: number, strokes: number | null) => {
    updateState((prev) => {
      const rounds = [...prev.rounds];
      const r = { ...rounds[roundIndex] };
      let playerRounds = [...r.playerRounds];

      let prIndex = playerRounds.findIndex((pr) => pr.playerId === playerId);
      if (prIndex === -1) {
        playerRounds.push(ensurePlayerRound(playerId));
        prIndex = playerRounds.length - 1;
      }

      const pr = { ...playerRounds[prIndex] };
      const scores = [...pr.scores];
      const scoreIdx = scores.findIndex((s) => s.hole === hole);
      if (scoreIdx !== -1) {
        scores[scoreIdx] = { hole, strokes };
      }
      pr.scores = scores;
      playerRounds[prIndex] = pr;
      r.playerRounds = playerRounds;
      rounds[roundIndex] = r;

      return { ...prev, rounds };
    });
  };

  const handleParChange = (hole: number, par: number) => {
    updateState((prev) => {
      const rounds = [...prev.rounds];
      const r = { ...rounds[roundIndex] };
      const coursePar = [...r.coursePar];
      coursePar[hole - 1] = par;
      r.coursePar = coursePar;
      rounds[roundIndex] = r;
      return { ...prev, rounds };
    });
  };

  const handleCourseNameChange = (name: string) => {
    updateState((prev) => {
      const rounds = [...prev.rounds];
      rounds[roundIndex] = { ...rounds[roundIndex], courseName: name };
      return { ...prev, rounds };
    });
  };

  const handleTeeTimeChange = (time: string) => {
    updateState((prev) => {
      const rounds = [...prev.rounds];
      rounds[roundIndex] = { ...rounds[roundIndex], teeTime: time };
      return { ...prev, rounds };
    });
  };

  // Ensure all players have a PlayerRound entry for display
  const roundWithAllPlayers = {
    ...round,
    playerRounds: state.players.map((player) => {
      const existing = round.playerRounds.find((pr) => pr.playerId === player.id);
      return existing ?? ensurePlayerRound(player.id);
    }),
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/scorecard" className="text-sm text-primary hover:underline">
            ← All Rounds
          </Link>
          <h1 className="text-xl font-bold text-primary">
            Round {roundIndex + 1}
          </h1>
          <p className="text-xs text-gray-500">{DAY_LABELS[roundIndex + 1]}</p>
        </div>
      </div>

      {state.players.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Add players on the{' '}
          <Link href="/players" className="text-primary underline">
            Players page
          </Link>{' '}
          first.
        </p>
      ) : (
        <ScorecardTable
          round={roundWithAllPlayers}
          players={state.players}
          onScoreChange={handleScoreChange}
          onParChange={handleParChange}
          onCourseNameChange={handleCourseNameChange}
          onTeeTimeChange={handleTeeTimeChange}
        />
      )}
    </div>
  );
}
