import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Octahedron, Text } from '@react-three/drei';
import * as THREE from 'three';

interface SkillIconProps {
  position: [number, number, number];
  geometry: 'sphere' | 'torus' | 'octahedron' | 'box';
  color: string;
  label: string;
}

function SkillIcon({ position, geometry, color, label }: SkillIconProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={ref}>
          {geometry === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
          {geometry === 'torus' && <torusGeometry args={[0.4, 0.15, 16, 32]} />}
          {geometry === 'octahedron' && <octahedronGeometry args={[0.5]} />}
          {geometry === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        </mesh>
        
        <Text
          position={[0, -1, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

export default function ThreeAbout() {
  const skills = [
    { geometry: 'sphere' as const, color: '#ff8a00', label: 'AI Web Dev', position: [-3, 1, 0] as [number, number, number] },
    { geometry: 'torus' as const, color: '#60a5fa', label: 'Database', position: [0, 1, 0] as [number, number, number] },
    { geometry: 'octahedron' as const, color: '#34d399', label: 'Mobile', position: [3, 1, 0] as [number, number, number] },
    { geometry: 'box' as const, color: '#f472b6', label: 'Cloud', position: [1.5, -1.5, 0] as [number, number, number] }
  ];

  return (
    <section id="about" style={{ padding: '64px 20px', background: 'transparent', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>About Me</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
            I'm Arnold Dsilva, a developer and engineering student at Sahyadri College of Engineering & Management, Mangalore, with hands-on experience in Quantum Computing paradigms, Kubernetes-based container orchestration, and AI-driven solution engineering. I'm a proficient Python and Java developer and a vibe coder at heart, focused on designing and implementing scalable, distributed systems, cloud-native web applications, and intelligent software architectures that leverage emerging technologies, automation, and performance-oriented design principles.
          </p>
        </div>
        
        <div style={{ width: '100%', height: '50vh' }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} color="#60a5fa" intensity={0.5} />
            
            {skills.map((skill, i) => (
              <SkillIcon key={i} {...skill} />
            ))}
          </Canvas>
        </div>
      </div>
    </section>
  );
}
