import React from 'react'
import './sections.css'

export default function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="section-content">
        <h2 className="section-title">About Me</h2>
        <div className="section-subtitle">Where Technology Meets Art</div>
        
        <div className="about-text">
          <p>
            I am a creative technologist with a deep passion for building immersive,
            atmospheric environments. My path is shaped by two worlds: the precision of
            engineering and the soul of artistic expression.
          </p>
          
          <p>
            As a Computer Science Engineering student and Junior Network Engineer, I bring
            technical depth to my creative work. But it is my artistic background — years of
            music education, participation in art competitions, and an eye trained on
            composition and mood — that defines how I approach environment design.
          </p>
          
          <p>
            I believe the best digital spaces don't just look good — they feel alive.
            Warm lighting, purposeful color palettes, and thoughtful spatial storytelling
            transform a scene into an experience. This is what I strive to create.
          </p>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <span className="highlight-icon">🎨</span>
            <h3>Artistic Foundation</h3>
            <p>Award-winning participation in art competitions. Trained in music composition, rhythm, and emotional expression.</p>
          </div>
          
          <div className="highlight-card">
            <span className="highlight-icon">🎮</span>
            <h3>Game Development</h3>
            <p>5+ game jams. Team leader on current Unity project. Pixel art experience from Cyberiada competitions.</p>
          </div>
          
          <div className="highlight-card">
            <span className="highlight-icon">⚙️</span>
            <h3>Technical Skills</h3>
            <p>3D modeling in Blender & SolidWorks. Web-based 3D with Three.js. Problem-solving mindset.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
