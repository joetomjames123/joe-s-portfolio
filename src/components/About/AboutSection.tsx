import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import { useTheme } from '../../contexts/ThemeContext';
import { MiniAIChatbot } from './MiniAIChatbot';

export const AboutSection: React.FC = () => {
  const { isLightMode } = useTheme();

  return (
    <section id="about" className="py-28 relative border-t transition-colors duration-500" style={{ borderColor: 'var(--bg-card-border)', backgroundColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header matching Screenshot: "01 —— A LITTLE ABOUT ME" */}
        <div className="flex items-center space-x-3 mb-16 pb-4 border-b" style={{ borderColor: 'var(--bg-card-border)' }}>
          <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-color)' }}>01</span>
          <span className="w-8 h-[1px]" style={{ backgroundColor: 'var(--bg-card-border)' }} />
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            A LITTLE ABOUT ME
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Creative Terminal Box to balance Education */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full flex justify-center"
            >
              <div className="relative w-full max-w-sm aspect-[4/5] p-3 group">
                {/* Outer Purple Frame & Neon Accent Brackets from Screenshot */}
                <div className="absolute inset-0 border border-[#8B5CF6]/50 rounded-2xl pointer-events-none" />
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />

                {/* Portrait Photograph */}
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-[#0F1117]">
                  <img
                    src={PROFILE_DATA.avatarUrl}
                    alt={PROFILE_DATA.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Bottom Vignette */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Bottom Overlay Label: "JOE TOM JAMES • VIT-AP" */}
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/15 text-[10px] font-mono tracking-widest text-white uppercase">
                    JOE TOM JAMES • VIT-AP
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 
              Interactive AI Chat Robot (Fills the blank space beside the Education timeline)
            */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full flex justify-center"
            >
              <MiniAIChatbot />
            </motion.div>
          </div>

          {/* Right Column: "Curiosity first. Craft always." & Education Timeline */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-[#8B5CF6] block font-semibold">
                THE PERSON BEHIND THE PIXELS
              </span>

              <h3 className="font-sans text-4xl sm:text-6xl font-semibold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
                Curiosity first.<br />
                Craft always.
              </h3>

              <p className="font-sans text-base sm:text-lg leading-relaxed pt-2" style={{ color: 'var(--text-secondary)' }}>
                I&apos;m a Computer Science and Engineering student at VIT-AP University, drawn to the spaces where thoughtful software and AI meet human experience.
              </p>

              <p className="font-sans text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                From AI engineering and intelligent systems to creative technology, I enjoy turning ideas into clear, considered digital products—then learning what they can become.
              </p>
            </motion.div>

            {/* Quick Metrics from Screenshot: FOCUS & STUDYING */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t" style={{ borderColor: 'var(--bg-card-border)' }}>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>
                  01 / FOCUS
                </span>
                <span className="font-sans text-base font-medium" style={{ color: 'var(--text-primary)' }}>
                  AI Engineering & Software
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>
                  02 / STUDYING
                </span>
                <span className="font-sans text-base font-medium" style={{ color: 'var(--text-primary)' }}>
                  Integrated M.Tech • CSE
                </span>
              </div>
            </div>

            {/* Social Links Row matching Screenshot */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border flex items-center justify-center transition-colors"
                style={{
                  borderColor: 'var(--bg-card-border)',
                  backgroundColor: isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-secondary)'
                }}
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border flex items-center justify-center transition-colors"
                style={{
                  borderColor: 'var(--bg-card-border)',
                  backgroundColor: isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-secondary)'
                }}
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a
                href={PROFILE_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border flex items-center justify-center transition-colors"
                style={{
                  borderColor: 'var(--bg-card-border)',
                  backgroundColor: isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-secondary)'
                }}
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            {/* Academic Trajectory Timeline */}
            <div className="pt-6 border-t" style={{ borderColor: 'var(--bg-card-border)' }}>
              <h4 className="font-mono text-xs uppercase tracking-widest mb-6 flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
                <GraduationCap className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                <span>EDUCATION</span>
              </h4>

              <div className="space-y-6 relative">
                {/* Continuous Animated Timeline Spine Line */}
                <div 
                  className="absolute left-[13px] top-3 bottom-3 w-[2.5px] rounded-full overflow-hidden"
                  style={{
                    backgroundColor: isLightMode ? '#009F6B' : 'var(--accent-color)',
                    boxShadow: '0 0 10px var(--accent-glow)'
                  }}
                >
                  <div className="w-full h-24 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse-subtle" />
                </div>

                {PROFILE_DATA.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-10">
                    {/* Ring Node on Timeline */}
                    <span 
                      className="absolute left-[7px] top-4 w-4 h-4 rounded-full border-2 transition-all shadow-md z-10"
                      style={{
                        backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-primary)',
                        borderColor: 'var(--accent-color)',
                        boxShadow: '0 0 10px var(--accent-glow)'
                      }}
                    />

                    {/* Timeline Info Card */}
                    <div 
                      className="p-5 rounded-2xl border transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)',
                        borderColor: 'var(--bg-card-border)'
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <span className="font-sans font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                          {edu.institution}
                        </span>
                        <span className="font-mono text-xs font-semibold" style={{ color: 'var(--accent-color)' }}>
                          {edu.period}
                        </span>
                      </div>
                      <p className="font-sans text-sm mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {edu.degree}
                      </p>
                      <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {edu.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
