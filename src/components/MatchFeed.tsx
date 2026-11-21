import React from "react";
import type { Match, League } from "../types/football";
import { MatchCard } from "./MatchCard";

interface MatchFeedProps {
  matches: Match[];
  leagues: League[];
  onSelectMatch: (match: Match) => void;
  onTogglePinLeague: (leagueId: string) => void;
}

export const MatchFeed: React.FC<MatchFeedProps> = ({
  matches,
  leagues,
  onSelectMatch,
  onTogglePinLeague,
}) => {
  // Group matches by league
  const groupedMatches = leagues
    .map((league) => {
      const leagueMatches = matches.filter((m) => m.leagueId === league.id);
      return {
        league,
        matches: leagueMatches,
      };
    })
    .filter((group) => group.matches.length > 0);

  return (
    <div className="flex flex-col gap-4 pt-1">
      {groupedMatches.map(({ league, matches }) => (
        <section key={league.id} className="flex flex-col">
          {/* Sticky League Section Header */}
          <div className="flex items-center justify-between px-1 py-1.5 mb-1.5 text-xs text-[#828F93] font-medium border-b border-[#1A2023]/60">
            <div className="flex items-center gap-2 min-w-0">
              {league.logo ? (
                <img
                  src={league.logo}
                  alt={league.name}
                  className="w-4 h-4 object-contain shrink-0"
                />
              ) : (
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              )}
              <span className="font-semibold text-[#D2DCD9] truncate">
                {league.name}
              </span>
              <span className="text-[10px] text-[#5A666A] hidden xs:inline">
                ({league.country})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#5D6B6F] px-1.5 py-0.5 rounded bg-[#131719]">
                {matches.length}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePinLeague(league.id);
                }}
                className={`p-1 rounded transition-colors ${
                  league.pinned
                    ? "text-amber-400 hover:text-amber-300"
                    : "text-[#495458] hover:text-[#8D9B9F]"
                }`}
                title={league.pinned ? "Unpin league" : "Pin league to top"}
                aria-label={league.pinned ? "Unpin league" : "Pin league"}
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill={league.pinned ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="17" x2="12" y2="22" />
                  <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Matches in League */}
          <div className="flex flex-col">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                league={league}
                onClick={onSelectMatch}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
