import type { Match, League, MatchEvent, MatchStats, Goal, MatchStatus, Lineup, Player } from "../types/football";

export interface LeagueConfig {
  id: string;
  espnSlug: string;
  name: string;
  country: string;
  logo: string;
  pinned: boolean;
}

export const OFFICIAL_LEAGUES: LeagueConfig[] = [
  {
    id: "pl",
    espnSlug: "eng.1",
    name: "Premier League",
    country: "England",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/23.png",
    pinned: true,
  },
  {
    id: "ucl",
    espnSlug: "uefa.champions",
    name: "Champions League",
    country: "Europe",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2.png",
    pinned: true,
  },
  {
    id: "laliga",
    espnSlug: "esp.1",
    name: "La Liga",
    country: "Spain",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/15.png",
    pinned: false,
  },
  {
    id: "seriea",
    espnSlug: "ita.1",
    name: "Serie A",
    country: "Italy",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/12.png",
    pinned: false,
  },
  {
    id: "bundesliga",
    espnSlug: "ger.1",
    name: "Bundesliga",
    country: "Germany",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/10.png",
    pinned: false,
  },
];

export type DateFilterTab = "yesterday" | "today" | "upcoming";

function getDateQueryParam(tab: DateFilterTab): string {
  const d = new Date();
  if (tab === "yesterday") {
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10).replace(/-/g, "");
  }
  if (tab === "upcoming") {
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10).replace(/-/g, "");
  }
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

interface ESPNCompetitor {
  homeAway: "home" | "away";
  score?: string;
  winner?: boolean;
  team: {
    id: string;
    name: string;
    displayName: string;
    shortDisplayName?: string;
    abbreviation: string;
    logo?: string;
  };
}

interface ESPNDetail {
  type?: { id?: string; text?: string };
  clock?: { value?: number; displayValue?: string };
  team?: { id?: string };
  scoringPlay?: boolean;
  yellowCard?: boolean;
  redCard?: boolean;
  penaltyKick?: boolean;
  ownGoal?: boolean;
  athletesInvolved?: Array<{
    displayName?: string;
    shortName?: string;
    jersey?: string;
    team?: { id?: string };
  }>;
}

interface ESPNEvent {
  id: string;
  date: string;
  name: string;
  status: {
    clock?: number;
    displayClock?: string;
    type: {
      id: string;
      name: string;
      state: "pre" | "in" | "post";
      completed: boolean;
      description: string;
      shortDetail?: string;
      detail?: string;
    };
  };
  competitions?: Array<{
    id: string;
    venue?: { fullName?: string; address?: { city?: string } };
    competitors: ESPNCompetitor[];
    details?: ESPNDetail[];
  }>;
}

