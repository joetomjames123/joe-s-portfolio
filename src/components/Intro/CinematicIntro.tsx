import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete?: () => void;
  triggerReplay?: number;
}

export const CinematicIntro: React.FC<IntroAnimationProps> = ({ 
  onComplete,
  triggerReplay = 0
}) => {
  // Pacing sequence (~10s total duration, butter-smooth, unhurried):
  // 1. "drop": (0.0s - 1.6s) Ball drops from top, bounces and settles directly aligned with the center of JOE'S PORTFOLIO text.
  // 2. "moveToLeft": (1.6s - 2.5s) Settled ball glides smoothly from center to exact left edge of text at mid-height.
  // 3. "writing": (2.5s - 4.7s) Ball and text reveal move across the EXACT VERTICAL MIDDLE of the main letters.
  // 4. "welcome": (4.7s - 7.5s) Ball rests at right edge. "WELCOME TO" fades in, stays visible, and fades out within 3s.
  // 5. "erasing": (7.5s - 8.9s) Ball sweeps from right to left across the middle height, erasing text in 100% synchronized lockstep.
  // 6. "docking": (8.9s - 10.3s) Black overlay fades out smoothly while the glowing ball glides to the top-right of the home page.
  
  const [phase, setPhase] = useState<'drop' | 'moveToLeft' | 'writing' | 'welcome' | 'erasing' | 'docking' | 'finished'>('drop');
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [textWidth, setTextWidth] = useState<number>(580);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Measure text dimensions precisely on mount and resize
  useEffect(() => {
    const measure = () => {
      if (textRef.current) {
        const w = textRef.current.offsetWidth;
        if (w > 0) setTextWidth(w);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const halfWidth = textWidth / 2;
  const leftX = -halfWidth - 14;
  const rightX = halfWidth + 14;

  useEffect(() => {
    // Reset all states
    setPhase('drop');
    setShowWelcome(false);

    // 1. Move from Center to Left
    const tMoveLeft = setTimeout(() => {
      setPhase('moveToLeft');
    }, 1600);

    // 2. Start Writing (Ball moves from left to right, revealing text)
    const tWrite = setTimeout(() => {
      setPhase('writing');
    }, 2500);

    // 3. Welcome banner phase (displays for ~3 seconds)
    const tWelcome = setTimeout(() => {
      setPhase('welcome');
      setShowWelcome(true);
    }, 4700);

    // Fade out "WELCOME TO" before erasing begins
    const tWelcomeFade = setTimeout(() => {
      setShowWelcome(false);
    }, 7000);

    // 4. Ball erases text from right to left
    const tErase = setTimeout(() => {
      setPhase('erasing');
    }, 7500);

    // 5. Docking to top-right of Home page as black screen fades
    const tDocking = setTimeout(() => {
      setPhase('docking');
      if (onComplete) onComplete();
    }, 8900);

    // 6. Finish
    const tFinish = setTimeout(() => {
      setPhase('finished');
    }, 10400);

    return () => {
      clearTimeout(tMoveLeft);
      clearTimeout(tWrite);
      clearTimeout(tWelcome);
      clearTimeout(tWelcomeFade);
      clearTimeout(tErase);
      clearTimeout(tDocking);
      clearTimeout(tFinish);
    };
  }, [triggerReplay]);

  return (
    <AnimatePresence>
      {phase !== 'finished' && (
        <motion.div
          key="cinematic-intro-stage"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'docking' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 z-[100] bg-[#050608] flex items-center justify-center overflow-hidden ${
            phase === 'docking' ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {/* Ambient luxury center glow */}
          <div className="absolute w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

          {/* Central Container */}
          <div className="relative flex flex-col items-center justify-center select-none w-full max-w-5xl px-4">
            
            {/* Top "WELCOME TO" text with fade in & fade out */}
            <div className="h-10 flex items-center justify-center mb-6">
              <AnimatePresence>
                {showWelcome && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, letterSpacing: '0.35em' }}
                    animate={{ opacity: 1, y: 0, letterSpacing: '0.45em' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono text-xs sm:text-sm tracking-[0.45em] uppercase text-emerald-300/90 font-medium drop-shadow-[0_0_18px_rgba(52,211,153,0.5)] flex items-center space-x-2"
                  >
                    <span>WELCOME TO</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Primary Text Wrapper where the Ball is strictly relative to the Main Heading */}
            <div className="relative flex flex-col items-center">
              
              {/* Invisible measuring element for exact pixel matching */}
              <h1 
                ref={textRef} 
                className="absolute opacity-0 pointer-events-none font-serif text-5xl sm:text-7xl md:text-8xl tracking-[0.16em] font-normal whitespace-nowrap"
              >
                JOE'S PORTFOLIO
              </h1>

              {/* The Text Line Container with Relative Coordinates for the Ball */}
              <div className="relative flex items-center justify-center">
                
                {/* Synchronized Text Revealed Layer */}
                {(phase === 'writing' || phase === 'welcome' || phase === 'erasing') && (
                  <motion.div
                    className="relative overflow-visible"
                    initial={
                      phase === 'writing'
                        ? { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }
                        : { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
                    }
                    animate={
                      phase === 'writing'
                        ? { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
                        : phase === 'welcome'
                        ? { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
                        : phase === 'erasing'
                        ? { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }
                        : { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
                    }
                    transition={
                      phase === 'writing'
                        ? { duration: 2.2, ease: [0.16, 1, 0.3, 1] }
                        : phase === 'erasing'
                        ? { duration: 1.4, ease: [0.35, 0, 0.25, 1] }
                        : { duration: 0.1 }
                    }
                  >
                    {/* Luxury editorial serif typography */}
                    <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-[0.16em] font-normal whitespace-nowrap bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,255,255,0.6)] py-1">
                      JOE'S PORTFOLIO
                    </h1>

                    {/* Glass floor reflection placed absolute directly underneath heading */}
                    <div
                      className="absolute top-full left-0 right-0 font-serif text-5xl sm:text-7xl md:text-8xl tracking-[0.16em] font-normal whitespace-nowrap scale-y-[-1] blur-[2.5px] select-none pointer-events-none opacity-25 text-white"
                      style={{
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 70%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 70%)'
                      }}
                    >
                      JOE'S PORTFOLIO
                    </div>
                  </motion.div>
                )}

                {/* The Cinematic White Ball - POSITIONED DIRECTLY ON THE VERTICAL CENTER OF THE LETTERS */}
                <motion.div
                  className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow-[0_0_28px_10px_rgba(255,255,255,0.98)] z-30"
                  style={{ top: '50%', marginTop: '-11px' }} // Exactly centers the 22px ball on the text vertical midline
                  initial={{ y: -450, x: 0, opacity: 1, scale: 1 }}
                  animate={
                    phase === 'drop'
                      ? {
                          // Falls directly to the text vertical center, bounces and settles
                          y: [-450, 0, -38, 0, -10, 0],
                          scaleX: [1, 1.3, 0.92, 1.15, 0.97, 1],
                          scaleY: [1, 0.7, 1.08, 0.85, 1.03, 1],
                          x: 0,
                          opacity: 1
                        }
                      : phase === 'moveToLeft'
                      ? {
                          // Moves from center to exact beginning of the text AT EXACT MIDLINE
                          y: 0,
                          x: leftX,
                          scale: 1,
                          opacity: 1
                        }
                      : phase === 'writing'
                      ? {
                          // Glides horizontally across the EXACT VERTICAL MIDLINE of the letters
                          y: 0,
                          x: [leftX, rightX],
                          scale: [1, 1.15, 1],
                          opacity: 1
                        }
                      : phase === 'welcome'
                      ? {
                          // Rests gently at midline on the right edge
                          y: [0, -4, 0],
                          x: rightX,
                          scale: 1,
                          opacity: [0.92, 1, 0.92]
                        }
                      : phase === 'erasing'
                      ? {
                          // Sweeps across the EXACT VERTICAL MIDLINE from right to left
                          y: 0,
                          x: [rightX, leftX],
                          scale: [1, 1.25, 1],
                          opacity: 1
                        }
                      : {
                          // Docks to the top-right corner of the Home page
                          x: typeof window !== 'undefined' ? (window.innerWidth / 2) - 48 : 380,
                          y: typeof window !== 'undefined' ? -(window.innerHeight / 2) + 90 : -280,
                          scale: 0.85,
                          opacity: 1
                        }
                  }
                  transition={
                    phase === 'drop'
                      ? { duration: 1.6, times: [0, 0.5, 0.7, 0.84, 0.94, 1], ease: "easeOut" }
                      : phase === 'moveToLeft'
                      ? { duration: 0.9, ease: [0.25, 1, 0.5, 1] }
                      : phase === 'writing'
                      ? { duration: 2.2, ease: [0.16, 1, 0.3, 1] }
                      : phase === 'welcome'
                      ? { duration: 2.0, repeat: Infinity, ease: "easeInOut" }
                      : phase === 'erasing'
                      ? { duration: 1.4, ease: [0.35, 0, 0.25, 1] }
                      : { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                  }
                />

                {/* Bounce impact floor reflection during drop */}
                {phase === 'drop' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{
                      opacity: [0, 0.7, 0.1, 0.5, 0.15, 0.3],
                      scaleX: [0.2, 1.8, 0.5, 1.4, 0.7, 1.0],
                      scaleY: 0.25
                    }}
                    transition={{ duration: 1.6, times: [0, 0.5, 0.7, 0.84, 0.94, 1] }}
                    className="absolute top-1/2 mt-7 w-12 h-2.5 rounded-full bg-white/50 blur-[4px]"
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
