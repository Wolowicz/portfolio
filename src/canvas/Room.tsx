import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'
import usePortfolioStore from '../store/usePortfolioStore'

interface RoomProps {
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
}

export default function Room({ 
  position = [0, 0, 0], 
  scale = 2.8,
  rotation = [0, Math.PI * 2.2, 0] // 180 degrees
}: RoomProps) {
  const groupRef = useRef<THREE.Group>(null)
  const hasAnimated = useRef(false)
  const { scene } = useGLTF('/room.glb')
  
  const introComplete = usePortfolioStore((s) => s.introComplete)
  const currentSection = usePortfolioStore((s) => s.currentSection)
  const isHeroSection = currentSection.id === 'hero'
  
  // Setup scene on mount - enable shadows
  useEffect(() => {
    if (!scene) return
    
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
  }, [scene])
  
  // Intro animation when room becomes visible (not on hero)
  useEffect(() => {
    if (!groupRef.current || isHeroSection || hasAnimated.current) return
    
    // Animate room entrance
    hasAnimated.current = true
    groupRef.current.scale.set(0, 0, 0)
    
    gsap.to(groupRef.current.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 1.8,
      delay: 0.5,
      ease: 'elastic.out(1, 0.5)'
    })
  }, [isHeroSection, scale])
  
  // Subtle floating animation
  useFrame((state) => {
    if (!groupRef.current || !introComplete) return
    
    // Gentle bobbing
    const time = state.clock.getElapsedTime()
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.02
    
    // Very subtle breathing scale
    const breathe = 1 + Math.sin(time * 0.3) * 0.005
    groupRef.current.scale.setScalar(scale * breathe)
  })
  
  // Don't render room on hero section
  if (isHeroSection) {
    return null
  }
  
  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/room.glb')
