import React, { useRef, useEffect } from 'react'
import '../styles/sections.css'

function Hero({ isActive, registerRef }) {
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (registerRef && contentRef.current) {
      registerRef(contentRef.current)
    }
  }, [registerRef])

  return (
    <section className={`section hero-section ${isActive ? 'active' : ''}`} id="hero">
      <div className="hero-content" ref={contentRef}>
        <p className="hero-greeting">WELCOME TO MY WORLD</p>
        <h1 className="hero-name">Patrycja Wołowicz</h1>
        <p className="hero-title">Environment Artist & Creative Technologist</p>
        <p className="hero-description">
          Building immersive worlds where technology meets artistic vision.
          Specializing in environment design, 3D visualization, and interactive experiences.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="cta-button primary">
            ✨ View My Work
          </a>
          <a href="#contact" className="cta-button secondary">
            💬 Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
