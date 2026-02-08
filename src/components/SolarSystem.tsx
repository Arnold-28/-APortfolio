import { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <Sphere ref={ref} args={[3, 64, 64]} position={[0, 0, -20]}>
        <meshStandardMaterial 
          color="#FDB813" 
          emissive="#FDB813"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </Sphere>
      <pointLight position={[0, 0, -20]} intensity={3} distance={100} color="#FDB813" />
      <pointLight position={[0, 0, -20]} intensity={1.5} distance={150} color="#FFA500" />
    </group>
  );
}

function Planet({ 
  size, 
  distance, 
  speed, 
  color, 
  emissive,
  orbitTilt = 0,
  rotationSpeed = 0.01
}: { 
  size: number; 
  distance: number; 
  speed: number; 
  color: string;
  emissive?: string;
  orbitTilt?: number;
  rotationSpeed?: number;
}) {
  const orbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={orbitRef} rotation={[orbitTilt, 0, 0]}>
      <Sphere ref={planetRef} args={[size, 32, 32]} position={[distance, 0, -20]}>
        <meshStandardMaterial 
          color={color} 
          emissive={emissive || color}
          emissiveIntensity={0.2}
          roughness={0.8}
          metalness={0.3}
        />
      </Sphere>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -20]}>
        <ringGeometry args={[distance - 0.05, distance + 0.05, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function AsteroidBelt() {
  const count = 200;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + time * 0.05;
      const distance = 18 + Math.random() * 2;
      const matrix = new THREE.Matrix4();
      matrix.setPosition(
        Math.cos(angle) * distance,
        (Math.random() - 0.5) * 0.5,
        Math.sin(angle) * distance - 20
      );
      mesh.current.setMatrixAt(i, matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#8B7355" roughness={1} />
    </instancedMesh>
  );
}

function Rings({ innerRadius, outerRadius, position }: { innerRadius: number; outerRadius: number; position: [number, number, number] }) {
  return (
    <mesh rotation={[Math.PI / 2.2, 0, 0]} position={position}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshStandardMaterial 
        color="#C9B18A" 
        transparent 
        opacity={0.7} 
        side={THREE.DoubleSide}
        roughness={0.8}
      />
    </mesh>
  );
}

export default function SolarSystem() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 5, 25], fov: 60 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.1} />
        <Stars radius={300} depth={60} count={8000} factor={6} fade speed={1} />
        
        <Sun />
        
        <Planet size={0.4} distance={6} speed={0.8} color="#8C7853" rotationSpeed={0.02} orbitTilt={0.1} />
        <Planet size={0.7} distance={8} speed={0.5} color="#FFC649" emissive="#FFD700" rotationSpeed={0.015} orbitTilt={0.05} />
        <Planet size={0.75} distance={10.5} speed={0.3} color="#4169E1" emissive="#1E90FF" rotationSpeed={0.03} orbitTilt={0.08} />
        <Planet size={0.55} distance={13} speed={0.2} color="#CD5C5C" emissive="#8B0000" rotationSpeed={0.025} orbitTilt={0.12} />
        
        <AsteroidBelt />
        
        <Planet size={1.8} distance={21} speed={0.08} color="#DAA520" emissive="#B8860B" rotationSpeed={0.04} orbitTilt={0.06} />
        <Planet size={1.5} distance={26} speed={0.05} color="#F4A460" emissive="#CD853F" rotationSpeed={0.035} orbitTilt={0.15} />
        <Rings innerRadius={2} outerRadius={3.2} position={[26, 0, -20]} />
        <Planet size={1} distance={30} speed={0.03} color="#4FD0E0" emissive="#00CED1" rotationSpeed={0.02} orbitTilt={0.2} />
        <Planet size={0.95} distance={33} speed={0.02} color="#4169E1" emissive="#0000CD" rotationSpeed={0.022} orbitTilt={0.1} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          minDistance={10}
          maxDistance={60}
          autoRotate 
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}
