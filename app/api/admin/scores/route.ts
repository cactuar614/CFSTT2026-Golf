import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { DEFAULT_ROUNDS } from '@/lib/constants';

// Needs Node (Buffer / base64) and must run per-request.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const FILE_PATH = 'data/scores.json';
const REPO = process.env.ADMIN_GH_REPO || 'cactuar614/cfstt2026-golf';
const BRANCH = process.env.ADMIN_GH_BRANCH || 'main';

type IncomingRow = { key: string; strokes: (number | null)[] };
type Payload = { roundId: string; mode: 'players' | 'teams'; rows: IncomingRow[] };
type RoundScores = { players?: Record<string, (number | null)[]>; teams?: Record<string, (number | null)[]> };

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'cfstt-admin',
  };
}

/** Coerce a submitted row into a clean 18-length array of ints (1–20) or null. */
function cleanStrokes(strokes: (number | null)[]): (number | null)[] {
  return Array.from({ length: 18 }, (_, i) => {
    const v = strokes?.[i];
    if (typeof v !== 'number' || !Number.isFinite(v)) return null;
    const n = Math.round(v);
    return n >= 1 && n <= 20 ? n : null;
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const token = process.env.ADMIN_GH_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'Score saving is not configured (missing ADMIN_GH_TOKEN).' },
      { status: 500 }
    );
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const round = DEFAULT_ROUNDS.find((r) => r.id === payload.roundId);
  if (!round) {
    return NextResponse.json({ error: 'Unknown round.' }, { status: 400 });
  }
  const expectedMode = round.game === 'scramble' ? 'teams' : 'players';
  if (payload.mode !== expectedMode) {
    return NextResponse.json({ error: 'Wrong score mode for this round.' }, { status: 400 });
  }
  if (!Array.isArray(payload.rows)) {
    return NextResponse.json({ error: 'Missing rows.' }, { status: 400 });
  }

  // Build this round's entry, keeping only rows that actually carry a score.
  const entry: Record<string, (number | null)[]> = {};
  for (const row of payload.rows) {
    if (!row || typeof row.key !== 'string') continue;
    const cleaned = cleanStrokes(row.strokes);
    if (cleaned.some((v) => v !== null)) entry[row.key] = cleaned;
  }
  const roundScores: RoundScores =
    payload.mode === 'teams' ? { teams: entry } : { players: entry };

  try {
    await commitRoundScores(token, payload.roundId, roundScores);
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Could not save to GitHub: ${detail}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Read data/scores.json from the repo, replace the one round's scores, and
 * commit it back. Retries once if the file SHA went stale between read & write.
 */
async function commitRoundScores(token: string, roundId: string, roundScores: RoundScores) {
  const url = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

  const attempt = async (): Promise<Response> => {
    // Read current file (may not exist yet).
    const getRes = await fetch(`${url}?ref=${encodeURIComponent(BRANCH)}`, {
      headers: ghHeaders(token),
      cache: 'no-store',
    });

    let sha: string | undefined;
    let data: Record<string, RoundScores> = {};
    if (getRes.status === 200) {
      const json = (await getRes.json()) as { sha: string; content: string };
      sha = json.sha;
      const decoded = Buffer.from(json.content, 'base64').toString('utf8').trim();
      if (decoded) {
        try {
          data = JSON.parse(decoded) as Record<string, RoundScores>;
        } catch {
          data = {};
        }
      }
    } else if (getRes.status !== 404) {
      throw new Error(`read ${getRes.status}`);
    }

    data[roundId] = roundScores;
    const nextContent = Buffer.from(`${JSON.stringify(data, null, 2)}\n`, 'utf8').toString('base64');

    return fetch(url, {
      method: 'PUT',
      headers: { ...ghHeaders(token), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `admin: update scores for ${roundId}`,
        content: nextContent,
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });
  };

  let putRes = await attempt();
  if (putRes.status === 409 || putRes.status === 422) {
    putRes = await attempt(); // stale SHA — re-read and retry once
  }
  if (!putRes.ok) {
    const body = await putRes.text().catch(() => '');
    throw new Error(`write ${putRes.status} ${body.slice(0, 200)}`);
  }
}
