import { getTripState } from '@/lib/tripState';
import { buildNetStrokeBoard, buildStablefordBoard } from '@/lib/scoring';
import { DAY_LABELS, GAME_LABELS, SATURDAY_CONTESTS, SCRAMBLE_TEAMS } from '@/lib/constants';
import { Round, Player } from '@/lib/types';
import TierBadge, { TierLegend } from '@/components/TierBadge';

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

function PlayerCell({ player, showTier = true }: { player: Player; showTier?: boolean }) {
  return (
    <td className={`${bodyCell} font-medium`}>
      <span className="flex items-center gap-1.5">
        <span className="max-w-[8.5rem] truncate">{player.name}</span>
        {showTier ? <TierBadge tier={player.tier} /> : null}
      </span>
    </td>
  );
}

function NetStrokeBoard({ players, round }: { players: Player[]; round: Round }) {
  const entries = buildNetStrokeBoard(players, round);
  return (
    <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1">
      <table className="w-full min-w-[340px] border-collapse text-sm">
        <thead>
          <tr className="bg-primary-dark text-[11px] uppercase tracking-wider text-accent-light">
            <th className={`${headerCell} text-left`}>#</th>
            <th className={`${headerCell} text-left`}>Player</th>
            <th className={`${headerCell} text-center`}>Gross</th>
            <th className={`${headerCell} text-center`}>Strokes</th>
            <th className={`${headerCell} text-center`}>Net</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const isLeader = i === 0 && entry.net !== null;
            return (
              <tr key={entry.player.id} className={leaderRowClass(isLeader)}>
                <RankCell rank={i + 1} isLeader={isLeader} />
                <PlayerCell player={entry.player} />
                <td className={`${bodyCell} text-center tabular-nums`}>{entry.gross ?? '—'}</td>
                <td className={`${bodyCell} text-center tabular-nums text-ink-soft dark:text-chalk/60`}>
                  {entry.strokes}
                </td>
                <td className={`${bodyCell} text-center text-base font-bold tabular-nums text-copper dark:text-accent md:text-sm`}>
                  {entry.net ?? '—'}
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

function ScrambleBoard() {
  if (SCRAMBLE_TEAMS.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-ink-soft dark:text-chalk/60">
        Teams to be drafted — scramble standings will appear here once teams are set.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-linen dark:divide-char-700">
      {SCRAMBLE_TEAMS.map((team) => (
        <li key={team.name} className="flex items-center justify-between px-4 py-3 text-sm">
          <span className="font-medium">{team.name}</span>
          <span className="font-bold tabular-nums text-copper dark:text-accent">—</span>
        </li>
      ))}
    </ul>
  );
}

export default function BoardPage() {
  const state = getTripState();
  const [friday, saturday, sunday] = state.rounds;
  const players = state.players;

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="eyebrow">Three days · three games</p>
        <h1 className="page-title">The Board</h1>
        <p className="text-sm text-ink-soft dark:text-chalk/60">
          Each day is its own game with its own winner — no cumulative standings.
        </p>
      </div>

      {/* Friday — Net Stroke Play */}
      <section className="space-y-2">
        <div>
          <p className="eyebrow">{DAY_LABELS[friday.dayIndex]}</p>
          <h2 className="font-display text-xl font-bold">{GAME_LABELS[friday.game]}</h2>
          <p className="text-xs text-ink-soft dark:text-chalk/50">
            {friday.courseName} · Tee: {friday.teeTime} · Lowest net wins
          </p>
        </div>
        <div className="card overflow-hidden">
          <NetStrokeBoard players={players} round={friday} />
        </div>
        <TierLegend />
      </section>

      {/* Saturday — Stableford + contests */}
      <section className="space-y-2">
        <div>
          <p className="eyebrow">{DAY_LABELS[saturday.dayIndex]}</p>
          <h2 className="font-display text-xl font-bold">{GAME_LABELS[saturday.game]}</h2>
          <p className="text-xs text-ink-soft dark:text-chalk/50">
            {saturday.courseName} · Tee: {saturday.teeTime} · Most points wins
          </p>
        </div>
        <div className="card overflow-hidden">
          <StablefordBoard players={players} round={saturday} />
        </div>
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
        <p className="text-xs text-ink-soft/80 dark:text-chalk/40">
          Points: Eagle 4 · Birdie 3 · Par 2 · Bogey 1 · Net vs gross TBD
        </p>
      </section>

      {/* Sunday — Team Scramble */}
      <section className="space-y-2">
        <div>
          <p className="eyebrow">{DAY_LABELS[sunday.dayIndex]}</p>
          <h2 className="font-display text-xl font-bold">{GAME_LABELS[sunday.game]}</h2>
          <p className="text-xs text-ink-soft dark:text-chalk/50">
            {sunday.courseName} · Tee: {sunday.teeTime} · One ball, lowest team score wins
          </p>
        </div>
        <div className="card overflow-hidden">
          <ScrambleBoard />
        </div>
      </section>
    </div>
  );
}
