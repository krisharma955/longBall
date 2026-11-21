import React, { useState } from "react";

interface HeaderProps {
  liveCount: number;
  favoritesCount: number;
  showOnlyFavorites: boolean;
  onToggleFavoritesOnly: () => void;
  isRefreshing: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  liveCount,
  favoritesCount,
  showOnlyFavorites,
  onToggleFavoritesOnly,
  isRefreshing,
  searchQuery,
  onSearchChange,
  onRefresh,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="h-[60px] px-4 bg-gradient-to-b from-[#075B32]/25 via-[#050606] to-[#050606] border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between shrink-0 sticky top-0 z-20">
      {/* Left: App mark & Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#171919] border border-[rgba(255,255,255,0.08)] flex items-center justify-center shadow-inner">
          <svg
            className="w-4 h-4 text-[#18B86A]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
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

        <div className="flex items-baseline gap-2">
          <h1 className="text-[22px] font-bold tracking-tight text-[#F5F6F6] leading-none">
            longBall<span className="text-[#18B86A]">.</span>
          </h1>

          {liveCount > 0 && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#18B86A]/15 text-[#18B86A] border border-[#18B86A]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B86A] animate-pulse" />
              {liveCount} LIVE
            </span>
          )}
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-1.5">
        {/* Search Toggle */}
        <button
          onClick={() => {
            setShowSearch((prev) => !prev);
            if (showSearch) onSearchChange("");
          }}
          aria-label="Search clubs or leagues"
          className={`w-8 h-8 rounded-[12px] flex items-center justify-center transition-all ${
            showSearch || searchQuery
              ? "bg-[#252727] text-[#F5F6F6]"
              : "text-[#A2A7A7] hover:text-[#F5F6F6] hover:bg-[#171919]"
          }`}
          title="Search clubs or leagues"
        >
          <svg
            className="w-4 h-4"
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

        {/* Favorite Teams Control (Section 5) */}
        <button
          onClick={onToggleFavoritesOnly}
          aria-label={showOnlyFavorites ? "Show all matches" : "Show followed favorites"}
          className={`h-8 px-2.5 rounded-[12px] flex items-center gap-1.5 text-xs font-medium transition-all ${
            showOnlyFavorites
              ? "bg-[#18B86A]/20 text-[#18B86A] border border-[#18B86A]/30"
              : "text-[#A2A7A7] hover:text-[#F5F6F6] hover:bg-[#171919] border border-transparent"
          }`}
          title="My Teams & Favorites"
        >
          <svg
            className={`w-3.5 h-3.5 ${showOnlyFavorites ? "fill-[#18B86A]" : "fill-none"}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {favoritesCount > 0 && <span className="font-semibold">{favoritesCount}</span>}
        </button>

        {/* Refresh Scores */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh match data"
          className="w-8 h-8 rounded-[12px] flex items-center justify-center text-[#A2A7A7] hover:text-[#F5F6F6] hover:bg-[#171919] active:scale-95 transition-all disabled:opacity-50"
          title="Refresh match scores"
        >
          <svg
            className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#18B86A]" : ""}`}
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

      {/* Expandable Search Bar */}
      {showSearch && (
        <div className="absolute top-[60px] left-0 right-0 p-3 bg-[#050606] border-b border-[rgba(255,255,255,0.06)] z-30 animate-in fade-in duration-150">
          <div className="relative">
            <input
              type="text"
              placeholder="Search clubs or leagues..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
              className="w-full bg-[#171919] border border-[rgba(255,255,255,0.08)] focus:border-[#18B86A]/60 rounded-[12px] px-3 py-2 text-xs text-[#F5F6F6] placeholder-[#727878] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#727878] hover:text-[#F5F6F6]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
