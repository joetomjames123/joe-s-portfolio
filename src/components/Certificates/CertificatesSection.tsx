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
  const formationContainerRef = useRef<HTMLDivElement>(null);
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

  // 1. Interactive Space Starfield Canvas (Deep Infinite Cosmic Canvas with nebula & stars)
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

    const starCount = 180;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 800 + 50,
      size: Math.random() * 1.6 + 0.4,
      color: Math.random() > 0.6 ? '#10B981' : Math.random() > 0.3 ? '#A7F3D0' : '#E2E8F0',
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.3 + 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space atmospheric background
      const grad = ctx.createRadialGradient(width * 0.3, height * 0.45, 40, width * 0.5, height * 0.5, width * 0.85);
      if (isLightMode) {
        grad.addColorStop(0, 'rgba(240, 253, 250, 0.9)');
        grad.addColorStop(0.5, 'rgba(226, 232, 240, 0.85)');
        grad.addColorStop(1, 'rgba(203, 213, 225, 0.95)');
      } else {
        grad.addColorStop(0, 'rgba(6, 40, 30, 0.45)');
        grad.addColorStop(0.4, 'rgba(10, 16, 26, 0.8)');
        grad.addColorStop(1, 'rgba(2, 4, 8, 0.98)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render cosmic stars with micro-drift
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

  // 2. Cinematic Infinite Space 3D Z-Axis Rotation GSAP Timeline with ScrollTrigger
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationCompleted(true);
      return;
    }

    if (animationCompleted) return;

    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const formationContainer = formationContainerRef.current;
    const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !pinWrapper || !formationContainer || cardEls.length === 0) return;

    const N = cardEls.length;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Radius of the vertical circular orbit positioned towards the left side
    const orbitRadius = isMobile ? 180 : isTablet ? 260 : 340;
    const orbitCenterX = isMobile ? -20 : -140; // Shifted towards the left side of the screen
    const orbitCenterY = 0;

    // Target grid layout metrics (3 columns on desktop, 2 on tablet, 1 on mobile)
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
      // Setup initial styles: Cards originate from extremely distant positions in infinity
      cardEls.forEach((card, i) => {
        const randAngle = Math.random() * Math.PI * 2;
        const randDist = 400 + Math.random() * 600;
        gsap.set(card, {
          position: 'absolute',
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          width: colWidth,
          x: Math.cos(randAngle) * randDist,
          y: Math.sin(randAngle) * randDist,
          z: -1800 - i * 150, // Deep infinity Z-depth
          scale: 0.08,
          opacity: 0,
          filter: 'blur(14px)',
          rotateX: (Math.random() - 0.5) * 35,
          rotateY: (Math.random() - 0.5) * 45,
          rotateZ: (Math.random() - 0.5) * 60,
          transformPerspective: 2000,
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 50%',
          willChange: 'transform, opacity, filter'
        });
      });

      // Master Timeline bound to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=3800', // 3800px provides comfortable, smooth scroll travel for all 6 stages
          pin: pinWrapper,
          scrub: 1.2,
          anticipatePin: 1,
          onLeave: () => {
            // Once all certificates are placed, permanently lock completed state for this session
            setAnimationCompleted(true);
          }
        }
      });

      /* ==============================================================
         STAGE 1 & 2: CERTIFICATES EMERGE FROM INFINITY ONE BY ONE
         AND FOLLOW A CURVED TRAJECTORY TOWARDS THE LEFT CIRCULAR ORBIT
         ============================================================== */
      cardEls.forEach((card, i) => {
        const theta = (i / N) * Math.PI * 2;
        const orbitSlotX = orbitCenterX + Math.cos(theta) * orbitRadius;
        const orbitSlotY = orbitCenterY + Math.sin(theta) * orbitRadius;
        const orbitAngleZ = (theta * 180) / Math.PI + 90; // Oriented perpendicular along the ring
        const orbitZ = Math.sin(theta) * 120; // 3D depth displacement

        const enterTime = 0.5 + i * 0.45;

        // Emerge from infinity, curve towards left, and take seat in vertical 3D circle
        tl.to(
          card,
          {
            x: orbitSlotX,
            y: orbitSlotY,
            z: orbitZ,
            scale: 0.65,
            opacity: 1,
            filter: 'blur(0px)',
            rotateX: 0,
            rotateY: (Math.cos(theta) * 25), // genuine 3D perspective orientation
            rotateZ: orbitAngleZ,
            duration: 1.2,
            ease: 'power2.out'
          },
          enterTime
        );
      });

      const formationCompleteTime = 0.5 + N * 0.45 + 1.2;

      /* ==============================================================
         STAGE 3 & 4: THE 3D VERTICAL CIRCULAR FORMATION ROTATES
         AROUND THE Z-AXIS (rotateZ) - TURNTABLE/WHEEL SPIN
         ============================================================== */
      // Rotate the entire formation container around the Z-axis for a majestic spinning effect
      tl.to(
        formationContainer,
        {
          rotateZ: 360,
          duration: 3.5,
          ease: 'none'
        },
        formationCompleteTime
      );

      // Keep cards facing correctly relative to viewer during the container Z spin
      const rotationEndTime = formationCompleteTime + 3.5;

      /* ==============================================================
         STAGE 5: SEQUENTIAL CERTIFICATE PLACEMENT (ONE BY ONE)
         - 1st certificate is selected, rotates to upright 0° on Z-axis,
           approaches front-facing view, travels & settles into gallery position 1.
         - 2nd certificate follows into position 2.
         - Continues until all cards are settled in place.
         ============================================================== */
      let placeTime = rotationEndTime + 0.3;

      cardEls.forEach((card, i) => {
        const target = targetPositions[i];

        // 1. Certificate moves to front-facing position, rotates to 0° Z-axis, approaches viewer
        tl.to(
          card,
          {
            x: orbitCenterX + 120,
            y: 0,
            z: 220, // Approach viewer
            scale: 0.85,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0, // Exact upright orientation
            duration: 0.65,
            ease: 'power2.inOut'
          },
          placeTime
        );

        // 2. Travel smoothly and settle into assigned gallery position
        tl.to(
          card,
          {
            x: target.x,
            y: target.y,
            z: 0,
            scale: 1.0,
            duration: 0.85,
            ease: 'power3.out'
          },
          placeTime + 0.6
        );

        placeTime += 0.95; // Staggered: next card begins only after previous card has sufficiently settled
      });

      // Small pause after last card settles before scroll is released
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
        // During animation: section has extended height for 3800px scrub travel; after completion: natural height
        minHeight: animationCompleted ? 'auto' : '100vh',
        paddingBottom: animationCompleted ? '6rem' : 0
      }}
    >
      {/* Deep Infinite Space Canvas Background (Stationary throughout animation) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* 
        IF ANIMATION ALREADY COMPLETED (or on prefers-reduced-motion):
        Render the final settled premium certificate gallery directly with full responsiveness.
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
          - Heading remains visible throughout the animation without disappearing or being occluded.
          - Certificates animate from infinity -> left vertical circle -> Z-axis rotation -> individual placement.
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

          {/* 3D Formation Arena with perspective */}
          <div 
            className="relative flex-1 w-full flex items-center justify-center overflow-visible"
            style={{
              perspective: '2000px',
              perspectiveOrigin: '50% 50%',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Rotating Formation Container (Rotates around Z-axis) */}
            <div
              ref={formationContainerRef}
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
              <span>SCROLL TO ADVANCE 3D Z-AXIS ROTATION & PLACEMENT</span>
            </span>
            <span>{filteredCerts.length} CREDENTIALS IN COSMOS</span>
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
