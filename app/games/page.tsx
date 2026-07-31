'use client';

import { TRIP_NAME } from '@/lib/constants';
import { CardsIcon } from '@/components/icons';

type Rule = { text: string; notes?: string[] };

type Game = {
  name: string;
  when?: string;
  how?: string;
  rules?: Rule[];
};

const gamesInPlay: Game[] = [
  {
    name: '3-2-1 Best Ball',
    when: 'Friday · Champions Pointe',
    how: 'Played as a foursome. On each hole the team counts its best 1, 2, or 3 balls toward the team score — six “3” holes, six “2”, and six “1” across the round. You must declare the count for the next hole before anyone tees off. Everyone plays their own ball; lowest team total wins.',
    rules: [{ text: 'All birdies count — a birdie (or better) always counts toward the team score, no matter the declared count on that hole.' }],
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
    name: 'Red, White & Blue — Best 2-Ball',
    how: 'A best-2-ball team game with a twist: you rotate through three sets of tees over the round.',
    rules: [
      {
        text: 'Over 18 holes each team must play 6 holes from the Red tees, 6 from the White, and 6 from the Blue.',
        notes: [
          'The team picks which tee color to use on each hole — but you must finish having played exactly 6 holes from each color (DQ if you don’t).',
          'All players on the team play from the same tee on a given hole.',
        ],
      },
      {
        text: 'Take the 2 lowest scores on each hole and track the team as +/- par.',
        notes: ['All birdies count!'],
      },
      { text: 'The individual Skins game still applies alongside it.' },
    ],
  },
  {
    name: 'Poker',
    how: 'Play your own ball and earn cards for good holes — say 1 card for par, 2 for a birdie, 3 for an eagle (nothing for bogey or worse). Deal from two decks so there are plenty to go around. At the end, each team combines all its members’ cards and makes the best five-card poker hand — best hand takes it.',
  },
  {
    name: 'Shamble',
    how: 'A scramble-meets-best-ball hybrid: everyone tees off and the team picks the best drive, then each player plays their OWN ball from there into the hole. Count the best one or two scores on the hole.',
  },
  {
    name: 'Stableford',
    how: 'Points per hole instead of raw strokes — e.g. birdie 4, par 2, bogey 1, double bogey or worse 0, with bonuses for eagles. Most points wins, so one blow-up hole barely stings.',
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
      {game.how ? (
        <p className="mt-1 text-sm text-ink-soft dark:text-chalk/70">{game.how}</p>
      ) : null}
      {game.rules ? (
        <ul className="mt-2 space-y-2 text-sm text-ink-soft dark:text-chalk/70">
          {game.rules.map((rule, i) => (
            <li key={i}>
              <div className="flex gap-2">
                <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{rule.text}</span>
              </div>
              {rule.notes ? (
                <ul className="ml-4 mt-1 list-disc space-y-1 pl-2 marker:text-accent/60">
                  {rule.notes.map((note, j) => (
                    <li key={j}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
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