function parseESPNEvent(event: ESPNEvent, leagueId: string): Match | null {
  const comp = event.competitions?.[0];
  if (!comp || comp.competitors.length < 2) return null;

  const homeComp = comp.competitors.find((c) => c.homeAway === "home") || comp.competitors[0];
  const awayComp = comp.competitors.find((c) => c.homeAway === "away") || comp.competitors[1];

  let status: MatchStatus = "UPCOMING";
  const state = event.status?.type?.state;
  const desc = (event.status?.type?.description || "").toLowerCase();

  if (state === "in") {
    if (desc.includes("halftime") || desc.includes("half time")) {
      status = "HALFTIME";
    } else {
      status = "LIVE";
    }
  } else if (state === "post" || event.status?.type?.completed) {
    status = "FINISHED";
  } else if (desc.includes("postponed")) {
    status = "POSTPONED";
  } else if (desc.includes("cancelled")) {
    status = "CANCELLED";
  }

  // Parse clock minute
  let minute: number | null = null;
  if (event.status?.displayClock) {
    const parsed = parseInt(event.status.displayClock.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(parsed)) minute = parsed;
  }

  // Parse kickoff time
  let kickoffTime = "";
  if (event.date) {
    try {
      const matchDate = new Date(event.date);
      kickoffTime = matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      kickoffTime = "TBD";
    }
  }

  const homeScore = parseInt(homeComp.score || "0", 10) || 0;
  const awayScore = parseInt(awayComp.score || "0", 10) || 0;

  // Real events from ESPN details
  const events: MatchEvent[] = [];
  const goals: Goal[] = [];

  if (comp.details && Array.isArray(comp.details)) {
    comp.details.forEach((d, idx) => {
      const eventMin = parseInt((d.clock?.displayValue || "0").replace(/[^0-9]/g, ""), 10) || 0;
      const teamId = d.team?.id === homeComp.team.id ? homeComp.team.id : awayComp.team.id;
      const athlete = d.athletesInvolved?.[0];
      const assistAthlete = d.athletesInvolved?.[1];

      if (d.scoringPlay || d.type?.text?.toLowerCase().includes("goal")) {
        const goalId = `g-${event.id}-${idx}`;
        goals.push({
          id: goalId,
          scorer: athlete?.shortName || athlete?.displayName || "Goal",
          minute: eventMin,
          teamId,
          assist: assistAthlete?.shortName || assistAthlete?.displayName,
          isPenalty: d.penaltyKick,
          isOwnGoal: d.ownGoal,
        });

        events.push({
          id: `ev-${event.id}-${idx}`,
          type: "goal",
          minute: eventMin,
          teamId,
          player: athlete?.displayName || athlete?.shortName || "Goal",
          assistOrSubOut: assistAthlete?.displayName || assistAthlete?.shortName,
          detail: d.penaltyKick ? "Penalty" : d.ownGoal ? "Own Goal" : undefined,
        });
      } else if (d.redCard) {
        events.push({
          id: `ev-${event.id}-${idx}`,
          type: "red_card",
          minute: eventMin,
          teamId,
          player: athlete?.displayName || athlete?.shortName || "Red Card",
        });
      } else if (d.yellowCard) {
        events.push({
          id: `ev-${event.id}-${idx}`,
          type: "yellow_card",
          minute: eventMin,
          teamId,
          player: athlete?.displayName || athlete?.shortName || "Yellow Card",
        });
      }
    });
  }

  return {
    id: event.id,
    homeTeam: {
      id: homeComp.team.id,
      name: homeComp.team.displayName || homeComp.team.name,
      shortName: homeComp.team.abbreviation || homeComp.team.shortDisplayName || homeComp.team.name.slice(0, 3).toUpperCase(),
      logo: homeComp.team.logo || `https://a.espncdn.com/i/teamlogos/soccer/500/${homeComp.team.id}.png`,
    },
    awayTeam: {
      id: awayComp.team.id,
      name: awayComp.team.displayName || awayComp.team.name,
      shortName: awayComp.team.abbreviation || awayComp.team.shortDisplayName || awayComp.team.name.slice(0, 3).toUpperCase(),
      logo: awayComp.team.logo || `https://a.espncdn.com/i/teamlogos/soccer/500/${awayComp.team.id}.png`,
    },
    homeScore,
    awayScore,
    status,
    minute,
    kickoffTime,
    rawDate: event.date,
    date: event.date ? new Date(event.date).toLocaleDateString([], { month: "short", day: "numeric" }) : "Today",
    venue: comp.venue?.fullName ? `${comp.venue.fullName}${comp.venue.address?.city ? `, ${comp.venue.address.city}` : ""}` : undefined,
    goals,
    events,
    leagueId,
  };
}

