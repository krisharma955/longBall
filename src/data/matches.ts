import type { League, Match, Team } from "../types/football";

export const leagues: League[] = [
  {
    id: "pl",
    name: "Premier League",
    country: "England",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/23.png",
    pinned: true,
  },
  {
    id: "ucl",
    name: "UEFA Champions League",
    country: "Europe",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2.png",
    pinned: true,
  },
  {
    id: "laliga",
    name: "La Liga",
    country: "Spain",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/15.png",
    pinned: false,
  },
  {
    id: "seriea",
    name: "Serie A",
    country: "Italy",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/12.png",
    pinned: false,
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    country: "Germany",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/10.png",
    pinned: false,
  },
];

// Teams
const arsenal: Team = {
  id: "ars",
  name: "Arsenal",
  shortName: "ARS",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
};

const chelsea: Team = {
  id: "che",
  name: "Chelsea",
  shortName: "CHE",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
};

const liverpool: Team = {
  id: "liv",
  name: "Liverpool",
  shortName: "LIV",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
};

const manCity: Team = {
  id: "mci",
  name: "Manchester City",
  shortName: "MCI",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
};

const realMadrid: Team = {
  id: "rma",
  name: "Real Madrid",
  shortName: "RMA",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
};

const manchesterUnited: Team = {
  id: "mun",
  name: "Manchester United",
  shortName: "MUN",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
};

const barcelona: Team = {
  id: "bar",
  name: "FC Barcelona",
  shortName: "BAR",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
};

const bayernMunich: Team = {
  id: "bay",
  name: "Bayern Munich",
  shortName: "BAY",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
};

const juventus: Team = {
  id: "juv",
  name: "Juventus",
  shortName: "JUV",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/111.png",
};

const acMilan: Team = {
  id: "acm",
  name: "AC Milan",
  shortName: "ACM",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/103.png",
};

const interMilan: Team = {
  id: "int",
  name: "Inter Milan",
  shortName: "INT",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/110.png",
};

const bvbDortmund: Team = {
  id: "bvb",
  name: "Borussia Dortmund",
  shortName: "BVB",
  logo: "https://a.espncdn.com/i/teamlogos/soccer/500/124.png",
};

