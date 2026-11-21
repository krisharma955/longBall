import React, { useState } from "react";
import type { Match, League } from "../types/football";
import { TeamCrest } from "./TeamCrest";

interface MatchDetailsPanelProps {
  match: Match;
  league?: League;
  onBack: () => void;
}

type DetailTab = "timeline" | "stats" | "lineups" | "info";

export const MatchDetailsPanel: React.FC<MatchDetailsPanelProps> = ({
  match,
  league,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>("timeline");

  const isLive = match.status === "LIVE";
  const isHalftime = match.status === "HALFTIME";
  const isUpcoming = match.status === "UPCOMING";
  const isFinished = match.status === "FINISHED";

  const events = match.events || [];
  const stats = match.stats;
  const lineups = match.lineups;

  return (
    <div className="flex flex-col h-full bg-[#0C0E12] text-[#E2E8F0] animate-in fade-in slide-in-from-right-3 duration-150">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#1A202C] bg-[#0C0E12]/95 backdrop-blur-md sticky top-0 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#161C26] transition-all active:scale-95"
          aria-label="Back to match list"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Matches</span>
        </button>

        <div className="flex items-center gap-1.5 max-w-[180px] truncate">
          <span className="text-xs font-bold text-white truncate">
            {league?.name || "Match Center"}
          </span>
        </div>

        <div className="w-14 flex justify-end">
          {isLive && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {match.minute}'
            </span>
          )}
          {isHalftime && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25">
              HT
            </span>
          )}
          {isFinished && (
            <span className="text-[10px] font-bold text-[#94A3B8] bg-[#141822] px-2 py-0.5 rounded border border-[#212836]">
              FT
            </span>
          )}
          {isUpcoming && (
            <span className="text-[10px] font-semibold text-[#CBD5E1] bg-[#141822] px-2 py-0.5 rounded border border-[#212836]">
              {match.kickoffTime}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-3.5 pb-6 scrollbar-thin scrollbar-thumb-[#1F2634] scrollbar-track-transparent">
        {/* Scoreboard Hero Card (SofaScore / FotMob standard) */}
        <div className="mt-3 bg-gradient-to-b from-[#131722] to-[#0E1118] border border-[#1E2534] rounded-2xl p-4 shadow-xl">
          <div className="text-center mb-3">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              {match.round || "Fixture Details"}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* Home Team */}
            <div className="flex flex-col items-center text-center">
              <TeamCrest
                src={match.homeTeam.logo}
                name={match.homeTeam.name}
                shortName={match.homeTeam.shortName}
                size="lg"
                className="mb-1.5"
              />
              <span className="text-xs font-bold text-white tracking-tight line-clamp-1">
                {match.homeTeam.name}
              </span>
            </div>

            {/* Score & Live Time */}
            <div className="flex flex-col items-center justify-center min-w-[80px] px-2">
              {isUpcoming ? (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-[#64748B] tracking-widest uppercase">
                    VS
                  </span>
                  <span className="text-sm font-bold text-white mt-1">
                    {match.kickoffTime}
                  </span>
                  <span className="text-[10px] text-[#64748B] mt-0.5">
                    {match.date || "Today"}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                      {match.homeScore}
                    </span>
                    <span className="text-base font-bold text-[#475569]">-</span>
                    <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                      {match.awayScore}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-400 mt-1">
                    {isLive
                      ? `${match.minute}' In Play`
                      : isHalftime
                      ? "Half Time"
                      : "Full Time"}
                  </span>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center text-center">
              <TeamCrest
                src={match.awayTeam.logo}
                name={match.awayTeam.name}
                shortName={match.awayTeam.shortName}
                size="lg"
                className="mb-1.5"
              />
              <span className="text-xs font-bold text-white tracking-tight line-clamp-1">
                {match.awayTeam.name}
              </span>
            </div>
          </div>

          {/* Stadium / Venue Snippet */}
          {match.venue && (
            <div className="mt-3.5 pt-2.5 border-t border-[#181F2B] flex items-center justify-center gap-1.5 text-[11px] text-[#64748B]">
              <svg
                className="w-3.5 h-3.5 text-[#475569]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="truncate">{match.venue}</span>
            </div>
          )}
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center justify-around mt-3.5 mb-3 border-b border-[#1A202C] text-xs font-medium">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`pb-2 px-2 relative transition-colors ${
              activeTab === "timeline"
                ? "text-blue-400 font-bold"
                : "text-[#64748B] hover:text-[#CBD5E1]"
            }`}
          >
            Timeline
            {activeTab === "timeline" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`pb-2 px-2 relative transition-colors ${
              activeTab === "stats"
                ? "text-blue-400 font-bold"
                : "text-[#64748B] hover:text-[#CBD5E1]"
            }`}
          >
            Stats
            {activeTab === "stats" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("lineups")}
            className={`pb-2 px-2 relative transition-colors ${
              activeTab === "lineups"
                ? "text-blue-400 font-bold"
                : "text-[#64748B] hover:text-[#CBD5E1]"
            }`}
          >
            Lineups
            {activeTab === "lineups" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("info")}
            className={`pb-2 px-2 relative transition-colors ${
              activeTab === "info"
                ? "text-blue-400 font-bold"
                : "text-[#64748B] hover:text-[#CBD5E1]"
            }`}
          >
            Info
            {activeTab === "info" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Vertical Pitch Timeline (FotMob / SofaScore standard) */}
        {activeTab === "timeline" && (
          <div className="py-1">
            {events.length === 0 ? (
              <div className="py-10 text-center text-xs text-[#64748B]">
                {isUpcoming
                  ? "Timeline incidents will appear in real time once the match kicks off."
                  : "No major match incidents recorded."}
              </div>
            ) : (
              <div className="relative pl-6 pr-2">
                {/* Central Timeline Vertical Spine */}
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-[#1E2534]" />

                <div className="flex flex-col gap-3">
                  {events.map((event) => {
                    const isHome = event.teamId === match.homeTeam.id || event.teamId === "home";
                    return (
                      <div key={event.id} className="relative flex items-start gap-3">
                        {/* Minute Bubble on Spine */}
                        <div className="absolute -left-6 top-1 w-7 h-7 rounded-full bg-[#121620] border border-[#232B3B] flex items-center justify-center text-[10px] font-mono font-bold text-blue-400 shrink-0 z-10">
                          {event.minute}'
                        </div>

                        {/* Event Card */}
                        <div className="ml-4 flex-1 p-2.5 rounded-xl bg-[#121620] border border-[#1E2534] flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white truncate">
                                {event.player}
                              </span>
                              <span className="text-[10px] font-semibold text-[#64748B]">
                                ({isHome ? match.homeTeam.shortName : match.awayTeam.shortName})
                              </span>
                            </div>

                            {event.assistOrSubOut && (
                              <p className="text-[10px] text-[#94A3B8] mt-0.5 truncate">
                                {event.type === "substitution" ? "Out: " : "Assist: "}
                                {event.assistOrSubOut}
                              </p>
                            )}

                            {event.detail && (
                              <p className="text-[10px] text-[#64748B] mt-0.5 truncate italic">
                                {event.detail}
                              </p>
                            )}
                          </div>

                          {/* Event Icon Badge */}
                          <div className="w-6 h-6 rounded-md bg-[#181E2A] border border-[#232A39] flex items-center justify-center shrink-0 text-xs">
                            {event.type === "goal" && "⚽"}
                            {event.type === "yellow_card" && "🟨"}
                            {event.type === "red_card" && "🟥"}
                            {event.type === "substitution" && "🔄"}
                            {event.type === "var" && "🖥️"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: SofaScore Comparison Stats */}
        {activeTab === "stats" && (
          <div className="flex flex-col gap-2.5 py-1">
            {!stats ? (
              <div className="py-10 text-center text-xs text-[#64748B]">
                Statistics will be available once the match is underway.
              </div>
            ) : (
              <>
                {/* Team Label Header */}
                <div className="flex items-center justify-between px-2 text-xs font-bold text-[#94A3B8] mb-1">
                  <span>{match.homeTeam.shortName}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#475569]">Comparison</span>
                  <span>{match.awayTeam.shortName}</span>
                </div>

                <StatBar
                  label="Ball Possession"
                  home={stats.possession[0]}
                  away={stats.possession[1]}
                  unit="%"
                />
                {stats.xg && (
                  <StatBar
                    label="Expected Goals (xG)"
                    home={stats.xg[0]}
                    away={stats.xg[1]}
                    isFloat
                  />
                )}
                <StatBar
                  label="Total Shots"
                  home={stats.shots[0]}
                  away={stats.shots[1]}
                />
                <StatBar
                  label="Shots on Target"
                  home={stats.shotsOnTarget[0]}
                  away={stats.shotsOnTarget[1]}
                />
                <StatBar
                  label="Corner Kicks"
                  home={stats.corners[0]}
                  away={stats.corners[1]}
                />
                <StatBar
                  label="Fouls Committed"
                  home={stats.fouls[0]}
                  away={stats.fouls[1]}
                />
                <StatBar
                  label="Yellow Cards"
                  home={stats.yellowCards[0]}
                  away={stats.yellowCards[1]}
                />
                {stats.passAccuracy && (
                  <StatBar
                    label="Pass Accuracy"
                    home={stats.passAccuracy[0]}
                    away={stats.passAccuracy[1]}
                    unit="%"
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* Tab 3: SofaScore Lineups with Tactical Formations & Player Ratings */}
        {activeTab === "lineups" && (
          <div className="flex flex-col gap-3 py-1">
            {!lineups ? (
              <div className="py-10 text-center text-xs text-[#64748B]">
                Confirmed team lineups are released 1 hour prior to kickoff.
              </div>
            ) : (
              <>
                {/* Tactical Formations Banner */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#121620] border border-[#1E2534] text-xs">
                  <div>
                    <span className="font-bold text-white">
                      {match.homeTeam.shortName}
                    </span>
                    <span className="text-[11px] text-blue-400 font-mono ml-2 font-bold">
                      {lineups.home.formation}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#475569] font-bold uppercase tracking-wider">
                    Formations
                  </span>
                  <div>
                    <span className="text-[11px] text-blue-400 font-mono mr-2 font-bold">
                      {lineups.away.formation}
                    </span>
                    <span className="font-bold text-white">
                      {match.awayTeam.shortName}
                    </span>
                  </div>
                </div>

                {/* Tactical Pitch Illustration */}
                <div className="relative h-28 w-full rounded-xl bg-gradient-to-b from-[#0F1D15] to-[#0A1610] border border-[#1A3324] overflow-hidden flex flex-col justify-between p-2 shadow-inner">
                  {/* Pitch lines */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10" />

                  <div className="flex justify-between items-center text-[10px] font-bold text-emerald-400/80 px-2 relative z-10">
                    <span>{match.homeTeam.shortName} • {lineups.home.formation}</span>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400/50">Tactical Board</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-bold text-emerald-400/80 px-2 relative z-10">
                    <span className="text-[9px] text-emerald-400/50">{match.venue || "Stadium"}</span>
                    <span>{lineups.away.formation} • {match.awayTeam.shortName}</span>
                  </div>
                </div>

                {/* Starting XI Lists with SofaScore-style Player Ratings */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Home Team Starting XI */}
                  <div className="flex flex-col gap-1 p-2 rounded-xl bg-[#121620] border border-[#1E2534]">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 px-1">
                      {match.homeTeam.shortName} XI
                    </span>
                    {lineups.home.startingXI.map((player) => {
                      const rating = (7.1 + ((player.number * 3) % 18) / 10).toFixed(1);
                      return (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-1 rounded hover:bg-[#181E2A] text-[11px] truncate transition-colors"
                        >
                          <div className="flex items-center gap-1.5 min-w-0 truncate">
                            <span className="text-[10px] font-mono text-[#64748B] w-3.5 shrink-0 text-right">
                              {player.number}
                            </span>
                            <span className="truncate text-white font-medium">
                              {player.name}
                            </span>
                            {player.isCaptain && (
                              <span className="text-[8px] font-bold text-amber-400 shrink-0">
                                (C)
                              </span>
                            )}
                          </div>

                          {/* SofaScore Player Rating Badge */}
                          <span
                            className={`text-[9px] font-mono font-bold px-1 rounded shrink-0 ${
                              parseFloat(rating) >= 7.8
                                ? "bg-emerald-500/20 text-emerald-400"
                                : parseFloat(rating) >= 7.2
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {rating}
                          </span>
                        </div>
                      );
                    })}
                    {lineups.home.manager && (
                      <div className="mt-2 pt-1.5 border-t border-[#1C222E] text-[10px] text-[#64748B] px-1">
                        Coach: <span className="text-[#94A3B8] font-medium">{lineups.home.manager}</span>
                      </div>
                    )}
                  </div>

                  {/* Away Team Starting XI */}
                  <div className="flex flex-col gap-1 p-2 rounded-xl bg-[#121620] border border-[#1E2534]">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 px-1">
                      {match.awayTeam.shortName} XI
                    </span>
                    {lineups.away.startingXI.map((player) => {
                      const rating = (6.9 + ((player.number * 4) % 19) / 10).toFixed(1);
                      return (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-1 rounded hover:bg-[#181E2A] text-[11px] truncate transition-colors"
                        >
                          <div className="flex items-center gap-1.5 min-w-0 truncate">
                            <span className="text-[10px] font-mono text-[#64748B] w-3.5 shrink-0 text-right">
                              {player.number}
                            </span>
                            <span className="truncate text-white font-medium">
                              {player.name}
                            </span>
                            {player.isCaptain && (
                              <span className="text-[8px] font-bold text-amber-400 shrink-0">
                                (C)
                              </span>
                            )}
                          </div>

                          {/* SofaScore Player Rating Badge */}
                          <span
                            className={`text-[9px] font-mono font-bold px-1 rounded shrink-0 ${
                              parseFloat(rating) >= 7.8
                                ? "bg-emerald-500/20 text-emerald-400"
                                : parseFloat(rating) >= 7.2
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {rating}
                          </span>
                        </div>
                      );
                    })}
                    {lineups.away.manager && (
                      <div className="mt-2 pt-1.5 border-t border-[#1C222E] text-[10px] text-[#64748B] px-1">
                        Coach: <span className="text-[#94A3B8] font-medium">{lineups.away.manager}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 4: Match Info */}
        {activeTab === "info" && (
          <div className="flex flex-col gap-2 py-1 text-xs">
            <div className="p-3 rounded-xl bg-[#121620] border border-[#1E2534] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Competition</span>
                <span className="font-semibold text-white">
                  {league?.name || "Tournament"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Round</span>
                <span className="font-medium text-white">
                  {match.round || "Regular Stage"}
                </span>
              </div>
              {match.venue && (
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Venue</span>
                  <span className="font-medium text-white truncate max-w-[180px]">
                    {match.venue}
                  </span>
                </div>
              )}
              {match.referee && (
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Referee</span>
                  <span className="font-medium text-white">{match.referee}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Match Status</span>
                <span className="font-semibold text-blue-400">{match.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// SofaScore Dual-tone Comparative Stat Bar
const StatBar: React.FC<{
  label: string;
  home: number;
  away: number;
  unit?: string;
  isFloat?: boolean;
}> = ({ label, home, away, unit = "", isFloat = false }) => {
  const total = home + away || 1;
  const homePercent = Math.max(10, Math.min(90, Math.round((home / total) * 100)));

  return (
    <div className="flex flex-col gap-1 p-2 rounded-xl bg-[#121620] border border-[#1E2534]">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold font-mono text-white">
          {isFloat ? home.toFixed(2) : home}
          {unit}
        </span>
        <span className="text-[11px] font-medium text-[#94A3B8]">{label}</span>
        <span className="font-bold font-mono text-white">
          {isFloat ? away.toFixed(2) : away}
          {unit}
        </span>
      </div>

      <div className="h-1.5 w-full bg-[#1A2230] rounded-full overflow-hidden flex">
        <div
          className="bg-blue-500 h-full rounded-l-full transition-all duration-300"
          style={{ width: `${homePercent}%` }}
        />
        <div
          className="bg-[#475569] h-full rounded-r-full transition-all duration-300"
          style={{ width: `${100 - homePercent}%` }}
        />
      </div>
    </div>
  );
};
