import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CosmicStar {
  x: number;
  y: number;
  z: number; // depth
  radius: number;
  baseOpacity: number;
  blinkSpeed: number;
  phase: number;
  isAccent: boolean;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  driftVx: number;
  driftVy: number;
}

export const CosmicMeteorShower: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { activeAccentHex, isLightMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 1. Generate 3D-feeling cosmic starfield dots with continuous orbital & drift dynamics
    const starCount = 320;
    const stars: CosmicStar[] = [];
    for (let i = 0; i < starCount; i++) {
      const origX = (Math.random() - 0.5) * width * 1.6;
      const origY = (Math.random() - 0.5) * height * 1.6;
      const dist = Math.sqrt(origX * origX + origY * origY);
      const angle = Math.atan2(origY, origX);

      stars.push({
        x: origX,
        y: origY,
        z: Math.random() * 900 + 100, // 100 to 1000 depth
        radius: Math.random() * 1.3 + 0.4,
        baseOpacity: Math.random() * 0.5 + 0.35,
        blinkSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.45,
        orbitRadius: dist,
        orbitAngle: angle,
        orbitSpeed: (Math.random() * 0.0008 + 0.0004) * (Math.random() > 0.5 ? 1 : -1),
        driftVx: (Math.random() - 0.5) * 0.25,
        driftVy: (Math.random() - 0.5) * 0.25
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Track scroll position for smooth zoom in / zoom out
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    const render = () => {
      time += 0.015;

      // Smooth scroll interpolation for fluid zooming response
      currentScroll += (targetScroll - currentScroll) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Zoom factor: scrolling down zooms in, scrolling up zooms out
      const scrollOffset = currentScroll * 0.75;

      // Global subtle celestial swirl angle (swirls continuously even while standing still, and reacts dynamically to scroll velocity)
      const globalSwirl = time * 0.05 + currentScroll * 0.0005;
      const cosSwirl = Math.cos(globalSwirl);
      const sinSwirl = Math.sin(globalSwirl);

      // Dynamic colors based on active theme with rich contrast in light mode
      const neutralStarColor = isLightMode ? '#334155' : '#FFFFFF';
      const accentStarColor = activeAccentHex || (isLightMode ? '#7C3AED' : '#8B5CF6');

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // 1. Continuous rotation & orbit even when standing still
        star.orbitAngle += star.orbitSpeed;
        const curX = Math.cos(star.orbitAngle) * star.orbitRadius + Math.sin(time + star.phase) * 6;
        const curY = Math.sin(star.orbitAngle) * star.orbitRadius + Math.cos(time + star.phase) * 6;

        // Apply celestial rotation matrix
        const rotatedX = curX * cosSwirl - curY * sinSwirl;
        const rotatedY = curX * sinSwirl + curY * cosSwirl;

        // 2. Star's dynamic Z depth based on scroll zoom
        const cycle = 900;
        let adjustedZ = ((star.z - scrollOffset) % cycle + cycle) % cycle + 50;

        // 3. Perspective projection
        const fov = 400;
        const scale = fov / (fov + adjustedZ);
        const projectedX = centerX + rotatedX * scale;
        const projectedY = centerY + rotatedY * scale;

        // Skip if out of viewport
        if (projectedX < -50 || projectedX > width + 50 || projectedY < -50 || projectedY > height + 50) {
          continue;
        }

        const twinkle = Math.sin(time * star.blinkSpeed * 100 + star.phase);
        const currentOpacity = star.baseOpacity + twinkle * 0.25;

        // Stars closer to viewer appear brighter and larger
        const depthAlpha = Math.min(1, Math.max(0.15, 1 - adjustedZ / 950));
        const finalAlpha = Math.max(isLightMode ? 0.4 : 0.15, Math.min(1, currentOpacity * depthAlpha));

        ctx.globalAlpha = finalAlpha;
        ctx.fillStyle = star.isAccent ? accentStarColor : neutralStarColor;
        ctx.beginPath();
        const baseRadius = isLightMode ? Math.max(1.2, star.radius * 1.5) : star.radius;
        ctx.arc(projectedX, projectedY, Math.max(0.8, baseRadius * scale * 2.5), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeAccentHex, isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full transform-gpu"
      style={{
        opacity: isLightMode ? 0.9 : 0.95
      }}
    />
  );
};
