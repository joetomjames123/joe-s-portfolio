import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ZoomIn } from 'lucide-react';
import { VISUAL_JOURNAL_DATA, MediaItem } from '../../data/gallery';
import { useTheme } from '../../contexts/ThemeContext';

export const VisualJournalSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const { isLightMode } = useTheme();

  return (
    <section 
      id="journal" 
      className="py-28 relative border-t transition-colors duration-500"
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--bg-card-border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header matching Screenshot: "07 —— BEYOND THE SCREEN" */}
        <div 
          className="flex items-center space-x-3 mb-16 pb-4 border-b transition-colors"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-color)' }}>07</span>
          <span className="w-8 h-[1px]" style={{ backgroundColor: 'var(--bg-card-border)' }} />
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            BEYOND THE SCREEN
          </span>
        </div>

        {/* Two-column Layout from Screenshot: Left Typography, Right Creative Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-5">
            <span 
              className="font-mono text-xs uppercase tracking-widest font-semibold block"
              style={{ color: 'var(--accent-color)' }}
            >
              A SECOND CREATIVE LANGUAGE
            </span>

            <h2 
              className="font-sans text-5xl sm:text-7xl font-semibold tracking-tight leading-tight transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Creative<br />
              <span className="italic font-serif" style={{ color: 'var(--accent-color)' }}>studio.</span>
            </h2>

            <p 
              className="font-sans text-base leading-relaxed pt-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Photography, video and visual storytelling are part of the practice too. A home for work still finding its way here.
            </p>

            <div className="flex items-center space-x-2 pt-2">
              <span 
                className="font-mono text-xs uppercase tracking-widest font-semibold"
                style={{ color: 'var(--accent-color)' }}
              >
                CREATIVE WORK TO BE ADDED
              </span>
            </div>
          </div>

          {/* Right Column: Creative Box from Screenshot */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="lg:col-span-7 relative aspect-[16/10] rounded-2xl border p-8 flex flex-col items-center justify-center text-center cursor-pointer group overflow-hidden transition-all duration-300"
            style={{
              borderColor: 'var(--accent-color)',
              backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)'
            }}
          >
            {/* Subtle diagonal lines pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Glowing Asterisk Icon from Screenshot */}
            <div 
              className="relative mb-6 group-hover:scale-110 transition-all duration-300"
              style={{ color: 'var(--accent-color)' }}
            >
              <svg className="w-12 h-12 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
              </svg>
            </div>

            <span 
              className="font-mono text-xs uppercase tracking-[0.25em] block mb-2 font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              PHOTOGRAPHY / VIDEO
            </span>
            <span 
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              THE WORK WILL SPEAK WHEN IT&apos;S READY • CLICK TO EXPLORE
            </span>
          </div>
        </div>

        {/* Clean Preview Grid beneath rectangle */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {VISUAL_JOURNAL_DATA.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveMedia(item);
                setIsModalOpen(true);
              }}
              className="relative aspect-square rounded-2xl overflow-hidden border group cursor-pointer transition-all duration-300"
              style={{
                borderColor: 'var(--bg-card-border)',
                backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card)'
              }}
            >
              <img
                src={item.src}
                alt="Visual Journal Media"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => {
              setIsModalOpen(false);
              setActiveMedia(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full border border-white/20 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl flex flex-col items-center"
              style={{ backgroundColor: isLightMode ? '#FFFFFF' : '#0B0D13' }}
            >
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setActiveMedia(null);
                }}
                className="absolute top-6 right-6 p-2 rounded-full border hover:scale-105 transition-all cursor-pointer"
                style={{
                  borderColor: isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
                  color: isLightMode ? '#000000' : '#FFFFFF'
                }}
                aria-label="Close Gallery Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
                  CREATIVE VAULT
                </span>
                <h3 className="font-serif text-3xl mt-1" style={{ color: isLightMode ? '#000000' : '#FFFFFF' }}>
                  Visual Journal & Storytelling
                </h3>
              </div>

              {activeMedia ? (
                <div className="w-full flex flex-col items-center">
                  <div className="max-h-[60vh] max-w-full rounded-xl overflow-hidden mb-4 shadow-xl">
                    <img src={activeMedia.src} alt="Visual Journal Media" className="max-h-[60vh] w-auto object-contain" />
                  </div>
                  <h4 className="font-sans font-semibold text-lg" style={{ color: isLightMode ? '#000000' : '#FFFFFF' }}>
                    {activeMedia.type === 'video' ? 'Video Artifact' : 'Photography Work'}
                  </h4>
                  <p className="font-mono text-xs" style={{ color: isLightMode ? '#666666' : '#9CA3AF' }}>Visual Capture • Creative Studio</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-h-[60vh] overflow-y-auto p-2">
                  {VISUAL_JOURNAL_DATA.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveMedia(item)}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative border"
                      style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}
                    >
                      <img src={item.src} alt="Visual Journal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="font-mono text-xs text-white">VIEW</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
