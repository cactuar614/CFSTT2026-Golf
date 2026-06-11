import { Player, TripDay, Round, Tier, GameType, ScrambleTeam } from './types';

export const TRIP_NAME = 'The Kentucky Bourbon Scramble';
export const TRIP_DATES = 'July 31 – August 2, 2026';
export const TRIP_LOCATION = 'Lexington & Louisville, KY';

export const LODGING = {
  hotel: 'AC Hotel Louisville Downtown',
  checkIn: 'Friday, 7/31/26',
  checkOut: 'Sunday, 8/2/26',
  status: 'Confirmed',
  rooms: '(4) Two Queen rooms',
  groupSize: 8,
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=AC+Hotel+Louisville+Downtown',
} as const;

/**
 * Stroke allowances per round, by tier. Net = Gross − strokes.
 * Currently only relevant if Saturday's Stableford goes net (TBD) —
 * Friday is plain gross stroke play.
 * Final values pending confirmation (B may become 8, M may become 20).
 */
export const TIER_STROKES: Record<Tier, number> = {
  A: 0,
  B: 7,
  M: 18,
};

/** Short badge label per tier ('M' is Hippy Mike's own allowance). */
export const TIER_BADGES: Record<Tier, string> = {
  A: 'A',
  B: 'B',
  M: 'HM',
};

export const GAME_LABELS: Record<GameType, string> = {
  stroke: 'Individual Stroke Play',
  stableford: 'Stableford',
  scramble: 'Team Scramble',
};

/** Saturday side contests; fill in winner names once decided on the course. */
export const SATURDAY_CONTESTS: { label: string; winner: string | null }[] = [
  { label: 'Longest Drive', winner: null },
  { label: 'Closest to the Pin', winner: null },
];

/** Sunday scramble teams — empty until drafted. */
export const SCRAMBLE_TEAMS: ScrambleTeam[] = [];

export const DEFAULT_PAR: number[] = [
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Front 9
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Back 9
];

/** Real card (iga.bluegolf.com): front 36 / back 36, par 72. */
export const COVERED_BRIDGE_PAR: number[] = [
  4, 4, 3, 4, 5, 4, 4, 3, 5, // Front 9 — 36
  4, 4, 3, 4, 5, 4, 4, 3, 5, // Back 9 — 36
];

export const DEFAULT_SCHEDULE: TripDay[] = [
  {
    date: '2026-07-31',
    label: 'Friday — Louisville · Round 1',
    description: 'Champions Pointe Golf Club · Hotel check-in',
    city: 'Louisville, KY',
    activities: [
      'AC Hotel Louisville Downtown — check-in (confirmed)',
      'Champions Pointe Golf Club',
      'Tee time: 12:30 PM',
      'Game: Individual stroke play',
      'Dinner',
    ],
  },
  {
    date: '2026-08-01',
    label: 'Saturday — Louisville · Round 2',
    description: 'Covered Bridge Golf Club',
    city: 'Louisville, KY',
    activities: [
      'Covered Bridge Golf Club',
      'Tee time: 10:00 AM',
      'Game: Stableford · Longest Drive & Closest to the Pin',
      'Night out and dinner',
    ],
  },
  {
    date: '2026-08-02',
    label: 'Sunday — Louisville · Round 3',
    description: 'Valley View Golf Club · Check-out',
    city: 'Louisville, KY',
    activities: [
      'Valley View Golf Club',
      'Tee time: 11:00 AM',
      'Game: Team scramble',
      'AC Hotel Louisville Downtown — check-out',
      'Drive home',
    ],
  },
];

export const DEFAULT_ROUNDS: Round[] = [
  {
    id: 'round-1',
    dayIndex: 0,
    courseName: 'Champions Pointe Golf Club',
    coursePar: [...DEFAULT_PAR],
    teeTime: '12:30 PM',
    game: 'stroke',
    playerRounds: [],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Champions+Pointe+Golf+Club+Louisville',
  },
  {
    id: 'round-2',
    dayIndex: 1,
    courseName: 'Covered Bridge Golf Club',
    coursePar: [...COVERED_BRIDGE_PAR],
    teeTime: '10:00 AM',
    game: 'stableford',
    playerRounds: [],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Covered+Bridge+Golf+Club+Louisville',
  },
  {
    id: 'round-3',
    dayIndex: 2,
    courseName: 'Valley View Golf Club',
    coursePar: [...DEFAULT_PAR],
    teeTime: '11:00 AM',
    game: 'scramble',
    playerRounds: [],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Valley+View+Golf+Club+Floyds+Knobs',
  },
];

export const DEFAULT_PLAYERS: Player[] = [
  { id: 'player-1', name: 'Matt Huber', tier: 'A' },
  { id: 'player-2', name: 'Adam Wakeland', tier: 'A' },
  { id: 'player-3', name: 'Jason Karns', tier: 'B' },
  { id: 'player-4', name: 'Mike Kennedy', tier: 'B' },
  { id: 'player-5', name: 'Matt Sweeney', tier: 'A' },
  { id: 'player-6', name: 'Hippy Mike', tier: 'M' },
  { id: 'player-7', name: 'Alex Rogers', tier: 'A' },
  { id: 'player-8', name: 'Kevin OCallahan', tier: 'A' },
];

export const DAY_LABELS = [
  'Day 1 — Fri 7/31 · Louisville',
  'Day 2 — Sat 8/1 · Louisville',
  'Day 3 — Sun 8/2 · Louisville',
];

/** Free-text live status shown on Home and Schedule (empty = hidden). */
export const TRIP_STATUS = '';
