import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import useInteractionStore from '../store/useInteractionStore'
import usePerformance from '../utils/usePerformance'

// Content for each interactive object
const CONTENT_DATA = {
  pillows: {
    id: 'pillows',
    title: 'About Me',
    subtitle: 'Get to know me',
    description: 'I am a creative developer and technical artist passionate about crafting immersive digital experiences. My journey combines artistic vision with technical expertise.',
    details: [
      'Environment artist with focus on stylized 3D',
      'Game jam veteran with 5+ completed projects',
      'Always learning, always growing'
    ],
    icon: '✨',
    color: '#ff9a8b'
  },
  plant: {
    id: 'plant',
    title: 'Artistic Vision',
    subtitle: 'What drives my creativity',
    description: 'Like this plant, my creative practice is rooted in continuous growth. I draw inspiration from nature, architecture, and the interplay of light and shadow.',
    details: [
      'Nature-inspired color palettes',
      'Focus on atmosphere and mood',
      'Sustainable, thoughtful design approach'
    ],
    icon: '🌿',
    color: '#7ed6a5'
  },
  slippers: {
    id: 'slippers',
    title: 'My Workflow',
    subtitle: 'Creative process',
    description: 'Comfortable yet productive. My workflow balances focused deep work with playful experimentation.',
    details: [
      'Iterative prototyping approach',
      'Balance between planning and spontaneity',
      'Collaboration-friendly process'
    ],
    icon: '🎨',
    color: '#a8d8ea'
  },
  table: {
    id: 'table',
    title: 'Skills & Tools',
    subtitle: 'Technical expertise',
    description: 'A curated collection of skills honed through countless projects and continuous learning.',
    details: [
      'Three.js / React Three Fiber',
      'Blender / Cinema 4D',
      'Unity / Unreal Engine',
      'GLSL Shaders',
      'UI/UX Design'
    ],
    icon: '⚡',
    color: '#ffd93d'
  },
  shelf: {
    id: 'shelf',
    title: 'Projects',
    subtitle: 'Work and growth',
    description: 'Each project is a chapter in my ongoing story of learning and creation.',
    details: [
      'Cyberiada 2x participant',
      'Game jam organizer & mentor',
      'Open source contributor'
    ],
    icon: '📚',
    color: '#c9b1ff'
  }
}

// Keywords to identify interactive objects
const OBJECT_KEYWORDS = {
  pillows: ['pillow', 'cushion', 'poduszk'],
  plant: ['plant', 'flower', 'kwiat', 'roslina', 'doniczka', 'pot'],
  slippers: ['slipper', 'kapcie', 'shoe', 'but', 'klapki'],
  table: ['table', 'stolik', 'nightstand', 'szafka', 'desk'],
  shelf: ['shelf', 'polka', 'book', 'ksiazk', 'frame', 'ramka', 'obraz']
}

function Room() {
  const groupRef = useRef()
  const { scene } = useGLTF('/Room_1214203420_texture.glb')
  const { camera } = useThree()
  
  const [hoveredObject, setHoveredObject] = useState(null)
  const [interactiveMeshes, setInteractiveMeshes] = useState([])
  
  const focusedObject = useInteractionStore(state => state.focusedObject)
  const focusOnObject = useInteractionStore(state => state.focusOnObject)
  const isTransitioning = useInteractionStore(state => state.isTransitioning)
  
  // Original materials storage
  const originalMaterials = useRef(new Map())
  
  // Identify interactive meshes on load
  useEffect(() => {
    const interactive = []
    const perf = usePerformance()
    
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = !perf.lowPower
        child.receiveShadow = !perf.lowPower
        
        const name = child.name.toLowerCase()
        
        // Check if mesh matches any interactive category
        for (const [category, keywords] of Object.entries(OBJECT_KEYWORDS)) {
          if (keywords.some(kw => name.includes(kw))) {
            child.userData.category = category
            interactive.push(child)
            
            // Store original material
            if (child.material) {
              originalMaterials.current.set(child.uuid, {
                emissive: child.material.emissive?.clone() || new THREE.Color(0),
                emissiveIntensity: child.material.emissiveIntensity || 0
              })
            }
            break
          }
        }
      }
    })
    
    setInteractiveMeshes(interactive)
  }, [scene])
  
  // Animate hover effects
  useFrame(() => {
    interactiveMeshes.forEach((mesh) => {
      if (!mesh.material || !mesh.material.emissive) return
      
      const original = originalMaterials.current.get(mesh.uuid)
      if (!original) return
      
      const category = mesh.userData.category
      const isHovered = hoveredObject === category
      const isFocused = focusedObject === category
      const contentColor = CONTENT_DATA[category]?.color || '#ffb87a'
      
      let targetIntensity = 0
      let targetColor = original.emissive.clone()
      
      if (isFocused) {
        targetIntensity = 0.4
        targetColor = new THREE.Color(contentColor)
      } else if (isHovered) {
        targetIntensity = 0.25
        targetColor = new THREE.Color(contentColor)
      }
      
      // Smooth lerp
      mesh.material.emissiveIntensity = THREE.MathUtils.lerp(
        mesh.material.emissiveIntensity,
        targetIntensity,
        0.1
      )
      mesh.material.emissive.lerp(targetColor, 0.1)
    })
  })
  
  const handlePointerMove = (e) => {
    if (isTransitioning || focusedObject) return
    e.stopPropagation()
    
    const hit = e.intersections[0]
    if (hit) {
      const category = hit.object.userData.category
      if (category) {
        setHoveredObject(category)
        document.body.style.cursor = 'pointer'
        return
      }
    }
    setHoveredObject(null)
    document.body.style.cursor = 'grab'
  }
  
  const handlePointerOut = () => {
    setHoveredObject(null)
    document.body.style.cursor = 'grab'
  }
  
  const handleClick = (e) => {
    if (isTransitioning) return
    e.stopPropagation()
    
    const hit = e.intersections[0]
    if (hit) {
      const category = hit.object.userData.category
      if (category && CONTENT_DATA[category]) {
        focusOnObject(category, CONTENT_DATA[category])
      }
    }
  }
  
  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={1}
        position={[0, 0, 0]}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
      
      {/* Hover tooltip */}
      {hoveredObject && !focusedObject && CONTENT_DATA[hoveredObject] && (
        <Html
          position={[0, 1.5, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(30, 20, 25, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '10px 18px',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            border: `2px solid ${CONTENT_DATA[hoveredObject].color}`,
            whiteSpace: 'nowrap',
            animation: 'fadeIn 0.2s ease'
          }}>
            {CONTENT_DATA[hoveredObject].icon} {CONTENT_DATA[hoveredObject].title}
          </div>
        </Html>
      )}
    </group>
  )
}

useGLTF.preload('/Room_1214203420_texture.glb')

export default Room
