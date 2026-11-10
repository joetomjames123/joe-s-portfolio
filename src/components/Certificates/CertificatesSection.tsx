import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ZoomIn, X, ExternalLink } from 'lucide-react';
import { CERTIFICATES_DATA, CertificateItem } from '../../data/certificates';
import { useTheme } from '../../contexts/ThemeContext';

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

  // Coordinated container orchestrator
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  return (
    <section 
      id="certificates" 
      className="py-28 relative border-t transition-colors duration-500 overflow-hidden"
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--bg-card-border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b transition-colors"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-color)' }}>05</span>
              <span className="w-8 h-[1px]" style={{ backgroundColor: 'var(--bg-card-border)' }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                CERTIFICATIONS
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
          COSMIC WARP & 3D VERTICAL ROTATION SCROLL ANIMATION:
          - Cards start deep in infinity (tiny scale 0.05, z: -1000px, 90deg vertical roll, blur, 0 opacity).
          - As the user scrolls into view, each card rolls forward in 3D vertically (rotateX: 0) and flies from depth to full scale (scale: 1, z: 0).
          - once: true ensures they lock and settle permanently without dispersing when scrolling back up.
        */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: 1800, transformStyle: 'preserve-3d' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredCerts.map((cert, index) => {
              const cardVariants = {
                hidden: {
                  opacity: 0,
                  scale: 0.05,
                  y: 120,
                  z: -900,
                  rotateX: 95,
                  filter: 'blur(12px)'
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  z: 0,
                  rotateX: 0,
                  filter: 'blur(0px)',
                  transition: {
                    type: 'spring',
                    damping: 18,
                    stiffness: 70,
                    mass: 0.9,
                    duration: 1.1
                  }
                }
              };

              return (
                <motion.div
                  key={cert.id}
                  variants={cardVariants}
                  style={{
                    backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)',
                    borderColor: 'var(--bg-card-border)',
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={() => setLightboxCert(cert)}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -8,
                    borderColor: 'var(--accent-color)',
                    boxShadow: '0 20px 40px -10px var(--accent-glow)',
                    transition: { duration: 0.25 }
                  }}
                  className="rounded-[26px] overflow-hidden border transition-colors duration-300 shadow-xl group cursor-pointer flex flex-col justify-between will-change-transform transform-gpu"
                >
                {/* Top: Clean Container with Full Certificate Preview */}
                <div 
                  className="relative aspect-[16/11] p-4 flex items-center justify-center overflow-hidden border-b transition-colors"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    borderColor: 'var(--bg-card-border)'
                  }}
                >
                  <img
                    src={cert.imageSrc}
                    alt={cert.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Hover Quick Zoom cue */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-4 py-2 rounded-full bg-black/80 border border-white/20 text-white font-mono text-xs flex items-center space-x-2 backdrop-blur-md">
                      <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                      <span>VIEW FULLSCREEN</span>
                    </div>
                  </div>
                </div>

                {/* Bottom: Metadata Footer (Harmonious with theme) */}
                <div 
                  className="p-6 flex flex-col justify-between flex-1 space-y-4 transition-colors"
                  style={{
                    backgroundColor: isLightMode ? 'var(--bg-secondary)' : 'var(--bg-card)'
                  }}
                >
                  <div>
                    {/* Copper / Orange Category Tag */}
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#E08A56] block mb-2">
                      {getTagFromCategory(cert.category)}
                    </span>

                    {/* Title */}
                    <h4 
                      className="font-serif text-xl sm:text-2xl font-medium leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {cert.title}
                    </h4>

                    {/* Issuer */}
                    <p 
                      className="font-sans text-sm mt-1.5 line-clamp-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Date & Verified Badge */}
                  <div 
                    className="pt-4 border-t flex items-center justify-between transition-colors"
                    style={{ borderColor: 'var(--bg-card-border)' }}
                  >
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                      {cert.issueDate || 'VERIFIED CREDENTIAL'}
                    </span>
                    <span 
                      className="font-mono text-xs flex items-center space-x-1.5"
                      style={{ color: 'var(--accent-color)' }}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>VERIFIED CREDENTIAL</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        </AnimatePresence>

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
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    aria-label="Close fullscreen modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Image Area */}
                <div className="p-4 sm:p-8 flex items-center justify-center overflow-auto flex-1 bg-black/60">
                  <img
                    src={lightboxCert.imageSrc}
                    alt={lightboxCert.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