export const matches: Match[] = [
  // 1. UCL LIVE Match
  {
    id: "m1",
    homeTeam: realMadrid,
    awayTeam: manchesterUnited,
    homeScore: 2,
    awayScore: 1,
    status: "LIVE",
    minute: 68,
    kickoffTime: "20:00",
    date: "Today",
    venue: "Santiago Bernabéu, Madrid",
    referee: "Szymon Marciniak",
    round: "Quarter-Final • 2nd Leg",
    leagueId: "ucl",
    goals: [
      {
        id: "g1",
        scorer: "Arda Güler",
        minute: 14,
        teamId: "rma",
        assist: "Vinícius Jr.",
      },
      {
        id: "g2",
        scorer: "Jude Bellingham",
        minute: 38,
        teamId: "rma",
        assist: "F. Valverde",
      },
      {
        id: "g3",
        scorer: "Bruno Fernandes",
        minute: 52,
        teamId: "mun",
        isPenalty: true,
      },
    ],
    events: [
      {
        id: "e1",
        type: "goal",
        minute: 14,
        teamId: "rma",
        player: "Arda Güler",
        assistOrSubOut: "Vinícius Jr.",
        detail: "Curled into bottom left corner",
      },
      {
        id: "e2",
        type: "yellow_card",
        minute: 27,
        teamId: "mun",
        player: "Casemiro",
        detail: "Tactical foul",
      },
      {
        id: "e3",
        type: "goal",
        minute: 38,
        teamId: "rma",
        player: "Jude Bellingham",
        assistOrSubOut: "F. Valverde",
        detail: "Header from 8 yards",
      },
      {
        id: "e4",
        type: "var",
        minute: 50,
        teamId: "mun",
        player: "Penalty Awarded",
        detail: "Handball confirmed via VAR review",
      },
      {
        id: "e5",
        type: "goal",
        minute: 52,
        teamId: "mun",
        player: "Bruno Fernandes",
        detail: "Penalty converted",
      },
      {
        id: "e6",
        type: "substitution",
        minute: 62,
        teamId: "mun",
        player: "Alejandro Garnacho",
        assistOrSubOut: "Marcus Rashford",
      },
      {
        id: "e7",
        type: "yellow_card",
        minute: 65,
        teamId: "rma",
        player: "Dani Carvajal",
        detail: "Dissent",
      },
    ],
    stats: {
      possession: [58, 42],
      shots: [14, 8],
      shotsOnTarget: [6, 3],
      xg: [1.84, 1.12],
      corners: [6, 3],
      fouls: [9, 11],
      yellowCards: [1, 2],
      redCards: [0, 0],
      passes: [442, 318],
      passAccuracy: [88, 81],
    },
    lineups: {
      home: {
        formation: "4-3-3",
        manager: "Carlo Ancelotti",
        startingXI: [
          { id: "p1", name: "Thibaut Courtois", number: 1, position: "GK" },
          { id: "p2", name: "Dani Carvajal", number: 2, position: "DEF" },
          { id: "p3", name: "Éder Militão", number: 3, position: "DEF" },
          { id: "p4", name: "Antonio Rüdiger", number: 22, position: "DEF" },
          { id: "p5", name: "Ferland Mendy", number: 23, position: "DEF" },
          { id: "p6", name: "Federico Valverde", number: 8, position: "MID", isCaptain: true },
          { id: "p7", name: "Aurélien Tchouaméni", number: 14, position: "MID" },
          { id: "p8", name: "Jude Bellingham", number: 5, position: "MID" },
          { id: "p9", name: "Rodrygo", number: 11, position: "FWD" },
          { id: "p10", name: "Kylian Mbappé", number: 9, position: "FWD" },
          { id: "p11", name: "Vinícius Jr.", number: 7, position: "FWD" },
        ],
        bench: [
          { id: "b1", name: "Andriy Lunin", number: 13, position: "GK" },
          { id: "b2", name: "Luka Modrić", number: 10, position: "MID" },
          { id: "b3", name: "Eduardo Camavinga", number: 6, position: "MID" },
          { id: "b4", name: "Arda Güler", number: 15, position: "MID" },
          { id: "b5", name: "Endrick", number: 16, position: "FWD" },
        ],
      },
      away: {
        formation: "4-2-3-1",
        manager: "Ruben Amorim",
        startingXI: [
          { id: "u1", name: "André Onana", number: 24, position: "GK" },
          { id: "u2", name: "Diogo Dalot", number: 20, position: "DEF" },
          { id: "u3", name: "Matthijs de Ligt", number: 4, position: "DEF" },
          { id: "u4", name: "Lisandro Martínez", number: 6, position: "DEF" },
          { id: "u5", name: "Noussair Mazraoui", number: 3, position: "DEF" },
          { id: "u6", name: "Casemiro", number: 18, position: "MID" },
          { id: "u7", name: "Kobbie Mainoo", number: 37, position: "MID" },
          { id: "u8", name: "Amad Diallo", number: 16, position: "MID" },
          { id: "u9", name: "Bruno Fernandes", number: 8, position: "MID", isCaptain: true },
          { id: "u10", name: "Marcus Rashford", number: 10, position: "FWD" },
          { id: "u11", name: "Rasmus Højlund", number: 9, position: "FWD" },
        ],
        bench: [
          { id: "ub1", name: "Altay Bayındır", number: 1, position: "GK" },
          { id: "ub2", name: "Harry Maguire", number: 5, position: "DEF" },
          { id: "ub3", name: "Manuel Ugarte", number: 25, position: "MID" },
          { id: "ub4", name: "Alejandro Garnacho", number: 17, position: "FWD" },
          { id: "ub5", name: "Joshua Zirkzee", number: 11, position: "FWD" },
        ],
      },
    },
  },

  // 2. Premier League LIVE Match (Halftime)
  {
    id: "m2",
    homeTeam: arsenal,
    awayTeam: chelsea,
    homeScore: 1,
    awayScore: 0,
    status: "HALFTIME",
    minute: 45,
    kickoffTime: "17:30",
    date: "Today",
    venue: "Emirates Stadium, London",
    referee: "Michael Oliver",
    round: "Matchday 29",
    leagueId: "pl",
    goals: [
      {
        id: "g4",
        scorer: "Bukayo Saka",
        minute: 23,
        teamId: "ars",
        assist: "Martin Ødegaard",
      },
    ],
    events: [
      {
        id: "e8",
        type: "goal",
        minute: 23,
        teamId: "ars",
        player: "Bukayo Saka",
        assistOrSubOut: "M. Ødegaard",
      },
      {
        id: "e9",
        type: "yellow_card",
        minute: 41,
        teamId: "che",
        player: "Moisés Caicedo",
      },
    ],
    stats: {
      possession: [54, 46],
      shots: [7, 5],
      shotsOnTarget: [3, 1],
      xg: [0.94, 0.42],
      corners: [4, 2],
      fouls: [5, 7],
      yellowCards: [0, 1],
      redCards: [0, 0],
    },
  },

  // 3. Premier League FINISHED Match
  {
    id: "m3",
    homeTeam: liverpool,
    awayTeam: manCity,
    homeScore: 3,
    awayScore: 2,
    status: "FINISHED",
    minute: 90,
    kickoffTime: "15:00",
    date: "Today",
    venue: "Anfield, Liverpool",
    referee: "Anthony Taylor",
    round: "Matchday 29",
    leagueId: "pl",
    goals: [
      {
        id: "g5",
        scorer: "Erling Haaland",
        minute: 12,
        teamId: "mci",
        assist: "Kevin De Bruyne",
      },
      {
        id: "g6",
        scorer: "Mohamed Salah",
        minute: 34,
        teamId: "liv",
      },
      {
        id: "g7",
        scorer: "Alexis Mac Allister",
        minute: 57,
        teamId: "liv",
      },
      {
        id: "g8",
        scorer: "Phil Foden",
        minute: 73,
        teamId: "mci",
      },
      {
        id: "g9",
        scorer: "Darwin Núñez",
        minute: 88,
        teamId: "liv",
        assist: "Trent Alexander-Arnold",
      },
    ],
    events: [
      { id: "e10", type: "goal", minute: 12, teamId: "mci", player: "Erling Haaland" },
      { id: "e11", type: "goal", minute: 34, teamId: "liv", player: "Mohamed Salah" },
      { id: "e12", type: "goal", minute: 57, teamId: "liv", player: "Alexis Mac Allister" },
      { id: "e13", type: "goal", minute: 73, teamId: "mci", player: "Phil Foden" },
      { id: "e14", type: "yellow_card", minute: 81, teamId: "mci", player: "Rodri" },
      { id: "e15", type: "goal", minute: 88, teamId: "liv", player: "Darwin Núñez" },
    ],
    stats: {
      possession: [49, 51],
      shots: [16, 15],
      shotsOnTarget: [7, 6],
      xg: [2.31, 2.05],
      corners: [7, 5],
      fouls: [10, 8],
      yellowCards: [2, 1],
      redCards: [0, 0],
    },
  },

  // 4. Serie A UPCOMING Match
  {
    id: "m4",
    homeTeam: juventus,
    awayTeam: acMilan,
    homeScore: 0,
    awayScore: 0,
    status: "UPCOMING",
    minute: null,
    kickoffTime: "20:45",
    date: "Today",
    venue: "Allianz Stadium, Turin",
    round: "Matchday 28",
    leagueId: "seriea",
    goals: [],
  },

  // 5. La Liga FINISHED Match
  {
    id: "m5",
    homeTeam: barcelona,
    awayTeam: realMadrid,
    homeScore: 2,
    awayScore: 1,
    status: "FINISHED",
    minute: 90,
    kickoffTime: "Yesterday",
    date: "Yesterday",
    venue: "Estadi Olímpic Lluís Companys, Barcelona",
    round: "El Clásico • Matchday 28",
    leagueId: "laliga",
    goals: [
      { id: "g10", scorer: "Lamine Yamal", minute: 21, teamId: "bar" },
      { id: "g11", scorer: "Vinícius Jr.", minute: 48, teamId: "rma" },
      { id: "g12", scorer: "Robert Lewandowski", minute: 84, teamId: "bar" },
    ],
    stats: {
      possession: [56, 44],
      shots: [15, 11],
      shotsOnTarget: [5, 4],
      xg: [1.76, 1.25],
      corners: [6, 4],
      fouls: [12, 14],
      yellowCards: [3, 4],
      redCards: [0, 0],
    },
  },

  // 6. Bundesliga UPCOMING Match
  {
    id: "m6",
    homeTeam: bayernMunich,
    awayTeam: bvbDortmund,
    homeScore: 0,
    awayScore: 0,
    status: "UPCOMING",
    minute: null,
    kickoffTime: "18:30",
    date: "Tomorrow",
    venue: "Allianz Arena, Munich",
    round: "Der Klassiker • Matchday 26",
    leagueId: "bundesliga",
    goals: [],
  },

  // 7. Serie A LIVE Match
  {
    id: "m7",
    homeTeam: interMilan,
    awayTeam: juventus,
    homeScore: 1,
    awayScore: 1,
    status: "LIVE",
    minute: 74,
    kickoffTime: "18:00",
    date: "Today",
    venue: "San Siro, Milan",
    round: "Derby d'Italia",
    leagueId: "seriea",
    goals: [
      { id: "g13", scorer: "Lautaro Martínez", minute: 31, teamId: "int" },
      { id: "g14", scorer: "Dušan Vlahović", minute: 58, teamId: "juv" },
    ],
    stats: {
      possession: [52, 48],
      shots: [11, 9],
      shotsOnTarget: [4, 4],
      xg: [1.32, 1.15],
      corners: [5, 4],
      fouls: [11, 13],
      yellowCards: [2, 3],
      redCards: [0, 0],
    },
  },
];
