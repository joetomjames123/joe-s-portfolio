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

  // 1. Interactive Starfield Canvas with Dynamic Scroll Zoom
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

    const starCount = 280;
    const stars = Array.from({ length: starCount }, () => {
      const origX = (Math.random() - 0.5) * width * 1.6;
      const origY = (Math.random() - 0.5) * height * 1.6;
      const dist = Math.sqrt(origX * origX + origY * origY);
      return {
        x: origX,
        y: origY,
        z: Math.random() * 800 + 100,
        radius: Math.random() * 1.5 + 0.4,
        color: Math.random() > 0.6 ? '#10B981' : Math.random() > 0.3 ? '#A7F3D0' : '#E2E8F0',
        alpha: Math.random() * 0.7 + 0.3,
        orbitRadius: dist,
        orbitAngle: Math.atan2(origY, origX),
        orbitSpeed: (Math.random() * 0.0008 + 0.0004) * (Math.random() > 0.5 ? 1 : -1)
      };
    });

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    const render = () => {
      time += 0.015;
      currentScroll += (targetScroll - currentScroll) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Cosmic gradient
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

      // Scroll-driven 3D Starfield Zoom: scrolling down zooms in, scrolling up zooms out
      const scrollZoom = currentScroll * 0.85;
      const cycle = 850;

      for (const s of stars) {
        s.orbitAngle += s.orbitSpeed;
        const curX = Math.cos(s.orbitAngle) * s.orbitRadius;
        const curY = Math.sin(s.orbitAngle) * s.orbitRadius;

        // Dynamic Z depth with scroll zoom
        let adjustedZ = ((s.z - scrollZoom) % cycle + cycle) % cycle + 40;

        // 3D Perspective Projection
        const fov = 400;
        const scale = fov / (fov + adjustedZ);
        const projX = centerX + curX * scale;
        const projY = centerY + curY * scale;

        if (projX < -50 || projX > width + 50 || projY < -50 || projY > height + 50) continue;

        ctx.beginPath();
        const starSize = Math.max(0.6, s.radius * scale * 2.2);
        ctx.arc(projX, projY, starSize, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.min(1, Math.max(0.2, (1 - adjustedZ / 900) * s.alpha));
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
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLightMode]);

  // 2. Continuous Fixed-Axis Revolution & Direct Sequential Placement
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationCompleted(true);
      return;
    }

    if (animationCompleted) return;

    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !pinWrapper || cardEls.length === 0) return;

    const N = cardEls.length;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Refined, slightly more compact card size
    const cols = isMobile ? 1 : isTablet ? 2 : 3;
    const cardWidth = isMobile ? 290 : isTablet ? 310 : 335; // Compact, perfectly proportioned size
    const rowHeight = 250;
    const gapX = isMobile ? 0 : 26;
    const gapY = 20;

    // Orbit coordinates on fixed axis
    const orbitRadiusX = isMobile ? 290 : isTablet ? 420 : 510;
    const orbitRadiusZ = isMobile ? 250 : isTablet ? 340 : 420;
    const orbitCenterY = 20;

    // Final gallery grid target positions (matching exact cardWidth & spacing)
    const totalGridWidth = cols * cardWidth + (cols - 1) * gapX;
    const gridStartX = -totalGridWidth / 2 + cardWidth / 2;

    const targetPositions = cardEls.map((_, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      return {
        x: gridStartX + c * (cardWidth + gapX),
        y: (r - (Math.ceil(N / cols) - 1) / 2) * (rowHeight + gapY) + 25
      };
    });

    const ctx = gsap.context(() => {
      // Helper function for fixed orbit coordinates
      const getOrbitState = (angleDeg: number) => {
        const rad = (angleDeg * Math.PI) / 180;
        return {
          x: Math.sin(rad) * orbitRadiusX,
          z: Math.cos(rad) * orbitRadiusZ - 100,
          rotateY: angleDeg,
          rotateZ: 0,
          rotateX: 0
        };
      };

      // Initial card setup: starts offscreen left in the exact same compact width (335px)
      cardEls.forEach((card) => {
        gsap.set(card, {
          position: 'absolute',
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          width: cardWidth,
          x: -window.innerWidth - 300,
          y: -60,
          z: -500,
          scale: 1.0, // Exact 1.0 scale throughout: no jump in size!
          opacity: 0,
          filter: 'blur(6px)',
          rotateX: 8,
          rotateY: -40,
          rotateZ: 0,
          transformPerspective: 2200,
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 50%',
          willChange: 'transform, opacity, filter'
        });
      });

      // Master Timeline driven directly by scrolling
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

      const entryDuration = 0.95;
      const stagger = 0.65;
      const totalRevolutionsAngle = 540;

      /* =========================================================================
         STAGE 1 & 2: 1ST CARD ARRIVES IN CURVED PATH FROM LEFT AND BEGINS REVOLUTION.
         CARD 2 ARRIVES & JOINS ONGOING REVOLUTION, THEN 3, 4, ETC.
         ========================================================================= */
      cardEls.forEach((card, i) => {
        const arrivalStartTime = 0.35 + i * stagger;
        const entryEndState = getOrbitState(0);

        // Curve from left side
        tl.to(
          card,
          {
            x: -window.innerWidth * 0.25,
            y: 60,
            z: -200,
            scale: 1.0, // 100% actual size
            opacity: 1,
            filter: 'blur(0px)',
            rotateX: 3,
            rotateY: -18,
            duration: entryDuration * 0.5,
            ease: 'power1.out'
          },
          arrivalStartTime
        );

        // Enters the orbit
        tl.to(
          card,
          {
            x: entryEndState.x,
            y: orbitCenterY,
            z: entryEndState.z,
            scale: 1.0,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            duration: entryDuration * 0.5,
            ease: 'power1.inOut'
          },
          arrivalStartTime + entryDuration * 0.5
        );

        // Continuous revolution on fixed axis while newer cards arrive
        const revolutionStartTime = arrivalStartTime + entryDuration;
        const revolutionEndTime = 0.35 + N * stagger + entryDuration + 2.2;
        const revolutionDuration = revolutionEndTime - revolutionStartTime;

        const orbitTracker = { angle: 0 };
        tl.to(
          orbitTracker,
          {
            angle: totalRevolutionsAngle,
            duration: revolutionDuration,
            ease: 'none',
            onUpdate: () => {
              const st = getOrbitState(orbitTracker.angle);
              gsap.set(card, {
                x: st.x,
                y: orbitCenterY,
                z: st.z,
                scale: 1.0, // Exact same size!
                rotateY: st.rotateY,
                rotateX: st.rotateX,
                rotateZ: st.rotateZ
              });
            }
          },
          revolutionStartTime
        );
      });

      const allRevolvingEndTime = 0.35 + N * stagger + entryDuration + 2.2;

      /* =========================================================================
         STAGE 3: DIRECT SEQUENTIAL PLACEMENT
         Directly places the certificates one-by-one into their assigned grid positions
         in the exact same compact size (1.0).
         ========================================================================= */
      let placeTime = allRevolvingEndTime + 0.2;

      cardEls.forEach((card, i) => {
        const target = targetPositions[i];

        // Directly glides from orbit to its exact gallery position in the exact same size
        tl.to(
          card,
          {
            x: target.x,
            y: target.y,
            z: 0, // Lands flat in position
            scale: 1.0, // EXACT SAME SIZE, NO SHRINKAGE OR ENLARGEMENT
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 0.85,
            ease: 'power2.out'
          },
          placeTime
        );

        placeTime += 0.85; // One by one placement
      });

      tl.to({}, { duration: 0.5 }, placeTime + 0.3);
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
        paddingBottom: animationCompleted ? '5rem' : 0
      }}
    >
      {/* Deep Infinite Space Canvas Background (Zooms dynamically on scroll) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* 
        IF ANIMATION ALREADY COMPLETED:
        Render settled responsive gallery directly in the exact same compact size (cardWidth: 335px)
      */}
      {animationCompleted ? (
        <div ref={galleryRef} className="max-w-6xl mx-auto px-6 sm:px-8 w-full pt-16 sm:pt-20 pb-12 z-20 relative">
          
          {/* Header Section (Always Visible) */}
          <div 
            className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b transition-colors w-full"
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
                    className="px-3 py-1.2 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer"
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

          {/* Final Settled Gallery Grid (Exactly matching compact cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
            {filteredCerts.map((cert) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                isLightMode={isLightMode}
                getTagFromCategory={getTagFromCategory}
                onSelect={() => setLightboxCert(cert)}
                className="hover:scale-[1.025] hover:-translate-y-1 transition-transform duration-300"
              />
            ))}
          </div>

        </div>
      ) : (
        /* 
          PINNED SCROLL ARENA:
          - Pinned during animation
          - Cards revolve and directly place one by one in exact matching compact size
        */
        <div 
          ref={pinWrapperRef}
          className="h-screen w-full flex flex-col justify-between overflow-hidden pt-10 pb-6 max-w-6xl mx-auto px-6 sm:px-8 relative z-20"
        >
          {/* Header Section (STATIONARY & ALWAYS VISIBLE) */}
          <div 
            className="flex flex-col md:flex-row md:items-end justify-between mb-3 pb-3 border-b transition-colors w-full z-30 relative"
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
                    className="px-3 py-1.2 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer"
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

          {/* 3D Spatial Arena */}
          <div 
            className="relative flex-1 w-full flex items-center justify-center overflow-visible"
            style={{
              perspective: '2200px',
              perspectiveOrigin: '50% 50%',
              transformStyle: 'preserve-3d'
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

          {/* Bottom subtle status bar */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-typography-muted opacity-60 z-30 pt-2">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SCROLL TO ADVANCE 3D REVOLUTION & DIRECT PLACEMENT</span>
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
