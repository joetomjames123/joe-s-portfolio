import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ZoomIn, X, ExternalLink } from 'lucide-react';
import { CERTIFICATES_DATA, CertificateItem } from '../../data/certificates';
import { useTheme } from '../../contexts/ThemeContext';

// Handcrafted natural tilts and vertical offsets for the floating ribbon
// Mirrors the organic, staggered, floating card arrangement
const CARD_LAYOUT_PROPS = [
  { rotate: -3.8, yOffset: -18, zOffset: 12 },
  { rotate: 4.2, yOffset: 24, zOffset: -8 },
  { rotate: -2.5, yOffset: -10, zOffset: 6 },
  { rotate: 5.1, yOffset: 28, zOffset: 14 },
  { rotate: -4.6, yOffset: -22, zOffset: -12 },
  { rotate: 3.2, yOffset: 16, zOffset: 8 },
  { rotate: -5.4, yOffset: -14, zOffset: -6 },
  { rotate: 2.8, yOffset: 20, zOffset: 10 },
  { rotate: -3.2, yOffset: -6, zOffset: 4 },
];

export const CertificatesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxCert, setLightboxCert] = useState<CertificateItem | null>(null);
  const { isLightMode } = useTheme();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'database', label: 'Database' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'entrepreneurship', label: 'Entrepreneurship' },
  ];

  const filteredCerts = activeCategory === 'all'
    ? CERTIFICATES_DATA
    : CERTIFICATES_DATA.filter((c) => c.category === activeCategory);

  const getTagFromCategory = (cat: string) => {
    switch (cat) {
      case 'ai': return 'AI';
      case 'blockchain': return 'BLOCKCHAIN';
      case 'database': return 'DATABASE';
      case 'engineering': return 'ENGINEERING';
      case 'entrepreneurship': return 'ENTREPRENEURSHIP';
      default: return 'CREDENTIAL';
    }
  };

  // -------------------------------------------------------------
  // INFINITE SLOW-FLOWING MARQUEE (LEFT-TO-RIGHT) ENGINE
  // -------------------------------------------------------------
  // We duplicate the list 4 times to ensure seamless infinite looping on any display width.
  const duplicatedCerts = React.useMemo(() => {
    return [
      ...filteredCerts,
      ...filteredCerts,
      ...filteredCerts,
      ...filteredCerts,
    ];
  }, [filteredCerts]);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Continuous translation state
  const offsetRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const singleSetWidthRef = useRef<number>(0);

  // Speed: tuned slightly faster per user request (~30-36 pixels per second)
  const speed = 0.55; // px per frame at 60fps ~= 33px/sec

  // Calculate single set width
  const updateMetrics = useCallback(() => {
    if (!trackRef.current) return;
    const totalWidth = trackRef.current.scrollWidth;
    // 4 duplicate sets
    singleSetWidthRef.current = totalWidth / 4;
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [updateMetrics, filteredCerts]);

  // Main animation loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId: number;

    const tick = () => {
      if (!isDraggingRef.current && trackRef.current && singleSetWidthRef.current > 0) {
        // Move LEFT TO RIGHT: increment offset in positive direction
        offsetRef.current += speed;

        const singleSet = singleSetWidthRef.current;
        // Seamless modulo wrap: offset stays strictly between -singleSet and 0
        if (offsetRef.current >= 0) {
          offsetRef.current -= singleSet;
        }

        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      animId = requestAnimationFrame(tick);
    };

    // Initialize track slightly shifted left so positive movement flows seamlessly from left to right
    if (singleSetWidthRef.current > 0 && offsetRef.current === 0) {
      offsetRef.current = -singleSetWidthRef.current;
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [filteredCerts]);

  // Drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary button
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    hasMovedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    if (Math.abs(e.clientX - startXRef.current) > 5) {
      hasMovedRef.current = true;
    }

    offsetRef.current += deltaX;

    const singleSet = singleSetWidthRef.current;
    if (singleSet > 0) {
      while (offsetRef.current > 0) {
        offsetRef.current -= singleSet;
      }
      while (offsetRef.current < -singleSet * 2) {
        offsetRef.current += singleSet;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section 
      id="certificates" 
      className="py-24 sm:py-28 relative border-t transition-colors duration-500 overflow-hidden"
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--bg-card-border)'
      }}
    >
      {/* Subtle cosmic space aura glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full blur-[160px] pointer-events-none -z-10 opacity-35"
        style={{ backgroundColor: 'var(--accent-glow, rgba(16, 185, 129, 0.25))' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b transition-colors"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-color)' }}>05</span>
              <span className="w-8 h-[1px]" style={{ backgroundColor: 'var(--bg-card-border)' }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                CERTIFICATIONS & ACCREDITATIONS
              </span>
            </div>
            <h2 
              className="font-sans text-4xl sm:text-6xl font-semibold tracking-tight transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Certificates & Licenses
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    offsetRef.current = 0;
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer select-none"
                  style={{
                    backgroundColor: isSelected 
                      ? 'var(--text-primary)' 
                      : (isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)'),
                    color: isSelected 
                      ? (isLightMode ? '#FFFFFF' : '#000000') 
                      : 'var(--text-secondary)',
                    borderColor: isSelected 
                      ? 'var(--text-primary)' 
                      : 'var(--bg-card-border)',
                    fontWeight: isSelected ? 600 : 400
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 
        INFINITE SLOW-FLOWING STREAM (LEFT-TO-RIGHT)
        - Edge-to-edge container with gradient masks for seamless entry/exit.
        - Cards arranged with handcrafted staggered heights and organic tilts.
        - Supports mouse drag & touch swipe.
        - Click opens high-definition modal lightbox.
      */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing py-12 sm:py-16"
        style={{
          touchAction: 'pan-y'
        }}
      >
        {/* Soft edge fade overlays for seamless emergence and disappearance */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 z-10 pointer-events-none"
          style={{
            background: isLightMode 
              ? 'linear-gradient(to right, var(--bg-primary, #F8FAFC) 15%, transparent)' 
              : 'linear-gradient(to right, var(--bg-primary, #050505) 15%, transparent)'
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 z-10 pointer-events-none"
          style={{
            background: isLightMode 
              ? 'linear-gradient(to left, var(--bg-primary, #F8FAFC) 15%, transparent)' 
              : 'linear-gradient(to left, var(--bg-primary, #050505) 15%, transparent)'
          }}
        />

        {/* Continuous Flowing Track */}
        <div 
          ref={trackRef}
          className="flex items-center space-x-7 sm:space-x-10 will-change-transform"
          style={{
            width: 'max-content',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {duplicatedCerts.map((cert, index) => {
            const layout = CARD_LAYOUT_PROPS[index % CARD_LAYOUT_PROPS.length];

            return (
              <div
                key={`${cert.id}-${index}`}
                onClick={(e) => {
                  if (hasMovedRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  setLightboxCert(cert);
                }}
                className="shrink-0 transition-all duration-300 group relative z-10 hover:z-30 hover:scale-[1.12] hover:-translate-y-2 cursor-pointer"
                style={{
                  transform: `translate3d(0, ${layout.yOffset}px, 0) rotate(${layout.rotate}deg)`,
                  transformOrigin: 'center center'
                }}
              >
                {/* 
                  CERTIFICATE CARD
                  - Desktop: ~300 × 210 px
                  - Tablet: ~260 × 185 px
                  - Mobile: ~220 × 155 px
                */}
                <div 
                  className="w-[220px] sm:w-[260px] lg:w-[300px] rounded-[18px] sm:rounded-[22px] overflow-hidden border transition-all duration-300 shadow-2xl flex flex-col justify-between group-hover:border-[var(--accent-color)] group-hover:shadow-[0_24px_50px_-10px_var(--accent-glow,rgba(16,185,129,0.4))]"
                  style={{
                    backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card, rgba(16, 20, 24, 0.9))',
                    borderColor: 'var(--bg-card-border)',
                    boxShadow: '0 18px 36px -10px rgba(0, 0, 0, 0.55), 0 0 1px 1px rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {/* Top: Certificate Document Preview Canvas */}
                  <div 
                    className="relative aspect-[16/11] p-3 sm:p-4 flex items-center justify-center overflow-hidden border-b transition-colors bg-white"
                    style={{ borderColor: 'var(--bg-card-border)' }}
                  >
                    <img
                      src={cert.imageSrc}
                      alt={cert.title}
                      className="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Hover Quick Zoom cue */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/85 border border-white/20 text-white font-mono text-[10px] sm:text-[11px] flex items-center space-x-1.5 backdrop-blur-md shadow-xl">
                        <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                        <span>PREVIEW</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Refined Metadata Body */}
                  <div 
                    className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2 transition-colors"
                    style={{
                      backgroundColor: isLightMode ? 'var(--bg-secondary)' : 'var(--bg-card)'
                    }}
                  >
                    <div>
                      {/* Copper / Orange Category Tag */}
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#E08A56] block mb-1">
                        {getTagFromCategory(cert.category)}
                      </span>

                      {/* Title */}
                      <h4 
                        className="font-serif text-sm sm:text-base font-medium leading-snug group-hover:text-emerald-400 transition-colors line-clamp-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {cert.title}
                      </h4>

                      {/* Issuer */}
                      <p 
                        className="font-sans text-[11px] sm:text-xs mt-0.5 line-clamp-1"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Footer: Date & Verified Credential */}
                    <div 
                      className="pt-2 border-t flex items-center justify-between text-[10px] font-mono transition-colors"
                      style={{ borderColor: 'var(--bg-card-border)' }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>
                        {cert.issueDate || '2026'}
                      </span>
                      <span 
                        className="flex items-center space-x-1 font-semibold"
                        style={{ color: 'var(--accent-color)' }}
                      >
                        <Award className="w-3 h-3" />
                        <span>VERIFIED</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle interaction cue below the ribbon */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-2 flex items-center justify-between text-[11px] font-mono text-typography-muted opacity-60">
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>DRAG HORIZONTALLY • CONTINUOUS FLOWING STREAM</span>
        </span>
        <span>{filteredCerts.length} CREDENTIALS</span>
      </div>

      {/* Fullscreen HD Lightbox Modal */}
      <AnimatePresence>
        {lightboxCert && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-obsidian-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-normal truncate max-w-md">
                      {lightboxCert.title}
                    </h3>
                    <p className="font-mono text-xs text-typography-muted">
                      {lightboxCert.issuer} {lightboxCert.issueDate ? `• ${lightboxCert.issueDate}` : ''}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setLightboxCert(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Image Display Container */}
              <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/60">
                <img
                  src={lightboxCert.imageSrc}
                  alt={lightboxCert.title}
                  className="max-h-[60vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>

              {/* Modal Details Footer */}
              <div className="p-6 bg-obsidian-950 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E08A56]">
                    {getTagFromCategory(lightboxCert.category)}
                  </span>
                  <p className="text-sm text-typography-muted max-w-2xl">
                    {lightboxCert.description}
                  </p>
                  {lightboxCert.credentialId && (
                    <p className="font-mono text-xs text-emerald-400">
                      ID: {lightboxCert.credentialId}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => window.open(lightboxCert.imageSrc, '_blank')}
                  className="px-5 py-2.5 rounded-full bg-emerald-400 text-black font-mono text-xs font-semibold hover:bg-emerald-300 transition-colors flex items-center justify-center space-x-2 shrink-0 cursor-pointer shadow-lg"
                >
                  <span>OPEN ORIGINAL FILE</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
