import React, { useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function HotspotMarker({ hotspot, onClick, isActive, roomRotation }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  // Animate the marker
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Floating animation
    const t = state.clock.elapsedTime
    meshRef.current.position.y = hotspot.position[1] + Math.sin(t * 2 + hotspot.position[0]) * 0.05
    
    // Pulse when hovered or active
    const scale = isActive ? 1.3 : hovered ? 1.15 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    
    // Apply room rotation to keep markers in sync
    meshRef.current.parent.rotation.y = roomRotation
  })

  // Calculate rotated position
  const rotatedX = hotspot.position[0] * Math.cos(roomRotation) - hotspot.position[2] * Math.sin(roomRotation)
  const rotatedZ = hotspot.position[0] * Math.sin(roomRotation) + hotspot.position[2] * Math.cos(roomRotation)

  return (
    <group position={[hotspot.position[0], hotspot.position[1], hotspot.position[2]]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'grab'
        }}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? '#ff9a56' : hovered ? '#ffb87a' : '#ffc864'}
          emissive={isActive ? '#ff6b35' : '#ffa500'}
          emissiveIntensity={isActive ? 0.8 : hovered ? 0.5 : 0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.15, 32]} />
        <meshBasicMaterial 
          color="#ffc864" 
          transparent 
          opacity={hovered || isActive ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Label on hover */}
      {(hovered || isActive) && (
        <Html
          position={[0, 0.25, 0]}
          center
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          <div style={{
            background: 'rgba(255, 250, 245, 0.95)',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#5a4a42',
            boxShadow: '0 4px 15px rgba(255, 180, 120, 0.3)',
            border: '1px solid rgba(255, 200, 150, 0.5)',
            animation: 'fadeIn 0.3s ease'
          }}>
            {hotspot.icon} {hotspot.title}
          </div>
        </Html>
      )}
    </group>
  )
}

export default HotspotMarker
