import { HoleScore, PlayerRound, Round, Player } from './types';

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

export function netTotal(scores: HoleScore[], handicap: number): number | null {
  const gross = grossTotal(scores);
  if (gross === null) return null;
  return gross - handicap;
}

export function sumPar(pars: number[], from: number, to: number): number {
  return pars.slice(from - 1, to).reduce((sum, p) => sum + p, 0);
}

export function scoreRelativeToPar(strokes: number | null, par: number): number | null {
  if (strokes === null) return null;
  return strokes - par;
}

export type LeaderboardEntry = {
  player: Player;
  roundNets: (number | null)[];
  totalNet: number | null;
  totalGross: number | null;
};

export function buildLeaderboard(players: Player[], rounds: Round[]): LeaderboardEntry[] {
  return players
    .map((player) => {
      const roundNets: (number | null)[] = [];
      let totalNetSum: number | null = null;
      let totalGrossSum: number | null = null;

      for (const round of rounds) {
        const pr = round.playerRounds.find((pr) => pr.playerId === player.id);
        if (!pr) {
          roundNets.push(null);
          continue;
        }
        const gross = grossTotal(pr.scores);
        const net = netTotal(pr.scores, player.handicap);
        roundNets.push(net);
        if (gross !== null) {
          totalGrossSum = (totalGrossSum ?? 0) + gross;
        }
        if (net !== null) {
          totalNetSum = (totalNetSum ?? 0) + net;
        }
      }

      return { player, roundNets, totalNet: totalNetSum, totalGross: totalGrossSum };
    })
    .sort((a, b) => {
      if (a.totalNet === null && b.totalNet === null) return 0;
      if (a.totalNet === null) return 1;
      if (b.totalNet === null) return -1;
      return a.totalNet - b.totalNet;
    });
}
