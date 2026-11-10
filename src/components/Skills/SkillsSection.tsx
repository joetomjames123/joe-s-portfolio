import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS_PILLS, SKILL_CATEGORIES } from '../../data/skills';
import { TechIcon } from './TechIcon';
import { useTheme } from '../../contexts/ThemeContext';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { isLightMode } = useTheme();

  const filteredSkills = selectedCategory === 'all'
    ? SKILLS_PILLS
    : SKILLS_PILLS.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-28 relative border-t border-white/5 overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'transparent' }}>
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: 'var(--accent-glow)' }}
      />

      {/* Infinite Horizontal Technology Marquee */}
      <div 
        className="w-full py-3.5 border-y overflow-hidden mb-16 select-none transition-colors"
        style={{ 
          borderColor: 'var(--bg-card-border)', 
          backgroundColor: isLightMode ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.3)' 
        }}
      >
        <div className="flex w-[200%] animate-marquee space-x-8">
          {[...SKILLS_PILLS, ...SKILLS_PILLS].map((s, idx) => (
            <div key={idx} className="flex items-center space-x-3 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
              <span 
                className="font-mono text-xs uppercase tracking-widest transition-colors font-medium hover:opacity-100"
                style={{ color: 'var(--text-secondary)' }}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b" style={{ borderColor: 'var(--bg-card-border)' }}>
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--accent-color)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
              <span>SKILLS & TECHNOLOGIES</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
              TECH STACK & TOOLS
            </h2>
          </div>
          <p className="font-mono text-xs mt-4 md:mt-0 tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
            LANGUAGES • FRAMEWORKS • DATABASES • SYSTEMS
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center space-x-2 border"
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
          ADAPTIVE SKILL PILLS:
          - Dark Mode: rich deep obsidian charcoal with silver/white typography and emerald glow.
          - Light Mode: pristine clean white cards with crisp high-contrast dark text and subtle shadow (No more black pills on white page!).
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              whileHover={{ 
                scale: 1.025, 
                borderColor: 'var(--accent-color)',
                boxShadow: '0 12px 28px -5px var(--accent-glow)' 
              }}
              className="relative px-5 py-4 rounded-2xl sm:rounded-[22px] border transition-all duration-300 flex items-center space-x-4 group cursor-pointer backdrop-blur-md shadow-md"
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
          ))}
        </div>
      </div>
    </section>
  );
};
