import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useInteractionStore from '../store/useInteractionStore'

// Hover effect shader for emissive glow
const glowMaterial = {
  emissiveIntensity: {
    idle: 0.0,
    hovered: 0.25,
    active: 0.4
  },
  emissiveColor: new THREE.Color('#ffb87a')
}

function InteractiveObject({ 
  children, 
  objectId, 
  contentData,
  position = [0, 0, 0],
  hoverScale = 1.02,
  glowColor = '#ffb87a',
  onHover,
  onClick
}) {
  const groupRef = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [materials, setMaterials] = useState([])
  
  const focusedObject = useInteractionStore(state => state.focusedObject)
  const setHoveredObject = useInteractionStore(state => state.setHoveredObject)
  const focusOnObject = useInteractionStore(state => state.focusOnObject)
  const isTransitioning = useInteractionStore(state => state.isTransitioning)
  
  const isActive = focusedObject === objectId
  
  // Collect materials from children for hover effects
  useEffect(() => {
    if (!groupRef.current) return
    
    const mats = []
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        // Store original material properties
        const mat = child.material
        if (!mat.userData.originalEmissive) {
          mat.userData.originalEmissive = mat.emissive ? mat.emissive.clone() : new THREE.Color(0x000000)
          mat.userData.originalEmissiveIntensity = mat.emissiveIntensity || 0
        }
        mats.push(mat)
      }
    })
    setMaterials(mats)
  }, [children])
  
  // Animation frame for smooth effects
  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Smooth scale animation
    const targetScale = isHovered || isActive ? hoverScale : 1.0
    const currentScale = groupRef.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1)
    groupRef.current.scale.setScalar(newScale)
    
    // Subtle floating animation when hovered
    if (isHovered && !isActive) {
      const floatOffset = Math.sin(state.clock.elapsedTime * 2) * 0.01
      groupRef.current.position.y = position[1] + floatOffset
    } else {
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        position[1],
        0.1
      )
    }
    
    // Emissive glow animation
    materials.forEach(mat => {
      if (!mat.emissive) return
      
      let targetIntensity = glowMaterial.emissiveIntensity.idle
      if (isActive) {
        targetIntensity = glowMaterial.emissiveIntensity.active
      } else if (isHovered) {
        targetIntensity = glowMaterial.emissiveIntensity.hovered
      }
      
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        targetIntensity,
        0.1
      )
      
      // Blend emissive color
      if (isHovered || isActive) {
        mat.emissive.lerp(new THREE.Color(glowColor), 0.1)
      } else {
        mat.emissive.lerp(mat.userData.originalEmissive, 0.05)
      }
    })
  })
  
  const handlePointerOver = (e) => {
    if (isTransitioning) return
    e.stopPropagation()
    setIsHovered(true)
    setHoveredObject(objectId)
    document.body.style.cursor = 'pointer'
    onHover?.(objectId, true)
  }
  
  const handlePointerOut = (e) => {
    e.stopPropagation()
    setIsHovered(false)
    setHoveredObject(null)
    document.body.style.cursor = 'default'
    onHover?.(objectId, false)
  }
  
  const handleClick = (e) => {
    if (isTransitioning) return
    e.stopPropagation()
    focusOnObject(objectId, contentData)
    onClick?.(objectId)
  }
  
  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {children}
    </group>
  )
}

export default InteractiveObject
