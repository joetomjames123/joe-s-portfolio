import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  accentColor?: string;
  isLightMode?: boolean;
}

export const Planet: React.FC<PlanetProps> = ({ 
  accentColor = '#8B5CF6',
  isLightMode = false 
}) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const moonRef1 = useRef<THREE.Group>(null);
  const moonRef2 = useRef<THREE.Group>(null);
  const moonRef3 = useRef<THREE.Group>(null);

  const wireframeGeo = useMemo(() => new THREE.IcosahedronGeometry(1.22, 5), []);
  const coreGeo = useMemo(() => new THREE.SphereGeometry(1.2, 64, 64), []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Planet core axial spin
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += delta * 0.28;
    }

    // Atmosphere gentle breath
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.12;
      atmosphereRef.current.rotation.z += delta * 0.05;
    }

    // Planetary rings differential spin
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.08;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.12;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.z += delta * 0.05;
    }

    // Moons orbiting comfortably inside the viewport bounds
    if (moonRef1.current) {
      moonRef1.current.rotation.y = time * 0.55;
      moonRef1.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    }
    if (moonRef2.current) {
      moonRef2.current.rotation.y = -time * 0.4 + 1.2;
      moonRef2.current.rotation.z = Math.cos(time * 0.3) * 0.2;
    }
    if (moonRef3.current) {
      moonRef3.current.rotation.y = time * 0.75 + 2.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={planetGroupRef} rotation={[0.25, 0.15, -0.15]} scale={0.92}>
        
        {/* 1. SOLID PLANET CORE (Harmonized with theme light/dark) */}
        <mesh ref={planetMeshRef} geometry={coreGeo}>
          <meshStandardMaterial
            color={isLightMode ? '#F1F5F9' : '#0B0D13'}
            roughness={isLightMode ? 0.2 : 0.4}
            metalness={isLightMode ? 0.2 : 0.7}
          />
        </mesh>

        {/* 2. DIGITAL NEURAL TOPOGRAPHIC WIREFRAME (Full theme accent) */}
        <lineSegments geometry={new THREE.WireframeGeometry(wireframeGeo)}>
          <lineBasicMaterial
            color={accentColor}
            transparent
            opacity={isLightMode ? 0.55 : 0.65}
            linewidth={1}
          />
        </lineSegments>

        {/* 3. ATMOSPHERIC SHIELD LAYER */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[1.29, 48, 48]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={isLightMode ? 0.6 : 0.85}
            transparent
            opacity={0.25}
            roughness={0.1}
            side={THREE.BackSide}
          />
        </mesh>

        {/* 4. PLANETARY RING SYSTEM (Dynamically matched with theme accent) */}
        {/* Wide Semi-transparent Ring 1 */}
        <mesh ref={ringRef1} rotation={[Math.PI / 2.2, 0.1, 0]}>
          <ringGeometry args={[1.52, 2.12, 128]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.8}
            transparent
            opacity={isLightMode ? 0.6 : 0.55}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Dense Bright Ring 2 */}
        <mesh ref={ringRef2} rotation={[Math.PI / 2.2, 0.1, 0]}>
          <ringGeometry args={[1.70, 1.88, 128]} />
          <meshStandardMaterial
            color={isLightMode ? '#0F172A' : '#FFFFFF'}
            emissive={isLightMode ? accentColor : '#FFFFFF'}
            emissiveIntensity={isLightMode ? 0.6 : 1.0}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer Ring 3 */}
        <mesh ref={ringRef3} rotation={[Math.PI / 2.2, 0.1, 0]}>
          <ringGeometry args={[2.14, 2.24, 128]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.9}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer Circular Orbit Wireline */}
        <mesh rotation={[Math.PI / 2.2, 0.1, 0]}>
          <torusGeometry args={[2.35, 0.012, 16, 128]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* 5. ORBITING MOONS / SATELLITES */}
        {/* Moon 1 (Primary Theme Accent Moon) */}
        <group ref={moonRef1}>
          <group position={[2.45, 0.3, 0]}>
            <Sphere args={[0.13, 24, 24]}>
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={1.5}
                roughness={0.2}
              />
            </Sphere>
            <pointLight distance={3} intensity={2.2} color={accentColor} />
          </group>
        </group>

        {/* Moon 2 (Harmonized Theme Satellite) */}
        <group ref={moonRef2}>
          <group position={[-2.35, -0.45, 0]}>
            <Sphere args={[0.1, 24, 24]}>
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={1.4}
                roughness={0.2}
              />
            </Sphere>
            <pointLight distance={3} intensity={2} color={accentColor} />
          </group>
        </group>

        {/* Moon 3 (High-Contrast Beacon) */}
        <group ref={moonRef3}>
          <group position={[1.8, -1.3, 0.9]}>
            <Sphere args={[0.07, 16, 16]}>
              <meshStandardMaterial
                color={isLightMode ? '#0F172A' : '#FFFFFF'}
                emissive={isLightMode ? accentColor : '#FFFFFF'}
                emissiveIntensity={1.5}
              />
            </Sphere>
          </group>
        </group>
      </group>
    </Float>
  );
};
