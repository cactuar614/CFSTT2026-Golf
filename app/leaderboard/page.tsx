import { getTripState } from '@/lib/tripState';
import { buildStrokeBoard, buildStablefordBoard } from '@/lib/scoring';
import { DAY_LABELS, GAME_LABELS, SATURDAY_CONTESTS } from '@/lib/constants';
import { Round, Player, GameType } from '@/lib/types';
import StablefordKey from '@/components/StablefordKey';

const WIN_CONDITION: Record<GameType, string> = {
  stroke: 'Lowest gross wins',
  stableford: 'Most points wins',
  scramble: 'One ball, lowest team score wins',
  'best-ball': 'Lowest team total wins',
  tbd: '',
};

/** Contests live at Covered Bridge only (Saturday's morning round). */
const CONTEST_ROUND_ID = 'round-2';

const headerCell = 'px-3 py-3 md:py-2';
const bodyCell = 'px-3 py-3 md:py-2';

function leaderRowClass(isLeader: boolean) {
  return `border-b border-linen dark:border-char-700 ${
    isLeader ? 'bg-accent/15 font-semibold dark:bg-accent/10' : 'hover:bg-parchment/60 dark:hover:bg-char-800'
  }`;
}

function RankCell({ rank, isLeader }: { rank: number; isLeader: boolean }) {
  return (
    <td className={`${bodyCell} tabular-nums text-ink-soft dark:text-chalk/60`}>
      {isLeader ? (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent font-display text-xs font-bold text-char-900">
          1
        </span>
      ) : (
        rank
      )}
    </td>
  );
}

function PlayerCell({ player }: { player: Player }) {
  return (
    <td className={`${bodyCell} font-medium`}>
      <span className="block max-w-[10rem] truncate">{player.name}</span>
    </td>
  );
}

function StrokeBoard({ players, round }: { players: Player[]; round: Round }) {
  const entries = buildStrokeBoard(players, round);
  return (
    <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1">
      <table className="w-full min-w-[280px] border-collapse text-sm">
        <thead>
          <tr className="bg-primary-dark text-[11px] uppercase tracking-wider text-accent-light">
            <th className={`${headerCell} text-left`}>#</th>
            <th className={`${headerCell} text-left`}>Player</th>
            <th className={`${headerCell} text-center`}>Gross</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const isLeader = i === 0 && entry.gross !== null;
            return (
              <tr key={entry.player.id} className={leaderRowClass(isLeader)}>
                <RankCell rank={i + 1} isLeader={isLeader} />
                <PlayerCell player={entry.player} />
                <td className={`${bodyCell} text-center text-base font-bold tabular-nums text-copper dark:text-accent md:text-sm`}>
                  {entry.gross ?? '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StablefordBoard({ players, round }: { players: Player[]; round: Round }) {
  const entries = buildStablefordBoard(players, round);
  return (
    <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1">
      <table className="w-full min-w-[280px] border-collapse text-sm">
        <thead>
          <tr className="bg-primary-dark text-[11px] uppercase tracking-wider text-accent-light">
            <th className={`${headerCell} text-left`}>#</th>
            <th className={`${headerCell} text-left`}>Player</th>
            <th className={`${headerCell} text-center`}>Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const isLeader = i === 0 && entry.points !== null;
            return (
              <tr key={entry.player.id} className={leaderRowClass(isLeader)}>
                <RankCell rank={i + 1} isLeader={isLeader} />
                <PlayerCell player={entry.player} />
                <td className={`${bodyCell} text-center text-base font-bold tabular-nums text-copper dark:text-accent md:text-sm`}>
                  {entry.points ?? '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RoundBoard({ players, round }: { players: Player[]; round: Round }) {
  switch (round.game) {
    case 'stroke':
      return <StrokeBoard players={players} round={round} />;
    case 'stableford':
      return <StablefordBoard players={players} round={round} />;
    case 'scramble':
      return (
        <TeamBoard
          players={players}
          round={round}
          emptyLabel="Teams to be drafted — scramble standings will appear here once teams are set."
        />
      );
    case 'best-ball':
      return (
        <TeamBoard
          players={players}
          round={round}
          emptyLabel="Foursomes TBD — best-ball standings will appear here once teams are set."
        />
      );
    default:
      return (
        <p className="px-4 py-8 text-center text-sm text-ink-soft dark:text-chalk/60">
          Casual round — game still to be decided with the group.
        </p>
      );
  }
}

function ContestList() {
  return (
    <div className="card divide-y divide-linen dark:divide-char-700">
      {SATURDAY_CONTESTS.map((contest) => (
        <div key={contest.label} className="flex items-center justify-between px-4 py-3 text-sm">
          <span className="eyebrow">{contest.label}</span>
          <span className={contest.winner ? 'font-semibold' : 'text-ink-soft dark:text-chalk/50'}>
            {contest.winner ?? 'TBD on the course'}
          </span>
        </div>
      ))}
    </div>
  );
}

function TeamBoard({
  players,
  round,
  emptyLabel,
}: {
  players: Player[];
  round: Round;
  emptyLabel: string;
}) {
  const teams = round.teams ?? [];
  if (teams.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-ink-soft dark:text-chalk/60">{emptyLabel}</p>
    );
  }
  const nameFor = (id: string) => players.find((p) => p.id === id)?.name ?? id;
  return (
    <ul className="divide-y divide-linen dark:divide-char-700">
      {teams.map((team) => (
        <li key={team.name} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
          <div className="min-w-0">
            <span className="block font-medium">{team.name}</span>
            <span className="block text-xs text-ink-soft dark:text-chalk/50">
              {team.playerIds.map(nameFor).join(' · ')}
            </span>
          </div>
          <span className="shrink-0 font-bold tabular-nums text-copper dark:text-accent">—</span>
        </li>
      ))}
    </ul>
  );
}

export default function BoardPage() {
  const state = getTripState();
  const players = state.players;

  // Group rounds by their schedule day, preserving order. Saturday now holds
  // two rounds (Covered Bridge + Hidden Creek = 36 holes).
  const dayIndexes = Array.from(new Set(state.rounds.map((r) => r.dayIndex)));

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="page-title">The Board</h1>
        <p className="text-sm text-ink-soft dark:text-chalk/60">
          Each day is its own game with its own winner — no cumulative standings.
        </p>
      </div>

      {dayIndexes.map((dayIndex) => {
        const rounds = state.rounds.filter((r) => r.dayIndex === dayIndex);
        return (
          <section key={dayIndex} className="space-y-4">
            <p className="eyebrow">{DAY_LABELS[dayIndex]}</p>
            {rounds.map((round) => (
              <div key={round.id} className="space-y-2">
                <div>
                  <h2 className="font-display text-xl font-bold">{round.courseName}</h2>
                  <p className="text-xs text-ink-soft dark:text-chalk/50">
                    {GAME_LABELS[round.game]} · Tee: {round.teeTime}
                    {round.tees ? ` · ${round.tees}` : ''}
                    {WIN_CONDITION[round.game] ? ` · ${WIN_CONDITION[round.game]}` : ''}
                  </p>
                </div>
                {round.game === 'stableford' ? <StablefordKey /> : null}
                <div className="card overflow-hidden">
                  <RoundBoard players={players} round={round} />
                </div>
                {round.id === CONTEST_ROUND_ID ? <ContestList /> : null}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
