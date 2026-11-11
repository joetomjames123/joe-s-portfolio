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

  return (
    <section 
      id="certificates" 
      className="py-24 relative border-t transition-colors duration-500 overflow-hidden"
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
          CLEAN STILL CERTIFICATE GALLERY WITH HOVER ZOOM EFFECT
          Sleek compact sizing (max-w-6xl container, 18px corners, aspect 16/10 preview)
        */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              onClick={() => setLightboxCert(cert)}
              whileHover={{ 
                scale: 1.04, 
                y: -6,
                borderColor: 'var(--accent-color)',
                boxShadow: '0 20px 45px -10px var(--accent-glow, rgba(16, 185, 129, 0.35))',
                transition: { duration: 0.22, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.98 }}
              className="rounded-[20px] overflow-hidden border transition-all duration-300 shadow-xl group cursor-pointer flex flex-col justify-between"
              style={{
                backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)',
                borderColor: 'var(--bg-card-border)'
              }}
            >
              {/* Top: Certificate Image Preview with Zoom Cue on Hover */}
              <div 
                className="relative aspect-[16/10] p-3 sm:p-3.5 flex items-center justify-center overflow-hidden border-b transition-colors bg-white"
                style={{ borderColor: 'var(--bg-card-border)' }}
              >
                <img
                  src={cert.imageSrc}
                  alt={cert.title}
                  className="w-full h-full object-contain group-hover:scale-106 transition-transform duration-300 pointer-events-none"
                  loading="lazy"
                />
                
                {/* Hover Quick Zoom Cue */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="px-3.5 py-1.5 rounded-full bg-black/85 border border-white/20 text-white font-mono text-[11px] flex items-center space-x-1.5 backdrop-blur-md shadow-xl group-hover:scale-105 transition-transform">
                    <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VIEW FULLSCREEN</span>
                  </div>
                </div>
              </div>

              {/* Bottom: Metadata Footer */}
              <div 
                className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3 transition-colors"
                style={{
                  backgroundColor: isLightMode ? 'var(--bg-secondary)' : 'var(--bg-card)'
                }}
              >
                <div>
                  {/* Category Tag */}
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E08A56] block mb-1">
                    {getTagFromCategory(cert.category)}
                  </span>

                  {/* Title */}
                  <h4 
                    className="font-serif text-lg sm:text-xl font-medium leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {cert.title}
                  </h4>

                  {/* Issuer */}
                  <p 
                    className="font-sans text-xs mt-1 line-clamp-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {cert.issuer}
                  </p>
                </div>

                {/* Footer details: Date & Verified Credential */}
                <div 
                  className="pt-3 border-t flex items-center justify-between text-[11px] font-mono transition-colors"
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
                    <span>VERIFIED CREDENTIAL</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
