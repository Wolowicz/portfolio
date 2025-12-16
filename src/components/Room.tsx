import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'
import usePortfolioStore, { SECTION_CONTENT } from '../store/usePortfolioStore'
import useInteractionStore from '../store/useInteractionStore'

// Object name patterns for interactive elements
const INTERACTIVE_PATTERNS: Record<string, string[]> = {
  about: ['pillow', 'cushion', 'poduszk', 'bed', 'lozko'],
  skills: ['table', 'stolik', 'desk', 'biurko', 'lamp', 'lampa'],
  projects: ['shelf', 'polka', 'book', 'frame', 'ramka', 'obraz'],
  contact: ['plant', 'flower', 'roslina', 'doniczka', 'kwiat']
}

// Animated objects for intro (by name pattern)
const ANIMATED_OBJECTS = ['plant', 'flower', 'pillow', 'book', 'lamp', 'frame', 'cushion']

interface RoomProps {
  position?: [number, number, number]
  scale?: number
  enableShadows?: boolean
}

export default function Room({ 
  position = [0, 0, 0], 
  scale = 1,
  enableShadows = true
}: RoomProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/Room_1214203420_texture.glb')
  const { camera } = useThree()
  
  // Store state
  const hoveredObject = useInteractionStore((s) => s.hoveredObject)
  const focusedObject = useInteractionStore((s) => s.focusedObject)
  const setHoveredObject = useInteractionStore((s) => s.setHoveredObject)
  const focusOnObject = useInteractionStore((s) => s.focusOnObject)
  const introComplete = usePortfolioStore((s) => s.introComplete)
  const setIntroComplete = usePortfolioStore((s) => s.setIntroComplete)
  const isTransitioning = usePortfolioStore((s) => s.isTransitioning)
  
  // Track interactive meshes and their original properties
  const interactiveMeshes = useRef<Map<THREE.Mesh, { 
    category: string
    originalScale: THREE.Vector3
    originalEmissive: THREE.Color
    originalEmissiveIntensity: number
  }>>(new Map())
  
  // Categorize mesh by name
  const getMeshCategory = (name: string): string | null => {
    const lowerName = name.toLowerCase()
    for (const [category, patterns] of Object.entries(INTERACTIVE_PATTERNS)) {
      if (patterns.some(p => lowerName.includes(p))) {
        return category
      }
    }
    return null
  }
  
  // Check if mesh should animate on intro
  const shouldAnimate = (name: string): boolean => {
    const lowerName = name.toLowerCase()
    return ANIMATED_OBJECTS.some(p => lowerName.includes(p))
  }
  
  // Setup scene on mount
  useEffect(() => {
    if (!scene) return
    
    const meshesToAnimate: THREE.Object3D[] = []
    
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        
        // Enable shadows (only on capable devices)
        mesh.castShadow = !!enableShadows
        mesh.receiveShadow = !!enableShadows
        
        // Check if interactive
        const category = getMeshCategory(mesh.name)
        if (category) {
          // Store original properties
          const material = mesh.material as THREE.MeshStandardMaterial
          interactiveMeshes.current.set(mesh, {
            category,
            originalScale: mesh.scale.clone(),
            originalEmissive: material.emissive?.clone() || new THREE.Color(0),
            originalEmissiveIntensity: material.emissiveIntensity || 0
          })
        }
        
        // Collect meshes for intro animation
        if (shouldAnimate(mesh.name)) {
          meshesToAnimate.push(mesh)
          // Start at scale 0
          mesh.scale.set(0, 0, 0)
        }
      }
    })
    
    // Intro animation with GSAP
    if (meshesToAnimate.length > 0 && !introComplete) {
      // Stagger the animations
      meshesToAnimate.forEach((mesh, index) => {
        gsap.to(mesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.8,
          delay: 0.5 + index * 0.1, // Staggered delay
          ease: 'back.out(1.7)',
          onComplete: () => {
            if (index === meshesToAnimate.length - 1) {
              setIntroComplete(true)
            }
          }
        })
      })
    } else {
      // If no animation needed, mark intro as complete
      setIntroComplete(true)
    }
  }, [scene, introComplete, setIntroComplete])
  
  // Animate hover/focus effects (optimized for idle state)
  const idleAccumulator = useRef(0)
  useFrame((state, delta) => {
    // If nothing is hovered/focused, update less frequently to save CPU
    if (!hoveredObject && !focusedObject) {
      idleAccumulator.current += delta
      if (idleAccumulator.current < 1 / 15) return // ~15 fps for idle restores
      idleAccumulator.current = 0
    }

    interactiveMeshes.current.forEach((data, mesh) => {
      const material = mesh.material as THREE.MeshStandardMaterial
      if (!material.emissive) return
      
      const isHovered = hoveredObject === data.category
      const isFocused = focusedObject === data.category
      const contentColor = SECTION_CONTENT[data.category]?.color || '#ffb87a'
      
      // Target values
      let targetIntensity = data.originalEmissiveIntensity
      let targetColor = data.originalEmissive.clone()
      let targetScaleMultiplier = 1
      
      if (isFocused) {
        targetIntensity = 0.5
        targetColor = new THREE.Color(contentColor)
        targetScaleMultiplier = 1.02
      } else if (isHovered) {
        targetIntensity = 0.3
        targetColor = new THREE.Color(contentColor)
        targetScaleMultiplier = 1.015
      }
      
      // Smooth lerp for emissive
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity,
        targetIntensity,
        0.1
      )
      material.emissive.lerp(targetColor, 0.1)
      
      // Smooth scale
      const targetScale = data.originalScale.clone().multiplyScalar(targetScaleMultiplier)
      mesh.scale.lerp(targetScale, 0.1)
    })
  })
  
  // Pointer handlers (throttled to reduce raycast load on mobile)
  const lastPointerTime = useRef(0)
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isTransitioning || focusedObject) return
    const now = Date.now()
    if (now - lastPointerTime.current < 50) return // ~20 FPS throttle
    lastPointerTime.current = now

    e.stopPropagation()
    
    const intersections = e.intersections as THREE.Intersection[]
    if (intersections.length > 0) {
      const hitMesh = intersections[0].object as THREE.Mesh
      const data = interactiveMeshes.current.get(hitMesh)
      
      if (data) {
        setHoveredObject(data.category)
        document.body.style.cursor = 'pointer'
        return
      }
    }
    
    setHoveredObject(null)
    document.body.style.cursor = 'default'
  }
  
  const handlePointerOut = () => {
    setHoveredObject(null)
    document.body.style.cursor = 'default'
  }
  
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (isTransitioning) return
    e.stopPropagation()
    
    const intersections = e.intersections as THREE.Intersection[]
    if (intersections.length > 0) {
      const hitMesh = intersections[0].object as THREE.Mesh
      const data = interactiveMeshes.current.get(hitMesh)
      
      if (data) {
        const content = SECTION_CONTENT[data.category]
        focusOnObject(data.category, content)
      }
    }
  }
  
  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive
        object={scene}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
    </group>
  )
}

// Preload the model
useGLTF.preload('/Room_1214203420_texture.glb')
