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
    { id: 'software', label: 'Software' },
    { id: 'cloud', label: 'Cloud' },
  ];

  const filteredCerts = activeCategory === 'all'
    ? CERTIFICATES_DATA
    : CERTIFICATES_DATA.filter((c) => c.category === activeCategory);

  // Derive copper category tag text like screenshot: "AI", "BLOCKCHAIN", "SOFTWARE"
  const getTagFromCategory = (cat: string) => {
    switch (cat) {
      case 'ai': return 'AI';
      case 'blockchain': return 'BLOCKCHAIN';
      case 'cloud': return 'CLOUD & DEV';
      case 'software': return 'SOFTWARE';
      default: return 'ENGINEERING';
    }
  };

  return (
    <section 
      id="certificates" 
      className="py-28 relative border-t transition-colors duration-500"
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--bg-card-border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header matching Screenshot Style */}
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
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border"
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
          ORIGINAL THREE-COLUMN CERTIFICATE GRID (Direct display from user screenshot)
          Shows certificate cards with clean white preview canvas and dark/card footer
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setLightboxCert(cert)}
              className="rounded-[26px] overflow-hidden border transition-all duration-300 shadow-xl group cursor-pointer flex flex-col justify-between"
              style={{
                backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)',
                borderColor: 'var(--bg-card-border)'
              }}
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

                {/* Bottom Footer Details */}
                <div 
                  className="pt-4 border-t flex items-center justify-between text-[11px] font-mono uppercase tracking-wider"
                  style={{ 
                    borderColor: 'var(--bg-card-border)',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span>{cert.issueDate || '2026'}</span>
                  {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox on Click */}
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
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#111318] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center"
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxCert(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Certificate image display */}
              <div className="w-full aspect-[16/11] bg-white rounded-2xl overflow-hidden flex items-center justify-center p-4 shadow-inner mb-6">
                <img
                  src={lightboxCert.imageSrc}
                  alt={lightboxCert.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-4">
                <div>
                  <h3 className="font-serif text-xl text-white font-medium">
                    {lightboxCert.title}
                  </h3>
                  <p className="font-mono text-xs text-[#9CA3AF]">
                    {lightboxCert.issuer} • Issued {lightboxCert.issueDate}
                  </p>
                </div>

                {lightboxCert.credentialId && (
                  <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 font-mono text-xs text-white/80">
                    ID: {lightboxCert.credentialId}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
