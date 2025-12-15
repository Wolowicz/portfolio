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
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">Patrycja Wołowicz</h1>
        <p className="hero-title">Aspiring Environment & Concept Artist</p>
        <p className="hero-description">
          Computer Science Engineering student developing skills in 2D and 3D art for games.
          Focused on visual storytelling, atmosphere, and collaborative game development.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="cta-button primary">
            View Projects
          </a>
          <a href="#contact" className="cta-button secondary">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
