export type Player = {
  id: string;
  name: string;
  handicap: number;
};

export type HoleScore = {
  hole: number; // 1-18
  strokes: number | null;
};

export type PlayerRound = {
  playerId: string;
  scores: HoleScore[]; // 18 entries
};

export type Round = {
  id: string; // "round-1" …
  dayIndex: number; // index into schedule / DAY_LABELS (same order as rounds)
  courseName: string;
  coursePar: number[]; // 18 entries, par for each hole
  teeTime: string;
  playerRounds: PlayerRound[];
  /** True if the round isn't mandatory (e.g., Lexington-only arrival round). */
  optional?: boolean;
};

export type TripDay = {
  date: string; // ISO date e.g. "2026-07-31"
  label: string; // e.g. day headline
  description: string;
  activities: string[]; // schedule items
  isActive: boolean;
  /** Shown on schedule & scorecards (e.g. Lexington vs Louisville). */
  city?: string;
};

export type TripState = {
  players: Player[];
  rounds: Round[];
  schedule: TripDay[];
  currentStatus: string; // free-text live status
  activeDayIndex: number; // 0…schedule.length−1
  /** When true, active day tracks the device calendar (see activeDay.ts). */
  activeDayFollowCalendar: boolean;
};
