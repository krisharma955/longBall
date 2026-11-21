import React, { useState } from "react";
import type { Match, League } from "../types/football";
import { MatchCard } from "./MatchCard";

interface MatchFeedProps {
  matches: Match[];
  leagues: League[];
  favorites: Set<string>;
  onToggleFavorite: (matchId: string) => void;
  onSelectMatch: (match: Match) => void;
}

export const MatchFeed: React.FC<MatchFeedProps> = ({
  matches,
  leagues,
  favorites,
  onToggleFavorite,
  onSelectMatch,
}) => {
  const [upcomingExpanded, setUpcomingExpanded] = useState(true);

  // Partition matches into Live, Upcoming, and Finished
  const liveMatches = matches.filter((m) => m.status === "LIVE" || m.status === "HALFTIME");
  const upcomingMatches = matches.filter((m) => m.status === "UPCOMING");
  const finishedMatches = matches.filter((m) => m.status === "FINISHED" || m.status === "POSTPONED" || m.status === "CANCELLED");

  return (
    <div className="flex flex-col gap-3 pt-1">
      {/* 1. Live Matches Section */}
      {liveMatches.length > 0 && (
        <section className="flex flex-col">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[11px] font-bold text-[#18B86A] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B86A] animate-pulse" />
              Live Now ({liveMatches.length})
            </span>
          </div>
          {liveMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              league={leagues.find((l) => l.id === match.leagueId)}
              isFavorite={favorites.has(match.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectMatch}
            />
          ))}
        </section>
      )}

      {/* 2. Upcoming / Later Today Section (Collapsible with chevron) */}
      {upcomingMatches.length > 0 && (
        <section className="flex flex-col">
          <button
            type="button"
            onClick={() => setUpcomingExpanded((prev) => !prev)}
            className="flex items-center justify-between px-1 mb-2 text-left w-full group py-1"
            aria-label={upcomingExpanded ? "Show fewer upcoming matches" : "Show more upcoming matches"}
          >
            <span className="text-[11px] font-bold text-[#A2A7A7] uppercase tracking-wider group-hover:text-white transition-colors">
              Later Today ({upcomingMatches.length})
            </span>
            <div className="flex items-center gap-1 text-[#727878] group-hover:text-white transition-colors text-xs">
              <span className="text-[10px] font-medium">
                {upcomingExpanded ? "Hide" : "Show all"}
              </span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${upcomingExpanded ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </button>

          {upcomingExpanded && (
            <div className="flex flex-col animate-in fade-in duration-150">
              {upcomingMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  league={leagues.find((l) => l.id === match.leagueId)}
                  isFavorite={favorites.has(match.id)}
                  onToggleFavorite={onToggleFavorite}
                  onClick={onSelectMatch}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 3. Finished Matches Section */}
      {finishedMatches.length > 0 && (
        <section className="flex flex-col">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[11px] font-bold text-[#727878] uppercase tracking-wider">
              Recent Results ({finishedMatches.length})
            </span>
          </div>
          {finishedMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              league={leagues.find((l) => l.id === match.leagueId)}
              isFavorite={favorites.has(match.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectMatch}
            />
          ))}
        </section>
      )}
    </div>
  );
};
