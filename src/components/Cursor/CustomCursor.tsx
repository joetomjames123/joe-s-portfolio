import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, .cursor-pointer');
      if (interactive) {
        setIsHovered(true);
        if (target.closest('[data-cursor]')) {
          setCursorText(target.closest('[data-cursor]')?.getAttribute('data-cursor') || '');
        } else if (target.closest('canvas')) {
          setCursorText('DRAG');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-emerald-accent pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovered ? 1.8 : 1
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 400, mass: 0.1 }}
      />

      {/* Trailing Luxury Aura Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-emerald-accent/60 pointer-events-none z-[9998] flex items-center justify-center font-mono text-[9px] text-emerald-accent"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 16),
          y: mousePosition.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          backgroundColor: isHovered ? 'rgba(0, 201, 135, 0.08)' : 'rgba(0, 0, 0, 0)',
          borderColor: isHovered ? 'var(--accent-color)' : 'rgba(199, 208, 204, 0.3)'
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.2 }}
      >
        {cursorText}
      </motion.div>
    </>
  );
};
