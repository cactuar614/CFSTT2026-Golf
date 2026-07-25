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

export const GAME_LABELS: Record<GameType, string> = {
  stroke: 'Individual Stroke Play',
  stableford: 'Stableford',
  scramble: 'Team Scramble',
  'best-ball': '3-2-1 Best Ball',
  tbd: 'Format TBD',
};

/**
 * Saturday side contests at Covered Bridge (round-2); fill in winner names once
 * decided on the course. TBD whether these carry over now that Covered Bridge is
 * a 2-man scramble — kept for now.
 */
export const SATURDAY_CONTESTS: { label: string; winner: string | null }[] = [
  { label: 'Closest to the Pin — Hole 3', winner: null },
  { label: 'Closest to the Pin — Hole 17', winner: null },
  { label: 'Longest Drive — Hole 9', winner: null },
  { label: 'Longest Drive — Hole 18', winner: null },
];

/** Friday 3-2-1 best-ball foursomes (Champions Pointe, round-1). */
export const FRIDAY_BEST_BALL_TEAMS: ScrambleTeam[] = [
  { name: 'Team 1', playerIds: ['player-8', 'player-5', 'player-1', 'player-6'] }, // Kevin OCallahan · Sweeney · Huber · Hippy Mike
  { name: 'Team 2', playerIds: ['player-2', 'player-7', 'player-3', 'player-4'] }, // Wakeland · Rogers · Karns · Kennedy
];

/** Saturday's 2-man scramble teams (Covered Bridge, round-2). */
export const SATURDAY_SCRAMBLE_TEAMS: ScrambleTeam[] = [
  { name: 'Rogers & Hippy Mike', playerIds: ['player-7', 'player-6'] },
  { name: 'Huber & Kennedy', playerIds: ['player-1', 'player-4'] },
  { name: 'Sweeney & OCallahan', playerIds: ['player-5', 'player-8'] },
  { name: 'Wakeland & Karns', playerIds: ['player-2', 'player-3'] },
];

/** Sunday 4-person scramble teams (Valley View, round-4). */
export const SUNDAY_SCRAMBLE_TEAMS: ScrambleTeam[] = [
  { name: 'Team 1', playerIds: ['player-1', 'player-2', 'player-7', 'player-8'] }, // Huber · Wakeland · Rogers · Kevin OCallahan
  { name: 'Team 2', playerIds: ['player-5', 'player-4', 'player-3', 'player-6'] }, // Sweeney · Kennedy · Karns · Hippy Mike
];

/** Real card: front 36 / back 36, par 72. */
export const CHAMPIONS_POINTE_PAR: number[] = [
  4, 3, 5, 3, 4, 5, 4, 4, 4, // Front 9 — 36
  4, 3, 5, 4, 4, 3, 5, 4, 4, // Back 9 — 36
];

/** Real card (iga.bluegolf.com): front 36 / back 36, par 72. */
export const COVERED_BRIDGE_PAR: number[] = [
  4, 4, 3, 4, 5, 4, 4, 3, 5, // Front 9 — 36
  4, 4, 3, 4, 5, 4, 4, 3, 5, // Back 9 — 36
];

/** Real card (iga.bluegolf.com, Gold tees — 6,282 yds): front 35 / back 35, par 70. */
export const HIDDEN_CREEK_PAR: number[] = [
  4, 4, 4, 3, 4, 4, 5, 3, 4, // Front 9 — 35
  4, 4, 3, 4, 4, 4, 4, 3, 5, // Back 9 — 35
];

/** Real card: front 36 / back 36, par 72. */
export const VALLEY_VIEW_PAR: number[] = [
  4, 3, 5, 4, 3, 4, 5, 4, 4, // Front 9 — 36
  4, 4, 3, 4, 5, 3, 5, 4, 4, // Back 9 — 36
];

export const DEFAULT_SCHEDULE: TripDay[] = [
  {
    date: '2026-07-31',
    label: 'Friday — Louisville · Round 1',
    description: 'Champions Pointe Golf Club · Hotel check-in',
    city: 'Louisville, KY',
    activities: [
      'AC Hotel Louisville Downtown — check-in (confirmed)',
      'Dinner',
    ],
  },
  {
    date: '2026-08-01',
    label: 'Saturday — Louisville · 36 Holes (Rounds 2 & 3)',
    description: 'Covered Bridge Golf Club, then Hidden Creek Golf Club',
    city: 'Louisville, KY',
    activities: [
      'Contests at Covered Bridge: 2× Longest Drive (9 & 18) · 2× Closest to the Pin (3 & 17)',
      'Hidden Creek (PM) is a casual game — format TBD with the group',
      'Night out and dinner',
    ],
  },
  {
    date: '2026-08-02',
    label: 'Sunday — Louisville · Round 4',
    description: 'Valley View Golf Club · Check-out',
    city: 'Louisville, KY',
    activities: [
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
    coursePar: [...CHAMPIONS_POINTE_PAR],
    teeTime: '12:30 PM',
    tees: 'White — 6,484 yards',
    game: 'best-ball',
    playerRounds: [],
    teams: FRIDAY_BEST_BALL_TEAMS,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Champions+Pointe+Golf+Club+Louisville',
  },
  {
    id: 'round-2',
    dayIndex: 1,
    courseName: 'Covered Bridge Golf Club',
    coursePar: [...COVERED_BRIDGE_PAR],
    teeTime: '8:00 AM',
    tees: 'Gold — 6,453 yards',
    game: 'scramble',
    playerRounds: [],
    teams: SATURDAY_SCRAMBLE_TEAMS,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Covered+Bridge+Golf+Club+Louisville',
  },
  {
    id: 'round-3',
    dayIndex: 1,
    courseName: 'Hidden Creek Golf Club',
    coursePar: [...HIDDEN_CREEK_PAR],
    teeTime: '1:30 PM',
    tees: 'Gold — 6,282 yards',
    game: 'tbd', // Casual game — format to be decided with the group
    playerRounds: [],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hidden+Creek+Golf+Club+Sellersburg',
  },
  {
    id: 'round-4',
    dayIndex: 2,
    courseName: 'Valley View Golf Club',
    coursePar: [...VALLEY_VIEW_PAR],
    teeTime: '11:03 AM',
    tees: 'Green — 6,508 yards',
    game: 'scramble',
    playerRounds: [],
    teams: SUNDAY_SCRAMBLE_TEAMS,
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
