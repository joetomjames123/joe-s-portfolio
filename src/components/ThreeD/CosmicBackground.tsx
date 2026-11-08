import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

interface CosmicBackgroundProps {
  accentColor?: string;
  onNavigate?: (sectionId: string) => void;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ 
  accentColor = '#8B5CF6',
  onNavigate
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const orbitalRing1 = useRef<THREE.Mesh>(null);
  const orbitalRing2 = useRef<THREE.Mesh>(null);
  const orbitalRing3 = useRef<THREE.Mesh>(null);

  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);

  // 1. Starfield across entire home viewport
  const [positions, sizes] = useMemo(() => {
    const count = 280;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      sz[i] = Math.random() * 0.08 + 0.03;
    }
    return [pos, sz];
  }, []);

  // 2. Interactive Floating Section Badges revolving smoothly around the cosmic background
  const sectionBeacons = useMemo(() => [
    { id: 'projects', label: 'PROJECTS', sub: '6 Works', radius: 6.8, speed: 0.16, yOffset: 2.2, color: '#8B5CF6' },
    { id: 'about', label: 'ABOUT ME', sub: 'Story & Bio', radius: 8.6, speed: -0.14, yOffset: -2.8, color: '#A3E635' },
    { id: 'skills', label: 'TECH STACK', sub: 'Tools', radius: 10.2, speed: 0.12, yOffset: 3.5, color: '#38BDF8' },
    { id: 'certificates', label: 'CERTIFICATES', sub: '9 Records', radius: 7.8, speed: -0.19, yOffset: -1.6, color: '#FBBF24' },
    { id: 'experience', label: 'EXPERIENCE', sub: 'FlyRank AI', radius: 9.4, speed: 0.15, yOffset: -3.8, color: '#F472B6' },
    { id: 'contact', label: 'CONTACT', sub: "Let's talk", radius: 11.5, speed: -0.1, yOffset: 1.5, color: '#FFFFFF' },
  ], []);

  const beaconRefs = useRef<THREE.Group[]>([]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Gentle starfield drift
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x = Math.sin(time * 0.08) * 0.04;
    }

    // Wide cosmic orbital tracks sweeping across the viewport
    if (orbitalRing1.current) {
      orbitalRing1.current.rotation.z += delta * 0.04;
    }
    if (orbitalRing2.current) {
      orbitalRing2.current.rotation.z -= delta * 0.06;
    }
    if (orbitalRing3.current) {
      orbitalRing3.current.rotation.z += delta * 0.03;
    }

    // Orbiting Section Beacons
    beaconRefs.current.forEach((ref, idx) => {
      if (ref) {
        const beacon = sectionBeacons[idx];
        const angle = time * beacon.speed + idx * 1.05;
        ref.position.x = Math.cos(angle) * beacon.radius;
        ref.position.z = Math.sin(angle) * beacon.radius;
        ref.position.y = beacon.yOffset + Math.sin(time * 0.5 + idx) * 0.35;
      }
    });
  });

  const handleClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <group>
      {/* Dynamic Starfield */}
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
          size={0.07}
          color="#FFFFFF"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
        />
      </points>

      {/* Massive cosmic orbital tracks */}
      <mesh ref={orbitalRing1} rotation={[Math.PI / 2.5, 0.4, 0]}>
        <torusGeometry args={[8.5, 0.015, 16, 120]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.25} />
      </mesh>

      <mesh ref={orbitalRing2} rotation={[-Math.PI / 3, -0.3, 0]}>
        <torusGeometry args={[11.2, 0.012, 16, 120]} />
        <meshBasicMaterial color="#A3E635" transparent opacity={0.2} />
      </mesh>

      <mesh ref={orbitalRing3} rotation={[Math.PI / 4, 0.6, 0]}>
        <torusGeometry args={[13.5, 0.01, 16, 120]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.18} />
      </mesh>

      {/* Interactive Orbiting Section Beacons */}
      {sectionBeacons.map((beacon, i) => {
        const isHovered = hoveredBadge === i;
        return (
          <group 
            key={beacon.id} 
            ref={(el) => { if (el) beaconRefs.current[i] = el; }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(beacon.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredBadge(i);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredBadge(null);
              document.body.style.cursor = 'auto';
            }}
          >
            {/* Glowing Orb */}
            <Sphere args={[isHovered ? 0.22 : 0.16, 24, 24]}>
              <meshStandardMaterial
                color={beacon.color}
                emissive={beacon.color}
                emissiveIntensity={isHovered ? 2.5 : 1.2}
                roughness={0.2}
              />
            </Sphere>

            <pointLight distance={3} intensity={isHovered ? 3.5 : 1.5} color={beacon.color} />

            {/* Clickable Capsule Badge with Label */}
            <group position={[0, 0.38, 0]}>
              <mesh>
                <planeGeometry args={[1.35, 0.45]} />
                <meshBasicMaterial color="#0A0C10" transparent opacity={0.85} />
              </mesh>
              <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(1.35, 0.45)]} />
                <lineBasicMaterial color={isHovered ? '#FFFFFF' : beacon.color} linewidth={2} />
              </lineSegments>

              {/* Title */}
              <Text
                position={[0, 0.06, 0.02]}
                fontSize={0.13}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.1}
              >
                {beacon.label}
              </Text>

              {/* Subtitle / CTA */}
              <Text
                position={[0, -0.1, 0.02]}
                fontSize={0.08}
                color={beacon.color}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.06}
              >
                {isHovered ? '● CLICK TO JUMP' : beacon.sub}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
};
