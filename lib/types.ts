/** Stroke-allowance tier: A/B buckets plus 'M' = Hippy Mike's own number. */
export type Tier = 'A' | 'B' | 'M';

/** Scoring format for a round. */
export type GameType = 'stroke' | 'stableford' | 'scramble';

export type Player = {
  id: string;
  name: string;
  tier: Tier;
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
  /** Which tees the group is playing, e.g. "Gold — 6,453 yards". */
  tees?: string;
  game: GameType;
  playerRounds: PlayerRound[];
  /** External map URL (e.g. Google Maps search link). */
  mapUrl?: string;
};

export type ScrambleTeam = {
  name: string;
  playerIds: string[];
};

export type TripDay = {
  date: string; // ISO date e.g. "2026-07-31"
  label: string; // e.g. day headline
  description: string;
  activities: string[]; // schedule items
  /** Shown on schedule & scorecards (e.g. Lexington vs Louisville). */
  city?: string;
};

export type TripState = {
  players: Player[];
  rounds: Round[];
  schedule: TripDay[];
  currentStatus: string; // free-text live status
  /** Index of today's trip day, or null if today isn't a trip day. */
  activeDayIndex: number | null;
};
