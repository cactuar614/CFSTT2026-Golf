import { redirect } from 'next/navigation';
import { auth, authEnabled } from '@/lib/auth';
import { getTripState } from '@/lib/tripState';
import { GAME_LABELS } from '@/lib/constants';
import AdminScoreEditor, { AdminRound } from './AdminScoreEditor';

// Always evaluated per-request so the admin gate runs on the live session.
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Admin requires sign-in. With auth off there's no session/identity, so the
  // page can't tell who you are — send everyone home.
  if (!authEnabled) redirect('/');

  const session = await auth();
  if (!session?.user?.isAdmin) redirect('/');

  const state = getTripState();

  const rounds: AdminRound[] = state.rounds.map((round) => {
    const isScramble = round.game === 'scramble';
    return {
      id: round.id,
      courseName: round.courseName,
      teeTime: round.teeTime,
      gameLabel: GAME_LABELS[round.game],
      coursePar: round.coursePar,
      mode: isScramble ? 'teams' : 'players',
      // Rows are the teams (scramble) or every golfer (everything else).
      rows: isScramble
        ? (round.teams ?? []).map((team) => {
            const ts = round.teamScores?.find((t) => t.teamName === team.name);
            return {
              key: team.name,
              label: team.name,
              strokes: toStrokeArray(ts?.scores),
            };
          })
        : state.players.map((player) => {
            const pr = round.playerRounds.find((r) => r.playerId === player.id);
            return {
              key: player.id,
              label: player.name,
              strokes: toStrokeArray(pr?.scores),
            };
          }),
    };
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="eyebrow">Admin</p>
        <h1 className="page-title">Edit scores</h1>
        <p className="text-sm text-ink-soft dark:text-chalk/60">
          Signed in as {session.user.name}. Enter scores hole-by-hole, then save a round.
          Each save commits to the site and redeploys — scores go live in about a minute.
        </p>
      </div>
      <AdminScoreEditor rounds={rounds} />
    </div>
  );
}

/** 18-length array of stroke numbers (0 → empty), matching a hole card. */
function toStrokeArray(scores?: { hole: number; strokes: number | null }[]): (number | null)[] {
  const arr: (number | null)[] = Array.from({ length: 18 }, () => null);
  if (scores) {
    for (const s of scores) {
      if (s.hole >= 1 && s.hole <= 18) arr[s.hole - 1] = s.strokes;
    }
  }
  return arr;
}
