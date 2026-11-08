import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneParticlesProps {
  count?: number;
  color?: string;
}

export const SceneParticles: React.FC<SceneParticlesProps> = ({ 
  count = 140, 
  color = '#8B5CF6' 
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Broaden particle cloud distribution so particles seamlessly float across the ENTIRE Home Section
  // (Left text, header, right planet, and bottom margin)
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Wide horizontal spread: -14 to +14 (spans across both left column and right planet)
      pos[i * 3 + 0] = (Math.random() - 0.5) * 28;
      // Vertical spread: -8 to +8 (covers whole hero height)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      // Depth spread: -6 to +6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      spd[i] = Math.random() * 0.4 + 0.1;
    }
    return [pos, spd];
  }, [count]);

  // Particles rotate and drift smoothly through cosmic space on their own independent physics
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color={color}
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
};
