import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'
import usePortfolioStore from '../store/usePortfolioStore'

interface RoomProps {
  position?: [number, number, number]
  scale?: number
}

export default function Room({ 
  position = [0, 0, 0], 
  scale = 1 
}: RoomProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/Room_1214203420_texture.glb')
  
  const introComplete = usePortfolioStore((s) => s.introComplete)
  const currentSection = usePortfolioStore((s) => s.currentSection)
  
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
    
    // Intro animation - scale the whole room
    if (groupRef.current && !introComplete) {
      groupRef.current.scale.set(0, 0, 0)
      
      gsap.to(groupRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 1.5,
        delay: 0.3,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }, [scene, introComplete, scale])
  
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
  
  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/Room_1214203420_texture.glb')
