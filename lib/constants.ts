import { Player, TripDay, Round } from './types';

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

export const DEFAULT_PAR: number[] = [
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Front 9
  4, 4, 4, 4, 4, 4, 4, 4, 4, // Back 9
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
      'Dinner',
    ],
  },
  {
    date: '2026-08-01',
    label: 'Saturday — Louisville · Round 2',
    description: 'Covered Bridge Golf Club',
    city: 'Louisville, KY',
    activities: ['Covered Bridge Golf Club', 'Tee time: 10:00 AM', 'Night out and dinner'],
  },
  {
    date: '2026-08-02',
    label: 'Sunday — Louisville · Round 3',
    description: 'Course TBD · Check-out',
    city: 'Louisville, KY',
    activities: [
      'Course TBD',
      'Tee time: TBD',
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
    playerRounds: [],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Champions+Pointe+Golf+Club+Louisville',
  },
  {
    id: 'round-2',
    dayIndex: 1,
    courseName: 'Covered Bridge Golf Club',
    coursePar: [...DEFAULT_PAR],
    teeTime: '10:00 AM',
    playerRounds: [],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Covered+Bridge+Golf+Club+Louisville',
  },
  {
    id: 'round-3',
    dayIndex: 2,
    courseName: 'TBD',
    coursePar: [...DEFAULT_PAR],
    teeTime: 'TBD',
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
  'Day 1 — Fri 7/31 · Louisville',
  'Day 2 — Sat 8/1 · Louisville',
  'Day 3 — Sun 8/2 · Louisville',
];

/** Free-text live status shown on Home and Schedule (empty = hidden). */
export const TRIP_STATUS = '';
