import React from 'react'
import './sections.css'

export default function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-content">
        <h2 className="section-title">Get in Touch</h2>
        <div className="section-subtitle">Let's build something together</div>
        
        <div className="contact-content">
          <div className="contact-message">
            <h3>Why Games? Why Environments?</h3>
            <p>
              I've always been drawn to the spaces within games — not just the characters
              or mechanics, but the worlds themselves. The quiet corners of a room,
              the way light falls through a window, the objects that suggest a story
              without telling it outright.
            </p>
            <p>
              Environment art is where I can combine everything I love: technical craft,
              artistic expression, and the power of atmosphere to make players feel
              something. I want to build worlds that people remember.
            </p>
          </div>
          
          <div className="contact-fit">
            <h3>A Note on Growth</h3>
            <p>
              I approach every project as an opportunity to learn. With a foundation
              in both engineering and art, I bring structure to creative work and
              creativity to technical challenges. I thrive in collaborative environments,
              take responsibility seriously, and deliver on my commitments.
            </p>
            <p>
              Whether it's leading a team through a game jam or carefully crafting
              a 3D scene, I bring the same dedication: make it meaningful, make it
              beautiful, make it work.
            </p>
          </div>
          
          <div className="contact-cta">
            <h3>Ready to Connect</h3>
            <p>
              I'm open to opportunities in environment art, technical art, and
              game development. If you're looking for someone who bridges the gap
              between art and technology, I'd love to hear from you.
            </p>
            
            <div className="contact-links">
              <a href="mailto:patrycja.wolowicz@example.com" className="contact-link primary">
                <span className="link-icon">✉️</span>
                <span className="link-text">Email Me</span>
              </a>
              <a href="https://github.com/Wolowicz" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="link-icon">💻</span>
                <span className="link-text">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="link-icon">🔗</span>
                <span className="link-text">LinkedIn</span>
              </a>
              <a href="https://artstation.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="link-icon">🎨</span>
                <span className="link-text">ArtStation</span>
              </a>
            </div>
          </div>
        </div>
        
        <footer className="site-footer">
          <p>Designed & Built by Patrycja Wołowicz</p>
          <p className="footer-note">Crafted with Three.js, React, and passion for environments</p>
        </footer>
      </div>
    </section>
  )
}
