'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { HoleScore, PlayerRound } from '@/lib/types';
import { DAY_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';
import ScorecardTable from '@/components/ScorecardTable';

function ensurePlayerRound(playerId: string): PlayerRound {
  const scores: HoleScore[] = Array.from({ length: 18 }, (_, i) => ({
    hole: i + 1,
    strokes: null,
  }));
  return { playerId, scores };
}

export default function RoundScorecardClient() {
  const params = useParams();
  const roundId = params.roundId as string;
  const [state, updateState, hydrated] = useLocalStorage();

  if (!hydrated) {
    return <div className="animate-pulse h-96 bg-gray-100 dark:bg-gray-800 rounded-xl" />;
  }

  const roundIndex = state.rounds.findIndex((r) => r.id === roundId);
  if (roundIndex === -1) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">Round not found.</p>
        <Link href="/scorecard" className="text-primary underline text-sm">
          Back to rounds
        </Link>
      </div>
    );
  }

  const round = state.rounds[roundIndex];
  const scheduleDay = state.schedule[round.dayIndex];

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

  const roundWithAllPlayers = {
    ...round,
    playerRounds: state.players.map((player) => {
      const existing = round.playerRounds.find((pr) => pr.playerId === player.id);
      return existing ?? ensurePlayerRound(player.id);
    }),
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <Link
            href="/scorecard"
            className="-ml-2 inline-flex min-h-[44px] items-center rounded-lg px-2 py-2 text-base text-primary touch-manipulation active:bg-primary/10 md:text-sm"
          >
            ← All Rounds
          </Link>
          <h1 className="text-xl font-bold text-primary">Round {roundIndex + 1}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{DAY_LABELS[round.dayIndex]}</p>
        </div>

        {scheduleDay ? (
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-300">{formatTripDayDate(scheduleDay.date)}</p>
            {scheduleDay.city ? (
              <p className="mt-1 text-sm font-semibold text-primary">{scheduleDay.city}</p>
            ) : null}
            <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">{scheduleDay.label}</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{scheduleDay.description}</p>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Course:</span>{' '}
              {round.courseName === 'TBD' ? 'TBD' : round.courseName}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Tee time:</span> {round.teeTime}
            </p>
          </div>
        ) : null}
      </div>

      {state.players.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          Add players on the{' '}
          <Link
            href="/players"
            className="inline-flex min-h-[44px] items-center text-primary underline touch-manipulation"
          >
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
