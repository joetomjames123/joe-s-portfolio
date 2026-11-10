import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Award, ZoomIn, X, ExternalLink } from 'lucide-react';
import { CERTIFICATES_DATA, CertificateItem } from '../../data/certificates';
import { useTheme } from '../../contexts/ThemeContext';

export const CertificatesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxCert, setLightboxCert] = useState<CertificateItem | null>(null);
  const [hasCompletedSequence, setHasCompletedSequence] = useState<boolean>(false);
  const { isLightMode } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  // Bind scroll progress directly to this section's scroll duration
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Once the sequence completes near the end of the scroll track (~0.88), lock it permanently in settled state
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest >= 0.88 && !hasCompletedSequence) {
        setHasCompletedSequence(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, hasCompletedSequence]);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'database', label: 'Database' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'entrepreneurship', label: 'Entrepreneurship' },
  ];

  const filteredCerts = useMemo(() => {
    return activeCategory === 'all'
      ? CERTIFICATES_DATA
      : CERTIFICATES_DATA.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

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

  return (
    <section 
      id="certificates" 
      ref={sectionRef}
      className="relative border-t transition-colors duration-500"
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--bg-card-border)',
        // When settled, section shrinks to natural height; during scroll it provides 340vh travel
        height: hasCompletedSequence ? 'auto' : '340vh',
        paddingBottom: hasCompletedSequence ? '6rem' : 0
      }}
    >
      {/* 
        Sticky Viewport when animating; standard container when settled.
        Both states use the exact same grid container dimensions (max-w-7xl, gap-6 sm:gap-8, w-full).
      */}
      <div className={hasCompletedSequence 
        ? "max-w-7xl mx-auto px-6 sm:px-8 w-full pt-16 sm:pt-20"
        : "sticky top-0 h-screen w-full flex flex-col justify-start overflow-hidden pt-12 pb-6 max-w-7xl mx-auto px-6 sm:px-8"
      }>
        
        {/* Section Header (Identical in both states) */}
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b transition-colors w-full z-20"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-color)' }}>05</span>
              <span className="w-8 h-[1px]" style={{ backgroundColor: 'var(--bg-card-border)' }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                CERTIFICATIONS
              </span>
            </div>
            <h2 
              className="font-sans text-3xl sm:text-5xl font-semibold tracking-tight transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Certificates & Licenses
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer"
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

        {/* 
          CERTIFICATES DISPLAY:
          - When settled: Standard responsive CSS grid.
          - While scrolling: Pinned 3D arena where cards sweep in from left, rotate horizontally, and land in identical size.
        */}
        {hasCompletedSequence ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {filteredCerts.map((cert) => (
              <CertificateCardContent
                key={cert.id}
                cert={cert}
                isLightMode={isLightMode}
                getTagFromCategory={getTagFromCategory}
                onSelect={() => setLightboxCert(cert)}
              />
            ))}
          </div>
        ) : (
          <div 
            className="relative flex-1 w-full flex items-center justify-center [perspective:2000px] [transform-style:preserve-3d]"
          >
            {filteredCerts.map((cert, index) => {
              return (
                <AnimatedScrollCard
                  key={cert.id}
                  cert={cert}
                  index={index}
                  total={filteredCerts.length}
                  scrollYProgress={scrollYProgress}
                  isLightMode={isLightMode}
                  getTagFromCategory={getTagFromCategory}
                  onSelect={() => setLightboxCert(cert)}
                />
              );
            })}
          </div>
        )}

      </div>

      {/* Modal Lightbox */}
      <CertificateLightbox 
        cert={lightboxCert} 
        onClose={() => setLightboxCert(null)} 
        getTagFromCategory={getTagFromCategory}
      />
    </section>
  );
};

