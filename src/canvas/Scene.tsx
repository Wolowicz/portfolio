import React, { Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import * as THREE from 'three'
const Room = lazy(() => import('./Room'))
import CameraRig from './CameraRig'
import Lights from './Lights'
const Effects = lazy(() => import('./Effects'))
import usePerformance from '../utils/usePerformance'

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
function SceneContent({ perf }: { perf: { lowPower: boolean } }) {
  return (
    <>
      {/* Custom lighting */}
      <Lights lowPerformance={perf.lowPower} />
      
      {/* Camera rig with smooth transitions */}
      <CameraRig />
      
      {/* Ambient effects - particles, orbs, rays */}
      <Suspense fallback={null}>
        <Effects mode={perf.lowPower ? 'low' : 'high'} />
      </Suspense>
      
      {/* Main room model */}
      <Suspense fallback={<Loader />}>
        {/* Shift room slightly to the right and up to avoid overlapping centered panel */}
        <Room position={[3, 3, 0]} enableShadows={!perf.lowPower} />
        
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
  const perf = usePerformance()
  const enableShadows = !perf.lowPower

  return (
    <Canvas
      className={className}
      style={style}
      dpr={perf.dpr}
      camera={{
        fov: 50,
        near: 0.1,
        far: 100,
        position: [0, 2, 12]
      }}
      gl={{
        antialias: !perf.lowPower,
        alpha: false,
        powerPreference: perf.lowPower ? 'low-power' : 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      shadows={enableShadows ? 'soft' : false}
    >
      <color attach="background" args={['#0f0a0d']} />
      <SceneContent perf={perf} />
    </Canvas>
  )
}
