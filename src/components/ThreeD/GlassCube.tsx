import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface GlassCubeProps {
  onFaceClick?: (faceKey: string) => void;
  accentColor?: string;
}

export const GlassCube: React.FC<GlassCubeProps> = ({ 
  onFaceClick,
  accentColor = '#00C987'
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const coreIcosahedronRef = useRef<THREE.Mesh>(null);
  const coreTorusRef = useRef<THREE.Mesh>(null);
  const orbitRingRef1 = useRef<THREE.Group>(null);
  const orbitRingRef2 = useRef<THREE.Group>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);

  const previousPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocity = useRef<{ x: number; y: number }>({ x: 0, y: 0.005 });
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0.35, y: 0.65 });

  // 6 Interactive Faces
  const faces = useMemo(() => [
    {
      id: 'experience',
      title: 'EXPERIENCE',
      sub: 'FlyRank AI Intern',
      position: [1.32, 0, 0] as [number, number, number],
      rotation: [0, Math.PI / 2, 0] as [number, number, number],
      targetSection: '#experience'
    },
    {
      id: 'skills',
      title: 'SKILLS',
      sub: 'Java, Python, React',
      position: [-1.32, 0, 0] as [number, number, number],
      rotation: [0, -Math.PI / 2, 0] as [number, number, number],
      targetSection: '#skills'
    },
    {
      id: 'education',
      title: 'EDUCATION',
      sub: 'VIT-AP M.Tech CSE',
      position: [0, 1.32, 0] as [number, number, number],
      rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
      targetSection: '#about'
    },
    {
      id: 'connect',
      title: 'CONNECT',
      sub: 'Email & LinkedIn',
      position: [0, -1.32, 0] as [number, number, number],
      rotation: [Math.PI / 2, 0, 0] as [number, number, number],
      targetSection: '#contact'
    },
    {
      id: 'about',
      title: 'ABOUT ME',
      sub: 'Joe Tom James',
      position: [0, 0, 1.32] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      targetSection: '#about'
    },
    {
      id: 'projects',
      title: 'PROJECTS',
      sub: 'ClinicFlow & More',
      position: [0, 0, -1.32] as [number, number, number],
      rotation: [0, Math.PI, 0] as [number, number, number],
      targetSection: '#projects'
    }
  ], []);

  // Technologies on Orbital Track 1
  const orbitBadges1 = useMemo(() => [
    { text: 'React', angle: 0 },
    { text: 'TypeScript', angle: (2 * Math.PI) / 3 },
    { text: 'Three.js', angle: (4 * Math.PI) / 3 }
  ], []);

  // Technologies on Orbital Track 2
  const orbitBadges2 = useMemo(() => [
    { text: 'Python', angle: Math.PI / 3 },
    { text: 'Java', angle: Math.PI },
    { text: 'PostgreSQL', angle: (5 * Math.PI) / 3 }
  ], []);

  // Animation ticks
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // 1. Cube Physics & Gentle Floating Motion
    if (meshRef.current) {
      if (!isDragging) {
        targetRotation.current.y += delta * 0.35;
        meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.05;
        meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.15 + 0.25;
        meshRef.current.position.y = Math.sin(t * 1.2) * 0.08;
      } else {
        meshRef.current.rotation.y += rotationVelocity.current.y;
        meshRef.current.rotation.x += rotationVelocity.current.x;
        rotationVelocity.current.x *= 0.92;
        rotationVelocity.current.y *= 0.92;
      }
    }

    // 2. Quantum Core Internal Rotation
    if (coreIcosahedronRef.current) {
      coreIcosahedronRef.current.rotation.x += delta * 0.8;
      coreIcosahedronRef.current.rotation.y += delta * 1.2;
    }
    if (coreTorusRef.current) {
      coreTorusRef.current.rotation.y -= delta * 0.9;
      coreTorusRef.current.rotation.z += delta * 0.6;
    }

    // 3. Orbital Badges Smooth Rotation
    if (orbitRingRef1.current) {
      orbitRingRef1.current.rotation.z += delta * 0.32;
    }
    if (orbitRingRef2.current) {
      orbitRingRef2.current.rotation.z -= delta * 0.26;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    previousPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - previousPointer.current.x) * 0.006;
    const deltaY = (e.clientY - previousPointer.current.y) * 0.006;
    rotationVelocity.current = { x: deltaY, y: deltaX };
    previousPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleFaceClick = (face: typeof faces[0]) => {
    if (onFaceClick) {
      onFaceClick(face.targetSection);
    } else {
      const el = document.querySelector(face.targetSection);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <group>
      {/* 
        CENTRAL MULTI-LAYERED CYBER-LUXURY GLASS CUBE
      */}
      <group 
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Layer 1: Outer Refractive Prismatic Glass Shell */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 2.6, 2.6]} />
          <meshPhysicalMaterial
            roughness={0.05}
            transmission={0.96}
            thickness={1.8}
            ior={1.65}
            transparent={true}
            opacity={0.92}
            color="#050a08"
            reflectivity={0.98}
            clearcoat={1}
            clearcoatRoughness={0.08}
            metalness={0.15}
          />
        </mesh>

        {/* Layer 2: Inner Dark Obsidian Core Frame with subtle matrix opacity */}
        <mesh>
          <boxGeometry args={[2.52, 2.52, 2.52]} />
          <meshStandardMaterial
            color="#040806"
            transparent
            opacity={0.35}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Layer 3: Cyberpunk Luminescent Chamfer Neon Edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.62, 2.62, 2.62)]} />
          <lineBasicMaterial color={accentColor} linewidth={3} transparent opacity={0.95} />
        </lineSegments>

        {/* Layer 4: Sci-Fi Corner Brackets */}
        {[
          [-1.3, -1.3, -1.3], [1.3, -1.3, -1.3], [-1.3, 1.3, -1.3], [1.3, 1.3, -1.3],
          [-1.3, -1.3, 1.3], [1.3, -1.3, 1.3], [-1.3, 1.3, 1.3], [1.3, 1.3, 1.3]
        ].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={1.2}
            />
          </mesh>
        ))}

        {/* Layer 5: Floating Internal Energy Core (Rotating Icosahedron + Gyroscopic Ring) */}
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={0.8}>
          <group>
            {/* Spinning Golden / Neon Geometric Icosahedron */}
            <mesh ref={coreIcosahedronRef}>
              <icosahedronGeometry args={[0.7, 0]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.9}
                wireframe={true}
                transparent
                opacity={0.85}
              />
            </mesh>

            {/* Inner Gyroscopic Gyro Ring */}
            <mesh ref={coreTorusRef}>
              <torusGeometry args={[0.85, 0.02, 16, 64]} />
              <meshStandardMaterial
                color="#FFFFFF"
                emissive="#FFFFFF"
                emissiveIntensity={0.6}
              />
            </mesh>

            {/* Central Glowing Energy Orb */}
            <mesh>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial color={accentColor} />
            </mesh>
          </group>
        </Float>

        {/* Layer 6: 6 Interactive Faces with Holographic HUD Reticle & Monograms */}
        {faces.map((face, idx) => (
          <group
            key={face.id}
            position={face.position}
            rotation={face.rotation}
            onPointerOver={() => setHoveredFace(idx)}
            onPointerOut={() => setHoveredFace(null)}
            onClick={(e) => {
              e.stopPropagation();
              handleFaceClick(face);
            }}
          >
            {/* Click Hit Plane */}
            <mesh visible={false}>
              <planeGeometry args={[2.4, 2.4]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Holographic Face Backdrop Glow on Hover */}
            {hoveredFace === idx && (
              <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[2.3, 2.3]} />
                <meshBasicMaterial color={accentColor} transparent opacity={0.25} />
              </mesh>
            )}

            {/* HUD Corner Reticles */}
            <lineSegments position={[0, 0, 0.01]}>
              <edgesGeometry args={[new THREE.PlaneGeometry(2.3, 2.3)]} />
              <lineBasicMaterial 
                color={hoveredFace === idx ? '#FFFFFF' : accentColor} 
                transparent 
                opacity={hoveredFace === idx ? 0.6 : 0.25} 
              />
            </lineSegments>

            {/* HUD Status Beacon Dot */}
            <mesh position={[0, 0.88, 0.02]}>
              <circleGeometry args={[0.045, 16]} />
              <meshBasicMaterial color={accentColor} />
            </mesh>

            {/* Face Title with Holographic Depth */}
            <Text
              position={[0, 0.52, 0.02]}
              fontSize={0.22}
              color={hoveredFace === idx ? '#FFFFFF' : accentColor}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.18}
            >
              {face.title}
            </Text>

            {/* Laser Line Divider */}
            <mesh position={[0, 0.32, 0.02]}>
              <planeGeometry args={[1.2, 0.015]} />
              <meshBasicMaterial color={accentColor} transparent opacity={0.8} />
            </mesh>

            {/* Subtitle */}
            <Text
              position={[0, 0.04, 0.02]}
              fontSize={0.14}
              color="#F0F4F2"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.06}
              maxWidth={2.2}
              textAlign="center"
            >
              {face.sub}
            </Text>

            {/* Interactive Prompt */}
            <Text
              position={[0, -0.65, 0.02]}
              fontSize={0.105}
              color={hoveredFace === idx ? accentColor : '#9AA7A0'}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.2}
            >
              {hoveredFace === idx ? '● CLICK TO ENTER' : 'EXPLORE FACE'}
            </Text>
          </group>
        ))}
      </group>

      {/* 
        ORBITAL RING 1: Horizontal Tilted Ellipse with Ambient Particles
      */}
      <group rotation={[Math.PI / 3, 0.2, 0]}>
        {/* Glow Orbit Path */}
        <mesh>
          <torusGeometry args={[2.4, 0.012, 16, 120]} />
          <meshStandardMaterial 
            color={accentColor} 
            emissive={accentColor} 
            emissiveIntensity={0.6}
            transparent 
            opacity={0.4} 
          />
        </mesh>

        {/* Orbit Group 1 */}
        <group ref={orbitRingRef1}>
          {orbitBadges1.map((b, i) => {
            const x = Math.cos(b.angle) * 2.4;
            const y = Math.sin(b.angle) * 2.4;
            return (
              <group key={i} position={[x, y, 0]}>
                {/* Capsule Base */}
                <mesh>
                  <planeGeometry args={[1.05, 0.38]} />
                  <meshBasicMaterial color="#0A0C10" />
                </mesh>
                <lineSegments>
                  <edgesGeometry args={[new THREE.PlaneGeometry(1.05, 0.38)]} />
                  <lineBasicMaterial color={accentColor} linewidth={2} />
                </lineSegments>
                <Text
                  position={[0, 0, 0.01]}
                  fontSize={0.125}
                  color="#FFFFFF"
                  anchorX="center"
                  anchorY="middle"
                  letterSpacing={0.08}
                >
                  {b.text}
                </Text>
              </group>
            );
          })}
        </group>
      </group>

      {/* 
        ORBITAL RING 2: Vertical Tilted Ellipse
      */}
      <group rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        {/* Glow Orbit Path */}
        <mesh>
          <torusGeometry args={[2.4, 0.012, 16, 120]} />
          <meshStandardMaterial 
            color={accentColor} 
            emissive={accentColor} 
            emissiveIntensity={0.6}
            transparent 
            opacity={0.4} 
          />
        </mesh>

        {/* Orbit Group 2 */}
        <group ref={orbitRingRef2}>
          {orbitBadges2.map((b, i) => {
            const x = Math.cos(b.angle) * 2.4;
            const y = Math.sin(b.angle) * 2.4;
            return (
              <group key={i} position={[x, y, 0]}>
                {/* Capsule Base */}
                <mesh>
                  <planeGeometry args={[1.05, 0.38]} />
                  <meshBasicMaterial color="#0A0C10" />
                </mesh>
                <lineSegments>
                  <edgesGeometry args={[new THREE.PlaneGeometry(1.05, 0.38)]} />
                  <lineBasicMaterial color={accentColor} linewidth={2} />
                </lineSegments>
                <Text
                  position={[0, 0, 0.01]}
                  fontSize={0.125}
                  color="#FFFFFF"
                  anchorX="center"
                  anchorY="middle"
                  letterSpacing={0.08}
                >
                  {b.text}
                </Text>
              </group>
            );
          })}
        </group>
      </group>
    </group>
  );
};
