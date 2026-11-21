import React from "react";
export type EmptyFilterType = "live" | "finished" | "upcoming" | "pinned" | "all";

interface EmptyStateProps {
  filter: EmptyFilterType;
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ filter, onReset }) => {
  const getMessage = () => {
    switch (filter) {
      case "live":
        return {
          title: "No Live Matches Now",
          description: "All matches are either upcoming or already finished.",
        };
      case "upcoming":
        return {
          title: "No Upcoming Fixtures",
          description: "No further fixtures scheduled across followed competitions.",
        };
      case "finished":
        return {
          title: "No Finished Matches",
          description: "No completed matches recorded for this date.",
        };
      case "pinned":
        return {
          title: "No Pinned League Matches",
          description: "No fixtures found for your pinned leagues on this date.",
        };
      default:
        return {
          title: "No Matches Scheduled",
          description: "No fixtures match your current date or search criteria.",
        };
    }
  };

  const { title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div className="w-11 h-11 rounded-2xl bg-[#171919] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#727878] mb-3">
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

      <h3 className="text-xs font-bold text-[#F5F6F6] mb-1">{title}</h3>
      <p className="text-[11px] text-[#727878] leading-relaxed max-w-[220px] mb-3.5">
        {description}
      </p>

      <button
        onClick={onReset}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202222] hover:bg-[#252727] text-[#18B86A] border border-[#18B86A]/20 transition-colors"
      >
        View Today's Matches
      </button>
    </div>
  );
};
