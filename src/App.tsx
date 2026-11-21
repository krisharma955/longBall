import { useState } from "react";
import { leagues as initialLeagues, matches as initialMatches } from "./data/matches";
import type { Match, League } from "./types/football";
import { Header } from "./components/Header";
import { FilterTabs, type FilterTab } from "./components/FilterTabs";
import { MatchFeed } from "./components/MatchFeed";
import { EmptyState } from "./components/EmptyState";

const App = () => {
  const [leaguesList, setLeaguesList] = useState<League[]>(initialLeagues);
  const [matchesList] = useState<Match[]>(initialMatches);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // In Phase 3, this will display the full MatchDetailsPanel
  void selectedMatch;

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

  const filteredMatches = matchesList.filter((match) => {
    if (activeTab === "all") return true;
    if (activeTab === "live") {
      return match.status === "LIVE" || match.status === "HALFTIME";
    }
    if (activeTab === "finished") return match.status === "FINISHED";
    if (activeTab === "upcoming") return match.status === "UPCOMING";
    if (activeTab === "pinned") {
      const league = leaguesList.find((l) => l.id === match.leagueId);
      return league?.pinned === true;
    }
    return true;
  });

  return (
    <main className="w-full max-w-md mx-auto h-screen bg-[#0B0E10] text-[#E8ECE9] flex flex-col overflow-hidden font-sans border-x border-[#1C2124] shadow-2xl">
      {/* Top Header */}
      <Header
        liveCount={counts.live}
        isRefreshing={isRefreshing}
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
          <EmptyState filter={activeTab} onReset={() => setActiveTab("all")} />
        ) : (
          <MatchFeed
            matches={filteredMatches}
            leagues={leaguesList}
            onSelectMatch={(m) => setSelectedMatch(m)}
            onTogglePinLeague={handleTogglePin}
          />
        )}
      </div>
    </main>
  );
};

export default App;
