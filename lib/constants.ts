import { Player, TripDay, Round } from './types';

export const TRIP_NAME = 'CFSTT 2026 Golf Trip';
export const TRIP_DATES = 'July 31 – August 2, 2026';
export const TRIP_LOCATION = 'Louisville, KY';

export const STORAGE_KEY = 'cfstt2026-trip';

export const LODGING = {
  name: 'AC Hotel Louisville Downtown',
  checkIn: 'Friday, 7/31/26',
  checkOut: 'Sunday, 8/2/26',
  rooms: '4 Two-Queen rooms',
  status: 'Confirmed',
};

export const DEFAULT_PAR: number[] = [
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Front 9
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Back 9
];

export const DEFAULT_SCHEDULE: TripDay[] = [
  {
    date: '2026-07-31',
    label: 'Golf — Round 1',
    description: 'Champions Pointe Golf Club',
    activities: [
      'Check in: AC Hotel Louisville Downtown',
      'Tee Time: 12:30 PM — Champions Pointe Golf Club',
      '8 Golfers',
    ],
    isActive: false,
  },
  {
    date: '2026-08-01',
    label: 'Golf — Round 2',
    description: 'Covered Bridge Golf Club',
    activities: [
      'Tee Time: 10:30 AM — Covered Bridge Golf Club',
      '8 Golfers',
    ],
    isActive: false,
  },
  {
    date: '2026-08-02',
    label: 'Golf — Round 3',
    description: 'Heritage Hill Golf Club',
    activities: [
      'Check out: AC Hotel Louisville Downtown',
      'Tee Time: 10:30 AM (Requested) — Heritage Hill Golf Club',
      '8 Golfers',
    ],
    isActive: false,
  },
];

export const DEFAULT_ROUNDS: Round[] = [
  {
    id: 'round-1',
    dayIndex: 0,
    courseName: 'Champions Pointe Golf Club',
    coursePar: [...DEFAULT_PAR],
    teeTime: '12:30 PM',
    playerRounds: [],
  },
  {
    id: 'round-2',
    dayIndex: 1,
    courseName: 'Covered Bridge Golf Club',
    coursePar: [...DEFAULT_PAR],
    teeTime: '10:30 AM',
    playerRounds: [],
  },
  {
    id: 'round-3',
    dayIndex: 2,
    courseName: 'Heritage Hill Golf Club',
    coursePar: [...DEFAULT_PAR],
    teeTime: '10:30 AM (TBD)',
    playerRounds: [],
  },
];

export const DEFAULT_PLAYERS: Player[] = [
  { id: 'player-1', name: 'Player 1', handicap: 0 },
  { id: 'player-2', name: 'Player 2', handicap: 0 },
  { id: 'player-3', name: 'Player 3', handicap: 0 },
  { id: 'player-4', name: 'Player 4', handicap: 0 },
  { id: 'player-5', name: 'Player 5', handicap: 0 },
  { id: 'player-6', name: 'Player 6', handicap: 0 },
  { id: 'player-7', name: 'Player 7', handicap: 0 },
  { id: 'player-8', name: 'Player 8', handicap: 0 },
];

export const DAY_LABELS = ['Day 1 — Fri 7/31', 'Day 2 — Sat 8/1', 'Day 3 — Sun 8/2'];
