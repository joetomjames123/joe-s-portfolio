import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Github, 
  CheckCircle2, 
  X,
  Sparkles,
  MousePointerClick,
  Layers,
  Code2,
  Terminal,
  Activity
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../../data/projects';
import { ProjectLogo } from './ProjectLogo';
import { useTheme } from '../../contexts/ThemeContext';

export const ProjectsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<ProjectItem>(PROJECTS_DATA[0]);
  const { isLightMode } = useTheme();

  return (
    <section 
      id="projects" 
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
              <span>PROJECTS</span>
            </div>
            <h2 
              className="font-serif text-4xl sm:text-6xl tracking-tight transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              FEATURED PROJECTS
            </h2>
          </div>
          <p 
            className="font-mono text-xs mt-4 md:mt-0 tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            WEB APPS • PLATFORMS • PROTOTYPES
          </p>
        </div>

        {/* 
          1. ELEGANT RECTANGLE WITH SUMMARY WRITING
          OPENS ONLY ON CLICK
        */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="relative rounded-3xl p-8 sm:p-14 border shadow-xl overflow-hidden cursor-pointer group transition-all duration-500"
          style={{
            backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)',
            borderColor: 'var(--accent-color)'
          }}
        >
          {/* Ambient Glow */}
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-25"
            style={{ backgroundColor: 'var(--accent-glow)' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div 
                className="inline-flex items-center space-x-2.5 px-3.5 py-1 rounded-full font-mono text-xs border"
                style={{
                  backgroundColor: isLightMode ? 'rgba(0, 168, 112, 0.1)' : 'var(--accent-glow)',
                  borderColor: 'var(--accent-color)',
                  color: 'var(--accent-color)'
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>FEATURED WORK • 6 PROJECTS</span>
              </div>

              <h3 
                className="font-serif text-3xl sm:text-5xl leading-tight transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                ClinicFlow, Ayur Mannoor, Samatraya & Engineering Builds
              </h3>

              <p 
                className="font-sans text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                A curated collection of full-stack healthcare platforms, responsive digital interfaces, event automation systems, and sensor-driven environmental robotics prototypes.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Healthcare SaaS', 'React & TypeScript', 'PostgreSQL', 'Role-Based Access', 'Robotics Hardware'].map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 rounded-full text-xs font-mono border"
                    style={{
                      backgroundColor: isLightMode ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'var(--bg-card-border)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Callout */}
            <div className="shrink-0 flex flex-col items-start lg:items-end space-y-3">
              <div 
                className="px-6 py-3.5 rounded-full text-black font-mono text-xs font-bold tracking-wider flex items-center space-x-2.5 shadow-lg group-hover:scale-105 transition-transform"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <MousePointerClick className="w-4 h-4" />
                <span>CLICK TO OPEN ALL PROJECTS</span>
              </div>
              <span 
                className="font-mono text-[11px]"
                style={{ color: 'var(--text-muted)' }}
              >
                Click anywhere on this card to launch the projects window &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        2. FULL DETAILED PROJECTS POPUP WINDOW (Full screen modal on click)
      */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border border-white/20"
              style={{ backgroundColor: isLightMode ? '#FFFFFF' : '#0B0D13' }}
            >
              {/* Header Bar */}
              <div 
                className="p-6 sm:px-10 flex items-center justify-between border-b"
                style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-color)' }} />
                  <div>
                    <h3 className="font-serif text-2xl" style={{ color: isLightMode ? '#000000' : '#FFFFFF' }}>PROJECT ARCHIVE</h3>
                    <p className="font-mono text-xs" style={{ color: isLightMode ? '#666666' : '#9CA3AF' }}>Detailed breakdown of software, architectures & engineering work</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full border hover:scale-105 transition-all cursor-pointer"
                  style={{
                    borderColor: isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
                    color: isLightMode ? '#000000' : '#FFFFFF'
                  }}
                  aria-label="Close Project Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body: Left tab list + Right active details */}
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
                {/* Left: Project Selector Tabs */}
                <div 
                  className="lg:col-span-4 p-4 sm:p-6 space-y-2 border-b lg:border-b-0 lg:border-r"
                  style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}
                >
                  <span className="font-mono text-xs uppercase tracking-widest block mb-3 px-3" style={{ color: isLightMode ? '#777777' : '#9CA3AF' }}>
                    SELECT PROJECT ({PROJECTS_DATA.length})
                  </span>

                  {PROJECTS_DATA.map((proj) => {
                    const isSelected = activeProjectTab.id === proj.id;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => setActiveProjectTab(proj)}
                        className="w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer"
                        style={{
                          backgroundColor: isSelected 
                            ? (isLightMode ? 'rgba(0, 168, 112, 0.1)' : 'rgba(255, 255, 255, 0.1)')
                            : 'transparent',
                          borderColor: isSelected 
                            ? 'var(--accent-color)' 
                            : (isLightMode ? 'rgba(0,0,0,0.05)' : 'rgba(255, 255, 255, 0.05)'),
                        }}
                      >
                        <div className="flex items-center space-x-3 truncate">
                          <ProjectLogo id={proj.id} logoSrc={proj.logoSrc} className="w-8 h-8" />
                          <div className="truncate">
                            <span 
                              className="font-sans font-semibold text-sm block truncate"
                              style={{ color: isLightMode ? '#000000' : '#FFFFFF' }}
                            >
                              {proj.title}
                            </span>
                            <span className="font-mono text-[10px]" style={{ color: isLightMode ? '#666666' : '#888888' }}>{proj.category}</span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 shrink-0" style={{ color: isSelected ? 'var(--accent-color)' : '#888888' }} />
                      </button>
                    );
                  })}
                </div>

                {/* Right: Active Project Full Spec Sheet */}
                <div className="lg:col-span-8 p-6 sm:p-10 space-y-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-0.5 rounded border" style={{ color: 'var(--accent-color)', borderColor: 'var(--accent-color)' }}>
                        {activeProjectTab.category}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-5xl mb-3" style={{ color: isLightMode ? '#000000' : '#FFFFFF' }}>
                      {activeProjectTab.title}
                    </h2>
                    <p className="font-sans text-base sm:text-lg leading-relaxed" style={{ color: isLightMode ? '#333333' : '#CCCCCC' }}>
                      {activeProjectTab.tagline}
                    </p>
                  </div>

                  {/* Redesigned Clean Feature Specification Layout */}
                  <div className="space-y-4 pt-4 border-t" style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-widest font-semibold flex items-center space-x-2" style={{ color: 'var(--accent-color)' }}>
                        <Terminal className="w-3.5 h-3.5" />
                        <span>CORE SYSTEM DELIVERABLES</span>
                      </span>
                      <span className="font-mono text-[11px]" style={{ color: isLightMode ? '#777777' : '#888888' }}>
                        {activeProjectTab.caseStudy.keyFeatures.length} MODULES
                      </span>
                    </div>

                    {/* Modern Clean Feature Cards with Indexed Micro-Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeProjectTab.caseStudy.keyFeatures.map((featureText, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 rounded-xl border transition-all duration-300 flex items-start space-x-3.5 group"
                          style={{ 
                            backgroundColor: isLightMode ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)', 
                            borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' 
                          }}
                        >
                          <div 
                            className="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 font-mono text-[11px] font-bold mt-0.5"
                            style={{
                              borderColor: 'var(--accent-color)',
                              color: 'var(--accent-color)',
                              backgroundColor: isLightMode ? 'rgba(0, 168, 112, 0.08)' : 'rgba(255, 255, 255, 0.05)'
                            }}
                          >
                            0{idx + 1}
                          </div>
                          <span 
                            className="font-sans text-xs sm:text-sm font-medium leading-relaxed" 
                            style={{ color: isLightMode ? '#1F2937' : '#E5E7EB' }}
                          >
                            {featureText}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="space-y-3 pt-3">
                    <span className="font-mono text-xs uppercase tracking-widest block font-semibold" style={{ color: isLightMode ? '#555555' : '#AAAAAA' }}>
                      TECHNOLOGIES USED
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProjectTab.tags.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs font-mono border" style={{ backgroundColor: isLightMode ? '#F0F0F0' : '#161922', borderColor: isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)', color: isLightMode ? '#111111' : '#EEEEEE' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links Row */}
                  <div className="pt-6 border-t flex flex-wrap gap-4" style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}>
                    {activeProjectTab.githubUrl && (
                      <a
                        href={activeProjectTab.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full border text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer"
                        style={{
                          backgroundColor: isLightMode ? '#000000' : '#FFFFFF',
                          color: isLightMode ? '#FFFFFF' : '#000000'
                        }}
                      >
                        <Github className="w-4 h-4" />
                        <span>VIEW REPOSITORY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {activeProjectTab.liveUrl && (
                      <a
                        href={activeProjectTab.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full border text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer"
                        style={{
                          borderColor: 'var(--accent-color)',
                          color: 'var(--accent-color)'
                        }}
                      >
                        <span>VISIT APPLICATION</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
