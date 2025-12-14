import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import Room from '../components/RoomInteractive'
import Lights from '../components/Lights'
import useInteractionStore from '../store/useInteractionStore'
import * as THREE from 'three'

// Dimming overlay when focused on object
function FocusOverlay() {
  const focusedObject = useInteractionStore(state => state.focusedObject)
  const meshRef = useRef()
  
  useFrame(() => {
    if (!meshRef.current) return
    const targetOpacity = focusedObject ? 0.3 : 0
    meshRef.current.material.opacity = THREE.MathUtils.lerp(
      meshRef.current.material.opacity,
      targetOpacity,
      0.08
    )
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, 10]} renderOrder={-1}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial 
        color="#0a0508"
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  )
}

function SceneContent() {
  const focusedObject = useInteractionStore(state => state.focusedObject)
  
  return (
    <>
      {/* Warm sunset background */}
      <color attach="background" args={['#1a1018']} />
      <fog attach="fog" args={['#1a1018', 8, 20]} />
      
      {/* Lighting */}
      <Lights />
      
      {/* Main room */}
      <Suspense fallback={null}>
        <Room />
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
        <Environment preset="sunset" background={false} />
      </Suspense>
      
      <FocusOverlay />
      
      {/* Camera controls - limited rotation */}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.5}
        minAzimuthAngle={-Math.PI * 0.4}
        maxAzimuthAngle={Math.PI * 0.4}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        enabled={!focusedObject}
      />
    </>
  )
}

function Scene() {
  return (
    <Canvas
      className="canvas-3d"
      camera={{
        position: [4, 3, 4],
        fov: 45,
        near: 0.1,
        far: 100
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0
      }}
      shadows
      dpr={[1, 2]}
    >
      <SceneContent />
    </Canvas>
  )
}

export default Scene
