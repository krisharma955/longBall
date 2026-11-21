import { useState, useEffect } from "react";
import { leagues as initialLeagues, matches as initialMatches } from "./data/matches";
import type { Match, League } from "./types/football";
import { Header } from "./components/Header";
import { FilterTabs, type FilterTab } from "./components/FilterTabs";
import { MatchFeed } from "./components/MatchFeed";
import { EmptyState } from "./components/EmptyState";
import { MatchDetailsPanel } from "./components/MatchDetailsPanel";

const App = () => {
  const [leaguesList, setLeaguesList] = useState<League[]>(initialLeagues);
  const [matchesList, setMatchesList] = useState<Match[]>(initialMatches);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Live simulation: advance minutes on live matches periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setMatchesList((prev) =>
        prev.map((match) => {
          if (match.status === "LIVE" && match.minute !== null && match.minute < 90) {
            return {
              ...match,
              minute: match.minute + 1,
            };
          }
          return match;
        })
      );
    }, 45000); // Ticks every 45s

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const handleTogglePin = (leagueId: string) => {
    setLeaguesList((prev) =>
      prev.map((l) => (l.id === leagueId ? { ...l, pinned: !l.pinned } : l))
    );
  };

  // Keep selectedMatch updated if live state ticks
  const activeSelectedMatch = selectedMatch
    ? matchesList.find((m) => m.id === selectedMatch.id) || selectedMatch
    : null;

  // Filter by tab + search query
  const filteredMatches = matchesList.filter((match) => {
    const league = leaguesList.find((l) => l.id === match.leagueId);

    // Search filter
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

    // Tab filter
    if (activeTab === "all") return true;
    if (activeTab === "live") {
      return match.status === "LIVE" || match.status === "HALFTIME";
    }
    if (activeTab === "finished") return match.status === "FINISHED";
    if (activeTab === "upcoming") return match.status === "UPCOMING";
    if (activeTab === "pinned") {
      return league?.pinned === true;
    }
    return true;
  });

  const counts = {
    all: matchesList.length,
    live: matchesList.filter((m) => m.status === "LIVE" || m.status === "HALFTIME").length,
    finished: matchesList.filter((m) => m.status === "FINISHED").length,
    upcoming: matchesList.filter((m) => m.status === "UPCOMING").length,
    pinned: matchesList.filter((m) => {
      const l = leaguesList.find((league) => league.id === m.leagueId);
      return l?.pinned === true;
    }).length,
  };

  return (
    <main className="w-full max-w-md mx-auto h-screen bg-[#0B0E10] text-[#E8ECE9] flex flex-col overflow-hidden font-sans border-x border-[#1C2124] shadow-2xl relative select-none">
      {activeSelectedMatch ? (
        <MatchDetailsPanel
          match={activeSelectedMatch}
          league={leaguesList.find((l) => l.id === activeSelectedMatch.leagueId)}
          onBack={() => setSelectedMatch(null)}
        />
      ) : (
        <>
          {/* Top Header */}
          <Header
            liveCount={counts.live}
            isRefreshing={isRefreshing}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onRefresh={handleRefresh}
          />

          {/* Filter Tabs */}
          <FilterTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />

          {/* Main Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-3.5 pb-4 scrollbar-thin scrollbar-thumb-[#20272B] scrollbar-track-transparent">
            {filteredMatches.length === 0 ? (
              <EmptyState
                filter={activeTab}
                onReset={() => {
                  setActiveTab("all");
                  setSearchQuery("");
                }}
              />
            ) : (
              <MatchFeed
                matches={filteredMatches}
                leagues={leaguesList}
                onSelectMatch={(m) => setSelectedMatch(m)}
                onTogglePinLeague={handleTogglePin}
              />
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default App;
