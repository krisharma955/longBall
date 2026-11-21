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
    <div className="flex flex-col h-full bg-[#0B0E10] text-[#E8ECE9] animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Top Sticky Nav with Back Button */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-[#1E2427] bg-[#0E1113]/95 backdrop-blur-md sticky top-0 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#8F9B9F] hover:text-white hover:bg-[#1A2023] transition-all active:scale-95"
          aria-label="Back to matches"
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

        <div className="flex items-center gap-1.5 max-w-[200px] truncate text-center">
          <span className="text-xs font-semibold text-[#D2DCD9] truncate">
            {league?.name || "Match Details"}
          </span>
        </div>

        <div className="w-14 flex justify-end">
          {isLive && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {match.minute}'
            </span>
          )}
          {isHalftime && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              HT
            </span>
          )}
          {isFinished && (
            <span className="text-[10px] font-bold text-[#8B969A] bg-[#1A1F22] px-2 py-0.5 rounded-md border border-[#272E32]">
              FT
            </span>
          )}
          {isUpcoming && (
            <span className="text-[10px] font-medium text-[#8B969A] bg-[#171C1E] px-2 py-0.5 rounded-md border border-[#242A2D]">
              {match.kickoffTime}
            </span>
          )}
        </div>
      </div>

      {/* Main Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-thin scrollbar-thumb-[#20272B] scrollbar-track-transparent">
        {/* Scoreboard Hero Banner */}
        <div className="mt-3 bg-gradient-to-b from-[#14181B] to-[#101315] border border-[#23292C] rounded-2xl p-4 shadow-lg">
          <div className="text-center mb-3">
            <span className="text-[11px] font-medium text-[#7E8B8F]">
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
                className="mb-2"
              />
              <span className="text-xs font-bold text-white tracking-wide">
                {match.homeTeam.name}
              </span>
            </div>

            {/* Score / Status Center */}
            <div className="flex flex-col items-center justify-center min-w-[90px] px-2">
              {isUpcoming ? (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-[#6D7A7E] tracking-widest uppercase">
                    VS
                  </span>
                  <span className="text-sm font-semibold text-emerald-400 mt-1">
                    {match.kickoffTime}
                  </span>
                  <span className="text-[10px] text-[#697579] mt-0.5">
                    {match.date || "Scheduled"}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                      {match.homeScore}
                    </span>
                    <span className="text-lg font-bold text-[#444E52]">-</span>
                    <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                      {match.awayScore}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-emerald-400 mt-1">
                    {isLive
                      ? `${match.minute}' Playing`
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
                className="mb-2"
              />
              <span className="text-xs font-bold text-white tracking-wide">
                {match.awayTeam.name}
              </span>
            </div>
          </div>

          {/* Stadium / Venue Snippet */}
          {match.venue && (
            <div className="mt-4 pt-3 border-t border-[#1C2225] flex items-center justify-center gap-1.5 text-[11px] text-[#717F83]">
              <svg
                className="w-3.5 h-3.5 text-[#596669]"
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
        <div className="flex items-center justify-around mt-4 mb-3 border-b border-[#1E2427] text-xs font-medium">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`pb-2.5 px-2 relative transition-colors ${
              activeTab === "timeline"
                ? "text-emerald-400 font-semibold"
                : "text-[#7B888C] hover:text-[#CCD5D4]"
            }`}
          >
            Timeline
            {activeTab === "timeline" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`pb-2.5 px-2 relative transition-colors ${
              activeTab === "stats"
                ? "text-emerald-400 font-semibold"
                : "text-[#7B888C] hover:text-[#CCD5D4]"
            }`}
          >
            Match Stats
            {activeTab === "stats" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("lineups")}
            className={`pb-2.5 px-2 relative transition-colors ${
              activeTab === "lineups"
                ? "text-emerald-400 font-semibold"
                : "text-[#7B888C] hover:text-[#CCD5D4]"
            }`}
          >
            Lineups
            {activeTab === "lineups" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("info")}
            className={`pb-2.5 px-2 relative transition-colors ${
              activeTab === "info"
                ? "text-emerald-400 font-semibold"
                : "text-[#7B888C] hover:text-[#CCD5D4]"
            }`}
          >
            Info
            {activeTab === "info" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Timeline */}
        {activeTab === "timeline" && (
          <div className="flex flex-col gap-2.5 py-1">
            {events.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#717F83]">
                {isUpcoming
                  ? "Timeline events will appear here once the match kicks off."
                  : "No major match incidents recorded."}
              </div>
            ) : (
              events.map((event) => {
                const isHome = event.teamId === match.homeTeam.id;
                return (
                  <div
                    key={event.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border border-[#1E2428] bg-[#121618] ${
                      isHome ? "flex-row" : "flex-row-reverse text-right"
                    }`}
                  >
                    {/* Event Icon */}
                    <div className="w-7 h-7 rounded-lg bg-[#181E21] border border-[#273035] flex items-center justify-center shrink-0 text-xs">
                      {event.type === "goal" && "⚽"}
                      {event.type === "yellow_card" && "🟨"}
                      {event.type === "red_card" && "🟥"}
                      {event.type === "substitution" && "🔄"}
                      {event.type === "var" && "🖥️"}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate">
                          {event.player}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold shrink-0">
                          {event.minute}'
                        </span>
                      </div>

                      {event.assistOrSubOut && (
                        <p className="text-[10px] text-[#7F8D91] mt-0.5 truncate">
                          {event.type === "substitution" ? "Out: " : "Assist: "}
                          {event.assistOrSubOut}
                        </p>
                      )}

                      {event.detail && (
                        <p className="text-[10px] text-[#647175] mt-0.5 truncate italic">
                          {event.detail}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Match Stats */}
        {activeTab === "stats" && (
          <div className="flex flex-col gap-3.5 py-2">
            {!stats ? (
              <div className="py-8 text-center text-xs text-[#717F83]">
                Match statistics are not available for this fixture yet.
              </div>
            ) : (
              <>
                <StatBar
                  label="Possession %"
                  home={stats.possession[0]}
                  away={stats.possession[1]}
                  unit="%"
                />
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
                {stats.xg && (
                  <StatBar
                    label="Expected Goals (xG)"
                    home={stats.xg[0]}
                    away={stats.xg[1]}
                    isFloat
                  />
                )}
                <StatBar
                  label="Corner Kicks"
                  home={stats.corners[0]}
                  away={stats.corners[1]}
                />
                <StatBar
                  label="Fouls"
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
                    label="Pass Accuracy %"
                    home={stats.passAccuracy[0]}
                    away={stats.passAccuracy[1]}
                    unit="%"
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* Tab 3: Lineups */}
        {activeTab === "lineups" && (
          <div className="flex flex-col gap-4 py-2">
            {!lineups ? (
              <div className="py-8 text-center text-xs text-[#717F83]">
                Lineups will be announced approximately 60 minutes prior to kickoff.
              </div>
            ) : (
              <>
                {/* Formations Banner */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#14181B] border border-[#21272A] text-xs">
                  <div>
                    <span className="font-bold text-white">
                      {match.homeTeam.shortName}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono ml-2">
                      {lineups.home.formation}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#5D6B6F] font-bold uppercase">
                    Formation
                  </span>
                  <div>
                    <span className="text-[11px] text-emerald-400 font-mono mr-2">
                      {lineups.away.formation}
                    </span>
                    <span className="font-bold text-white">
                      {match.awayTeam.shortName}
                    </span>
                  </div>
                </div>

                {/* Starting XI Lists */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Home XI */}
                  <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-[#121618] border border-[#1E2428]">
                    <span className="text-[10px] font-bold text-[#89979B] uppercase mb-1">
                      {match.homeTeam.shortName} XI
                    </span>
                    {lineups.home.startingXI.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center gap-1.5 text-[11px] truncate"
                      >
                        <span className="text-[10px] font-mono text-[#5E6C70] w-4 shrink-0 text-right">
                          {player.number}
                        </span>
                        <span className="truncate text-white font-medium">
                          {player.name}
                        </span>
                        {player.isCaptain && (
                          <span className="text-[9px] font-bold text-amber-400">
                            (C)
                          </span>
                        )}
                      </div>
                    ))}
                    {lineups.home.manager && (
                      <div className="mt-2 pt-2 border-t border-[#1C2225] text-[10px] text-[#717F83]">
                        Mgr: {lineups.home.manager}
                      </div>
                    )}
                  </div>

                  {/* Away XI */}
                  <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-[#121618] border border-[#1E2428]">
                    <span className="text-[10px] font-bold text-[#89979B] uppercase mb-1">
                      {match.awayTeam.shortName} XI
                    </span>
                    {lineups.away.startingXI.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center gap-1.5 text-[11px] truncate"
                      >
                        <span className="text-[10px] font-mono text-[#5E6C70] w-4 shrink-0 text-right">
                          {player.number}
                        </span>
                        <span className="truncate text-white font-medium">
                          {player.name}
                        </span>
                        {player.isCaptain && (
                          <span className="text-[9px] font-bold text-amber-400">
                            (C)
                          </span>
                        )}
                      </div>
                    ))}
                    {lineups.away.manager && (
                      <div className="mt-2 pt-2 border-t border-[#1C2225] text-[10px] text-[#717F83]">
                        Mgr: {lineups.away.manager}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 4: Info */}
        {activeTab === "info" && (
          <div className="flex flex-col gap-2 py-2 text-xs">
            <div className="p-3 rounded-xl bg-[#13171A] border border-[#21272B] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[#78868A]">Competition</span>
                <span className="font-semibold text-white">
                  {league?.name || "Football Tournament"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#78868A]">Stage / Round</span>
                <span className="font-medium text-white">
                  {match.round || "Regular"}
                </span>
              </div>
              {match.venue && (
                <div className="flex items-center justify-between">
                  <span className="text-[#78868A]">Venue</span>
                  <span className="font-medium text-white truncate max-w-[180px]">
                    {match.venue}
                  </span>
                </div>
              )}
              {match.referee && (
                <div className="flex items-center justify-between">
                  <span className="text-[#78868A]">Referee</span>
                  <span className="font-medium text-white">{match.referee}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[#78868A]">Status</span>
                <span className="font-medium text-emerald-400">{match.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable stat comparison bar
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
    <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[#121618] border border-[#1E2428]">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold font-mono text-white">
          {isFloat ? home.toFixed(2) : home}
          {unit}
        </span>
        <span className="text-[11px] font-medium text-[#7A888C]">{label}</span>
        <span className="font-bold font-mono text-white">
          {isFloat ? away.toFixed(2) : away}
          {unit}
        </span>
      </div>

      <div className="h-1.5 w-full bg-[#1A2125] rounded-full overflow-hidden flex">
        <div
          className="bg-emerald-500 h-full rounded-l-full transition-all duration-300"
          style={{ width: `${homePercent}%` }}
        />
        <div
          className="bg-[#3D474C] h-full rounded-r-full transition-all duration-300"
          style={{ width: `${100 - homePercent}%` }}
        />
      </div>
    </div>
  );
};
