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
          What happens when you combine engineering precision with a passion for art and games? My journey answers this question every day. I am a Computer Science Engineering student who believes that technology and creativity go hand in hand. Have you ever wondered how a technical background can boost your creative work?
        </p>
        <p className="about-text">
          My artistic path started in an architecture-focused high school, where I learned to see space and form differently. Art competitions and game projects taught me how to turn ideas into reality, even under time pressure. Music School (1st degree, part of 2nd) shaped my sense of rhythm and mood—skills I now use to build atmosphere in digital worlds.
        </p>
        <p className="about-text">
          Today, as a Junior Network Engineer and Migration Project Leader, I coordinate teams, solve problems, and communicate across disciplines. These experiences taught me how to stay organized, take responsibility, and deliver results—qualities I bring to every creative team.
        </p>
        <p className="about-text about-goal">
          My goal? To design environments and concepts that make stories unforgettable. I want to create spaces where light, color, and composition guide the player’s emotions. Ready to see how my skills can support your next project?
        </p>
        <div className="about-highlights">
          <div className="highlight-item">
            <span className="highlight-number">5+</span>
            <span className="highlight-label">Game Jams</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">2x</span>
            <span className="highlight-label">Cyberiada</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">TL</span>
            <span className="highlight-label">Team Leader</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">MG</span>
            <span className="highlight-label">Music Graduate</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
