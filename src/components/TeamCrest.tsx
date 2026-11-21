import React, { useState } from "react";

interface TeamCrestProps {
  src: string;
  name: string;
  shortName: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const TeamCrest: React.FC<TeamCrestProps> = ({
  src,
  name,
  shortName,
  size = "md",
  className = "",
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    xs: "w-4 h-4 text-[9px]",
    sm: "w-5 h-5 text-[10px]",
    md: "w-7 h-7 text-xs",
    lg: "w-11 h-11 text-sm",
    xl: "w-14 h-14 text-base",
  }[size];

  if (!src || hasError) {
    return (
      <div
        className={`${sizeClasses} rounded-full bg-[#1A202C] border border-[#293242] flex items-center justify-center font-bold text-[#94A3B8] shrink-0 select-none shadow-sm ${className}`}
        title={name}
      >
        {shortName.slice(0, 3).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      loading="lazy"
      className={`${sizeClasses} object-contain shrink-0 drop-shadow-sm select-none ${className}`}
    />
  );
};
