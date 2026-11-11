import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, X } from 'lucide-react';
import { CERTIFICATES_DATA, CertificateItem } from '../../data/certificates';
import { useTheme } from '../../contexts/ThemeContext';
import { CertificateCard } from './CertificateCard';

gsap.registerPlugin(ScrollTrigger);

export const CertificatesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxCert, setLightboxCert] = useState<CertificateItem | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);
  const { isLightMode } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

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

  // 1. Interactive Space Starfield Canvas (Stationary deep cosmos with drifting stars)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const starCount = 200;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      color: Math.random() > 0.6 ? '#10B981' : Math.random() > 0.3 ? '#A7F3D0' : '#E2E8F0',
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.25 + 0.08
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(width * 0.4, height * 0.5, 50, width * 0.5, height * 0.5, width * 0.85);
      if (isLightMode) {
        grad.addColorStop(0, 'rgba(240, 253, 250, 0.95)');
        grad.addColorStop(0.5, 'rgba(226, 232, 240, 0.9)');
        grad.addColorStop(1, 'rgba(203, 213, 225, 0.98)');
      } else {
        grad.addColorStop(0, 'rgba(4, 28, 22, 0.5)');
        grad.addColorStop(0.4, 'rgba(8, 14, 22, 0.85)');
        grad.addColorStop(1, 'rgba(2, 4, 8, 0.98)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = isLightMode ? s.alpha * 0.6 : s.alpha;
        ctx.shadowBlur = 4;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLightMode]);

  // 2. TRUE 3D CYLINDRICAL CAROUSEL (Carousel Ring with depth along Z, genuine rotateY + rotateZ turntable)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationCompleted(true);
      return;
    }

    if (animationCompleted) return;

    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const cylinder = cylinderRef.current;
    const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !pinWrapper || !cylinder || cardEls.length === 0) return;

    const N = cardEls.length;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // 3D Carousel Cylinder Radius (Pushing cards into Z-space)
    const cylinderRadius = isMobile ? 360 : isTablet ? 520 : 640;
    const cylinderCenterOffset = isMobile ? 0 : -100; // Shifted gently leftward

    // Target final grid layout metrics
    const cols = isMobile ? 1 : isTablet ? 2 : 3;
    const colWidth = isMobile ? 320 : isTablet ? 340 : 380;
    const rowHeight = 310;
    const gapX = isMobile ? 0 : 30;
    const gapY = 24;

    const totalGridWidth = cols * colWidth + (cols - 1) * gapX;
    const gridStartX = -totalGridWidth / 2 + colWidth / 2;

    const targetPositions = cardEls.map((_, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      return {
        x: gridStartX + c * (colWidth + gapX),
        y: (r - (Math.ceil(N / cols) - 1) / 2) * (rowHeight + gapY) + 30
      };
    });

    const ctx = gsap.context(() => {
      // 1. Initial State: Deep in infinity space
      cardEls.forEach((card, i) => {
        const randAngle = Math.random() * Math.PI * 2;
        const randDist = 450 + Math.random() * 550;
        gsap.set(card, {
          position: 'absolute',
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          width: colWidth,
          x: Math.cos(randAngle) * randDist,
          y: Math.sin(randAngle) * randDist,
          z: -2200 - i * 180, // Extremely deep in 3D infinity space
          scale: 0.1,
          opacity: 0,
          filter: 'blur(16px)',
          rotateX: (Math.random() - 0.5) * 30,
          rotateY: (Math.random() - 0.5) * 45,
          rotateZ: (Math.random() - 0.5) * 40,
          transformPerspective: 2200,
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 50%',
          willChange: 'transform, opacity, filter'
        });
      });

      // Position the 3D cylinder
      gsap.set(cylinder, {
        transformStyle: 'preserve-3d',
        transformPerspective: 2200,
        x: cylinderCenterOffset,
        y: 20,
        z: -200,
        rotateX: 12, // Subtle tilt to enhance true 3D spatial depth
        rotateY: 0,
        rotateZ: 0
      });

      // Master Timeline bound to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=4200',
          pin: pinWrapper,
          scrub: 1.2,
          anticipatePin: 1,
          onLeave: () => {
            setAnimationCompleted(true);
          }
        }
      });

      /* ==============================================================
         STAGE 1 & 2: EMERGE FROM INFINITY ONE BY ONE AND FORM A
         GENUINE 3D CIRCULAR CAROUSEL (translateZ + rotateY facing tangent)
         ============================================================== */
      cardEls.forEach((card, i) => {
        const angleDeg = (i / N) * 360;
        const angleRad = (angleDeg * Math.PI) / 180;

        // Genuine 3D Ring coordinates in space
        const ringX = Math.sin(angleRad) * cylinderRadius;
        const ringZ = Math.cos(angleRad) * cylinderRadius - cylinderRadius; // Front cards at 0, back cards at -2*radius
        const ringY = Math.sin(angleRad * 2) * 25; // Subtle spatial wave

        const enterTime = 0.5 + i * 0.45;

        // Travel from infinity, curve towards left, and take seat in genuine 3D circular cylinder
        tl.to(
          card,
          {
            x: ringX,
            y: ringY,
            z: ringZ,
            scale: 0.82,
            opacity: 1,
            filter: 'blur(0px)',
            rotateX: 0,
            rotateY: angleDeg, // Card faces directly outwards along the 3D ring!
            rotateZ: 0,        // Upright, not flat or rotated on its side!
            duration: 1.3,
            ease: 'power2.out'
          },
          enterTime
        );
      });

      const formationCompleteTime = 0.5 + N * 0.45 + 1.3;

      /* ==============================================================
         STAGE 3 & 4: 3D CYLINDER ROTATION AROUND Y & Z AXES (CAROUSEL SPIN)
         ============================================================== */
      // Rotate the 3D cylinder so each card swings to the front in full perspective
      tl.to(
        cylinder,
        {
          rotateY: 360,
          rotateZ: 360, // True 3D Z-axis spinning wheel effect combined with spatial rotation
          duration: 4.2,
          ease: 'none'
        },
        formationCompleteTime
      );

      const rotationEndTime = formationCompleteTime + 4.2;

      /* ==============================================================
         STAGE 5: INDIVIDUAL SEQUENTIAL PLACEMENT INTO PREMIUM GALLERY
         - 1st certificate is selected from the front of the carousel
         - Approaches viewer (z: 160, rotateY: 0, rotateZ: 0)
         - Smoothly travels and settles into its assigned gallery grid position
         - Next certificate follows until all cards are positioned
         ============================================================== */
      let placeTime = rotationEndTime + 0.3;

      cardEls.forEach((card, i) => {
        const target = targetPositions[i];

        // 1. Pull card from cylinder to center foreground, facing front
        tl.to(
          card,
          {
            x: 0,
            y: 0,
            z: 220,
            scale: 0.95,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 0.7,
            ease: 'power2.inOut'
          },
          placeTime
        );

        // 2. Fly smoothly to its exact gallery grid position
        tl.to(
          card,
          {
            x: target.x - cylinderCenterOffset, // Offset to compensate for cylinder position
            y: target.y - 20,
            z: 200, // Zero depth relative to screen
            scale: 1.0,
            duration: 0.85,
            ease: 'power3.out'
          },
          placeTime + 0.65
        );

        placeTime += 0.95;
      });

      tl.to({}, { duration: 0.5 }, placeTime + 0.4);
    }, section);

    return () => {
      ctx.revert();
    };
  }, [animationCompleted, filteredCerts]);

  return (
    <section 
      id="certificates" 
      ref={sectionRef}
      className="relative border-t transition-colors duration-500 overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary, #050505)',
        borderColor: 'var(--bg-card-border, rgba(255, 255, 255, 0.1))',
        minHeight: animationCompleted ? 'auto' : '100vh',
        paddingBottom: animationCompleted ? '6rem' : 0
      }}
    >
      {/* Deep Infinite Space Canvas Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* 
        IF ANIMATION ALREADY COMPLETED (or on prefers-reduced-motion):
        Render final settled premium certificate gallery directly
      */}
      {animationCompleted ? (
        <div ref={galleryRef} className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-16 sm:pt-20 pb-12 z-20 relative">
          
          {/* Header Section (Always Visible) */}
          <div 
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b transition-colors w-full"
            style={{ borderColor: 'var(--bg-card-border, rgba(255, 255, 255, 0.1))' }}
          >
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-color, #10B981)' }}>05</span>
                <span className="w-8 h-[1px]" style={{ backgroundColor: 'var(--bg-card-border, rgba(255, 255, 255, 0.1))' }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted, #94A3B8)' }}>
                  CERTIFICATIONS
                </span>
              </div>
              <h2 
                className="font-sans text-3xl sm:text-5xl font-semibold tracking-tight transition-colors"
                style={{ color: 'var(--text-primary, #FFFFFF)' }}
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
                        ? 'var(--text-primary, #FFFFFF)' 
                        : (isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)'),
                      color: isSelected 
                        ? (isLightMode ? '#FFFFFF' : '#000000') 
                        : 'var(--text-secondary, #94A3B8)',
                      borderColor: isSelected 
                        ? 'var(--text-primary, #FFFFFF)' 
                        : 'var(--bg-card-border, rgba(255, 255, 255, 0.1))',
                      fontWeight: isSelected ? 600 : 400
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Final Settled Premium Certificate Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {filteredCerts.map((cert) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                isLightMode={isLightMode}
                getTagFromCategory={getTagFromCategory}
                onSelect={() => setLightboxCert(cert)}
                className="hover:scale-[1.025] hover:-translate-y-1.5 transition-transform duration-300"
              />
            ))}
          </div>

        </div>
      ) : (
        /* 
          PINNED SCROLL ARENA:
          - Pin wrapper locks to viewport while scrolling down.
          - Heading remains visible throughout without occlusion.
          - Genuine 3D Carousel Cylinder in Z-depth.
        */
        <div 
          ref={pinWrapperRef}
          className="h-screen w-full flex flex-col justify-between overflow-hidden pt-10 pb-6 max-w-7xl mx-auto px-6 sm:px-8 relative z-20"
        >
          {/* Header Section (STATIONARY & ALWAYS VISIBLE) */}
          <div 
            className="flex flex-col md:flex-row md:items-end justify-between mb-4 pb-3 border-b transition-colors w-full z-30 relative"
            style={{ borderColor: 'var(--bg-card-border, rgba(255, 255, 255, 0.1))' }}
          >
            <div>
              <div className="flex items-center space-x-3 mb-1.5">
                <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-color, #10B981)' }}>05</span>
                <span className="w-8 h-[1px]" style={{ backgroundColor: 'var(--bg-card-border, rgba(255, 255, 255, 0.1))' }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted, #94A3B8)' }}>
                  CERTIFICATIONS
                </span>
              </div>
              <h2 
                className="font-sans text-2xl sm:text-4xl font-semibold tracking-tight transition-colors"
                style={{ color: 'var(--text-primary, #FFFFFF)' }}
              >
                Certificates & Licenses
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer"
                    style={{
                      backgroundColor: isSelected 
                        ? 'var(--text-primary, #FFFFFF)' 
                        : (isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)'),
                      color: isSelected 
                        ? (isLightMode ? '#FFFFFF' : '#000000') 
                        : 'var(--text-secondary, #94A3B8)',
                      borderColor: isSelected 
                        ? 'var(--text-primary, #FFFFFF)' 
                        : 'var(--bg-card-border, rgba(255, 255, 255, 0.1))',
                      fontWeight: isSelected ? 600 : 400
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Genuine 3D Spatial Arena */}
          <div 
            className="relative flex-1 w-full flex items-center justify-center overflow-visible"
            style={{
              perspective: '2200px',
              perspectiveOrigin: '50% 45%',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* 3D Carousel Cylinder (Holds cards in true Z-depth) */}
            <div
              ref={cylinderRef}
              className="absolute w-full h-full flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: '50% 50%'
              }}
            >
              {filteredCerts.map((cert, index) => (
                <div
                  key={cert.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  style={{
                    transformStyle: 'preserve-3d',
                    pointerEvents: 'auto'
                  }}
                >
                  <CertificateCard
                    cert={cert}
                    isLightMode={isLightMode}
                    getTagFromCategory={getTagFromCategory}
                    onSelect={() => setLightboxCert(cert)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom subtle status bar */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-typography-muted opacity-60 z-30 pt-2">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SCROLL TO ADVANCE 3D Z-AXIS CAROUSEL & PLACEMENT</span>
            </span>
            <span>{filteredCerts.length} CREDENTIALS IN 3D SPACE</span>
          </div>
        </div>
      )}

      {/* Lightbox Modal (Click to View Fullscreen) */}
      {lightboxCert && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxCert(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] bg-obsidian-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
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
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/60">
              <img
                src={lightboxCert.imageSrc}
                alt={lightboxCert.title}
                className="max-h-[60vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

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
          </div>
        </div>
      )}
    </section>
  );
};
