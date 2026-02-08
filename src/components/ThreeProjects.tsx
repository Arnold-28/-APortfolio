import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Project {
  title: string;
  tech: string;
  description: string;
  requirements: string[];
  howBuilt: string[];
  github: string;
}

interface ProjectCardProps {
  position: [number, number, number];
  project: Project;
  index: number;
  onClick: () => void;
}

function ProjectCard3D({ position, project, index, onClick }: ProjectCardProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <RoundedBox
          ref={ref}
          args={[2, 2.5, 0.2]}
          radius={0.1}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
          scale={hovered ? 1.1 : 1}
        >
          <meshStandardMaterial
            color={hovered ? '#ff8a00' : '#1f2937'}
            metalness={0.5}
            roughness={0.3}
          />
        </RoundedBox>
        
        <Text
          position={[0, 0.5, 0.15]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {project.title}
        </Text>
        
        <Text
          position={[0, -0.5, 0.15]}
          fontSize={0.15}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {project.tech}
        </Text>
      </group>
    </Float>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.9)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '700px',
        maxHeight: '80vh',
        overflow: 'auto',
        border: '2px solid rgba(255,138,0,0.3)'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '2rem', margin: 0, color: '#ff8a00' }}>{project.title}</h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1
          }}>×</button>
        </div>
        
        <p style={{ color: '#60a5fa', marginBottom: '1.5rem', fontSize: '1.1rem' }}>{project.tech}</p>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{project.description}</p>
        
        <h3 style={{ color: '#ff8a00', marginBottom: '0.5rem' }}>Requirements</h3>
        <ul style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
          {project.requirements.map((req, i) => <li key={i}>{req}</li>)}
        </ul>
        
        <h3 style={{ color: '#ff8a00', marginBottom: '0.5rem' }}>How I Built It</h3>
        <ul style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
          {project.howBuilt.map((step, i) => <li key={i}>{step}</li>)}
        </ul>
        
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn primary" style={{
          display: 'inline-block',
          textDecoration: 'none'
        }}>
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

export default function ThreeProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projects: Project[] = [
    {
      title: 'Quantum Computing Simulator',
      tech: 'Python, Qiskit, NumPy',
      description: 'A quantum circuit simulator that converts classical computing algorithms to quantum machine language for electrocardiogram (ECG) signal processing and analysis.',
      requirements: [
        'Convert classical ECG processing algorithms to quantum circuits',
        'Implement quantum gates for signal transformation',
        'Process ECG data using quantum superposition',
        'Translate classical code to quantum machine language',
        'Optimize quantum circuits for medical data analysis'
      ],
      howBuilt: [
        'Built classical-to-quantum code translator using Python',
        'Implemented Qiskit for quantum circuit generation',
        'Created quantum algorithms for ECG signal processing',
        'Used NumPy for classical data preprocessing',
        'Developed quantum state encoding for medical signals',
        'Integrated quantum machine language compiler',
        'Tested with real ECG datasets for accuracy'
      ],
      github: 'https://github.com/yourusername/quantum-ecg-simulator'
    },
    {
      title: 'Kubernetes Dashboard',
      tech: 'React, K8s API, TypeScript',
      description: 'Real-time monitoring dashboard for Kubernetes clusters with pod management, resource tracking, and deployment automation.',
      requirements: [
        'Display cluster health and resource usage',
        'Manage pods, deployments, and services',
        'Real-time log streaming',
        'RBAC integration for security'
      ],
      howBuilt: [
        'Built React frontend with TypeScript',
        'Integrated Kubernetes client-go API',
        'Implemented WebSocket for real-time updates',
        'Used Chart.js for metrics visualization',
        'Deployed with Helm charts'
      ],
      github: 'https://github.com/yourusername/k8s-dashboard'
    },
    {
      title: 'Cloud-Native React App',
      tech: 'Docker, AWS, Node.js',
      description: 'Microservices-based application deployed on AWS with auto-scaling, load balancing, and CI/CD pipeline.',
      requirements: [
        'Containerized microservices architecture',
        'Auto-scaling based on traffic',
        'High availability and fault tolerance',
        'Automated deployment pipeline'
      ],
      howBuilt: [
        'Dockerized Node.js services',
        'Deployed on AWS ECS with Fargate',
        'Set up Application Load Balancer',
        'Configured CloudWatch for monitoring',
        'Implemented CI/CD with GitHub Actions'
      ],
      github: 'https://github.com/yourusername/cloud-native-app'
    }
  ];

  return (
    <section id="projects" style={{ padding: '64px 20px', background: 'transparent', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Projects</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>Interactive 3D showcase of my work</p>
        </div>
        
        <div style={{ width: '100%', height: '60vh' }}>
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} color="#60a5fa" intensity={0.5} />
            
            {projects.map((project, i) => (
              <ProjectCard3D
                key={i}
                position={[
                  (i % 3) * 4 - 4,
                  0,
                  0
                ]}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </Canvas>
        </div>
        
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </section>
  );
}
