export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
}

export interface Goal {
  id: string;
  scorer: string;
  minute: number;
  teamId: string;
  assist?: string;
  isPenalty?: boolean;
  isOwnGoal?: boolean;
}

export type MatchEventType = 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'var';

export interface MatchEvent {
  id: string;
  type: MatchEventType;
  minute: number;
  extraMinute?: number;
  teamId: string;
  player: string;
  assistOrSubOut?: string;
  detail?: string;
}

export interface MatchStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  xg?: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  passes?: [number, number];
  passAccuracy?: [number, number];
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  isCaptain?: boolean;
}

export interface Lineup {
  formation: string;
  startingXI: Player[];
  bench: Player[];
  manager?: string;
}

export type MatchStatus =
  | "UPCOMING"
  | "LIVE"
  | "HALFTIME"
  | "FINISHED"
  | "POSTPONED"
  | "CANCELLED";

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  minute: number | null;
  kickoffTime?: string;
  date?: string;
  venue?: string;
  referee?: string;
  round?: string;
  goals: Goal[];
  events?: MatchEvent[];
  stats?: MatchStats;
  lineups?: {
    home: Lineup;
    away: Lineup;
  };
  leagueId: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  pinned: boolean;
}
