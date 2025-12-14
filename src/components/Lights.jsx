import React from 'react'

// Warm, pastel sunset lighting setup
// Creates cozy, inviting atmosphere with yellow/orange tones
function Lights() {
  return (
    <>
      {/* Soft ambient fill - warm undertone */}
      <ambientLight intensity={0.4} color="#4a3535" />
      
      {/* Primary sun light - warm golden hour */}
      <directionalLight
        position={[8, 8, 6]}
        intensity={2.0}
        color="#ffb347"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
      />
      
      {/* Secondary fill - soft pink warmth */}
      <directionalLight
        position={[-6, 5, -4]}
        intensity={0.6}
        color="#ffb6c1"
      />
      
      {/* Accent rim light - subtle peach */}
      <directionalLight
        position={[-7, 3, 6]}
        intensity={0.4}
        color="#ffd1a4"
      />
      
      {/* Interior point light - cozy lamp glow */}
      <pointLight 
        position={[-0.5, 1.5, 0.2]} 
        intensity={1.5} 
        color="#ffe4b5" 
        distance={6}
        decay={2}
      />
      
      {/* Secondary room ambiance */}
      <pointLight 
        position={[1.2, 0.8, 0.8]} 
        intensity={0.8} 
        color="#ffa07a" 
        distance={4}
        decay={2}
      />
      
      {/* Hemisphere - warm sky, soft ground */}
      <hemisphereLight
        color="#ffe8d6"
        groundColor="#8b7355"
        intensity={0.5}
      />
    </>
  )
}

export default Lights
