import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

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
