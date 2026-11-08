import React from 'react';

interface TechIconProps {
  type: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'java':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official Java Cup with Red/Blue Brand Colors */}
          <path d="M7 19.5c3.5 1 8.5 1 11-.5-2 .5-7 .8-11 .5z" fill="#E76F00" />
          <path d="M6 17c3.8.8 8.5.8 11.5-.5-2.5.5-8 .8-11.5.5z" fill="#E76F00" />
          <path d="M12.5 10c1.5 1.5.8 3-1.5 4.5 2.5-.5 4.5-2 3.5-3.5-1-1.5-2-1-2-1z" fill="#5382A1" />
          <path d="M14.5 6.5c2 2 1.5 4-2 6 3-1 5-3 4-4.5-1-1.5-2-1.5-2-1.5z" fill="#E76F00" />
          <path d="M9 14c-2 1-3 2-2 3 1.5.5 4.5.5 7.5 0 2-.3 3.5-.8 3.5-1.5 0-1-2.5-1.5-4-1.5-2 0-3.5.5-5 0z" fill="#5382A1" />
          <path d="M17 14c2.5-1.5 4.5-3.5 3.5-5.5-.5-.8-1.5-1-2.5-1 .5.5 1 1.2.8 2-.5 1.5-2.5 2.5-4 3 1 .5 1.7 1 2.2 1.5z" fill="#E76F00" />
        </svg>
      );

    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official Python Dual Yellow & Blue Snakes */}
          <path
            d="M11.9 2c-5 0-4.7 2.2-4.7 2.2l.01 2.2h4.7v.7H5.3S2 6.7 2 11.7c0 5 2.9 4.8 2.9 4.8h1.7v-2.4c0-2.8 2.4-2.8 2.4-2.8h4.6v-.7s.4-4.6-4.7-4.6zm-2.1 1.5c.4 0 .8.4.8.8 0 .5-.4.8-.8.8-.5 0-.8-.3-.8-.8s.3-.8.8-.8z"
            fill="#387EB8"
          />
          <path
            d="M12.1 22c5 0 4.7-2.2 4.7-2.2l-.01-2.2H12v-.7h6.7s3.3.4 3.3-4.6c0-5-2.9-4.8-2.9-4.8h-1.7v2.4c0 2.8-2.4 2.8-2.4 2.8H10.4v.7s-.4 4.6 4.7 4.6zm2.1-1.5c-.4 0-.8-.4-.8-.8 0-.5.4-.8.8-.8.5 0 .8.3.8.8s-.3.8-.8.8z"
            fill="#FFE052"
          />
        </svg>
      );

    case 'c':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official C Blue Shield / Badge */}
          <rect width="24" height="24" rx="5" fill="#659AD2" />
          <path
            d="M15.5 8.2c-.8-.7-1.8-1-3.2-1-2.8 0-4.8 2-4.8 4.8s2 4.8 4.8 4.8c1.4 0 2.4-.3 3.2-1l.8 1.8c-1.1.7-2.4 1-4 1-4 0-6.8-2.8-6.8-6.6s2.8-6.6 6.8-6.6c1.6 0 2.9.3 4 1l-.8 1.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'cpp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official C++ Blue Shield with ++ badge */}
          <rect width="24" height="24" rx="5" fill="#00599C" />
          <path
            d="M9.5 8c-.6-.5-1.4-.8-2.4-.8-2.1 0-3.6 1.5-3.6 3.6s1.5 3.6 3.6 3.6c1 0 1.8-.3 2.4-.8l.6 1.4c-.8.5-1.8.8-3 .8-3 0-5.1-2.1-5.1-5s2.1-5 5.1-5c1.2 0 2.2.3 3 .8L9.5 8zM14 11.2h1.4V9.8h1.2v1.4H18v1.2h-1.4v1.4h-1.2v-1.4H14v-1.2zm5 0h1.4V9.8h1.2v1.4H23v1.2h-1.4v1.4h-1.2v-1.4H19v-1.2z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'javascript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official JavaScript Yellow Badge */}
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            d="M6.5 17.5c.5.8 1.4 1.3 2.5 1.3 1.3 0 2.2-.7 2.2-2.1v-5.2h-1.8v5.1c0 .6-.4.9-1 .9-.6 0-.9-.3-1.2-.7l-1.7 1.1zm7.3-1.1c.5.8 1.4 1.4 2.8 1.4 1.5 0 2.5-.8 2.5-1.9 0-1.2-.8-1.7-2.1-2.2l-.7-.3c-.8-.3-1.2-.6-1.2-1.2 0-.6.5-1 1.3-1 .8 0 1.4.3 1.8.9l1.6-1.1c-.6-.9-1.6-1.4-2.8-1.4-1.5 0-2.5.9-2.5 2 0 1.1.7 1.7 1.9 2.2l.7.3c.9.4 1.4.7 1.4 1.3 0 .7-.6 1.1-1.5 1.1-.9 0-1.6-.4-2-1.1l-1.9 1.1z"
            fill="#000000"
          />
        </svg>
      );

    case 'html':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official HTML5 Orange Shield */}
          <path d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4z" fill="#E44D26" />
          <path d="M12 4.6v15.6l5.2-2L18.4 4.6H12z" fill="#F16529" />
          <path d="M12 8.3H8.3l.2 2.5h3.5v-2.5zm0 5H8.7l.3 3.3 3 .8v-2.4l-1.5-.4-.1-1.3h1.6v-2.4z" fill="#EBEBEB" />
          <path d="M12 8.3v2.5h3.3l-.3 3.3-3 .8v2.4l4.5-1.2.6-7.8H12z" fill="#FFFFFF" />
        </svg>
      );

    case 'css':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official CSS3 Blue Shield */}
          <path d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4z" fill="#1572B6" />
          <path d="M12 4.6v15.6l5.2-2L18.4 4.6H12z" fill="#33A9DC" />
          <path d="M12 8.3H8.3l.2 2.5h3.5v-2.5zm0 5H8.7l.3 3.3 3 .8v-2.4l-1.5-.4-.1-1.3h1.6v-2.4z" fill="#EBEBEB" />
          <path d="M12 8.3v2.5h3.3l-.3 3.3-3 .8v2.4l4.5-1.2.6-7.8H12z" fill="#FFFFFF" />
        </svg>
      );

    case 'react':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official React Cyan Atom */}
          <ellipse cx="12" cy="12" rx="4.2" ry="10.5" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="4.2" ry="10.5" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="4.2" ry="10.5" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );

    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official Tailwind Cyan Waves */}
          <path
            d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.1 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6-1.1-1.2-2.5-2.6-5.5-2.6zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.1 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6-1.1-1.2-2.5-2.6-5.5-2.6z"
            fill="#38BDF8"
          />
        </svg>
      );

    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official Git Orange Branch */}
          <rect width="24" height="24" rx="4" fill="#F05032" />
          <circle cx="17" cy="17" r="2" fill="#FFFFFF" />
          <circle cx="7" cy="7" r="2" fill="#FFFFFF" />
          <circle cx="7" cy="17" r="2" fill="#FFFFFF" />
          <path d="M7 9v6M9 9l6 6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'github':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official GitHub Octocat Badge */}
          <rect width="24" height="24" rx="4" fill="#24292E" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4C7.58 4 4 7.58 4 12c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0020 12c0-4.42-3.58-8-8-8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official MySQL Dolphin Colors (Navy & Orange) */}
          <rect width="24" height="24" rx="4" fill="#00758F" />
          <path
            d="M5 14c3-4 8-5 12-2 1.5 1.2 3 3 4 3s-2.5 2.5-5 2.5c-3.5 0-7.5-.8-11-3.5z"
            fill="#F29111"
          />
          <circle cx="16" cy="12.5" r="1" fill="#FFFFFF" />
        </svg>
      );

    case 'postgresql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official PostgreSQL Elephant Blue */}
          <rect width="24" height="24" rx="4" fill="#336791" />
          <ellipse cx="12" cy="7" rx="6.5" ry="2.5" fill="#FFFFFF" opacity="0.9" />
          <path d="M5.5 7v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V7" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M5.5 12v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );

    case 'database':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* MongoDB / NoSQL Vibrant Leaf Green */}
          <rect width="24" height="24" rx="4" fill="#13AA52" />
          <path
            d="M12 4.5s-4.5 4.5-4.5 8c0 2.8 2 4.5 4.5 7 2.5-2.5 4.5-4.2 4.5-7 0-3.5-4.5-8-4.5-8z"
            fill="#FFFFFF"
          />
          <path d="M12 5.5v13" stroke="#13AA52" strokeWidth="1.2" />
        </svg>
      );

    case 'vscode':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Official VS Code Blue Ribbon */}
          <rect width="24" height="24" rx="4" fill="#007ACC" />
          <path
            d="M17.5 4.5l-8.5 7 3.5 3 5-3.5v-6.5zm-8.5 7l-4-3.2-1 1 3.5 2.7-3.5 2.7 1 1 4-3.2v-1z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'dsa':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* DSA Graph / Tree Node Palette */}
          <rect width="24" height="24" rx="4" fill="#8B5CF6" />
          <circle cx="12" cy="6" r="2.2" fill="#FFFFFF" />
          <circle cx="7" cy="16" r="2.2" fill="#FFFFFF" />
          <circle cx="17" cy="16" r="2.2" fill="#FFFFFF" />
          <line x1="12" y1="8.2" x2="7" y2="13.8" stroke="#FFFFFF" strokeWidth="1.6" />
          <line x1="12" y1="8.2" x2="17" y2="13.8" stroke="#FFFFFF" strokeWidth="1.6" />
        </svg>
      );

    case 'os':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Operating Systems Terminal / Microchip Emerald */}
          <rect width="24" height="24" rx="4" fill="#10B981" />
          <rect x="6" y="6" width="12" height="12" rx="2" stroke="#FFFFFF" strokeWidth="1.6" />
          <path d="M9 10h6M9 14h4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'dbms':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Database Management Royal Indigo */}
          <rect width="24" height="24" rx="4" fill="#4F46E5" />
          <ellipse cx="12" cy="7" rx="5.5" ry="2" stroke="#FFFFFF" strokeWidth="1.4" />
          <path d="M6.5 7v4.5c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V7" stroke="#FFFFFF" strokeWidth="1.4" />
          <path d="M6.5 11.5v4.5c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2v-4.5" stroke="#FFFFFF" strokeWidth="1.4" />
        </svg>
      );

    case 'se':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Software Engineering Blueprint Coral */}
          <rect width="24" height="24" rx="4" fill="#EC4899" />
          <path
            d="M7 9l5-3 5 3v6l-5 3-5-3V9zm5-3v12m-5-6l10-6m0 6L7 6"
            stroke="#FFFFFF"
            strokeWidth="1.3"
          />
        </svg>
      );

    case 'design':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* UI/UX Figma-style Vibrant Multi-Tone */}
          <rect width="24" height="24" rx="4" fill="#1E1E1E" />
          <circle cx="9" cy="8" r="2.2" fill="#F24E1E" />
          <circle cx="15" cy="8" r="2.2" fill="#FF7262" />
          <circle cx="9" cy="12.5" r="2.2" fill="#A259FF" />
          <circle cx="15" cy="12.5" r="2.2" fill="#1ABCFE" />
          <circle cx="9" cy="16.8" r="2.2" fill="#0ACF83" />
        </svg>
      );

    case 'camera':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Photography Golden Amber */}
          <rect width="24" height="24" rx="4" fill="#F59E0B" />
          <path
            d="M6 9h3l1.5-2h3L15 9h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"
            stroke="#FFFFFF"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="14" r="2.8" stroke="#FFFFFF" strokeWidth="1.6" />
        </svg>
      );

    case 'video':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Videography Crimson Cinema */}
          <rect width="24" height="24" rx="4" fill="#EF4444" />
          <rect x="5" y="7" width="10" height="10" rx="2" stroke="#FFFFFF" strokeWidth="1.6" />
          <polygon points="15,10 19,7.5 19,16.5 15,14" fill="#FFFFFF" />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#3B82F6" />
          <path d="M8 12h8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};
