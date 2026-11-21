import React from "react";

interface HeaderProps {
  liveCount: number;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  liveCount,
  isRefreshing,
  onRefresh,
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-[#22272A] bg-[#0E1113]/90 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center shadow-inner">
          <svg
            className="w-4 h-4 text-emerald-400"
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

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold tracking-tight text-white leading-none">
              longBall<span className="text-emerald-400">.</span>
            </h1>
            {liveCount > 0 && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {liveCount} LIVE
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#7E888B] mt-0.5">
            Premier Football Companion
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh scores"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8B9598] hover:text-white hover:bg-[#1A1F22] active:scale-95 transition-all disabled:opacity-50"
          title="Refresh scores"
        >
          <svg
            className={`w-4 h-4 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`}
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
    </header>
  );
};
