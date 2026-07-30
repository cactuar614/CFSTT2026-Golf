'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTripState } from '@/lib/tripState';
import { HoleScore, Player, PlayerRound } from '@/lib/types';
import { DAY_LABELS, GAME_LABELS } from '@/lib/constants';
import { formatTripDayDate } from '@/lib/formatTrip';
import ScorecardTable from '@/components/ScorecardTable';
import StablefordKey from '@/components/StablefordKey';

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
  const state = getTripState();

  const roundIndex = state.rounds.findIndex((r) => r.id === roundId);
  if (roundIndex === -1) {
    return (
      <div className="py-8 text-center">
        <p className="text-ink-soft dark:text-chalk/60">Round not found.</p>
        <Link href="/scorecard" className="text-sm font-semibold text-copper underline dark:text-accent">
          Back to rounds
        </Link>
      </div>
    );
  }

  const round = state.rounds[roundIndex];
  const scheduleDay = state.schedule[round.dayIndex];
  const teams = round.teams ?? [];
  const nameFor = (id: string) => state.players.find((p) => p.id === id)?.name ?? id;

  // A scramble is one ball per team. Render each team as a "player" row using
  // the recorded team card, so the classic scorecard notation/totals apply.
  const teamScores = round.teamScores ?? [];
  const teamsHaveScores = teamScores.some((ts) => ts.scores.some((s) => s.strokes !== null));
  const teamPseudoPlayers: Player[] = teams.map((team) => ({
    id: team.name,
    name: team.name,
    tier: 'A',
  }));
  const teamRound = {
    ...round,
    playerRounds: teamScores.map((ts) => ({ playerId: ts.teamName, scores: ts.scores })),
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
            className="-ml-2 inline-flex min-h-[44px] items-center rounded-lg px-2 py-2 text-base font-semibold text-copper touch-manipulation active:bg-accent/10 dark:text-accent md:text-sm"
          >
            ← All Rounds
          </Link>
          <p className="eyebrow">{DAY_LABELS[round.dayIndex]}</p>
          <h1 className="page-title">Round {roundIndex + 1}</h1>
        </div>

        {scheduleDay ? (
          <div className="card p-4">
            <p className="text-sm text-ink-soft dark:text-chalk/70">{formatTripDayDate(scheduleDay.date)}</p>
            {scheduleDay.city ? (
              <p className="mt-1 text-sm font-semibold text-primary dark:text-accent">{scheduleDay.city}</p>
            ) : null}
            <p className="mt-1 font-display font-bold">{scheduleDay.label}</p>
            <p className="mt-1 text-sm text-ink-soft dark:text-chalk/60">{scheduleDay.description}</p>
            <p className="mt-2 text-sm">
              <span className="font-semibold">Course:</span>{' '}
              {round.courseName === 'TBD' ? 'TBD' : round.courseName}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Tee time:</span> {round.teeTime}
            </p>
            {round.tees ? (
              <p className="text-sm">
                <span className="font-semibold">Tees:</span> {round.tees}
              </p>
            ) : null}
            <p className="text-sm">
              <span className="font-semibold">Game:</span> {GAME_LABELS[round.game]}
            </p>
          </div>
        ) : null}

        {round.game === 'stableford' ? <StablefordKey /> : null}
      </div>

      {round.game === 'scramble' ? (
        teams.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="font-display text-lg font-bold">Team Scramble</p>
            <p className="mt-1 text-sm text-ink-soft dark:text-chalk/60">
              No individual cards — teams are still to be drafted. Team scorecards will appear here
              once they're set.
            </p>
          </div>
        ) : (
          <>
            <div className="card p-4">
              <p className="font-display text-lg font-bold">Teams</p>
              <p className="mt-1 text-sm text-ink-soft dark:text-chalk/60">
                Scramble — one ball per team. Lowest team score wins.
              </p>
              <ul className="mt-3 divide-y divide-linen dark:divide-char-700">
                {teams.map((team) => (
                  <li key={team.name} className="py-2.5">
                    <span className="font-medium">{team.name}</span>
                    <span className="block text-xs text-ink-soft dark:text-chalk/50">
                      {team.playerIds.map(nameFor).join(' · ')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {teamsHaveScores ? (
              <ScorecardTable round={teamRound} players={teamPseudoPlayers} />
            ) : null}
          </>
        )
      ) : round.game === 'tbd' ? (
        <>
          <div className="card p-6 text-center">
            <p className="font-display text-lg font-bold">Casual Round</p>
            <p className="mt-1 text-sm text-ink-soft dark:text-chalk/60">
              Game still to be decided with the group — we'll sort out the format on the day.
            </p>
          </div>
          {round.playerRounds.length > 0 ? (
            <ScorecardTable round={roundWithAllPlayers} players={state.players} />
          ) : null}
        </>
      ) : round.game === 'best-ball' ? (
        <>
          <div className="card p-4">
            <p className="font-display text-lg font-bold">3-2-1 Best Ball</p>
            <p className="mt-1 text-sm text-ink-soft dark:text-chalk/60">
              Team format: on each hole the foursome counts its best 1, 2, or 3 balls toward the team
              score — six holes at each count, declared before the next tee. Everyone plays their own
              ball, so individual scores are tracked below.
            </p>
            {teams.length > 0 ? (
              <ul className="mt-3 divide-y divide-linen dark:divide-char-700">
                {teams.map((team) => (
                  <li key={team.name} className="py-2.5">
                    <span className="font-medium">{team.name}</span>
                    <span className="block text-xs text-ink-soft dark:text-chalk/50">
                      {team.playerIds.map(nameFor).join(' · ')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <ScorecardTable round={roundWithAllPlayers} players={state.players} />
        </>
      ) : (
        <ScorecardTable round={roundWithAllPlayers} players={state.players} />
      )}
    </div>
  );
}
