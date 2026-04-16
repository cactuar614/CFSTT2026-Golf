import { Player, TripDay, Round } from './types';

export const TRIP_NAME = 'Lexington & Louisville Golf Trip';
export const TRIP_DATES = 'July 30 – August 2, 2026';
export const TRIP_LOCATION = 'Lexington & Louisville, KY';

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
    label: 'Thursday — Lexington · Round 1',
    description: 'Cherry Blossom Golf Course · Lexington, KY',
    city: 'Lexington, KY',
    activities: ['Cherry Blossom Golf Course', 'Lexington, KY', 'Tee time: TBD (confirm with group)'],
  },
  {
    date: '2026-07-31',
    label: 'Friday — Louisville · Round 2',
    description: 'Champions Pointe Golf Club · Hotel check-in',
    city: 'Louisville, KY',
    activities: [
      'AC Hotel Louisville Downtown — check-in (confirmed)',
      'Champions Pointe Golf Club',
      'Tee time: 12:30 PM',
      'Dinner',
    ],
  },
  {
    date: '2026-08-01',
    label: 'Saturday — Louisville · Round 3',
    description: 'Covered Bridge Golf Club',
    city: 'Louisville, KY',
    activities: ['Covered Bridge Golf Club', 'Tee time: 10:30 AM', 'Night out and dinner'],
  },
  {
    date: '2026-08-02',
    label: 'Sunday — Louisville · Round 4',
    description: 'Heritage Hill Golf Club · Check-out',
    city: 'Louisville, KY',
    activities: [
      'Heritage Hill Golf Club',
      'Tee time: TBD (requested 10:30 AM)',
      'AC Hotel Louisville Downtown — check-out',
      'Drive home',
    ],
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
  { id: 'player-5', name: 'Matt Lanning', handicap: 25 },
  { id: 'player-6', name: 'Hippy Mike', handicap: 36 },
  { id: 'player-7', name: 'Alex Rogers', handicap: 12 },
];

export const DAY_LABELS = [
  'Day 1 — Thu 7/30 · Lexington',
  'Day 2 — Fri 7/31 · Louisville',
  'Day 3 — Sat 8/1 · Louisville',
  'Day 4 — Sun 8/2 · Louisville',
];

/** Free-text live status shown on Home and Schedule (empty = hidden). */
export const TRIP_STATUS = '';
