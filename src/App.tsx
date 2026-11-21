import { useState, useEffect, useCallback } from "react";
import type { Match, League } from "./types/football";
import {
  fetchLiveFootballData,
  fetchRealMatchSummary,
  OFFICIAL_LEAGUES,
  type DateFilterTab,
} from "./services/footballApi";
import { Header } from "./components/Header";
import { DateNav } from "./components/DateNav";
import { MatchFeed } from "./components/MatchFeed";
import { EmptyState } from "./components/EmptyState";
import { MatchDetailsPanel } from "./components/MatchDetailsPanel";

const initialLeagues: League[] = OFFICIAL_LEAGUES.map((l) => ({
  id: l.id,
  name: l.name,
  country: l.country,
  logo: l.logo,
  pinned: l.pinned,
}));

const App = () => {
  const [leaguesList] = useState<League[]>(initialLeagues);
  const [matchesList, setMatchesList] = useState<Match[]>([]);
  const [activeDateTab, setActiveDateTab] = useState<DateFilterTab>("today");
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Fetch real matches for selected date
  const loadData = useCallback(async (dateTab: DateFilterTab, isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const data = await fetchLiveFootballData(dateTab);
      setMatchesList(data.matches);
    } catch (err) {
      console.warn("Error refreshing real-time data:", err);
    } finally {
      setIsLoading(false);
      if (isManual) {
        setTimeout(() => setIsRefreshing(false), 450);
      }
    }
  }, []);

  // Fetch when activeDateTab changes
  useEffect(() => {
    setIsLoading(true);
    loadData(activeDateTab);
  }, [activeDateTab, loadData]);

  // Periodic polling every 45s for live scores
  useEffect(() => {
    if (activeDateTab !== "today") return;
    const interval = setInterval(() => {
      loadData("today", false);
    }, 45000);
    return () => clearInterval(interval);
  }, [activeDateTab, loadData]);

  const handleRefresh = () => {
    loadData(activeDateTab, true);
  };

  const handleToggleFavorite = (matchId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(matchId)) {
        next.delete(matchId);
      } else {
        next.add(matchId);
      }
      return next;
    });
  };

  // When clicking on a match, open in-sidebar drilldown and fetch real summary
  const handleSelectMatch = async (match: Match) => {
    setSelectedMatch(match);
    try {
      const summary = await fetchRealMatchSummary(match.id, match.leagueId);
      setSelectedMatch((prev) => {
        if (!prev || prev.id !== match.id) return prev;
        return {
          ...prev,
          stats: summary.stats || prev.stats,
          lineups: summary.lineups || prev.lineups,
          referee: summary.referee || prev.referee,
          venue: summary.venue || prev.venue,
        };
      });
    } catch (err) {
      console.warn("Could not load match details:", err);
    }
  };

  // Keep selectedMatch updated with real-time score changes
  const activeSelectedMatch = selectedMatch
    ? {
        ...selectedMatch,
        ...(matchesList.find((m) => m.id === selectedMatch.id) || {}),
      }
    : null;

  // Filter matches by search query and favorites filter
  const filteredMatches = matchesList.filter((match) => {
    const league = leaguesList.find((l) => l.id === match.leagueId);

    // Favorites only toggle
    if (showOnlyFavorites && !favorites.has(match.id)) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        match.homeTeam.name.toLowerCase().includes(q) ||
        match.homeTeam.shortName.toLowerCase().includes(q) ||
        match.awayTeam.name.toLowerCase().includes(q) ||
        match.awayTeam.shortName.toLowerCase().includes(q) ||
        (league && league.name.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    return true;
  });

  const liveCount = matchesList.filter(
    (m) => m.status === "LIVE" || m.status === "HALFTIME"
  ).length;

  return (
    <main className="w-full h-screen bg-[#050606] text-[#F5F6F6] flex flex-col overflow-hidden font-sans relative select-none">
      {activeSelectedMatch ? (
        <MatchDetailsPanel
          match={activeSelectedMatch}
          league={leaguesList.find((l) => l.id === activeSelectedMatch.leagueId)}
          onBack={() => setSelectedMatch(null)}
        />
      ) : (
        <>
          {/* Header */}
          <Header
            liveCount={liveCount}
            favoritesCount={favorites.size}
            showOnlyFavorites={showOnlyFavorites}
            onToggleFavoritesOnly={() => setShowOnlyFavorites((p) => !p)}
            isRefreshing={isRefreshing}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onRefresh={handleRefresh}
          />

          {/* 3-Way Segmented Date Navigation */}
          <DateNav
            activeDate={activeDateTab}
            onDateChange={setActiveDateTab}
          />

          {/* Main Scrollable Feed */}
          <div className="flex-1 overflow-y-auto px-3.5 pb-4 scrollbar-thin">
            {isLoading ? (
              // Clean Loading Skeletons
              <div className="flex flex-col gap-2.5 pt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-24 rounded-[20px] bg-[#171919] border border-[rgba(255,255,255,0.06)] animate-pulse flex items-center px-4 justify-between"
                  >
                    <div className="w-12 h-12 bg-[#252727] rounded-full" />
                    <div className="w-16 h-7 bg-[#252727] rounded" />
                    <div className="w-12 h-12 bg-[#252727] rounded-full" />
                  </div>
                ))}
              </div>
            ) : filteredMatches.length === 0 ? (
              <EmptyState
                filter={activeDateTab === "upcoming" ? "upcoming" : activeDateTab === "yesterday" ? "finished" : "all"}
                onReset={() => {
                  setActiveDateTab("today");
                  setShowOnlyFavorites(false);
                  setSearchQuery("");
                }}
              />
            ) : (
              <MatchFeed
                matches={filteredMatches}
                leagues={leaguesList}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectMatch={handleSelectMatch}
              />
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default App;
