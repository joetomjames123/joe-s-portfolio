import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Planet } from '../ThreeD/Planet';
import { CosmicBackground } from '../ThreeD/CosmicBackground';
import { useTheme } from '../../contexts/ThemeContext';
import * as THREE from 'three';

// Unified 3D System: When you drag the planet, the entire celestial universe & background react and rotate in harmony!
const UnifiedSpaceScene: React.FC<{ accentColor: string; isLightMode: boolean }> = ({ accentColor, isLightMode }) => {
  const universeGroupRef = useRef<THREE.Group>(null);
  const planetContainerRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0.003 });

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointer.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousPointer.current.x;
      const deltaY = clientY - previousPointer.current.y;

      rotationVelocity.current = {
        x: deltaY * 0.004,
        y: deltaX * 0.004
      };

      previousPointer.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  useFrame(() => {
    if (!universeGroupRef.current) return;

    // 1. Dragging rotates the WHOLE home space background (stars, cosmic rings, asteroids)
    universeGroupRef.current.rotation.y += rotationVelocity.current.y * 0.85;
    universeGroupRef.current.rotation.x += rotationVelocity.current.x * 0.85;

    // 2. Planet receives direct full rotational momentum
    if (planetContainerRef.current) {
      planetContainerRef.current.rotation.y += rotationVelocity.current.y * 1.35;
      planetContainerRef.current.rotation.x += rotationVelocity.current.x * 1.35;
    }

    // 3. Smooth natural inertia & continuous idle rotation
    if (!isDragging.current) {
      rotationVelocity.current.y = THREE.MathUtils.lerp(rotationVelocity.current.y, 0.003, 0.04);
      rotationVelocity.current.x = THREE.MathUtils.lerp(rotationVelocity.current.x, 0, 0.05);
    }
  });

  return (
    <group ref={universeGroupRef}>
      {/* Dynamic Cosmic Background: Moving stars, celestial rings, and satellites traversing the entire Home section */}
      <CosmicBackground accentColor={accentColor} isLightMode={isLightMode} />

      {/* The Central Interactive Planet positioned on the right half */}
      <group ref={planetContainerRef} position={[2.6, 0, 0]}>
        <Planet accentColor={accentColor} isLightMode={isLightMode} />
      </group>
    </group>
  );
};

export const Hero3DScene: React.FC = () => {
  const { activeAccentHex, isLightMode } = useTheme();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) return null;

  return (
    <div className="absolute inset-0 w-full h-full select-none cursor-grab active:cursor-grabbing pointer-events-auto overflow-hidden">
      {/* 3D Canvas spanning across the full Home Page */}
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8.8]} fov={40} />
        
        {/* Atmospheric Lighting */}
        <ambientLight intensity={isLightMode ? 1.4 : 0.9} />
        <directionalLight position={[8, 8, 8]} intensity={2.2} color="#FFFFFF" />
        <pointLight position={[-8, -8, -4]} intensity={1.8} color={activeAccentHex} />
        <pointLight position={[5, -5, 5]} intensity={1.5} color="#A3E635" />

        <Suspense fallback={null}>
          <UnifiedSpaceScene accentColor={activeAccentHex} isLightMode={isLightMode} />
        </Suspense>
      </Canvas>
    </div>
  );
};
