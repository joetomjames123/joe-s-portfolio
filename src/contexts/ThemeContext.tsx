import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemePresetId = 
  | 'pure_black'
  | 'obsidian' 
  | 'midnight' 
  | 'purple' 
  | 'ocean' 
  | 'sunset' 
  | 'emerald' 
  | 'crimson';

export interface ThemePreset {
  id: ThemePresetId;
  name: string;
  sub: string;
  gradientPreview: string; // CSS gradient string for pills
  dark: {
    bgPrimary: string;
    bgSecondary: string;
    bgCard: string;
    bgCardBorder: string;
    accent: string;
    accentGlow: string;
    secondaryAccent: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
  };
  light: {
    bgPrimary: string;
    bgSecondary: string;
    bgCard: string;
    bgCardBorder: string;
    accent: string;
    accentGlow: string;
    secondaryAccent: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'pure_black',
    name: 'Pure Black',
    sub: 'DEFAULT OLED',
    gradientPreview: 'linear-gradient(90deg, #000000 0%, #0A0A0A 50%, #8B5CF6 100%)',
    dark: {
      bgPrimary: '#000000',
      bgSecondary: '#080808',
      bgCard: '#0C0C0E',
      bgCardBorder: 'rgba(255, 255, 255, 0.12)',
      accent: '#8B5CF6',
      accentGlow: 'rgba(139, 92, 246, 0.35)',
      secondaryAccent: '#A78BFA',
      textPrimary: '#FFFFFF',
      textSecondary: '#A1A1AA',
      textMuted: '#71717A'
    },
    light: {
      bgPrimary: '#FAFAFA',
      bgSecondary: '#F4F4F5',
      bgCard: '#FFFFFF',
      bgCardBorder: 'rgba(0, 0, 0, 0.1)',
      accent: '#7C3AED',
      accentGlow: 'rgba(124, 58, 237, 0.2)',
      secondaryAccent: '#4C1D95',
      textPrimary: '#09090B',
      textSecondary: '#27272A',
      textMuted: '#71717A'
    }
  },
  {
    id: 'obsidian',
    name: 'Obsidian Emerald',
    sub: 'DEEP EMERALD',
    gradientPreview: 'linear-gradient(90deg, #050807 0%, #082116 55%, #00C987 100%)',
    dark: {
      bgPrimary: '#050807',
      bgSecondary: '#0E1712',
      bgCard: 'rgba(16, 26, 21, 0.75)',
      bgCardBorder: 'rgba(255, 255, 255, 0.08)',
      accent: '#00C987',
      accentGlow: 'rgba(0, 201, 135, 0.35)',
      secondaryAccent: '#C7D0CC',
      textPrimary: '#F4F6F4',
      textSecondary: '#A7B3AD',
      textMuted: '#66766F'
    },
    light: {
      bgPrimary: '#F6F9F7',
      bgSecondary: '#EBF1ED',
      bgCard: '#FFFFFF',
      bgCardBorder: 'rgba(0, 168, 112, 0.15)',
      accent: '#009F6B',
      accentGlow: 'rgba(0, 159, 107, 0.2)',
      secondaryAccent: '#33483E',
      textPrimary: '#0C1711',
      textSecondary: '#2C3E34',
      textMuted: '#586E63'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    sub: 'DEEP NAVY',
    gradientPreview: 'linear-gradient(90deg, #050914 0%, #0B1938 55%, #2563EB 100%)',
    dark: {
      bgPrimary: '#040814',
      bgSecondary: '#0B132B',
      bgCard: 'rgba(15, 23, 42, 0.75)',
      bgCardBorder: 'rgba(59, 130, 246, 0.2)',
      accent: '#3B82F6',
      accentGlow: 'rgba(59, 130, 246, 0.35)',
      secondaryAccent: '#93C5FD',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B'
    },
    light: {
      bgPrimary: '#F8FAFC',
      bgSecondary: '#EDF2F7',
      bgCard: '#FFFFFF',
      bgCardBorder: 'rgba(37, 99, 235, 0.15)',
      accent: '#1D4ED8',
      accentGlow: 'rgba(29, 78, 216, 0.2)',
      secondaryAccent: '#1E3A8A',
      textPrimary: '#0F172A',
      textSecondary: '#334155',
      textMuted: '#64748B'
    }
  },
  {
    id: 'purple',
    name: 'Purple Gradient',
    sub: 'VIOLET HAZE',
    gradientPreview: 'linear-gradient(90deg, #0C0714 0%, #200E3D 55%, #A855F7 100%)',
    dark: {
      bgPrimary: '#09050F',
      bgSecondary: '#150A26',
      bgCard: 'rgba(26, 16, 44, 0.75)',
      bgCardBorder: 'rgba(168, 85, 247, 0.2)',
      accent: '#A855F7',
      accentGlow: 'rgba(168, 85, 247, 0.35)',
      secondaryAccent: '#D8B4FE',
      textPrimary: '#FAF5FF',
      textSecondary: '#C084FC',
      textMuted: '#7E22CE'
    },
    light: {
      bgPrimary: '#FAF5FF',
      bgSecondary: '#F3E8FF',
      bgCard: '#FFFFFF',
      bgCardBorder: 'rgba(147, 51, 234, 0.15)',
      accent: '#7E22CE',
      accentGlow: 'rgba(126, 34, 206, 0.2)',
      secondaryAccent: '#581C87',
      textPrimary: '#2E1065',
      textSecondary: '#6B21A8',
      textMuted: '#9333EA'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    sub: 'CYAN TIDE',
    gradientPreview: 'linear-gradient(90deg, #030F14 0%, #082938 55%, #06B6D4 100%)',
    dark: {
      bgPrimary: '#030E14',
      bgSecondary: '#081D28',
      bgCard: 'rgba(12, 33, 44, 0.75)',
      bgCardBorder: 'rgba(6, 182, 212, 0.2)',
      accent: '#06B6D4',
      accentGlow: 'rgba(6, 182, 212, 0.35)',
      secondaryAccent: '#67E8F9',
      textPrimary: '#ECFEFF',
      textSecondary: '#A5F3FC',
      textMuted: '#0E7490'
    },
    light: {
      bgPrimary: '#F0FDFA',
      bgSecondary: '#CCFBF1',
      bgCard: '#FFFFFF',
      bgCardBorder: 'rgba(13, 148, 136, 0.15)',
      accent: '#0F766E',
      accentGlow: 'rgba(15, 118, 110, 0.2)',
      secondaryAccent: '#115E59',
      textPrimary: '#134E4A',
      textSecondary: '#0F766E',
      textMuted: '#14B8A6'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    sub: 'AMBER DUSK',
    gradientPreview: 'linear-gradient(90deg, #140A04 0%, #381C09 55%, #F97316 100%)',
    dark: {
      bgPrimary: '#0F0703',
      bgSecondary: '#211007',
      bgCard: 'rgba(38, 20, 11, 0.75)',
      bgCardBorder: 'rgba(249, 115, 22, 0.2)',
      accent: '#F97316',
      accentGlow: 'rgba(249, 115, 22, 0.35)',
      secondaryAccent: '#FDBA74',
      textPrimary: '#FFF7ED',
      textSecondary: '#FDBA74',
      textMuted: '#9A3412'
    },
    light: {
      bgPrimary: '#FFF7ED',
      bgSecondary: '#FFEDD5',
      bgCard: '#FFFFFF',
      bgCardBorder: 'rgba(234, 88, 12, 0.15)',
      accent: '#C2410C',
      accentGlow: 'rgba(194, 65, 12, 0.2)',
      secondaryAccent: '#7C2D12',
      textPrimary: '#431407',
      textSecondary: '#9A3412',
      textMuted: '#EA580C'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald',
    sub: 'FOREST NEON',
    gradientPreview: 'linear-gradient(90deg, #020C06 0%, #062312 55%, #10B981 100%)',
    dark: {
      bgPrimary: '#020C06',
      bgSecondary: '#081D10',
      bgCard: 'rgba(11, 35, 20, 0.75)',
      bgCardBorder: 'rgba(16, 185, 129, 0.2)',
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.35)',
      secondaryAccent: '#6EE7B7',
      textPrimary: '#ECFDF5',
      textSecondary: '#A7F3D0',
      textMuted: '#047857'
    },
    light: {
      bgPrimary: '#F0FDF4',
      bgSecondary: '#DCFCE7',
      bgCard: '#FFFFFF',
      bgCardBorder: 'rgba(5, 150, 105, 0.15)',
      accent: '#047857',
      accentGlow: 'rgba(4, 120, 87, 0.2)',
      secondaryAccent: '#064E3B',
      textPrimary: '#022C22',
      textSecondary: '#065F46',
      textMuted: '#059669'
    }
  },
  {
    id: 'crimson',
    name: 'Crimson',
    sub: 'RUBY GLOW',
    gradientPreview: 'linear-gradient(90deg, #140406 0%, #380811 55%, #F43F5E 100%)',
    dark: {
      bgPrimary: '#0F0305',
      bgSecondary: '#21070C',
      bgCard: 'rgba(38, 12, 18, 0.75)',
      bgCardBorder: 'rgba(244, 63, 94, 0.2)',
      accent: '#F43F5E',
      accentGlow: 'rgba(244, 63, 94, 0.35)',
      secondaryAccent: '#FDA4AF',
      textPrimary: '#FFF1F2',
      textSecondary: '#FECDD3',
      textMuted: '#9F1239'
    },
    light: {
      bgPrimary: '#FFF1F2',
      bgSecondary: '#FFE4E6',
      bgCard: '#FFFFFF',
      bgCardBorder: 'rgba(225, 29, 72, 0.15)',
      accent: '#BE123C',
      accentGlow: 'rgba(190, 18, 60, 0.2)',
      secondaryAccent: '#4C0519',
      textPrimary: '#2E030D',
      textSecondary: '#640D24',
      textMuted: '#883348'
    }
  }
];

interface ThemeContextType {
  themePresetId: ThemePresetId;
  isLightMode: boolean;
  activeAccentHex: string;
  setThemePresetId: (id: ThemePresetId) => void;
  setIsLightMode: (isLight: boolean) => void;
  resetToDefaults: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always default to 'pure_black' and dark mode on every fresh page load/refresh
  const [themePresetId, setThemePresetId] = useState<ThemePresetId>('pure_black');
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  const currentPreset = THEME_PRESETS.find(p => p.id === themePresetId) || THEME_PRESETS[0];
  const palette = isLightMode ? currentPreset.light : currentPreset.dark;

  useEffect(() => {
    const root = document.documentElement;

    // Apply exact harmonious CSS color tokens throughout the entire app
    root.style.setProperty('--bg-primary', palette.bgPrimary);
    root.style.setProperty('--bg-secondary', palette.bgSecondary);
    root.style.setProperty('--bg-card', palette.bgCard);
    root.style.setProperty('--bg-card-border', palette.bgCardBorder);
    root.style.setProperty('--accent-color', palette.accent);
    root.style.setProperty('--accent-glow', palette.accentGlow);
    root.style.setProperty('--secondary-accent', palette.secondaryAccent);
    root.style.setProperty('--text-primary', palette.textPrimary);
    root.style.setProperty('--text-secondary', palette.textSecondary);
    root.style.setProperty('--text-muted', palette.textMuted);

    if (isLightMode) {
      root.classList.add('theme-light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('theme-light');
      root.classList.add('dark');
    }
  }, [themePresetId, isLightMode, palette]);

  const resetToDefaults = () => {
    setThemePresetId('pure_black');
    setIsLightMode(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        themePresetId,
        isLightMode,
        activeAccentHex: palette.accent,
        setThemePresetId,
        setIsLightMode,
        resetToDefaults
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
