import React from 'react';
import { ArrowUp, Download, Github, Linkedin, Instagram, Heart } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { useTheme } from '../contexts/ThemeContext';

export const Footer: React.FC = () => {
  const { isLightMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="border-t py-16 relative transition-colors duration-500"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--bg-card-border)',
        color: 'var(--text-muted)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div 
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b items-center transition-colors"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-3">
              <span 
                className="font-serif text-2xl font-normal tracking-wide transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                JOE TOM JAMES
              </span>
              <span 
                className="px-2 py-0.5 rounded-full font-mono text-[10px] border"
                style={{
                  backgroundColor: isLightMode ? 'rgba(0, 168, 112, 0.1)' : 'var(--accent-glow)',
                  borderColor: 'var(--accent-color)',
                  color: 'var(--accent-color)'
                }}
              >
                PORTFOLIO EDITION
              </span>
            </div>
            <p 
              className="font-mono text-xs max-w-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              Integrated M.Tech CSE • VIT-AP University • Frontend Engineering Intern FlyRank AI
            </p>
          </div>

          {/* Center Links */}
          <div className="md:col-span-4 flex flex-wrap gap-4 text-xs font-mono">
            {['ABOUT', 'EXPERIENCE', 'SKILLS', 'PROJECTS', 'CERTIFICATES', 'CONTACT'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="transition-colors hover:opacity-100"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full border transition-all cursor-pointer shadow-sm hover:scale-105"
              style={{
                backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)',
                borderColor: 'var(--bg-card-border)',
                color: 'var(--text-primary)'
              }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div 
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-4"
          style={{ color: 'var(--text-muted)' }}
        >
          <p>© {new Date().getFullYear()} Joe Tom James. Designed & engineered with React, Three.js & Tailwind.</p>
          <div className="flex items-center space-x-4">
            <a
              href="/resume/joe_tom_james_resume.pdf"
              download="Joe_Tom_James_Resume.pdf"
              className="hover:underline flex items-center space-x-1 font-semibold"
              style={{ color: 'var(--accent-color)' }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>RESUME PDF</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
