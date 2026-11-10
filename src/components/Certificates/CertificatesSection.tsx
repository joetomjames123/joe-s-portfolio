import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Award, ZoomIn, X, ExternalLink } from 'lucide-react';
import { CERTIFICATES_DATA, CertificateItem } from '../../data/certificates';
import { useTheme } from '../../contexts/ThemeContext';

export const CertificatesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxCert, setLightboxCert] = useState<CertificateItem | null>(null);
  const { isLightMode } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  // Bind scroll progress directly to this section's scroll duration
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

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
        // Pinning scroll container: 320vh provides ample scroll travel for the multi-stage 3D arrival & placement
        height: '350vh'
      }}
    >
      {/* Pinned Sticky Viewport: Stays frozen on screen while user scrolls through the 350vh track */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-6 sm:py-8">
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full z-20">
          {/* Section Header */}
          <div 
            className="flex flex-col md:flex-row md:items-end justify-between mb-4 pb-3 border-b transition-colors"
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
        </div>

        {/* 
          SCROLL-BOUND PINNED 3D ARENA:
          - Screen is frozen in place while user scrolls down.
          - Cards emerge one-by-one with distance from infinity space (scale: 0.05, z: -1400px).
          - Join a unified 3D vertical rotating carousel/ring in space.
          - Once all cards join the 3D rotation, they sequentially fly into and settle at their exact grid slots (1st card to 1st slot, 2nd to 2nd, etc.).
          - Once settled, normal scrolling resumes to the next section.
        */}
        <div 
          className="relative flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-center [perspective:1800px] [transform-style:preserve-3d]"
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

        {/* Bottom subtle progress / hint */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex items-center justify-between text-[11px] font-mono text-typography-muted opacity-60 z-20">
          <span>SCROLL TO ADVANCE 3D CERTIFICATE SEQUENCE</span>
          <span>{filteredCerts.length} CREDENTIALS</span>
        </div>

      </div>

      {/* 
        FULLSCREEN HIGH-DEFINITION LIGHTBOX MODAL
      */}
      <AnimatePresence>
        {lightboxCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxCert(null)}
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
              <div className="p-6 bg-obsidian-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E08A56]">
                    {getTagFromCategory(lightboxCert.category)}
                  </span>
                  <p className="text-sm text-typography-muted max-w-2xl">
                    {lightboxCert.description}
                  </p>
                  {lightboxCert.credentialId && (
                    <p className="font-mono text-xs text-emerald-accent">
                      ID: {lightboxCert.credentialId}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => window.open(lightboxCert.imageSrc, '_blank')}
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
    </section>
  );
};

// Sub-component that binds each certificate's arrival from infinity, 3D rotating ring, and final grid slot settlement directly to scroll progress
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
  // Phase 1 (0.0 to 0.40): Cards emerge one by one from deep cosmic infinity space
  // Stagger start for each card based on index
  const emergeStart = (index / total) * 0.28;
  const emergeEnd = emergeStart + 0.12;

  // Phase 2 (0.40 to 0.70): All cards join the vertical 3D rotating cluster / cylinder
  const rotateStart = 0.38;
  const rotateEnd = 0.68;

  // Phase 3 (0.68 to 0.98): Cards sequentially break off and settle into their grid positions
  // 1st card placed first, 2nd card placed second, etc.
  const settleStart = 0.68 + (index / total) * 0.24;
  const settleEnd = Math.min(0.98, settleStart + 0.08);

  // Calculate target grid coordinates (3 columns on desktop, 3 rows)
  const cols = 3;
  const colIndex = index % cols;       // 0, 1, 2 -> Left, Center, Right
  const rowIndex = Math.floor(index / cols); // 0, 1, 2 -> Top, Middle, Bottom

  // Centered offsets for the 3x3 grid (pixel offsets from center of arena)
  const gridX = (colIndex - 1) * 380; // -380px, 0px, +380px
  const gridY = (rowIndex - 1) * 230; // -230px, 0px, +230px

  // Angular position in the 3D rotating ring
  const baseAngle = (index / total) * 360;

  // Interpolate scroll progress into 3D transforms
  // Scale: deep infinity (0.02) -> 3D ring scale (0.55) -> final card scale (0.92)
  const scale = useTransform(
    scrollYProgress,
    [0, emergeStart, emergeEnd, rotateStart, rotateEnd, settleStart, settleEnd, 1],
    [0.02, 0.02, 0.55, 0.55, 0.55, 0.55, 0.92, 0.92]
  );

  // Opacity: hidden at start -> visible as it arrives -> fully solid
  const opacity = useTransform(
    scrollYProgress,
    [0, Math.max(0, emergeStart - 0.02), emergeEnd, 0.95, 1],
    [0, 0, 1, 1, 1]
  );

  // Z position: deep in space (-1500px) -> rotating depth (-200 to +150px) -> grid depth (0px)
  const z = useTransform(
    scrollYProgress,
    [0, emergeStart, emergeEnd, rotateStart, rotateEnd, settleStart, settleEnd, 1],
    [-1500, -1500, -120, 0, -50, -50, 0, 0]
  );

  // X position: from space center (0) -> rotating offset -> final grid column
  const ringX = Math.sin((baseAngle * Math.PI) / 180) * 300;
  const x = useTransform(
    scrollYProgress,
    [0, emergeStart, emergeEnd, rotateStart, rotateEnd, settleStart, settleEnd, 1],
    [0, 0, ringX, ringX, ringX, ringX, gridX, gridX]
  );

  // Y position: from space depth -> rotating vertical offset -> final grid row
  const ringY = Math.cos((baseAngle * Math.PI) / 180) * 80;
  const y = useTransform(
    scrollYProgress,
    [0, emergeStart, emergeEnd, rotateStart, rotateEnd, settleStart, settleEnd, 1],
    [100, 100, ringY, ringY, ringY, ringY, gridY, gridY]
  );

  // RotateX: 3D vertical roll tumbling as it arrives from infinity (120deg) -> vertical 3D spin (0 to 360) -> flat (0deg)
  const rotateX = useTransform(
    scrollYProgress,
    [0, emergeStart, emergeEnd, rotateStart, rotateEnd, settleStart, settleEnd, 1],
    [120, 120, 35, 180, 360, 0, 0, 0]
  );

  // RotateY: subtle 3D perspective orientation during ring rotation -> flat 0
  const rotateY = useTransform(
    scrollYProgress,
    [0, emergeStart, emergeEnd, rotateStart, rotateEnd, settleStart, settleEnd, 1],
    [0, 0, (index % 2 === 0 ? 25 : -25), (index % 2 === 0 ? -25 : 25), 0, 0, 0, 0]
  );

  // Blur: blurred at infinity (16px) -> crisp on arrival
  const filter = useTransform(
    scrollYProgress,
    [0, emergeStart, emergeEnd, settleEnd],
    ['blur(16px)', 'blur(16px)', 'blur(0px)', 'blur(0px)']
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 350,
        x,
        y,
        z,
        scale,
        opacity,
        rotateX,
        rotateY,
        filter,
        transformStyle: 'preserve-3d',
        backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)',
        borderColor: 'var(--bg-card-border)'
      }}
      onClick={onSelect}
      whileHover={{ 
        scale: 0.98,
        borderColor: 'var(--accent-color)',
        boxShadow: '0 20px 40px -10px var(--accent-glow)',
        transition: { duration: 0.2 }
      }}
      className="rounded-[22px] overflow-hidden border transition-colors duration-300 shadow-2xl group cursor-pointer flex flex-col justify-between will-change-transform transform-gpu select-none"
    >
      {/* Top: Clean Container with Full Certificate Preview */}
      <div 
        className="relative aspect-[16/10] p-3 flex items-center justify-center overflow-hidden border-b transition-colors bg-white"
        style={{ borderColor: 'var(--bg-card-border)' }}
      >
        <img
          src={cert.imageSrc}
          alt={cert.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none"
        />
        
        {/* Hover Quick Zoom cue */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 text-white font-mono text-[11px] flex items-center space-x-1.5 backdrop-blur-md">
            <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
            <span>PREVIEW</span>
          </div>
        </div>
      </div>

      {/* Bottom: Metadata Footer */}
      <div 
        className="p-4 flex flex-col justify-between flex-1 space-y-2.5 transition-colors"
        style={{
          backgroundColor: isLightMode ? 'var(--bg-secondary)' : 'var(--bg-card)'
        }}
      >
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E08A56] block mb-1">
            {getTagFromCategory(cert.category)}
          </span>

          <h4 
            className="font-serif text-base sm:text-lg font-medium leading-tight group-hover:text-emerald-400 transition-colors line-clamp-1"
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

        {/* Date & Verified Badge */}
        <div 
          className="pt-2.5 border-t flex items-center justify-between transition-colors"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            {cert.issueDate || 'VERIFIED CREDENTIAL'}
          </span>
          <span 
            className="font-mono text-[11px] flex items-center space-x-1"
            style={{ color: 'var(--accent-color)' }}
          >
            <Award className="w-3 h-3" />
            <span>VERIFIED</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
