import React, { useState } from "react";

interface HeaderProps {
  liveCount: number;
  isRefreshing: boolean;
  isLiveSource: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  liveCount,
  isRefreshing,
  isLiveSource,
  searchQuery,
  onSearchChange,
  onRefresh,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="px-3.5 py-2.5 border-b border-[#1A202C] bg-[#0C0E12]/95 backdrop-blur-md sticky top-0 z-20 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {/* Brand & Sync Indicator */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m4.93 4.93 4.24 4.24" />
              <path d="m14.83 9.17 4.24-4.24" />
              <path d="m14.83 14.83 4.24 4.24" />
              <path d="m9.17 14.83-4.24 4.24" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold tracking-tight text-white leading-none">
                longBall<span className="text-blue-500">.</span>
              </h1>
              {liveCount > 0 && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {liveCount} LIVE
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-[#64748B] font-medium">
                {isLiveSource ? "ESPN Realtime" : "Match Companion"}
              </span>
              {isLiveSource && (
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setShowSearch((prev) => !prev);
              if (showSearch) onSearchChange("");
            }}
            aria-label="Search fixtures"
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
              showSearch || searchQuery
                ? "bg-blue-600/20 text-blue-400"
                : "text-[#94A3B8] hover:text-white hover:bg-[#161C26]"
            }`}
            title="Search teams or leagues"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh live scores"
            className="w-7 h-7 rounded-md flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#161C26] active:scale-95 transition-all disabled:opacity-50"
            title="Refresh live scores"
          >
            <svg
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-400" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Input Drawer */}
      {showSearch && (
        <div className="relative animate-in fade-in duration-150">
          <input
            type="text"
            placeholder="Search teams or competitions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
            className="w-full bg-[#12161F] border border-[#232B39] focus:border-blue-500 rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:ring-1 focus:ring-blue-500/40"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </header>
  );
};
