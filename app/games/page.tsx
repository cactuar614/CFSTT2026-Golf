'use client';

import { TRIP_NAME } from '@/lib/constants';
import { CardsIcon } from '@/components/icons';

type Game = {
  name: string;
  when?: string;
  how: string;
};

const gamesInPlay: Game[] = [
  {
    name: '3-2-1 Best Ball',
    when: 'Friday · Champions Pointe',
    how: 'Played as a foursome. On each hole the team counts its best 1, 2, or 3 balls toward the team score — six “3” holes, six “2”, and six “1” across the round. You must declare the count for the next hole before anyone tees off. Everyone plays their own ball; lowest team total wins.',
  },
  {
    name: '2-Person Scramble',
    when: 'Saturday AM · Covered Bridge',
    how: 'Both partners tee off, pick the better shot, and both play their next shot from that spot — repeat until the ball is holed. One ball and one score per team; lowest team total wins.',
  },
  {
    name: '4-Person Scramble',
    when: 'Sunday · Valley View',
    how: 'Same as a scramble but in teams of four — everyone hits, take the best shot, and all four play from there. More players means more chances at a great shot on every stroke.',
  },
];

const otherGames: Game[] = [
  {
    name: 'Poker',
    how: 'Play your own ball and earn cards for good holes — say 1 card for par, 2 for a birdie, 3 for an eagle (nothing for bogey or worse). Deal from two decks so there are plenty to go around. At the end, each team combines all its members’ cards and makes the best five-card poker hand — best hand takes it.',
  },
  {
    name: 'Shamble',
    how: 'A scramble-meets-best-ball hybrid: everyone tees off and the team picks the best drive, then each player plays their OWN ball from there into the hole. Count the best one or two scores on the hole.',
  },
  {
    name: 'Wolf',
    how: 'For a group of four. Each hole a rotating “Wolf” tees off last and, after watching everyone drive, either picks a partner for that hole or goes “Lone Wolf” against the other three for double points. Tally points over 18.',
  },
  {
    name: 'Skins',
    how: 'Every hole is worth a skin. Win it outright and the skin is yours; tie and the skin carries to the next hole, so the pot keeps building. Most skins at the end wins.',
  },
  {
    name: 'Nassau',
    how: 'Three bets in one round: the front nine, the back nine, and the overall eighteen. A classic wager you can run on top of almost any format.',
  },
  {
    name: 'Stableford',
    how: 'Points per hole instead of raw strokes — e.g. birdie 4, par 2, bogey 1, double bogey or worse 0, with bonuses for eagles. Most points wins, so one blow-up hole barely stings.',
  },
  {
    name: 'Bingo Bango Bongo',
    how: 'Three points a hole: first ball on the green (bingo), closest to the pin once everyone’s on (bango), and first in the hole (bongo). Rewards good play at every skill level.',
  },
  {
    name: 'Vegas',
    how: 'Two-person teams pair their scores into a two-digit number, low score first (a 4 and a 5 become 45). Compare with the other team — the difference is your points. Birdies can flip the opponents’ number for big swings.',
  },
];

function GameCard({ game, badge }: { game: Game; badge?: boolean }) {
  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <h3 className="font-display text-lg font-bold">{game.name}</h3>
        {badge ? (
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-char-900">
            In play
          </span>
        ) : null}
      </div>
      {game.when ? (
        <p className="mt-0.5 text-sm font-semibold text-primary dark:text-accent">{game.when}</p>
      ) : null}
      <p className="mt-1 text-sm text-ink-soft dark:text-chalk/70">{game.how}</p>
    </div>
  );
}

export default function GamesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="eyebrow">{TRIP_NAME}</p>
        <h1 className="page-title">The Games</h1>
        <p className="text-sm text-ink-soft dark:text-chalk/60">
          How each format works — the games on the card this weekend, plus other options we could
          pick up.
        </p>
      </div>

      {/* What we're playing */}
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <CardsIcon className="h-5 w-5 text-copper dark:text-accent" />
          <h2 className="eyebrow">What we&rsquo;re playing</h2>
        </div>
        {gamesInPlay.map((game) => (
          <GameCard key={game.name} game={game} badge />
        ))}
        <p className="text-xs text-ink-soft/80 dark:text-chalk/40">
          Saturday afternoon at Hidden Creek is still open — we&rsquo;ll choose the game with the
          group. Any of the options below would work.
        </p>
      </section>

      {/* Other options */}
      <section className="space-y-2">
        <h2 className="eyebrow">Other formats to consider</h2>
        {otherGames.map((game) => (
          <GameCard key={game.name} game={game} />
        ))}
      </section>
    </div>
  );
}
