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

    // 1. Generate 3D-feeling cosmic starfield dots across the whole page
    const starCount = 300;
    const stars: CosmicStar[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 900 + 100, // 100 to 1000 depth
        radius: Math.random() * 1.3 + 0.4,
        baseOpacity: Math.random() * 0.5 + 0.35,
        blinkSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.45
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

      // Dynamic colors based on active theme
      const neutralStarColor = isLightMode ? '#0F172A' : '#FFFFFF';
      const accentStarColor = activeAccentHex || (isLightMode ? '#7C3AED' : '#8B5CF6');

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Star's dynamic Z depth based on scroll
        const cycle = 900;
        let adjustedZ = ((star.z - scrollOffset) % cycle + cycle) % cycle + 50;

        // Perspective projection
        const fov = 400;
        const scale = fov / (fov + adjustedZ);
        const projectedX = centerX + star.x * scale;
        const projectedY = centerY + star.y * scale;

        // Skip if out of viewport
        if (projectedX < -50 || projectedX > width + 50 || projectedY < -50 || projectedY > height + 50) {
          continue;
        }

        const twinkle = Math.sin(time * star.blinkSpeed * 100 + star.phase);
        const currentOpacity = star.baseOpacity + twinkle * 0.25;

        // Stars closer to viewer appear brighter and larger
        const depthAlpha = Math.min(1, Math.max(0.1, 1 - adjustedZ / 950));
        const finalAlpha = Math.max(0.12, Math.min(0.95, currentOpacity * depthAlpha));

        ctx.globalAlpha = finalAlpha;
        ctx.fillStyle = star.isAccent ? accentStarColor : neutralStarColor;
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, Math.max(0.6, star.radius * scale * 2.2), 0, Math.PI * 2);
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
        opacity: isLightMode ? 0.45 : 0.95
      }}
    />
  );
};
