import React from "react";
import type { Match, League } from "../types/football";
import { TeamCrest } from "./TeamCrest";

interface MatchCardProps {
  match: Match;
  league?: League;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
  onClick: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  league,
  isFavorite,
  onToggleFavorite,
  onClick,
}) => {
  const isLive = match.status === "LIVE";
  const isHalftime = match.status === "HALFTIME";
  const isUpcoming = match.status === "UPCOMING";
  const isFinished = match.status === "FINISHED";

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
      className="group bg-[#171919] hover:bg-[#202222] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-3.5 mb-2.5 cursor-pointer transition-all duration-150 active:scale-[0.99] focus:outline-none focus:ring-1 focus:ring-[#18B86A]/40 flex flex-col justify-between"
    >
      {/* Top Metadata Row: Competition & Favorite Toggle */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium text-[#A2A7A7] truncate">
          {league?.name || "Football"}
        </span>

        {/* Favorite Star (Independent Click Target) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(match.id);
          }}
          className={`p-1 -mr-1 rounded-md transition-colors ${
            isFavorite
              ? "text-[#18B86A]"
              : "text-[#727878] hover:text-[#F5F6F6]"
          }`}
          title={isFavorite ? "Remove favorite" : "Add to favorites"}
          aria-label={isFavorite ? "Remove favorite" : "Add to favorites"}
        >
          <svg
            className={`w-3.5 h-3.5 ${isFavorite ? "fill-[#18B86A]" : "fill-none"}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      {/* Center Matchup Area: Home - Score/Status - Away */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        {/* Home Team */}
        <div className="flex flex-col items-center text-center min-w-0">
          <TeamCrest
            src={match.homeTeam.logo}
            name={match.homeTeam.name}
            shortName={match.homeTeam.shortName}
            size="md"
            className="mb-1.5"
          />
          <span className="text-xs font-medium text-[#F5F6F6] truncate w-full" title={match.homeTeam.name}>
            {match.homeTeam.name}
          </span>
        </div>

        {/* Prominent Score / Kickoff Time */}
        <div className="flex flex-col items-center justify-center min-w-[76px] px-1 text-center">
          {isUpcoming ? (
            <div className="flex flex-col items-center">
              <span className="text-[13px] font-semibold text-[#F5F6F6] tracking-tight">
                {match.kickoffTime || "TBD"}
              </span>
              <span className="text-[10px] text-[#727878] font-medium mt-0.5">
                {match.date || "Scheduled"}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 font-mono text-[28px] font-bold tracking-tight text-[#F5F6F6] leading-none">
                <span>{match.homeScore}</span>
                <span className="text-base text-[#727878] font-normal">-</span>
                <span>{match.awayScore}</span>
              </div>

              {/* Status / Clock */}
              <div className="mt-1 flex items-center gap-1">
                {isLive && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#18B86A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18B86A] animate-pulse" />
                    {match.minute ? `${match.minute}'` : "LIVE"}
                  </span>
                )}
                {isHalftime && (
                  <span className="text-[11px] font-semibold text-amber-400">
                    HT
                  </span>
                )}
                {isFinished && (
                  <span className="text-[11px] font-medium text-[#727878]">
                    FT
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center text-center min-w-0">
          <TeamCrest
            src={match.awayTeam.logo}
            name={match.awayTeam.name}
            shortName={match.awayTeam.shortName}
            size="md"
            className="mb-1.5"
          />
          <span className="text-xs font-medium text-[#F5F6F6] truncate w-full" title={match.awayTeam.name}>
            {match.awayTeam.name}
          </span>
        </div>
      </div>
    </div>
  );
};
