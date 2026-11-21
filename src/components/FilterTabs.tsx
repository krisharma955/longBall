import React from "react";

export type FilterTab = "all" | "live" | "finished" | "upcoming" | "pinned";

interface FilterTabsProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  counts: {
    all: number;
    live: number;
    finished: number;
    upcoming: number;
    pinned: number;
  };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: { id: FilterTab; label: string; count: number }[] = [
    { id: "all", label: "All", count: counts.all },
    { id: "live", label: "Live", count: counts.live },
    { id: "upcoming", label: "Upcoming", count: counts.upcoming },
    { id: "finished", label: "Results", count: counts.finished },
    { id: "pinned", label: "Pinned", count: counts.pinned },
  ];

  return (
    <div className="px-3.5 pt-2.5 pb-2">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 -mx-1 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                  : "bg-[#131720] text-[#94A3B8] hover:text-white hover:bg-[#1A202C] border border-[#1E2533]"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#1D2330] text-[#7E8B9E]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
