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
        <h2 className="section-title">Contact</h2>
        
        <div className="contact-header">
          <h3 className="contact-name">Patrycja Wołowicz</h3>
          <p className="contact-subtitle">Environment & Concept Art Portfolio</p>
        </div>
        
        <div className="contact-methods">
          <a href="mailto:pati.wolowicz@gmail.com" className="contact-method">
            <div className="contact-icon">Email</div>
            <div className="contact-info">
              <h4>Email</h4>
              <p>pati.wolowicz@gmail.com</p>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/patrycja-wo%C5%82owicz-979613329" target="_blank" rel="noopener noreferrer" className="contact-method">
            <div className="contact-icon">LI</div>
            <div className="contact-info">
              <h4>LinkedIn</h4>
              <p>Professional Profile</p>
            </div>
          </a>
        </div>
        
        <div className="contact-footer">
          <p>2025 Patrycja Wołowicz</p>
        </div>
      </div>
    </section>
  )
}

export default Contact
