import React, { useRef, useEffect } from 'react'
import '../styles/sections.css'

function About({ isActive, registerRef }) {
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (registerRef && contentRef.current) {
      registerRef(contentRef.current)
    }
  }, [registerRef])

  return (
    <section className={`section about-section ${isActive ? 'active' : ''}`} id="about">
      <div className="section-content" ref={contentRef}>
        <h2 className="section-title">About Me</h2>
        <p className="about-text">
          I'm a Computer Science Engineering student with a deep passion for 
          environment art and visual storytelling. My journey bridges the gap 
          between technical precision and artistic expression — shaped by years 
          of classical music training, participation in art competitions, and 
          hands-on game development experience.
        </p>
        <p className="about-text">
          As a team leader in multiple game projects and a two-time participant 
          in the Cyberiada competition as a 2D pixel artist, I've learned that 
          the best environments aren't just visually striking — they tell stories, 
          evoke emotions, and guide the player's experience through carefully 
          crafted spaces.
        </p>
        <p className="about-text">
          My artistic sensibility leans toward warm, sunlit atmospheres — bright 
          pastels, golden hour lighting, and compositions that feel welcoming 
          yet intriguing. I believe that comfort and wonder can coexist in 
          game environments.
        </p>
        <div className="about-highlights">
          <div className="highlight-item">
            <span className="highlight-number">5+</span>
            <span className="highlight-label">Game Jams</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">2×</span>
            <span className="highlight-label">Cyberiada</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">🎯</span>
            <span className="highlight-label">Team Leader</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">🎨</span>
            <span className="highlight-label">Pixel Artist</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
