import { Player, TripDay, Round } from './types';

export const TRIP_NAME = 'Lexington & Louisville Golf Trip';
export const TRIP_DATES = 'July 30 – August 2, 2026';
export const TRIP_LOCATION = 'Lexington & Louisville, KY';

/** Bump when default trip shape changes so clients load fresh itinerary (localStorage). */
export const STORAGE_KEY = 'cfstt2026-lex-lou-v4';

export const LODGING = {
  hotel: 'AC Hotel Louisville Downtown',
  checkIn: 'Friday, 7/31/26',
  checkOut: 'Sunday, 8/2/26',
  status: 'Confirmed (see notes)',
  rooms: '(4) Two Queen rooms',
  groupSize: 8,
} as const;

export const DEFAULT_PAR: number[] = [
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Front 9
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Back 9
];

export const DEFAULT_SCHEDULE: TripDay[] = [
  {
    date: '2026-07-30',
    label: 'Thursday — Lexington · Round 0 (optional)',
    description: 'Cherry Blossom Golf Course · Lexington, KY (optional — skip if not in Lexington)',
    city: 'Lexington, KY',
    activities: [
      'Cherry Blossom Golf Course (optional)',
      'Lexington, KY',
      'Tee time: TBD (confirm with group)',
      'Potential Buffalo Trace run',
      'Skip this round if you are not in Lexington',
    ],
    isActive: false,
  },
  {
    date: '2026-07-31',
    label: 'Friday — Louisville · Round 1',
    description: 'Champions Pointe Golf Club · Hotel check-in',
    city: 'Louisville, KY',
    activities: [
      'AC Hotel Louisville Downtown — check-in (confirmed)',
      'Buffalo Trace run',
      'Champions Pointe Golf Club',
      'Tee time: 12:30 PM',
      'Format: 2-man best ball',
      'Dinner',
    ],
    isActive: false,
  },
  {
    date: '2026-08-01',
    label: 'Saturday — Louisville · Round 2',
    description: 'Covered Bridge Golf Club',
    city: 'Louisville, KY',
    activities: [
      'Covered Bridge Golf Club',
      'Tee time: 10:30 AM',
      'Format: 2-man scramble — ranked, balanced teams (keep it as even as possible)',
      'Side games: Longest Drive, Closest to Pin',
      'Night out and dinner',
    ],
    isActive: false,
  },
  {
    date: '2026-08-02',
    label: 'Sunday — Louisville · Round 3',
    description: 'Heritage Hill Golf Club · Check-out',
    city: 'Louisville, KY',
    activities: [
      'Heritage Hill Golf Club',
      'Tee time: TBD (requested 10:30 AM)',
      'Format: 4-man scramble',
      'AC Hotel Louisville Downtown — check-out',
      'Drive home',
    ],
    isActive: false,
  },
];

export const DEFAULT_ROUNDS: Round[] = [
  {
    id: 'round-1',
    dayIndex: 0,
    courseName: 'Cherry Blossom Golf Course',
    coursePar: [...DEFAULT_PAR],
    teeTime: 'TBD (confirm with group)',
    playerRounds: [],
    optional: true,
  },
  {
    id: 'round-2',
    dayIndex: 1,
    courseName: 'Champions Pointe Golf Club',
    coursePar: [...DEFAULT_PAR],
    teeTime: '12:30 PM',
    playerRounds: [],
  },
  {
    id: 'round-3',
    dayIndex: 2,
    courseName: 'Covered Bridge Golf Club',
    coursePar: [...DEFAULT_PAR],
    teeTime: '10:30 AM',
    playerRounds: [],
  },
  {
    id: 'round-4',
    dayIndex: 3,
    courseName: 'Heritage Hill Golf Club',
    coursePar: [...DEFAULT_PAR],
    teeTime: 'TBD (requested 10:30 AM)',
    playerRounds: [],
  },
];

export const DEFAULT_PLAYERS: Player[] = [
  { id: 'player-1', name: 'Matt Huber', handicap: 11 },
  { id: 'player-2', name: 'Adam Wakeland', handicap: 12 },
  { id: 'player-3', name: 'Jason Karns', handicap: 18 },
  { id: 'player-4', name: 'Mike Kennedy', handicap: 20 },
  { id: 'player-5', name: 'Hippy Mike', handicap: 36 },
  { id: 'player-6', name: 'Alex Rogers', handicap: 12 },
  { id: 'player-7', name: 'Matt Sweeney', handicap: 18 },
  { id: 'player-8', name: "Kevin O'Callahan", handicap: 18 },
  { id: 'player-9', name: 'Guest (temp)', handicap: 25 },
];

export const DAY_LABELS = [
  'Day 1 — Thu 7/30 · Lexington',
  'Day 2 — Fri 7/31 · Louisville',
  'Day 3 — Sat 8/1 · Louisville',
  'Day 4 — Sun 8/2 · Louisville',
];
