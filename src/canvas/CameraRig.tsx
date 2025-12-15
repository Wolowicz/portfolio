import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'
import usePortfolioStore from '../store/usePortfolioStore'

export default function CameraRig() {
  const { camera } = useThree()
  const targetRef = useRef(new THREE.Vector3(0, 0, 0))
  const isAnimating = useRef(false)
  
  const currentSection = usePortfolioStore((s) => s.currentSection)
  const introComplete = usePortfolioStore((s) => s.introComplete)
  const setIntroComplete = usePortfolioStore((s) => s.setIntroComplete)
  const mousePosition = usePortfolioStore((s) => s.mousePosition)
  
  // Intro animation - epic camera entrance
  useEffect(() => {
    if (introComplete) return
    
    // Start from dramatic position for hero (no room visible)r
    camera.position.set(0, 8, 15)
    camera.lookAt(0, 0, 0)
    
    const tl = gsap.timeline({
      onComplete: () => setIntroComplete(true)
    })
    
    // Dramatic swoop in
    tl.to(camera.position, {
      x: currentSection.cameraPosition.position.x,
      y: currentSection.cameraPosition.position.y,
      z: currentSection.cameraPosition.position.z,
      duration: 3,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.lookAt(targetRef.current)
      }
    })
    
    tl.to(targetRef.current, {
      x: currentSection.cameraPosition.target.x,
      y: currentSection.cameraPosition.target.y,
      z: currentSection.cameraPosition.target.z,
      duration: 3,
      ease: 'power3.inOut'
    }, '<')
    
    return () => {
      tl.kill()
    }
  }, [])
  
  // Section change animation
  useEffect(() => {
    if (!introComplete || isAnimating.current) return
    
    isAnimating.current = true
    const { position, target } = currentSection.cameraPosition
    
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false
      }
    })
    
    // Smooth camera transition with slight overshoot
    tl.to(camera.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(targetRef.current)
      }
    })
    
    tl.to(targetRef.current, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 1.5,
      ease: 'power2.inOut'
    }, '<')
    
    return () => {
      tl.kill()
    }
  }, [currentSection, introComplete])
  
  // Subtle mouse parallax effect
  useFrame(() => {
    if (!introComplete || isAnimating.current) return
    
    // Add subtle mouse-based camera movement
    const parallaxX = mousePosition.x * 0.3
    const parallaxY = mousePosition.y * 0.15
    
    const basePos = currentSection.cameraPosition.position
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x, 
      basePos.x + parallaxX, 
      0.02
    )
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y, 
      basePos.y + parallaxY, 
      0.02
    )
    
    camera.lookAt(targetRef.current)
  })
  
  return null
}
