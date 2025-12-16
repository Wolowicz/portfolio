import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import usePortfolioStore from '../store/usePortfolioStore'

// Floating particles for ambient effect
export function FloatingParticles({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const currentSection = usePortfolioStore((s) => s.currentSection)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const speeds = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // Spread particles around the room
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = Math.random() * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      scales[i] = Math.random() * 0.5 + 0.5
      speeds[i] = Math.random() * 0.5 + 0.2
    }
    
    return { positions, scales, speeds }
  }, [count])
  
  // Throttle updates a bit to reduce CPU on lower-power devices
  const accumulator = useRef(0)
  useFrame((state, delta) => {
    if (!meshRef.current) return
    accumulator.current += delta
    if (accumulator.current < 1 / 30) return // update ~30fps
    accumulator.current = 0

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Gentle floating motion
      positions[i3 + 1] += Math.sin(time * particles.speeds[i] + i) * 0.002
      
      // Reset if too high
      if (positions[i3 + 1] > 8) {
        positions[i3 + 1] = 0
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true
    
    // Rotate slowly
    meshRef.current.rotation.y = time * 0.02
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={currentSection.color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Animated glowing orbs that float around
export function GlowingOrbs({ count = 5 }) {
  const groupRef = useRef<THREE.Group>(null)
  const currentSection = usePortfolioStore((s) => s.currentSection)
  
  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        Math.random() * 4 + 1,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      scale: Math.random() * 0.15 + 0.05,
      speed: Math.random() * 0.5 + 0.3,
      offset: Math.random() * Math.PI * 2
    }))
  }, [count])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i]
      child.position.y = orb.position[1] + Math.sin(time * orb.speed + orb.offset) * 0.5
      child.position.x = orb.position[0] + Math.cos(time * orb.speed * 0.5 + orb.offset) * 0.3
    })
  })
  
  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={currentSection.color}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

// Animated light rays
export function LightRays() {
  const groupRef = useRef<THREE.Group>(null)
  const currentSection = usePortfolioStore((s) => s.currentSection)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime
    
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh
      const material = mesh.material as THREE.MeshBasicMaterial
      material.opacity = 0.03 + Math.sin(time * 0.5 + i) * 0.02
    })
  })
  
  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[-2 + i * 2, 4, 0]}
          rotation={[0, 0, Math.PI * 0.1 * (i - 1)]}
        >
          <planeGeometry args={[0.5, 10]} />
          <meshBasicMaterial
            color={currentSection.color}
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Effects({ mode = 'high' }: { mode?: 'high' | 'low' | 'off' }) {
  if (mode === 'off') return null

  const particleCount = mode === 'low' ? 40 : 150
  const orbCount = mode === 'low' ? 3 : 8

  return (
    <>
      <FloatingParticles count={particleCount} />
      <GlowingOrbs count={orbCount} />
      {mode === 'low' ? null : <LightRays />}
    </>
  )
}
