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

export const HeroMeteors: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { activeAccentHex, isLightMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const activeMeteors: Meteor[] = [];

    // Spawn shooting meteors across diverse angles and trajectories only inside Home
    const spawnMeteor = () => {
      if (activeMeteors.length >= 2) return;

      // 4 different directional trajectory variants:
      // 0: Northwest to Southeast (~40°)
      // 1: Northeast to Southwest (~135°)
      // 2: Steep downward angle from top (~75°)
      // 3: High-speed shallow diagonal (~20°)
      const pathType = Math.floor(Math.random() * 4);
      let startX = 0;
      let startY = 0;
      let angle = 0;

      if (pathType === 0) {
        startX = Math.random() * (width * 0.7) - 60;
        startY = Math.random() * (height * 0.25) - 40;
        angle = (Math.PI / 180) * (35 + Math.random() * 25);
      } else if (pathType === 1) {
        startX = width * 0.4 + Math.random() * (width * 0.6);
        startY = Math.random() * (height * 0.25) - 40;
        angle = (Math.PI / 180) * (120 + Math.random() * 30);
      } else if (pathType === 2) {
        startX = Math.random() * width;
        startY = -60;
        angle = (Math.PI / 180) * (70 + Math.random() * 20);
      } else {
        startX = -60;
        startY = Math.random() * (height * 0.6);
        angle = (Math.PI / 180) * (18 + Math.random() * 16);
      }

      const speed = 16 + Math.random() * 14;
      activeMeteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 130 + Math.random() * 170,
        angle,
        opacity: 0.95,
        fadeSpeed: 0.012 + Math.random() * 0.01,
        thickness: 1.5 + Math.random() * 1.2,
        color: Math.random() > 0.35 ? '#FFFFFF' : (activeAccentHex || '#8B5CF6')
      });
    };

    let nextSpawnTimeout: any;
    const scheduleNextMeteor = () => {
      const delay = 2500 + Math.random() * 4500;
      nextSpawnTimeout = setTimeout(() => {
        spawnMeteor();
        scheduleNextMeteor();
      }, delay);
    };

    // First meteor after 800ms
    const initialTimeout: any = setTimeout(() => {
      spawnMeteor();
      scheduleNextMeteor();
    }, 800);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

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

        // White core head flare
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thickness * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

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
      className="absolute inset-0 pointer-events-none z-10 w-full h-full transform-gpu"
      style={{
        opacity: isLightMode ? 0.35 : 0.95
      }}
    />
  );
};