// Reusable Single Source Card Content (100% Identical Dimensions & Styling Before & After Placement)
const CertificateCardContent: React.FC<{
  cert: CertificateItem;
  isLightMode: boolean;
  getTagFromCategory: (cat: string) => string;
  onSelect: () => void;
}> = ({ cert, isLightMode, getTagFromCategory, onSelect }) => {
  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        borderColor: 'var(--accent-color)',
        boxShadow: '0 20px 40px -10px var(--accent-glow)',
        transition: { duration: 0.2 }
      }}
      className="w-full rounded-[22px] overflow-hidden border transition-colors duration-300 shadow-xl group cursor-pointer flex flex-col justify-between"
      style={{
        backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)',
        borderColor: 'var(--bg-card-border)'
      }}
    >
      {/* Aspect Ratio 16/10 Certificate Image Container */}
      <div 
        className="relative aspect-[16/10] p-3 sm:p-4 flex items-center justify-center overflow-hidden border-b transition-colors bg-white"
        style={{ borderColor: 'var(--bg-card-border)' }}
      >
        <img
          src={cert.imageSrc}
          alt={cert.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 text-white font-mono text-xs flex items-center space-x-1.5 backdrop-blur-md">
            <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
            <span>PREVIEW</span>
          </div>
        </div>
      </div>

      {/* Card Info Body */}
      <div 
        className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3 transition-colors"
        style={{
          backgroundColor: isLightMode ? 'var(--bg-secondary)' : 'var(--bg-card)'
        }}
      >
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E08A56] block mb-1">
            {getTagFromCategory(cert.category)}
          </span>
          <h4 
            className="font-serif text-base sm:text-lg font-medium leading-snug group-hover:text-emerald-400 transition-colors line-clamp-1"
            style={{ color: 'var(--text-primary)' }}
          >
            {cert.title}
          </h4>
          <p 
            className="font-sans text-xs mt-1 line-clamp-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            {cert.issuer}
          </p>
        </div>

        <div 
          className="pt-3 border-t flex items-center justify-between transition-colors"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            {cert.issueDate || 'VERIFIED CREDENTIAL'}
          </span>
          <span 
            className="font-mono text-xs flex items-center space-x-1"
            style={{ color: 'var(--accent-color)' }}
          >
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Dynamic Animated Card inside the Pinned Scroll Track
interface AnimatedScrollCardProps {
  cert: CertificateItem;
  index: number;
  total: number;
  scrollYProgress: any;
  isLightMode: boolean;
  getTagFromCategory: (cat: string) => string;
  onSelect: () => void;
}

