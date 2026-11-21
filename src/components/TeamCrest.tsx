import React, { useState } from "react";

interface TeamCrestProps {
  src: string;
  name: string;
  shortName: string;
  size?: "sm" | "md" | "lg";
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
    sm: "w-6 h-6 text-[10px]",
    md: "w-10 h-10 text-xs",
    lg: "w-14 h-14 text-sm",
  }[size];

  if (!src || hasError) {
    return (
      <div
        className={`${sizeClasses} rounded-full bg-[#1A1F22] border border-[#272B2D] flex items-center justify-center font-bold text-[#A0AAB0] shrink-0 select-none ${className}`}
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
