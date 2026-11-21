import { useState } from "react";
import { leagues, matches } from "./data/matches";
import type { Match } from "./types/football";
import { Header } from "./components/Header";
import { FilterTabs, type FilterTab } from "./components/FilterTabs";
import { MatchCard } from "./components/MatchCard";
import { EmptyState } from "./components/EmptyState";

const App = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // In Phase 3, this will display the full MatchDetailsPanel
  void selectedMatch;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const counts = {
    all: matches.length,
    live: matches.filter((m) => m.status === "LIVE" || m.status === "HALFTIME").length,
    finished: matches.filter((m) => m.status === "FINISHED").length,
    upcoming: matches.filter((m) => m.status === "UPCOMING").length,
    pinned: matches.filter((m) => {
      const l = leagues.find((league) => league.id === m.leagueId);
      return l?.pinned === true;
    }).length,
  };

  const filteredMatches = matches.filter((match) => {
    if (activeTab === "all") return true;
    if (activeTab === "live") {
      return match.status === "LIVE" || match.status === "HALFTIME";
    }
    if (activeTab === "finished") return match.status === "FINISHED";
    if (activeTab === "upcoming") return match.status === "UPCOMING";
    if (activeTab === "pinned") {
      const league = leagues.find((l) => l.id === match.leagueId);
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
          <div className="pt-1">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                league={leagues.find((l) => l.id === match.leagueId)}
                onClick={(m) => setSelectedMatch(m)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
