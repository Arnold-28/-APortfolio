import { Html, useProgress } from '@react-three/drei';

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '0.5rem' }}>Loading 3D Scene</div>
        <div style={{ fontSize: '1rem', color: '#ff8a00' }}>
          {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
}
