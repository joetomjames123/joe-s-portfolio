import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, SlidersHorizontal, Download } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import { useTheme } from '../../contexts/ThemeContext';

interface NavigationProps {
  onOpenThemeCustomizer?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenThemeCustomizer }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isLightMode } = useTheme();

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CERTIFICATES', href: '#certificates' },
    { label: 'SERVICES', href: '#services' },
    { label: 'GALLERY', href: '#journal' },
    { label: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY;
      setScrolled(pos > 50);

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((pos / totalHeight) * 100);
      }

      // Determine active section
      const sections = navLinks.map(l => l.href.substring(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 transition-all duration-100 ease-out"
        style={{ 
          width: `${scrollProgress}%`,
          backgroundColor: 'var(--accent-color)',
          boxShadow: '0 0 10px var(--accent-glow)'
        }}
      />

      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'py-3.5 backdrop-blur-xl border-b shadow-xl' : 'py-6 bg-transparent'
        }`}
        style={{
          backgroundColor: scrolled 
            ? (isLightMode ? 'rgba(250, 250, 250, 0.88)' : 'rgba(10, 12, 16, 0.85)') 
            : 'transparent',
          borderColor: scrolled ? 'var(--bg-card-border)' : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo & Monogram */}
          <a
            href="#home"
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div 
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-colors"
              style={{
                borderColor: 'var(--bg-card-border)',
                backgroundColor: isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <span className="font-mono text-xs font-bold tracking-tighter" style={{ color: 'var(--accent-color)' }}>JTJ</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-lg tracking-wider block leading-none" style={{ color: 'var(--text-primary)' }}>
                {PROFILE_DATA.name.toUpperCase()}
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                AI Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav 
            className="hidden lg:flex items-center space-x-1 px-4 py-1.5 rounded-full border shadow-inner backdrop-blur-md"
            style={{
              backgroundColor: isLightMode ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)',
              borderColor: 'var(--bg-card-border)'
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all rounded-full relative"
                  style={{
                    color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 400
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full -z-10 border"
                      style={{
                        backgroundColor: isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'var(--accent-color)'
                      }}
                      transition={{ type: 'spring', damping: 22, stiffness: 250 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center space-x-3">
            {/* Resume Button */}
            <a
              href="/resume/joe_tom_james_resume.pdf"
              download="Joe_Tom_James_Resume.pdf"
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full border font-mono text-xs font-semibold tracking-wider transition-all duration-300"
              style={{
                borderColor: 'var(--accent-color)',
                backgroundColor: isLightMode ? 'rgba(0, 168, 112, 0.1)' : 'var(--accent-glow)',
                color: 'var(--accent-color)'
              }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border transition-colors"
              style={{
                borderColor: 'var(--bg-card-border)',
                backgroundColor: isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-primary)'
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[73px] z-30 p-6 backdrop-blur-2xl border-b shadow-2xl lg:hidden"
            style={{
              backgroundColor: isLightMode ? '#FFFFFF' : '#0B0D13',
              borderColor: 'var(--bg-card-border)'
            }}
          >
            <div className="flex flex-col space-y-4 font-mono text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-black/5 transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t flex flex-col gap-3" style={{ borderColor: 'var(--bg-card-border)' }}>
                <a
                  href="/resume/joe_tom_james_resume.pdf"
                  download="Joe_Tom_James_Resume.pdf"
                  className="w-full py-3 rounded-xl border text-center font-mono text-xs font-semibold tracking-wider"
                  style={{
                    borderColor: 'var(--accent-color)',
                    color: 'var(--accent-color)'
                  }}
                >
                  DOWNLOAD RESUME
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
