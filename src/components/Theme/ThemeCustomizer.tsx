import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  RotateCcw, 
  Sun, 
  Moon, 
  X,
  Check
} from 'lucide-react';
import { useTheme, THEME_PRESETS, ThemePresetId } from '../../contexts/ThemeContext';

export const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    themePresetId,
    isLightMode,
    setThemePresetId,
    setIsLightMode,
    resetToDefaults
  } = useTheme();

  const activePreset = THEME_PRESETS.find(p => p.id === themePresetId) || THEME_PRESETS[0];

  return (
    <>
      {/* Floating Theme Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 glass-panel p-3.5 rounded-full shadow-emerald-glow hover:border-emerald-accent text-typography-primary flex items-center justify-center transition-all group"
        aria-label="Customize Theme & Visual Experience"
      >
        <Palette className="w-5 h-5 text-emerald-accent group-hover:rotate-45 transition-transform duration-300" />
      </motion.button>

      {/* Floating Modal Window - Exact Design from Screenshot */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[420px] rounded-[32px] bg-[#16181D]/98 border border-white/10 shadow-2xl p-6 sm:p-7 text-white relative overflow-hidden backdrop-blur-2xl"
            >
              {/* Top Row: MODE header with close */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8E95A5]">
                  MODE
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-typography-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Segmented Dark / Light Toggle matching screenshot */}
              <div className="p-1 rounded-full bg-[#0E1015] border border-white/5 flex items-center mb-7">
                <button
                  onClick={() => setIsLightMode(false)}
                  className={`flex-1 py-2.5 rounded-full font-sans text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                    !isLightMode
                      ? 'bg-gradient-to-r from-emerald-accent to-emerald-dark text-black shadow-md'
                      : 'text-[#8E95A5] hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>

                <button
                  onClick={() => setIsLightMode(true)}
                  className={`flex-1 py-2.5 rounded-full font-sans text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                    isLightMode
                      ? 'bg-gradient-to-r from-emerald-accent to-emerald-dark text-black shadow-md'
                      : 'text-[#8E95A5] hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
              </div>

              {/* THEME Header with Active Preset Label */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8E95A5]">
                  THEME
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-accent">
                  {activePreset.name.toUpperCase()}
                </span>
              </div>

              {/* 2-Column Theme Grid Matching Screenshot Layout */}
              <div className="grid grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = themePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setThemePresetId(preset.id)}
                      className={`p-3.5 rounded-[22px] border text-left transition-all duration-300 relative group flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-accent bg-white/10 shadow-lg'
                          : 'border-white/10 hover:border-white/25 bg-[#0F1116]/80'
                      }`}
                    >
                      {/* Top Gradient Capsule Pill */}
                      <div
                        className="w-full h-8 rounded-full mb-3 shadow-inner border border-white/10 relative overflow-hidden"
                        style={{ background: preset.gradientPreview }}
                      >
                        {isSelected && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shadow">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Name & Sublabel */}
                      <div>
                        <span className="font-sans font-bold text-xs text-white block truncate leading-tight">
                          {preset.name}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#8E95A5] block mt-0.5">
                          {preset.sub}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={resetToDefaults}
                  className="flex items-center space-x-1.5 text-xs font-mono text-[#8E95A5] hover:text-emerald-accent transition-colors py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>DEFAULT THEME</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-full bg-emerald-accent text-black font-mono text-xs font-bold hover:bg-emerald-light transition-all shadow-emerald-glow"
                >
                  DONE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
