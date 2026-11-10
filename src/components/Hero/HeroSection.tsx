import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { Hero3DScene } from './Hero3DScene';
import { HeroMeteors } from './HeroMeteors';
import { PROFILE_DATA } from '../../data/profile';

export const HeroSection: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center luxury-grid transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* 3D Scene Background Canvas spanning the full Home section */}
      <Hero3DScene />

      {/* Meteors streaming across different trajectories only in Home */}
      <HeroMeteors />

      {/* Ambient background light gradients */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 opacity-30 transition-all duration-700" 
        style={{ backgroundColor: 'var(--accent-glow)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pointer-events-none relative z-10">
        {/* Left Column: Editorial & Cinematic Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col justify-center relative z-10 pl-2 sm:pl-4 pointer-events-auto"
        >
          {/* Status Badge */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-[2px] bg-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
              CSE STUDENT
            </span>
          </div>

          {/* 
            Main Heading:
            "Joe Tom" adapts to theme: dark in light mode, crisp white in dark mode
            "James" adapts dynamically to the active theme accent color with subtle glow
          */}
          <h1 className="font-sans text-6xl sm:text-8xl xl:text-9xl font-semibold tracking-tight leading-[0.95] mb-6 overflow-visible">
            <span className="block transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Joe Tom</span>
            <span 
              className="block transition-all duration-500 drop-shadow-sm"
              style={{ color: 'var(--accent-color)' }}
            >
              James
            </span>
          </h1>

          {/* Subtitle - AI Builder */}
          <div className="mb-8">
            <span className="text-2xl sm:text-3xl xl:text-4xl font-sans font-medium tracking-tight transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
              AI Builder
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-full text-black font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center space-x-2.5 shadow-lg group cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-color)',
                boxShadow: '0 0 25px -5px var(--accent-glow)'
              }}
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#about"
              className="px-7 py-3.5 rounded-full border font-mono text-xs font-medium tracking-wider transition-all duration-300 cursor-pointer"
              style={{
                borderColor: 'var(--bg-card-border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)'
              }}
            >
              ABOUT ME
            </a>

            <a
              href="/resume/joe_tom_james_resume.pdf"
              download="Joe_Tom_James_Resume.pdf"
              className="px-6 py-3.5 rounded-full border font-mono text-xs tracking-wider transition-all duration-300 flex items-center space-x-2 cursor-pointer"
              style={{
                borderColor: 'var(--bg-card-border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-secondary)'
              }}
            >
              <Download className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>

          {/* Academic Indicators */}
          <div className="grid grid-cols-2 gap-6 pt-10 mt-10 border-t" style={{ borderColor: 'var(--bg-card-border)' }}>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest block mb-1" style={{ color: 'var(--text-muted)' }}>Degree</span>
              <span className="font-sans text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Integrated M.Tech CSE</span>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest block mb-1" style={{ color: 'var(--text-muted)' }}>University</span>
              <span className="font-sans text-sm font-medium" style={{ color: 'var(--text-primary)' }}>VIT-AP University</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Area (Planet renders in full hero 3D canvas behind/beside it) */}
        <div className="lg:col-span-6 h-[450px] sm:h-[550px] pointer-events-none" />
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full mt-12 flex items-center justify-between relative z-10" style={{ color: 'var(--text-muted)' }}>
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span>PORTFOLIO DIRECTORY 2026/2027</span>
        </div>
        <a 
          href="#about"
          className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase transition-colors group hover:opacity-100 cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>SCROLL DOWN</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" style={{ color: 'var(--accent-color)' }} />
        </a>
      </div>
    </section>
  );
};