// Fetch live football data by date tab
export async function fetchLiveFootballData(
  dateTab: DateFilterTab = "today"
): Promise<{
  matches: Match[];
  leagues: League[];
}> {
  const dateParam = getDateQueryParam(dateTab);

  const fetchPromises = OFFICIAL_LEAGUES.map(async (l) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      // In ESPN API, dates parameter filters to exact date YYYYMMDD
      const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/${l.espnSlug}/scoreboard?dates=${dateParam}`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) return [];
      const data = await res.json();
      const events: ESPNEvent[] = data.events || [];
      return events
        .map((ev) => parseESPNEvent(ev, l.id))
        .filter((m): m is Match => m !== null);
    } catch (err) {
      console.warn(`Could not reach real-time feed for ${l.name}:`, err);
      return [];
    }
  });

  const results = await Promise.all(fetchPromises);
  const realMatches = results.flat();

  // Sort matches: LIVE first, then UPCOMING (sorted by date/time), then FINISHED
  realMatches.sort((a, b) => {
    const order = { LIVE: 0, HALFTIME: 1, UPCOMING: 2, FINISHED: 3, POSTPONED: 4, CANCELLED: 5 };
    return (order[a.status] ?? 9) - (order[b.status] ?? 9);
  });

  const leagues: League[] = OFFICIAL_LEAGUES.map((l) => ({
    id: l.id,
    name: l.name,
    country: l.country,
    logo: l.logo,
    pinned: l.pinned,
  }));

  return {
    matches: realMatches,
    leagues,
  };
}

// Fetch real match details (boxscore stats, rosters/lineups, and official details)
export async function fetchRealMatchSummary(
  matchId: string,
  leagueId: string
): Promise<{
  stats?: MatchStats;
  lineups?: { home: Lineup; away: Lineup };
  referee?: string;
  venue?: string;
}> {
  const leagueConfig = OFFICIAL_LEAGUES.find((l) => l.id === leagueId) || OFFICIAL_LEAGUES[0];
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${leagueConfig.espnSlug}/summary?event=${matchId}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (!res.ok) return {};
    const data = await res.json();

    // 1. Real Statistics from ESPN boxscore
    let stats: MatchStats | undefined;
    const teamsStats = data.boxscore?.teams;
    if (teamsStats && Array.isArray(teamsStats) && teamsStats.length >= 2) {
      const homeStatsArr = teamsStats[0]?.statistics || [];
      const awayStatsArr = teamsStats[1]?.statistics || [];

      const getStat = (name: string): [number, number] => {
        const h = homeStatsArr.find((s: { name: string }) => s.name === name);
        const a = awayStatsArr.find((s: { name: string }) => s.name === name);
        return [parseFloat(h?.displayValue || "0") || 0, parseFloat(a?.displayValue || "0") || 0];
      };

      const possession = getStat("possessionPct");
      const shots = getStat("totalShots");
      const shotsOnTarget = getStat("shotsOnTarget");
      const corners = getStat("wonCorners");
      const fouls = getStat("foulsCommitted");
      const yellowCards = getStat("yellowCards");
      const redCards = getStat("redCards");
      const passPct = getStat("passPct");

      if (possession[0] > 0 || shots[0] > 0 || fouls[0] > 0) {
        stats = {
          possession: [Math.round(possession[0]), Math.round(possession[1] || (100 - possession[0]))],
          shots,
          shotsOnTarget,
          corners,
          fouls,
          yellowCards,
          redCards,
          passAccuracy: [Math.round(passPct[0] > 1 ? passPct[0] : passPct[0] * 100), Math.round(passPct[1] > 1 ? passPct[1] : passPct[1] * 100)],
        };
      }
    }

    // 2. Real Lineups & Rosters
    let lineups: { home: Lineup; away: Lineup } | undefined;
    const rosters = data.rosters;
    if (rosters && Array.isArray(rosters) && rosters.length >= 2) {
      const parseRoster = (r: { formation?: string; roster?: Array<{ starter?: boolean; athlete?: { id?: string; displayName?: string }; jersey?: string; position?: { name?: string } }> }): Lineup => {
        const formation = r.formation || "4-3-3";
        const startingXI: Player[] = [];
        const bench: Player[] = [];

        (r.roster || []).forEach((item) => {
          const player: Player = {
            id: item.athlete?.id || Math.random().toString(),
            name: item.athlete?.displayName || "Player",
            number: parseInt(item.jersey || "0", 10) || 0,
            position: (item.position?.name?.includes("Goalkeeper") ? "GK" : item.position?.name?.includes("Defender") ? "DEF" : item.position?.name?.includes("Midfielder") ? "MID" : "FWD"),
          };
          if (item.starter) {
            startingXI.push(player);
          } else {
            bench.push(player);
          }
        });

        return {
          formation,
          startingXI,
          bench,
        };
      };

      const homeLineup = parseRoster(rosters[0]);
      const awayLineup = parseRoster(rosters[1]);

      if (homeLineup.startingXI.length > 0 || awayLineup.startingXI.length > 0) {
        lineups = {
          home: homeLineup,
          away: awayLineup,
        };
      }
    }

    // 3. Referee & Venue
    const officials = data.gameInfo?.officials;
    const referee = officials && officials.length > 0 ? officials[0]?.displayName : undefined;
    const venue = data.gameInfo?.venue?.fullName ? `${data.gameInfo.venue.fullName}${data.gameInfo.venue.address?.city ? `, ${data.gameInfo.venue.address.city}` : ""}` : undefined;

    return {
      stats,
      lineups,
      referee,
      venue,
    };
  } catch (err) {
    console.warn(`Error fetching summary details for match ${matchId}:`, err);
    return {};
  }
}
