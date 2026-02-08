import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Loader } from './Loader';
import * as THREE from 'three';

function Particles() {
  const count = 100;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const particles = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ],
    speed: Math.random() * 0.5 + 0.2
  }));

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    particles.forEach((particle, i) => {
      const matrix = new THREE.Matrix4();
      matrix.setPosition(
        particle.position[0] + Math.sin(time * particle.speed) * 0.5,
        particle.position[1] + Math.cos(time * particle.speed) * 0.5,
        particle.position[2]
      );
      mesh.current!.setMatrixAt(i, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#ff8a00" />
    </instancedMesh>
  );
}

function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ff8a00"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedBox() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3;
      ref.current.rotation.y += delta * 0.5;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={ref} position={[3, 1, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function ThreeHero() {
  return (
    <div style={{ width: '100%', height: '90vh', position: 'relative', background: 'transparent' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '3rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '0 2rem'
      }}>
        <div style={{
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff8a00, #ff3d00)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(255, 138, 0, 0.4)',
          border: '4px solid rgba(255,255,255,0.1)',
          overflow: 'hidden'
        }}>
          <img 
            src="/profile.jpeg" 
            alt="Arnold Dsilva"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div style="font-size: 5rem">👨‍💻</div>';
            }}
          />
        </div>
        
        <div style={{ textAlign: 'left', maxWidth: '500px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', margin: '0 0 1rem 0', fontWeight: 700 }}>
            Hi, I'm Arnold 👋
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
            Frontend Developer — React, TypeScript & Three.js
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a className="btn primary" href="#about">View Work</a>
            <a className="btn outline" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}
