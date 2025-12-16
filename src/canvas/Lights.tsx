import React from 'react'
import * as THREE from 'three'

interface LightsProps {
  ambientIntensity?: number
  mainIntensity?: number
  lowPerformance?: boolean
}

export default function Lights({ 
  ambientIntensity = 0.4, 
  mainIntensity = 1.2,
  lowPerformance = false
}: LightsProps) {
  const shadowMapSize = lowPerformance ? 512 : 2048
  const effectiveAmbient = lowPerformance ? ambientIntensity * 0.9 : ambientIntensity
  const effectiveMain = lowPerformance ? mainIntensity * 0.9 : mainIntensity

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={effectiveAmbient} color="#ffeedd" />
      
      {/* Main directional light (sunlight) */}
      <directionalLight
        position={[5, 8, 4]}
        intensity={effectiveMain}
        color="#fff5e6"
        castShadow={!lowPerformance}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light from opposite side */}
      <directionalLight
        position={[-3, 4, -2]}
        intensity={effectiveMain * 0.3}
        color="#aaccff"
      />
      
      {/* Rim light for depth */}
      <directionalLight
        position={[0, 5, -5]}
        intensity={effectiveMain * 0.2}
        color="#ffddcc"
      />
      
      {/* Point light for cozy indoor feeling */}
      <pointLight
        position={[0, 2, 0]}
        intensity={0.5}
        color="#ffb87a"
        distance={8}
        decay={2}
      />
    </>
  )
}
