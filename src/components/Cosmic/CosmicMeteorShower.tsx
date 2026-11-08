import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  angle: number;
  opacity: number;
  fadeSpeed: number;
  thickness: number;
  color: string;
}

interface CosmicStar {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  blinkSpeed: number;
  phase: number;
  color: string;
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

    // 1. Generate lightweight, crisp starfield (180 stars, no shadowBlur to ensure 60-120 FPS on scroll)
    const starCount = 200;
    const stars: CosmicStar[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        baseOpacity: Math.random() * 0.5 + 0.3,
        blinkSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.3 ? '#FFFFFF' : (activeAccentHex || '#8B5CF6')
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars.forEach(s => {
        s.x = Math.random() * width;
        s.y = Math.random() * height;
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const activeMeteors: Meteor[] = [];

    // 2. Spawn meteors along varied paths across the site
    const spawnMeteor = () => {
      // Max 2 active meteors at once to maintain ultra-fast compositing
      if (activeMeteors.length >= 2) return;

      const pathType = Math.floor(Math.random() * 4);
      let startX = 0;
      let startY = 0;
      let angle = 0;

      if (pathType === 0) {
        // Top-left to bottom-right
        startX = Math.random() * (width * 0.7) - 60;
        startY = Math.random() * (height * 0.2) - 40;
        angle = (Math.PI / 180) * (38 + Math.random() * 20);
      } else if (pathType === 1) {
        // Top-right to bottom-left
        startX = width * 0.4 + Math.random() * (width * 0.6);
        startY = Math.random() * (height * 0.2) - 40;
        angle = (Math.PI / 180) * (125 + Math.random() * 25);
      } else if (pathType === 2) {
        // Steep diagonal plunge
        startX = Math.random() * width;
        startY = -60;
        angle = (Math.PI / 180) * (70 + Math.random() * 20);
      } else {
        // Shallow cross streak
        startX = -60;
        startY = Math.random() * (height * 0.5);
        angle = (Math.PI / 180) * (20 + Math.random() * 15);
      }

      const speed = 18 + Math.random() * 14;
      activeMeteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 140 + Math.random() * 180,
        angle,
        opacity: 0.95,
        fadeSpeed: 0.012 + Math.random() * 0.012,
        thickness: 1.4 + Math.random() * 1.2,
        color: Math.random() > 0.35 ? '#FFFFFF' : (activeAccentHex || '#8B5CF6')
      });
    };

    let nextSpawnTimeout: any;
    const scheduleNextMeteor = () => {
      const delay = 3500 + Math.random() * 5000;
      nextSpawnTimeout = setTimeout(() => {
        spawnMeteor();
        scheduleNextMeteor();
      }, delay);
    };

    const initialTimeout: any = setTimeout(() => {
      spawnMeteor();
      scheduleNextMeteor();
    }, 1000);

    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // A. Starfield: fast batch render without heavy shadowBlur or save/restore overhead
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const twinkle = Math.sin(time * star.blinkSpeed * 100 + star.phase);
        const currentOpacity = star.baseOpacity + twinkle * 0.25;
        if (currentOpacity <= 0.05) continue;

        ctx.globalAlpha = Math.max(0.12, Math.min(0.9, currentOpacity));
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // B. Meteors: clean linear gradient streak with zero shadowBlur lag
      for (let i = activeMeteors.length - 1; i >= 0; i--) {
        const m = activeMeteors[i];
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.65, `${m.color}${Math.floor(m.opacity * 180).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, '#FFFFFF');

        ctx.globalAlpha = Math.max(0, Math.min(1, m.opacity));
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Crisp White Core Head
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thickness * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Update Position
        m.x += m.vx;
        m.y += m.vy;
        m.opacity -= m.fadeSpeed;

        if (
          m.y > height + 200 || 
          m.y < -200 || 
          m.x > width + 200 || 
          m.x < -200 || 
          m.opacity <= 0
        ) {
          activeMeteors.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(initialTimeout);
      clearTimeout(nextSpawnTimeout);
    };
  }, [activeAccentHex, isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full transform-gpu will-change-transform"
      style={{
        opacity: isLightMode ? 0.35 : 0.95
      }}
    />
  );
};
