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
    <nav
      aria-label="Match Date Filter"
      className="px-4 pt-3 pb-2 shrink-0"
    >
      <div className="grid grid-cols-3 bg-[#171919] p-1 rounded-[12px] border border-[rgba(255,255,255,0.06)]">
        {tabs.map((tab) => {
          const isActive = activeDate === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onDateChange(tab.id)}
              className={`py-1.5 text-[13px] font-medium rounded-[9px] transition-all duration-140 text-center select-none ${
                isActive
                  ? "bg-[#252727] text-[#F5F6F6] shadow-sm font-semibold"
                  : "text-[#A2A7A7] hover:text-[#F5F6F6]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