const AnimatedScrollCard: React.FC<AnimatedScrollCardProps> = ({
  cert,
  index,
  total,
  scrollYProgress,
  isLightMode,
  getTagFromCategory,
  onSelect
}) => {
  // Phase 1 (0.00 to 0.38): Cards emerge one-by-one from the left side in full card size!
  const arriveStart = (index / total) * 0.25;
  const arriveMid = arriveStart + 0.08;
  const arriveEnd = arriveStart + 0.14;

  // Phase 2 (0.38 to 0.65): Horizontal 3D rotation (rotateY: 0deg -> 360deg) in center
  const rotateStart = 0.38;
  const rotateEnd = 0.65;

  // Phase 3 (0.65 to 0.88): Sequential placement directly to target 3x3 positions with scale: 1.0
  const placeStart = 0.65 + (index / total) * 0.20;
  const placeEnd = Math.min(0.88, placeStart + 0.07);

  // Exact target 3x3 grid coordinates matching the natural 3-column layout
  const cols = 3;
  const colIndex = index % cols;       // 0, 1, 2 -> Left, Center, Right
  const rowIndex = Math.floor(index / cols); // 0, 1, 2 -> Row 0, Row 1, Row 2

  // Exact pixel positions corresponding to 380px columns with 32px gap
  const targetX = (colIndex - 1) * 400; // -400px, 0px, +400px
  const targetY = (rowIndex - 1) * 190 + 20; // -170px, +20px, +210px

  // Staggered depth stack while in center
  const depthStackZ = -index * 120;

  // X position:
  // Far Left (-1100px) -> Center (0px) -> Target Grid X
  const x = useTransform(
    scrollYProgress,
    [0, arriveStart, arriveMid, arriveEnd, rotateStart, rotateEnd, placeStart, placeEnd, 1],
    [-1100, -1100, -350, 0, 0, 0, targetX, targetX, targetX]
  );

  // Y position:
  // Curved sweep arc -> Center (+20px) -> Target Grid Y
  const y = useTransform(
    scrollYProgress,
    [0, arriveStart, arriveMid, arriveEnd, rotateStart, rotateEnd, placeStart, placeEnd, 1],
    [-60, -60, 80, 20, 20, 20, targetY, targetY, targetY]
  );

  // Z position:
  // Curves into foreground stack -> levels to 0
  const z = useTransform(
    scrollYProgress,
    [0, arriveStart, arriveEnd, rotateStart, rotateEnd, placeStart, placeEnd, 1],
    [-500, -500, depthStackZ, depthStackZ, 0, 0, 0, 0]
  );

  // Scale:
  // EXACT SAME SIZE THROUGHOUT (1.0). Zero shrinkage, zero difference between animation and placement!
  const scale = useTransform(
    scrollYProgress,
    [0, arriveStart, arriveEnd, rotateStart, rotateEnd, placeStart, placeEnd, 1],
    [0.85, 0.85, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
  );

  // Opacity:
  const opacity = useTransform(
    scrollYProgress,
    [0, Math.max(0, arriveStart - 0.02), arriveEnd, 0.90, 1],
    [0, 0, 1, 1, 1]
  );

  // Horizontal 3D Rotation (rotateY: 0deg -> 360deg):
  const rotateY = useTransform(
    scrollYProgress,
    [0, arriveStart, arriveMid, arriveEnd, rotateStart, rotateEnd, placeStart, placeEnd, 1],
    [-55, -55, -25, 0, 0, 360, 0, 0, 0]
  );

  // Vertical tilt (rotateX):
  const rotateX = useTransform(
    scrollYProgress,
    [0, arriveStart, arriveMid, arriveEnd, rotateStart, rotateEnd, placeStart, placeEnd, 1],
    [12, 12, -6, 0, 0, 0, 0, 0, 0]
  );

  // Filter:
  const filter = useTransform(
    scrollYProgress,
    [0, arriveStart, arriveEnd, placeEnd],
    ['blur(5px)', 'blur(5px)', 'blur(0px)', 'blur(0px)']
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '380px', // Exact matching width of 1 column in the 3-column grid
        maxWidth: '90vw',
        x,
        y,
        z,
        scale,
        opacity,
        rotateX,
        rotateY,
        filter,
        transformStyle: 'preserve-3d'
      }}
      className="will-change-transform transform-gpu select-none"
    >
      <CertificateCardContent
        cert={cert}
        isLightMode={isLightMode}
        getTagFromCategory={getTagFromCategory}
        onSelect={onSelect}
      />
    </motion.div>
  );
};

// Reusable Lightbox Component
const CertificateLightbox: React.FC<{
  cert: CertificateItem | null;
  onClose: () => void;
  getTagFromCategory: (cat: string) => string;
}> = ({ cert, onClose, getTagFromCategory }) => {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-5xl w-full max-h-[90vh] bg-obsidian-800 rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-emerald-accent" />
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-normal truncate max-w-md">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-xs text-typography-muted">
                    {cert.issuer} {cert.issueDate ? `• ${cert.issueDate}` : ''}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Image Display Container */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/60">
              <img
                src={cert.imageSrc}
                alt={cert.title}
                className="max-h-[60vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Details Footer */}
            <div className="p-6 bg-obsidian-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E08A56]">
                  {getTagFromCategory(cert.category)}
                </span>
                <p className="text-sm text-typography-muted max-w-2xl">
                  {cert.description}
                </p>
                {cert.credentialId && (
                  <p className="font-mono text-xs text-emerald-accent">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>

              <button
                onClick={() => window.open(cert.imageSrc, '_blank')}
                className="px-5 py-2.5 rounded-full bg-emerald-accent text-obsidian-950 font-mono text-xs font-semibold hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
              >
                <span>OPEN ORIGINAL FILE</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
