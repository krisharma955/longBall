import React from "react";
import type { Match, League } from "../types/football";
import { TeamCrest } from "./TeamCrest";

interface MatchCardProps {
  match: Match;
  league?: League;
  onClick: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  league,
  onClick,
}) => {
  const isLive = match.status === "LIVE";
  const isHalftime = match.status === "HALFTIME";
  const isUpcoming = match.status === "UPCOMING";
  const isFinished = match.status === "FINISHED";
  const isPostponed = match.status === "POSTPONED" || match.status === "CANCELLED";

  // Quick summary of recent goals (max 2)
  const recentGoals = match.goals.slice(-2);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(match)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(match);
        }
      }}
      className="group relative bg-[#121618] hover:bg-[#161B1E] border border-[#23282B] hover:border-emerald-500/40 rounded-xl p-3.5 mb-2.5 cursor-pointer transition-all duration-150 active:scale-[0.99] focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
    >
      {/* Top Bar: League & Status */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] font-medium text-[#7E898D] truncate">
            {league?.name || "Competition"}
          </span>
          {match.round && (
            <>
              <span className="text-[#3A4347] text-[10px]">•</span>
              <span className="text-[10px] text-[#637074] truncate">
                {match.round}
              </span>
            </>
          )}
        </div>

        {/* Status Pill */}
        <div className="shrink-0">
          {isLive && (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{match.minute ? `${match.minute}'` : "LIVE"}</span>
            </div>
          )}

          {isHalftime && (
            <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold text-[11px]">
              <span>HT</span>
            </div>
          )}

          {isFinished && (
            <span className="text-[11px] font-semibold text-[#8B969A] bg-[#1A1F22] px-2 py-0.5 rounded-md border border-[#272E32]">
              FT
            </span>
          )}

          {isUpcoming && (
            <span className="text-[11px] font-medium text-[#8B969A] bg-[#171C1E] px-2 py-0.5 rounded-md border border-[#242A2D]">
              {match.kickoffTime || "Upcoming"}
            </span>
          )}

          {isPostponed && (
            <span className="text-[11px] font-semibold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded-md border border-rose-500/30">
              {match.status}
            </span>
          )}
        </div>
      </div>

      {/* Main Scoreboard / Teams Layout */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-1.5 text-center min-w-0">
          <TeamCrest
            src={match.homeTeam.logo}
            name={match.homeTeam.name}
            shortName={match.homeTeam.shortName}
            size="md"
          />
          <div className="w-full">
            <span className="text-xs font-semibold text-white block truncate">
              {match.homeTeam.shortName}
            </span>
            <span className="text-[10px] text-[#697579] block truncate hidden sm:block">
              {match.homeTeam.name}
            </span>
          </div>
        </div>

        {/* Center Score / Versus Display */}
        <div className="flex flex-col items-center justify-center min-w-[72px] px-1">
          {isUpcoming ? (
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-[#6D7A7E] tracking-wider uppercase">
                VS
              </span>
              {match.kickoffTime && (
                <span className="text-[10px] text-emerald-400 font-medium mt-0.5">
                  {match.kickoffTime}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-bold tracking-tight font-mono ${
                  isLive
                    ? "text-white"
                    : isFinished
                    ? "text-[#DEE4E2]"
                    : "text-white"
                }`}
              >
                {match.homeScore}
              </span>
              <span className="text-[#3F484C] font-semibold text-sm">-</span>
              <span
                className={`text-2xl font-bold tracking-tight font-mono ${
                  isLive
                    ? "text-white"
                    : isFinished
                    ? "text-[#DEE4E2]"
                    : "text-white"
                }`}
              >
                {match.awayScore}
              </span>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-1.5 text-center min-w-0">
          <TeamCrest
            src={match.awayTeam.logo}
            name={match.awayTeam.name}
            shortName={match.awayTeam.shortName}
            size="md"
          />
          <div className="w-full">
            <span className="text-xs font-semibold text-white block truncate">
              {match.awayTeam.shortName}
            </span>
            <span className="text-[10px] text-[#697579] block truncate hidden sm:block">
              {match.awayTeam.name}
            </span>
          </div>
        </div>
      </div>

      {/* Goal Scorers Snippet (if any) */}
      {recentGoals.length > 0 && !isUpcoming && (
        <div className="mt-3 pt-2.5 border-t border-[#1C2124] flex flex-col gap-1">
          {recentGoals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center justify-between text-[10px] text-[#7F8A8D]"
            >
              <div className="flex items-center gap-1 truncate">
                <span className="text-emerald-400">⚽</span>
                <span className="truncate text-[#9EA8AB] font-medium">
                  {goal.scorer}
                </span>
              </div>
              <span className="font-mono text-[#6A767A] shrink-0 font-medium">
                {goal.minute}'
              </span>
            </div>
          ))}
          {match.goals.length > 2 && (
            <span className="text-[9px] text-[#556165] text-center pt-0.5">
              +{match.goals.length - 2} more goal
              {match.goals.length - 2 > 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}

      {/* Micro drilldown chevron hint */}
      <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-3.5 h-3.5 text-[#637074]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </div>
  );
};
