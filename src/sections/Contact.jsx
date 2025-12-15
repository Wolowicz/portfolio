import React, { useRef, useEffect } from 'react'
import '../styles/sections.css'

function Contact({ isActive, registerRef }) {
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (registerRef && contentRef.current) {
      registerRef(contentRef.current)
    }
  }, [registerRef])

  return (
    <section className={`section contact-section ${isActive ? 'active' : ''}`} id="contact">
      <div className="section-content" ref={contentRef}>
        <h2 className="section-title">Let's Create Together</h2>
        <p className="contact-intro">
          I'm actively seeking opportunities in environment art, game development, 
          and creative technology. If you're looking for someone who combines 
          technical understanding with genuine artistic passion — let's talk!
        </p>
        
        <div className="contact-methods">
          <a href="mailto:pati.wolowicz@gmail.com" className="contact-method">
            <div className="contact-icon">✉️</div>
            <div className="contact-info">
              <h4>Email Me</h4>
              <p>pati.wolowicz@gmail.com</p>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/patrycja-wo%C5%82owicz-979613329?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BQS870lcbR2uCkDB3kK%2BV8g%3D%3D" target="_blank" rel="noopener noreferrer" className="contact-method">
            <div className="contact-icon">💼</div>
            <div className="contact-info">
              <h4>LinkedIn</h4>
              <p>Professional network</p>
            </div>
          </a>
          <a href="https://artstation.com/yourprofile" target="_blank" rel="noopener noreferrer" className="contact-method">
            <div className="contact-icon">🎨</div>
            <div className="contact-info">
              <h4>ArtStation</h4>
              <p>Portfolio gallery</p>
            </div>
          </a>
        </div>
        
        <div className="social-links">
          <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
            🔗
          </a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
            🐦
          </a>
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
            📷
          </a>
        </div>
        
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#7a6a62',
          borderTop: '1px solid rgba(232, 168, 124, 0.2)'
        }}>
          <p>© 2025 Patrycja Wołowicz. Built with 💛 using React & Three.js</p>
        </div>
      </div>
    </section>
  )
}

export default Contact
