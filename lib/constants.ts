import { Player, TripDay, Round } from './types';

export const TRIP_NAME = 'CFSTT 2026 Golf Trip';
export const TRIP_DATES = 'July 30 – August 2, 2026';
export const TRIP_LOCATION = 'Lexington, KY';

export const STORAGE_KEY = 'cfstt2026-trip';

export const DEFAULT_PAR: number[] = [
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Front 9
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Back 9
];

export const DEFAULT_SCHEDULE: TripDay[] = [
  {
    date: '2026-07-30',
    label: 'Bourbon Run',
    description: 'Distillery tour day in Lexington, KY',
    activities: [
      'Castle & Key Distillery',
      'Buffalo Trace Distillery',
      'Woodford Reserve',
      'Dinner in Lexington',
    ],
    isActive: false,
  },
  {
    date: '2026-07-31',
    label: 'Golf — Round 1',
    description: 'First round of golf',
    activities: ['Tee time TBD', 'Course TBD'],
    isActive: false,
  },
  {
    date: '2026-08-01',
    label: 'Golf — Round 2',
    description: 'Second round of golf',
    activities: ['Tee time TBD', 'Course TBD'],
    isActive: false,
  },
  {
    date: '2026-08-02',
    label: 'Golf — Round 3',
    description: 'Third and final round',
    activities: ['Tee time TBD', 'Course TBD'],
    isActive: false,
  },
];

export const DEFAULT_ROUNDS: Round[] = [
  {
    id: 'round-1',
    dayIndex: 1,
    courseName: 'TBD',
    coursePar: [...DEFAULT_PAR],
    teeTime: 'TBD',
    playerRounds: [],
  },
  {
    id: 'round-2',
    dayIndex: 2,
    courseName: 'TBD',
    coursePar: [...DEFAULT_PAR],
    teeTime: 'TBD',
    playerRounds: [],
  },
  {
    id: 'round-3',
    dayIndex: 3,
    courseName: 'TBD',
    coursePar: [...DEFAULT_PAR],
    teeTime: 'TBD',
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

export const DAY_LABELS = ['Day 1 — Thu 7/30', 'Day 2 — Fri 7/31', 'Day 3 — Sat 8/1', 'Day 4 — Sun 8/2'];
