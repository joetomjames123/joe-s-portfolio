import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle2, X, Sparkles, ArrowUpRight } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import { useTheme } from '../../contexts/ThemeContext';

export const ExperienceSection: React.FC = () => {
  const [certModalOpen, setCertModalOpen] = useState(false);
  const exp = PROFILE_DATA.experience;
  const { isLightMode } = useTheme();

  return (
    <section 
      id="experience" 
      className="py-28 relative border-t transition-colors duration-500"
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--bg-card-border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b transition-colors"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--accent-color)' }}>
              <span>EXPERIENCE</span>
            </div>
            <h2 
              className="font-serif text-4xl sm:text-6xl tracking-tight transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              INTERNSHIP & EXPERIENCE
            </h2>
          </div>
          <p 
            className="font-mono text-xs mt-4 md:mt-0 tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            AI FRONTEND ENGINEERING • WEB APPLICATIONS
          </p>
        </div>

        {/* 
          Clean, Crisp Perfect Rectangle Card
          Focused, uncluttered presentation of role, company, standalone projects build & verified credentials
        */}
        <div 
          className="relative rounded-2xl border p-8 sm:p-12 transition-all duration-300 shadow-xl overflow-hidden group"
          style={{
            backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)',
            borderColor: 'var(--bg-card-border)'
          }}
        >
          {/* Subtle Accent Glow */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{ backgroundColor: 'var(--accent-glow)' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content Area: Title, Role, Description */}
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span 
                  className="font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-md border"
                  style={{
                    color: 'var(--accent-color)',
                    borderColor: 'var(--accent-color)',
                    backgroundColor: isLightMode ? 'rgba(0, 168, 112, 0.08)' : 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  INTERNSHIP
                </span>

                <div className="flex items-center space-x-1.5 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                  <span>{exp.period}</span>
                </div>
              </div>

              <div>
                <h3 
                  className="font-sans text-3xl sm:text-4xl font-bold tracking-tight mb-1 transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {exp.company}
                </h3>
                <p 
                  className="font-mono text-base font-semibold tracking-wide"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {exp.role}
                </p>
              </div>

              {/* Concise summary of project deliverables */}
              <p 
                className="font-sans text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Designed, developed, and deployed modern frontend web applications and interactive AI interface modules based on functional project specifications.
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'AI Interfaces'].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-md text-xs font-mono border"
                    style={{
                      backgroundColor: isLightMode ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'var(--bg-card-border)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Action: Clean Certificate Action Card */}
            <div className="shrink-0 flex flex-col items-start lg:items-end space-y-3">
              <button
                onClick={() => setCertModalOpen(true)}
                className="px-6 py-3.5 rounded-xl border font-mono text-xs font-bold tracking-wider flex items-center space-x-2.5 transition-all cursor-pointer shadow-md group-hover:scale-105"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)',
                  color: isLightMode ? '#FFFFFF' : '#000000'
                }}
              >
                <Award className="w-4 h-4" />
                <span>VIEW OFFICIAL CERTIFICATE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <span 
                className="font-mono text-[11px]"
                style={{ color: 'var(--text-muted)' }}
              >
                Credential ID: FR-D11-FA720-E6D08
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FlyRank Official Certificate Modal */}
      <AnimatePresence>
        {certModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setCertModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center"
              style={{ backgroundColor: isLightMode ? '#FFFFFF' : '#111318' }}
            >
              <button
                onClick={() => setCertModalOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white cursor-pointer"
                aria-label="Close Certificate Preview"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full aspect-[16/11] bg-white rounded-xl overflow-hidden flex items-center justify-center p-4 shadow-inner mb-6">
                <img
                  src={exp.certificateUrl}
                  alt="FlyRank Certificate"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-serif text-xl" style={{ color: isLightMode ? '#000000' : '#FFFFFF' }}>
                    FlyRank AI Frontend Engineering Certificate
                  </h4>
                  <p className="font-mono text-xs" style={{ color: isLightMode ? '#666666' : '#9CA3AF' }}>
                    Issued to Joe Tom James • ID: FR-D11-FA720-E6D08
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
