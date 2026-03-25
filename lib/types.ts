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
  id: string; // "round-1", "round-2", "round-3"
  dayIndex: number; // 1, 2, 3 (maps to 7/31, 8/1, 8/2)
  courseName: string;
  coursePar: number[]; // 18 entries, par for each hole
  teeTime: string;
  playerRounds: PlayerRound[];
};

export type TripDay = {
  date: string; // "2026-07-30"
  label: string; // "Bourbon Run" or "Golf - Round 1"
  description: string;
  activities: string[]; // schedule items
  isActive: boolean;
};

export type TripState = {
  players: Player[];
  rounds: Round[];
  schedule: TripDay[];
  currentStatus: string; // free-text live status
  activeDayIndex: number; // 0-3
};
