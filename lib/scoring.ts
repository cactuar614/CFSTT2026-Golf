import { HoleScore, Round, Player, Tier } from './types';
import { TIER_STROKES } from './constants';

export function sumStrokes(scores: HoleScore[], from: number, to: number): number | null {
  const slice = scores.filter((s) => s.hole >= from && s.hole <= to);
  if (slice.length === 0) return null;
  const filled = slice.filter((s) => s.strokes !== null);
  if (filled.length === 0) return null;
  return filled.reduce((sum, s) => sum + (s.strokes ?? 0), 0);
}

export function frontNine(scores: HoleScore[]): number | null {
  return sumStrokes(scores, 1, 9);
}

export function backNine(scores: HoleScore[]): number | null {
  return sumStrokes(scores, 10, 18);
}

export function grossTotal(scores: HoleScore[]): number | null {
  const f = frontNine(scores);
  const b = backNine(scores);
  if (f === null && b === null) return null;
  return (f ?? 0) + (b ?? 0);
}

/** Per-round stroke allowance for a tier. Net = Gross − strokes. */
export function strokesForTier(tier: Tier): number {
  return TIER_STROKES[tier];
}

export function netTotal(scores: HoleScore[], tier: Tier): number | null {
  const gross = grossTotal(scores);
  if (gross === null) return null;
  return gross - strokesForTier(tier);
}

export function sumPar(pars: number[], from: number, to: number): number {
  return pars.slice(from - 1, to).reduce((sum, p) => sum + p, 0);
}

export function scoreRelativeToPar(strokes: number | null, par: number): number | null {
  if (strokes === null) return null;
  return strokes - par;
}

/**
 * Standard Stableford points for one hole (gross; net vs gross still TBD):
 * albatross 5 · eagle 4 · birdie 3 · par 2 · bogey 1 · worse 0.
 */
export function stablefordPoints(strokes: number | null, par: number): number | null {
  if (strokes === null) return null;
  const diff = strokes - par;
  if (diff <= -3) return 5;
  if (diff === -2) return 4;
  if (diff === -1) return 3;
  if (diff === 0) return 2;
  if (diff === 1) return 1;
  return 0;
}

export function stablefordTotal(scores: HoleScore[], pars: number[]): number | null {
  let total = 0;
  let any = false;
  for (const s of scores) {
    const points = stablefordPoints(s.strokes, pars[s.hole - 1]);
    if (points !== null) {
      total += points;
      any = true;
    }
  }
  return any ? total : null;
}

export type NetStrokeEntry = {
  player: Player;
  gross: number | null;
  strokes: number;
  net: number | null;
};

/** Friday board: individual net stroke play, lowest net wins. */
export function buildNetStrokeBoard(players: Player[], round: Round): NetStrokeEntry[] {
  return players
    .map((player) => {
      const pr = round.playerRounds.find((r) => r.playerId === player.id);
      const gross = pr ? grossTotal(pr.scores) : null;
      const strokes = strokesForTier(player.tier);
      return { player, gross, strokes, net: gross === null ? null : gross - strokes };
    })
    .sort((a, b) => {
      if (a.net === null && b.net === null) return 0;
      if (a.net === null) return 1;
      if (b.net === null) return -1;
      return a.net - b.net;
    });
}

export type StablefordEntry = {
  player: Player;
  points: number | null;
};

/** Saturday board: Stableford points, highest wins. */
export function buildStablefordBoard(players: Player[], round: Round): StablefordEntry[] {
  return players
    .map((player) => {
      const pr = round.playerRounds.find((r) => r.playerId === player.id);
      return { player, points: pr ? stablefordTotal(pr.scores, round.coursePar) : null };
    })
    .sort((a, b) => {
      if (a.points === null && b.points === null) return 0;
      if (a.points === null) return 1;
      if (b.points === null) return -1;
      return b.points - a.points;
    });
}
