import React from "react";
import type { FilterTab } from "./FilterTabs";

interface EmptyStateProps {
  filter: FilterTab;
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ filter, onReset }) => {
  const getMessage = () => {
    switch (filter) {
      case "live":
        return {
          title: "No Live Matches Now",
          description: "Check upcoming fixtures kicking off later today or explore recent results.",
        };
      case "upcoming":
        return {
          title: "No Upcoming Fixtures",
          description: "No future matches scheduled for today across followed leagues.",
        };
      case "finished":
        return {
          title: "No Finished Matches",
          description: "No completed matches found for today yet.",
        };
      case "pinned":
        return {
          title: "No Pinned League Matches",
          description: "Pin your favorite leagues to monitor their matches here at a glance.",
        };
      default:
        return {
          title: "No Matches Found",
          description: "There are currently no matches scheduled for the selected view.",
        };
    }
  };

  const { title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#14181B] border border-[#23292C] flex items-center justify-center text-[#5D676B] mb-3.5">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>

      <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
      <p className="text-xs text-[#7F8A8D] leading-relaxed max-w-[240px] mb-4">
        {description}
      </p>

      {filter !== "all" && (
        <button
          onClick={onReset}
          className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#181E21] hover:bg-[#20272B] text-emerald-400 border border-emerald-500/20 transition-colors"
        >
          View All Matches
        </button>
      )}
    </div>
  );
};
