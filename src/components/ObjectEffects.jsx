import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useInteractionStore from '../store/useInteractionStore'

// Visual feedback ring that appears around focused objects
function FocusRing({ position, color = '#ffa07a', radius = 0.5 }) {
  const ringRef = useRef()
  const focusedObject = useInteractionStore(state => state.focusedObject)
  
  useFrame((state) => {
    if (!ringRef.current) return
    
    // Animate ring rotation and pulse
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.5
    
    const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
    ringRef.current.scale.setScalar(pulse)
  })
  
  if (!focusedObject) return null
  
  return (
    <group position={position}>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 0.9, radius, 32]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Ambient particles that float around hovered objects
function HoverParticles({ active, position, color = '#ffb87a' }) {
  const groupRef = useRef()
  const particles = useRef([])
  
  // Initialize particle positions
  if (particles.current.length === 0) {
    for (let i = 0; i < 8; i++) {
      particles.current.push({
        angle: (i / 8) * Math.PI * 2,
        radius: 0.3 + Math.random() * 0.2,
        speed: 0.5 + Math.random() * 0.5,
        yOffset: Math.random() * 0.3
      })
    }
  }
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    // Fade visibility
    const targetOpacity = active ? 1 : 0
    groupRef.current.visible = active
    
    // Animate particles
    groupRef.current.children.forEach((child, i) => {
      const p = particles.current[i]
      if (!p) return
      
      const time = state.clock.elapsedTime * p.speed
      child.position.x = Math.cos(time + p.angle) * p.radius
      child.position.z = Math.sin(time + p.angle) * p.radius
      child.position.y = p.yOffset + Math.sin(time * 2) * 0.05
    })
  })
  
  return (
    <group ref={groupRef} position={position} visible={active}>
      {particles.current.map((_, i) => (
        <mesh key={i} scale={0.02}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial 
            color={color}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

export { FocusRing, HoverParticles }
