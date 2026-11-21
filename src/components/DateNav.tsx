import React from "react";
import type { DateFilterTab } from "../services/footballApi";

interface DateNavProps {
  activeDate: DateFilterTab;
  onDateChange: (date: DateFilterTab) => void;
}

export const DateNav: React.FC<DateNavProps> = ({
  activeDate,
  onDateChange,
}) => {
  const tabs: { id: DateFilterTab; label: string }[] = [
    { id: "yesterday", label: "Yesterday" },
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
  ];

  return (
    <div className="px-3.5 pt-2 pb-1.5">
      <div className="grid grid-cols-3 bg-[#171919] p-1 rounded-xl border border-[rgba(255,255,255,0.06)]">
        {tabs.map((tab) => {
          const isActive = activeDate === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onDateChange(tab.id)}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 text-center ${
                isActive
                  ? "bg-[#252727] text-[#F5F6F6] shadow-sm"
                  : "text-[#A2A7A7] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
