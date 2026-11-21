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
          title: "No Live Matches Currently",
          description: "All matches are either upcoming or already finished. Check today's schedule.",
        };
      case "upcoming":
        return {
          title: "No Upcoming Fixtures",
          description: "There are no further fixtures scheduled for today across followed leagues.",
        };
      case "finished":
        return {
          title: "No Finished Matches",
          description: "No completed matches found in the selected view.",
        };
      case "pinned":
        return {
          title: "No Pinned League Matches",
          description: "Pin your favorite leagues using the pin icon to track them here.",
        };
      default:
        return {
          title: "No Matches Found",
          description: "No fixtures match your current filter or search criteria.",
        };
    }
  };

  const { title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div className="w-11 h-11 rounded-2xl bg-[#121620] border border-[#1E2533] flex items-center justify-center text-[#64748B] mb-3">
        <svg
          className="w-5 h-5"
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

      <h3 className="text-xs font-bold text-white mb-1">{title}</h3>
      <p className="text-[11px] text-[#64748B] leading-relaxed max-w-[220px] mb-3.5">
        {description}
      </p>

      {filter !== "all" && (
        <button
          onClick={onReset}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#171D28] hover:bg-[#1E2534] text-blue-400 border border-blue-500/20 transition-colors"
        >
          View All Matches
        </button>
      )}
    </div>
  );
};
