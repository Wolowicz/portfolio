import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Define focus points for different sections
const FOCUS_POINTS = {
  hero: {
    camera: new THREE.Vector3(5, 3.5, 5),
    target: new THREE.Vector3(0, 0.8, 0)
  },
  about: {
    camera: new THREE.Vector3(2.5, 2, 3),
    target: new THREE.Vector3(-0.5, 0.8, -0.5)
  },
  skills: {
    camera: new THREE.Vector3(-2.5, 2, 3),
    target: new THREE.Vector3(0.5, 0.6, 0)
  },
  projects: {
    camera: new THREE.Vector3(1.5, 2.5, 4),
    target: new THREE.Vector3(0, 0.8, -0.5)
  },
  gallery: {
    camera: new THREE.Vector3(-2, 2, 2.5),
    target: new THREE.Vector3(-0.5, 1.2, -1)
  },
  contact: {
    camera: new THREE.Vector3(4, 3, 4.5),
    target: new THREE.Vector3(0, 0.5, 0)
  }
}

// Mocne zbliżenia na klikalne obiekty
const OBJECT_FOCUS = {
  frame: {
    camera: new THREE.Vector3(-1.1, 1.5, -1.2),
    target: new THREE.Vector3(-1.2, 1.5, -1.8),
    labelPosition: [-1.2, 1.5, -1.8]
  },
  desk: {
    camera: new THREE.Vector3(0.5, 1.2, 1.2),
    target: new THREE.Vector3(0.5, 0.9, 0.5),
    labelPosition: [0.5, 0.9, 0.5]
  },
  plant: {
    camera: new THREE.Vector3(-1.4, 0.7, 1.3),
    target: new THREE.Vector3(-1.5, 0.6, 0.8),
    labelPosition: [-1.5, 0.6, 0.8]
  },
  shelf: {
    camera: new THREE.Vector3(1.4, 1.3, -0.8),
    target: new THREE.Vector3(1.5, 1.2, -1.2),
    labelPosition: [1.5, 1.2, -1.2]
  },
  cushion: {
    camera: new THREE.Vector3(0.2, 0.6, 0.8),
    target: new THREE.Vector3(0, 0.4, 0),
    labelPosition: [0, 0.4, 0]
  },
  slippers: {
    camera: new THREE.Vector3(0.8, 0.3, 0.6),
    target: new THREE.Vector3(1, 0.1, 0),
    labelPosition: [1, 0.1, 0]
  }
}

function Room({ activeSection = 'hero', isDragging = false, rotation = 0, focusedObject = null, hotspots = [], onHotspotClick }) {
  const groupRef = useRef()
  const { scene } = useGLTF('/Room_1214203420_texture.glb')
  const { camera, raycaster, pointer, gl } = useThree()
  const [hoveredMesh, setHoveredMesh] = useState(null)
  const clickableObjects = useRef([])
  
  const targetCameraPos = useRef(new THREE.Vector3(5, 3.5, 5))
  const targetLookAt = useRef(new THREE.Vector3(0, 0.8, 0))
  const currentLookAt = useRef(new THREE.Vector3(0, 0.8, 0))

  // Przypisz hotspoty do regionów 3D na podstawie pozycji
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Wszystkie meshe są klikalne
        child.cursor = 'pointer'
        
        // Pobierz światową pozycję obiektu
        const worldPos = new THREE.Vector3()
        child.getWorldPosition(worldPos)
        
        // Znajdź najbliższy hotspot na podstawie pozycji
        let closestHotspot = null
        let minDistance = Infinity
        
        hotspots.forEach(hotspot => {
          if (OBJECT_FOCUS[hotspot.id]) {
            const targetPos = new THREE.Vector3(...OBJECT_FOCUS[hotspot.id].labelPosition)
            const distance = worldPos.distanceTo(targetPos)
            if (distance < minDistance && distance < 1.5) { // Promień 1.5 jednostek
              minDistance = distance
              closestHotspot = hotspot.id
            }
          }
        })
        
        if (closestHotspot) {
          child.userData.hotspotId = closestHotspot
          clickableObjects.current.push(child)
        }
      }
    })
  }, [scene, hotspots])

  // Update target positions based on active section or focused object
  useEffect(() => {
    if (focusedObject && OBJECT_FOCUS[focusedObject]) {
      // Zoom to object
      const focus = OBJECT_FOCUS[focusedObject]
      targetCameraPos.current.copy(focus.camera)
      targetLookAt.current.copy(focus.target)
    } else {
      // Use section focus
      const focusPoint = FOCUS_POINTS[activeSection] || FOCUS_POINTS.hero
      targetCameraPos.current.copy(focusPoint.camera)
      targetLookAt.current.copy(focusPoint.target)
    }
  }, [activeSection, focusedObject])

  useFrame(() => {
    if (!groupRef.current) return

    // Apply user rotation to the room - slower, more relaxing
    const rotationLerp = isDragging ? 0.08 : 0.03
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotation,
      rotationLerp
    )

    // Smooth camera movement - relaxing pace
    const lerpFactor = focusedObject ? 0.025 : (isDragging ? 0.015 : 0.02)
    camera.position.lerp(targetCameraPos.current, lerpFactor)
    
    // Smooth look-at
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor)
    camera.lookAt(currentLookAt.current)
  })

  // Enable shadows and interactivity
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  // Handle clicks on model
  const handleClick = (event) => {
    event.stopPropagation()
    
    const intersects = event.intersections
    if (intersects.length > 0) {
      const clicked = intersects[0].object
      const hotspotId = clicked.userData.hotspotId
      
      if (hotspotId && onHotspotClick) {
        const hotspot = hotspots.find(h => h.id === hotspotId)
        if (hotspot) {
          onHotspotClick(hotspot)
        }
      }
    }
  }

  const handlePointerMove = (event) => {
    const intersects = event.intersections
    if (intersects.length > 0) {
      const hovered = intersects[0].object
      if (hovered.userData.hotspotId) {
        setHoveredMesh(hovered)
        document.body.style.cursor = 'pointer'
        return
      }
    }
    setHoveredMesh(null)
    document.body.style.cursor = isDragging ? 'grabbing' : 'grab'
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive 
        object={scene} 
        scale={1} 
        onClick={handleClick}
        onPointerMove={handlePointerMove}
      />
      
      {/* Html labels przy obiektach gdy są zbliżone */}
      {focusedObject && OBJECT_FOCUS[focusedObject] && (
        <Html position={OBJECT_FOCUS[focusedObject].labelPosition} center>
          <div style={{
            background: 'rgba(20, 15, 25, 0.95)',
            color: '#ff6b9d',
            padding: '1.5rem 2rem',
            borderRadius: '16px',
            border: '2px solid rgba(255, 107, 157, 0.5)',
            boxShadow: '0 10px 40px rgba(255, 107, 157, 0.3)',
            minWidth: '250px',
            maxWidth: '350px',
            backdropFilter: 'blur(10px)',
            animation: 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            {hotspots.find(h => h.id === focusedObject) && (
              <>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {hotspots.find(h => h.id === focusedObject).icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#ffa07a'
                }}>
                  {hotspots.find(h => h.id === focusedObject).title}
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  lineHeight: '1.6',
                  color: '#e8d4c8'
                }}>
                  {hotspots.find(h => h.id === focusedObject).content}
                </p>
              </>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

// Preload the model
useGLTF.preload('/Room_1214203420_texture.glb')

export default Room
