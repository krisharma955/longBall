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
    <div className="px-4 pt-3 pb-2">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? "bg-emerald-500 text-[#06120D] font-semibold shadow-sm shadow-emerald-500/20"
                  : "bg-[#14181B] text-[#8A9598] hover:text-white hover:bg-[#1A2023] border border-[#23292C]"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? "bg-[#06120D]/20 text-[#06120D]"
                      : "bg-[#20272B] text-[#9EA9AC]"
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
