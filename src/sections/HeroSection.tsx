import React from 'react'
import './sections.css'

export default function HeroSection() {
  return (
    <section className="section hero-section" id="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">Patrycja Wołowicz</h1>
        <h2 className="hero-title">Environment Artist & Creative Technologist</h2>
        <p className="hero-tagline">
          Crafting immersive worlds where technology meets artistic vision.
          <br />
          Building atmospheric spaces that tell stories.
        </p>
        <div className="scroll-indicator">
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-arrow">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
