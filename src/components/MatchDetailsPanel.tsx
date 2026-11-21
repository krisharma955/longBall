import React, { useState } from "react";
import type { Match, League } from "../types/football";
import { TeamCrest } from "./TeamCrest";

interface MatchDetailsPanelProps {
  match: Match;
  league?: League;
  onBack: () => void;
}

type DetailTab = "events" | "stats" | "lineups" | "info";

export const MatchDetailsPanel: React.FC<MatchDetailsPanelProps> = ({
  match,
  league,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>("events");

  const isLive = match.status === "LIVE";
  const isHalftime = match.status === "HALFTIME";
  const isUpcoming = match.status === "UPCOMING";
  const isFinished = match.status === "FINISHED";

  const events = match.events || [];
  const stats = match.stats;
  const lineups = match.lineups;

  return (
    <div className="flex flex-col h-full bg-[#050606] text-[#F5F6F6] animate-in fade-in slide-in-from-right-2 duration-150 ease-out">
      {/* Top Header / Back Affordance (Section 11) */}
      <div className="h-[56px] px-4 border-b border-[rgba(255,255,255,0.06)] bg-[#050606] flex items-center justify-between shrink-0 sticky top-0 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2 py-1 -ml-2 rounded-[12px] text-xs font-semibold text-[#A2A7A7] hover:text-[#F5F6F6] hover:bg-[#171919] transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#18B86A]"
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

        <span className="text-xs font-bold text-[#F5F6F6] truncate max-w-[170px] text-center">
          {league?.name || "Match Center"}
        </span>

        <div className="w-14 flex justify-end">
          {isLive && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#18B86A]/15 text-[#18B86A] border border-[#18B86A]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B86A] animate-pulse" />
              {match.minute ? `${match.minute}'` : "LIVE"}
            </span>
          )}
          {isHalftime && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25">
              HT
            </span>
          )}
          {isFinished && (
            <span className="text-[10px] font-bold text-[#A2A7A7] bg-[#171919] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.06)]">
              FT
            </span>
          )}
          {isUpcoming && (
            <span className="text-[10px] font-semibold text-[#F5F6F6] bg-[#171919] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.06)]">
              {match.kickoffTime}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-thin">
        {/* Scoreboard Hero Card */}
        <div className="mt-3 bg-[#171919] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-4 shadow-lg">
          <div className="text-center mb-3">
            <span className="text-[11px] font-medium text-[#727878] uppercase tracking-wider">
              {match.round || "Match Details"}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* Home Team */}
            <div className="flex flex-col items-center text-center min-w-0">
              <TeamCrest
                src={match.homeTeam.logo}
                name={match.homeTeam.name}
                shortName={match.homeTeam.shortName}
                size="lg"
                className="mb-1.5"
              />
              <span className="text-[13px] font-semibold text-[#F5F6F6] line-clamp-1">
                {match.homeTeam.name}
              </span>
            </div>

            {/* Score & Live Time */}
            <div className="flex flex-col items-center justify-center min-w-[84px] px-2">
              {isUpcoming ? (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-[#727878] tracking-widest uppercase">
                    VS
                  </span>
                  <span className="text-base font-bold text-[#F5F6F6] mt-1">
                    {match.kickoffTime}
                  </span>
                  <span className="text-[11px] text-[#727878] mt-0.5">
                    {match.date || "Today"}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 font-mono text-[34px] font-bold tabular-nums tracking-tight text-[#F5F6F6] leading-none">
                    <span>{match.homeScore}</span>
                    <span className="text-base text-[#727878] font-normal">-</span>
                    <span>{match.awayScore}</span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#18B86A] mt-1.5">
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
            <div className="flex flex-col items-center text-center min-w-0">
              <TeamCrest
                src={match.awayTeam.logo}
                name={match.awayTeam.name}
                shortName={match.awayTeam.shortName}
                size="lg"
                className="mb-1.5"
              />
              <span className="text-[13px] font-semibold text-[#F5F6F6] line-clamp-1">
                {match.awayTeam.name}
              </span>
            </div>
          </div>

          {match.venue && (
            <div className="mt-3.5 pt-2.5 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-center gap-1.5 text-[11px] text-[#727878]">
              <svg
                className="w-3.5 h-3.5"
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

        {/* Navigation Tabs (Section 11) */}
        <div className="flex items-center justify-around mt-3.5 mb-3 border-b border-[rgba(255,255,255,0.06)] text-xs font-medium">
          {(["events", "stats", "lineups", "info"] as DetailTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-2 capitalize relative transition-colors ${
                activeTab === tab
                  ? "text-[#18B86A] font-semibold"
                  : "text-[#727878] hover:text-[#F5F6F6]"
              }`}
            >
              {tab === "events" ? "Overview" : tab === "stats" ? "Stats" : tab === "lineups" ? "Lineups" : "Info"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#18B86A] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Match Events */}
        {activeTab === "events" && (
          <div className="py-1">
            {events.length === 0 ? (
              <div className="py-10 text-center text-xs text-[#727878]">
                {isUpcoming
                  ? "Match events will update live once kickoff begins."
                  : "No incidents recorded for this fixture."}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {events.map((event) => {
                  const isHome = event.teamId === match.homeTeam.id;
                  return (
                    <div
                      key={event.id}
                      className="p-2.5 rounded-[12px] bg-[#171919] border border-[rgba(255,255,255,0.06)] flex items-start justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-[#F5F6F6] truncate">
                            {event.player}
                          </span>
                          <span className="text-[10px] text-[#727878] font-medium">
                            ({isHome ? match.homeTeam.shortName : match.awayTeam.shortName})
                          </span>
                        </div>
                        {event.assistOrSubOut && (
                          <p className="text-[10px] text-[#A2A7A7] mt-0.5 truncate">
                            Assist: {event.assistOrSubOut}
                          </p>
                        )}
                        {event.detail && (
                          <p className="text-[10px] text-[#727878] mt-0.5 truncate italic">
                            {event.detail}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[11px] font-mono font-bold text-[#18B86A]">
                          {event.minute}'
                        </span>
                        <div className="w-6 h-6 rounded bg-[#202222] flex items-center justify-center text-xs">
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
            )}
          </div>
        )}

        {/* Tab 2: Real Match Stats */}
        {activeTab === "stats" && (
          <div className="flex flex-col gap-2 py-1">
            {!stats ? (
              <div className="py-10 text-center text-xs text-[#727878]">
                Match statistics will become available once the fixture kicks off.
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-2 text-xs font-semibold text-[#A2A7A7] mb-1">
                  <span>{match.homeTeam.shortName}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#727878]">Match Stats</span>
                  <span>{match.awayTeam.shortName}</span>
                </div>

                <StatBar label="Ball Possession" home={stats.possession[0]} away={stats.possession[1]} unit="%" />
                <StatBar label="Total Shots" home={stats.shots[0]} away={stats.shots[1]} />
                <StatBar label="Shots on Target" home={stats.shotsOnTarget[0]} away={stats.shotsOnTarget[1]} />
                <StatBar label="Corner Kicks" home={stats.corners[0]} away={stats.corners[1]} />
                <StatBar label="Fouls Committed" home={stats.fouls[0]} away={stats.fouls[1]} />
                <StatBar label="Yellow Cards" home={stats.yellowCards[0]} away={stats.yellowCards[1]} />
                {stats.passAccuracy && (
                  <StatBar label="Pass Accuracy" home={stats.passAccuracy[0]} away={stats.passAccuracy[1]} unit="%" />
                )}
              </>
            )}
          </div>
        )}

        {/* Tab 3: Real Lineups */}
        {activeTab === "lineups" && (
          <div className="flex flex-col gap-3 py-1">
            {!lineups ? (
              <div className="py-10 text-center text-xs text-[#727878]">
                Official team lineups are confirmed ~60 minutes prior to kickoff.
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#171919] border border-[rgba(255,255,255,0.06)] text-xs">
                  <div>
                    <span className="font-bold text-[#F5F6F6]">{match.homeTeam.shortName}</span>
                    <span className="text-[11px] text-[#18B86A] font-mono ml-2 font-bold">{lineups.home.formation}</span>
                  </div>
                  <span className="text-[10px] text-[#727878] font-bold uppercase tracking-wider">Formations</span>
                  <div>
                    <span className="text-[11px] text-[#18B86A] font-mono mr-2 font-bold">{lineups.away.formation}</span>
                    <span className="font-bold text-[#F5F6F6]">{match.awayTeam.shortName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Home XI */}
                  <div className="flex flex-col gap-1 p-2 rounded-[12px] bg-[#171919] border border-[rgba(255,255,255,0.06)]">
                    <span className="text-[10px] font-bold text-[#A2A7A7] uppercase mb-1 px-1">
                      {match.homeTeam.shortName} XI
                    </span>
                    {lineups.home.startingXI.map((player) => (
                      <div key={player.id} className="flex items-center gap-1.5 p-1 rounded text-[11px] truncate">
                        <span className="text-[10px] font-mono text-[#727878] w-3.5 shrink-0 text-right">
                          {player.number}
                        </span>
                        <span className="truncate text-[#F5F6F6] font-medium">
                          {player.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Away XI */}
                  <div className="flex flex-col gap-1 p-2 rounded-[12px] bg-[#171919] border border-[rgba(255,255,255,0.06)]">
                    <span className="text-[10px] font-bold text-[#A2A7A7] uppercase mb-1 px-1">
                      {match.awayTeam.shortName} XI
                    </span>
                    {lineups.away.startingXI.map((player) => (
                      <div key={player.id} className="flex items-center gap-1.5 p-1 rounded text-[11px] truncate">
                        <span className="text-[10px] font-mono text-[#727878] w-3.5 shrink-0 text-right">
                          {player.number}
                        </span>
                        <span className="truncate text-[#F5F6F6] font-medium">
                          {player.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 4: Match Info */}
        {activeTab === "info" && (
          <div className="flex flex-col gap-2 py-1 text-xs">
            <div className="p-3 rounded-[12px] bg-[#171919] border border-[rgba(255,255,255,0.06)] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[#727878]">Competition</span>
                <span className="font-semibold text-[#F5F6F6]">{league?.name || "Tournament"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#727878]">Stage / Round</span>
                <span className="font-medium text-[#F5F6F6]">{match.round || "Regular"}</span>
              </div>
              {match.venue && (
                <div className="flex items-center justify-between">
                  <span className="text-[#727878]">Venue</span>
                  <span className="font-medium text-[#F5F6F6] truncate max-w-[170px]">{match.venue}</span>
                </div>
              )}
              {match.referee && (
                <div className="flex items-center justify-between">
                  <span className="text-[#727878]">Referee</span>
                  <span className="font-medium text-[#F5F6F6]">{match.referee}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[#727878]">Match Status</span>
                <span className="font-semibold text-[#18B86A]">{match.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatBar: React.FC<{
  label: string;
  home: number;
  away: number;
  unit?: string;
}> = ({ label, home, away, unit = "" }) => {
  const total = home + away || 1;
  const homePercent = Math.max(10, Math.min(90, Math.round((home / total) * 100)));

  return (
    <div className="flex flex-col gap-1 p-2 rounded-[12px] bg-[#171919] border border-[rgba(255,255,255,0.06)]">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold font-mono text-[#F5F6F6]">{home}{unit}</span>
        <span className="text-[11px] font-medium text-[#A2A7A7]">{label}</span>
        <span className="font-bold font-mono text-[#F5F6F6]">{away}{unit}</span>
      </div>

      <div className="h-1.5 w-full bg-[#252727] rounded-full overflow-hidden flex">
        <div className="bg-[#18B86A] h-full rounded-l-full transition-all duration-300" style={{ width: `${homePercent}%` }} />
        <div className="bg-[#727878] h-full rounded-r-full transition-all duration-300" style={{ width: `${100 - homePercent}%` }} />
      </div>
    </div>
  );
};
