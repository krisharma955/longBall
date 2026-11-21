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
  void league;
  const isLive = match.status === "LIVE";
  const isHalftime = match.status === "HALFTIME";
  const isUpcoming = match.status === "UPCOMING";
  const isFinished = match.status === "FINISHED";
  const isPostponed = match.status === "POSTPONED" || match.status === "CANCELLED";

  const homeWinning = !isUpcoming && match.homeScore > match.awayScore;
  const awayWinning = !isUpcoming && match.awayScore > match.homeScore;

  // Recent goal snippet
  const lastGoal = match.goals.length > 0 ? match.goals[match.goals.length - 1] : null;

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
      className="group bg-[#12161F] hover:bg-[#181E29] border border-[#1E2533] hover:border-[#2B3547] rounded-xl p-2.5 mb-2 cursor-pointer transition-all duration-150 active:scale-[0.99] focus:outline-none focus:ring-1 focus:ring-blue-500/40"
    >
      <div className="flex items-center gap-3">
        {/* Left Status / Time Column (FotMob / SofaScore signature) */}
        <div className="flex flex-col items-center justify-center w-12 shrink-0 border-r border-[#1C222E] pr-2.5">
          {isLive && (
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {match.minute ? `${match.minute}'` : "LIVE"}
              </span>
            </div>
          )}

          {isHalftime && (
            <span className="text-[10px] font-bold text-amber-400 font-mono">
              HT
            </span>
          )}

          {isFinished && (
            <span className="text-[11px] font-semibold text-[#64748B] font-mono">
              FT
            </span>
          )}

          {isUpcoming && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-[#CBD5E1] font-mono">
                {match.kickoffTime || "TBD"}
              </span>
            </div>
          )}

          {isPostponed && (
            <span className="text-[9px] font-bold text-rose-400 uppercase tracking-tight">
              PSTP
            </span>
          )}
        </div>

        {/* Center Teams Column (2 stacked rows for clean readability) */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5 justify-center">
          {/* Home Team Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <TeamCrest
                src={match.homeTeam.logo}
                name={match.homeTeam.name}
                shortName={match.homeTeam.shortName}
                size="sm"
              />
              <span
                className={`text-xs truncate ${
                  homeWinning ? "font-bold text-white" : "font-medium text-[#CBD5E1]"
                }`}
              >
                {match.homeTeam.name}
              </span>
            </div>
            {!isUpcoming && (
              <span
                className={`text-xs font-mono font-bold shrink-0 ${
                  homeWinning ? "text-white" : "text-[#718096]"
                }`}
              >
                {match.homeScore}
              </span>
            )}
          </div>

          {/* Away Team Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <TeamCrest
                src={match.awayTeam.logo}
                name={match.awayTeam.name}
                shortName={match.awayTeam.shortName}
                size="sm"
              />
              <span
                className={`text-xs truncate ${
                  awayWinning ? "font-bold text-white" : "font-medium text-[#CBD5E1]"
                }`}
              >
                {match.awayTeam.name}
              </span>
            </div>
            {!isUpcoming && (
              <span
                className={`text-xs font-mono font-bold shrink-0 ${
                  awayWinning ? "text-white" : "text-[#718096]"
                }`}
              >
                {match.awayScore}
              </span>
            )}
          </div>
        </div>

        {/* Right Arrow / Detail Indicator */}
        <div className="text-[#3B4659] group-hover:text-[#94A3B8] transition-colors shrink-0 pl-1">
          <svg
            className="w-3.5 h-3.5"
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

      {/* Goal Snippet / Round Subtext */}
      {lastGoal && !isUpcoming && (
        <div className="mt-2 pt-1.5 border-t border-[#191F2B] flex items-center justify-between text-[10px] text-[#64748B]">
          <div className="flex items-center gap-1 truncate">
            <span>⚽</span>
            <span className="truncate text-[#94A3B8] font-medium">
              {lastGoal.scorer}
            </span>
          </div>
          <span className="font-mono text-[#64748B] shrink-0 font-medium">
            {lastGoal.minute}'
          </span>
        </div>
      )}
    </div>
  );
};
