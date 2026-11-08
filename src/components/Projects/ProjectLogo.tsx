import React from 'react';

interface ProjectLogoProps {
  id: string;
  logoSrc?: string;
  className?: string;
}

export const ProjectLogo: React.FC<ProjectLogoProps> = ({ id, logoSrc, className = 'w-10 h-10' }) => {
  // If actual uploaded image logo exists
  if (logoSrc) {
    return (
      <div className={`${className} rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shrink-0 p-1`}>
        <img src={logoSrc} alt="" className="w-full h-full object-contain" />
      </div>
    );
  }

  // Bespoke generated modern vector logos for the remaining 3 projects
  if (id === 'university-event-management') {
    return (
      <div className={`${className} rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/30 border border-indigo-400/30 flex items-center justify-center shrink-0 p-2 text-indigo-400 shadow-md`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-full h-full">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
    );
  }

  if (id === 'waste-boat') {
    return (
      <div className={`${className} rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-600/30 border border-teal-400/30 flex items-center justify-center shrink-0 p-2 text-teal-300 shadow-md`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-full h-full">
          <path d="M2 17c3.5 0 3.5 2 7 2s3.5-2 7-2 3.5 2 6 2" />
          <path d="M4 14l2-8 6-2 6 2 2 8" />
          <path d="M12 4v8" />
        </svg>
      </div>
    );
  }

  if (id === 'line-robot') {
    return (
      <div className={`${className} rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-400/30 flex items-center justify-center shrink-0 p-2 text-amber-300 shadow-md`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-full h-full">
          <rect x="5" y="4" width="14" height="12" rx="3" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          <circle cx="15" cy="9" r="1.5" fill="currentColor" />
          <path d="M9 13h6" />
          <path d="M12 16v5M8 21h8" />
          <path d="M2 8h3M19 8h3" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${className} rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 p-2 text-emerald-accent`}>
      <span className="font-mono text-xs font-bold">JTJ</span>
    </div>
  );
};

