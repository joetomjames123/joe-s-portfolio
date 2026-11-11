import React from 'react';
import { Award, ZoomIn } from 'lucide-react';
import { CertificateItem } from '../../data/certificates';

interface CertificateCardProps {
  cert: CertificateItem;
  isLightMode: boolean;
  getTagFromCategory: (cat: string) => string;
  onSelect: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  cert,
  isLightMode,
  getTagFromCategory,
  onSelect,
  className = '',
  style = {}
}) => {
  return (
    <div
      onClick={onSelect}
      style={{
        backgroundColor: isLightMode ? '#FFFFFF' : 'var(--bg-card, rgba(16, 20, 24, 0.85))',
        borderColor: 'var(--bg-card-border, rgba(255, 255, 255, 0.1))',
        ...style
      }}
      className={`rounded-[22px] overflow-hidden border transition-all duration-300 shadow-xl group cursor-pointer flex flex-col justify-between select-none ${className}`}
    >
      {/* 16/10 aspect ratio certificate image showcase */}
      <div 
        className="relative aspect-[16/10] p-3.5 sm:p-4 flex items-center justify-center overflow-hidden border-b transition-colors bg-white"
        style={{ borderColor: 'var(--bg-card-border, rgba(255, 255, 255, 0.1))' }}
      >
        <img
          src={cert.imageSrc}
          alt={cert.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="px-3.5 py-1.5 rounded-full bg-black/85 border border-white/20 text-white font-mono text-xs flex items-center space-x-1.5 backdrop-blur-md shadow-lg">
            <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
            <span>PREVIEW</span>
          </div>
        </div>
      </div>

      {/* Card Info Body */}
      <div 
        className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3 transition-colors"
        style={{
          backgroundColor: isLightMode ? 'var(--bg-secondary, #F8FAFC)' : 'var(--bg-card, rgba(16, 20, 24, 0.85))'
        }}
      >
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E08A56] block mb-1">
            {getTagFromCategory(cert.category)}
          </span>
          <h4 
            className="font-serif text-base sm:text-lg font-medium leading-snug group-hover:text-emerald-400 transition-colors line-clamp-1"
            style={{ color: 'var(--text-primary, #FFFFFF)' }}
          >
            {cert.title}
          </h4>
          <p 
            className="font-sans text-xs mt-1 line-clamp-1"
            style={{ color: 'var(--text-secondary, #94A3B8)' }}
          >
            {cert.issuer}
          </p>
        </div>

        <div 
          className="pt-3 border-t flex items-center justify-between transition-colors"
          style={{ borderColor: 'var(--bg-card-border, rgba(255, 255, 255, 0.1))' }}
        >
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted, #64748B)' }}>
            {cert.issueDate || 'VERIFIED CREDENTIAL'}
          </span>
          <span 
            className="font-mono text-xs flex items-center space-x-1 font-semibold"
            style={{ color: 'var(--accent-color, #10B981)' }}
          >
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED</span>
          </span>
        </div>
      </div>
    </div>
  );
};
