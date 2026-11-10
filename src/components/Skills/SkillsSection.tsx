import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_PILLS, SKILL_CATEGORIES } from '../../data/skills';
import { TechIcon } from './TechIcon';
import { useTheme } from '../../contexts/ThemeContext';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { isLightMode } = useTheme();

  const filteredSkills = selectedCategory === 'all'
    ? SKILLS_PILLS
    : SKILLS_PILLS.filter((s) => s.category === selectedCategory);

  // Diverse off-screen trajectory vectors for each card
  const getFlyDirection = (index: number) => {
    const pattern = index % 8;
    switch (pattern) {
      case 0:
        return { x: -450, y: -250, rotate: -25, scale: 0.6 }; // Top-Left
      case 1:
        return { x: 0, y: -380, rotate: 15, scale: 0.6 };    // Top-Center
      case 2:
        return { x: 450, y: -250, rotate: 25, scale: 0.6 };  // Top-Right
      case 3:
        return { x: 500, y: 0, rotate: -18, scale: 0.6 };    // Far-Right
      case 4:
        return { x: 450, y: 350, rotate: 20, scale: 0.6 };   // Bottom-Right
      case 5:
        return { x: 0, y: 380, rotate: -15, scale: 0.6 };    // Bottom-Center
      case 6:
        return { x: -450, y: 350, rotate: -20, scale: 0.6 }; // Bottom-Left
      case 7:
      default:
        return { x: -500, y: 0, rotate: 18, scale: 0.6 };    // Far-Left
    }
  };

  // Coordinated container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.02
      }
    }
  };

  return (
    <section id="skills" className="py-20 relative border-t border-white/5 overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'transparent' }}>
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: 'var(--accent-glow)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Category Filter Pills (Aligned directly above the skill cards grid) */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center space-x-2 border cursor-pointer"
                style={{
                  backgroundColor: isSelected ? 'var(--accent-color)' : (isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)'),
                  color: isSelected ? (isLightMode ? '#FFFFFF' : '#000000') : 'var(--text-secondary)',
                  borderColor: isSelected ? 'var(--accent-color)' : 'var(--bg-card-border)',
                  boxShadow: isSelected ? '0 0 20px -3px var(--accent-glow)' : 'none'
                }}
              >
                <span className="font-semibold">{cat.label}</span>
                <span 
                  className="text-[10px] px-1.5 py-0.2 rounded-full"
                  style={{
                    backgroundColor: isSelected ? (isLightMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)') : (isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)'),
                    color: isSelected ? (isLightMode ? '#FFFFFF' : '#000000') : 'var(--text-muted)'
                  }}
                >
                  {cat.id === 'all' ? SKILLS_PILLS.length : SKILLS_PILLS.filter(s => s.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* 
          SCATTER & ASSEMBLE SCROLL ANIMATION:
          - Default "all" mode strictly animates in on scroll: cards start off-screen in "hidden" and only fly in when scrolling into the Skills section.
          - When changing between categories, the cards also re-trigger and fly in smoothly from off-screen into their respective slots.
          - Scrolling away / out of viewport disperses them outward, and scrolling back into view re-assembles them from off-screen.
        */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
          >
            {filteredSkills.map((skill, index) => {
              const dir = getFlyDirection(index);
              const cardVariants = {
                hidden: {
                  opacity: 0,
                  x: dir.x,
                  y: dir.y,
                  rotate: dir.rotate,
                  scale: dir.scale
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    damping: 22,
                    stiffness: 150,
                    mass: 0.6
                  }
                }
              };

              return (
                <motion.div
                  key={skill.name}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.035, 
                    borderColor: 'var(--accent-color)',
                    boxShadow: '0 12px 28px -5px var(--accent-glow)',
                    transition: { duration: 0.2 }
                  }}
                  className="relative px-5 py-4 rounded-2xl sm:rounded-[22px] border transition-colors duration-300 flex items-center space-x-4 group cursor-pointer backdrop-blur-md shadow-md will-change-transform"
                  style={{
                    backgroundColor: isLightMode ? '#FFFFFF' : 'rgba(20, 24, 22, 0.85)',
                    borderColor: 'var(--bg-card-border)'
                  }}
                >
                  {/* Left: Icon container */}
                  <div 
                    className="shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center transition-colors shadow-sm"
                    style={{
                      backgroundColor: isLightMode ? '#F0F4F2' : 'rgba(255, 255, 255, 0.05)',
                      borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255, 255, 255, 0.1)',
                      color: 'var(--accent-color)'
                    }}
                  >
                    <TechIcon type={skill.iconType} className="w-5 h-5" />
                  </div>

                  {/* Right: Title & Sublabel with WCAG AAA Contrast */}
                  <div className="flex flex-col justify-center min-w-0">
                    <span 
                      className="font-sans font-bold text-sm sm:text-base tracking-tight truncate transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {skill.name}
                    </span>
                    <span 
                      className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider truncate transition-colors font-medium mt-0.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {skill.sublabel}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
