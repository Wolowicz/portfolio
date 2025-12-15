import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import * as THREE from 'three'
import Room from './Room'
import CameraRig from './CameraRig'
import Lights from './Lights'
import Effects from './Effects'

// Loading fallback with spinner
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#ffb87a" wireframe />
    </mesh>
  )
}

// Scene content wrapper
function SceneContent() {
  return (
    <>
      {/* Custom lighting */}
      <Lights />
      
      {/* Camera rig with smooth transitions */}
      <CameraRig />
      
      {/* Ambient effects - particles, orbs, rays */}
      <Effects />
      
      {/* Main room model */}
      <Suspense fallback={<Loader />}>
        <Room />
        
        {/* Soft environment lighting */}
        <Environment 
          preset="sunset" 
          background={false}
          environmentIntensity={0.5}
        />
        
        <Preload all />
      </Suspense>
      
      {/* Atmospheric fog */}
      <fog attach="fog" args={['#1a1018', 10, 25]} />
    </>
  )
}

interface SceneProps {
  className?: string
  style?: React.CSSProperties
}

export default function Scene({ className, style }: SceneProps) {
  return (
    <Canvas
      className={className}
      style={style}
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [0, 12, 20]
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      shadows="soft"
    >
      <color attach="background" args={['#0f0a0d']} />
      <SceneContent />
    </Canvas>
  )
}
