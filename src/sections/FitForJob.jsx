import React, { useRef, useEffect } from 'react'
import '../styles/sections.css'

function FitForJob({ isActive, registerRef }) {
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (registerRef && contentRef.current) {
      registerRef(contentRef.current)
    }
  }, [registerRef])

  return (
    <section className={`section fitforjob-section ${isActive ? 'active' : ''}`} id="fitforjob">
      <div className="section-content" ref={contentRef}>
        <h2 className="section-title">Fit for a Job</h2>
        <p className="fitforjob-text">
          What makes someone a good fit for your team? For me, it’s about more than skills—it’s about attitude and adaptability. I thrive in environments where learning never stops and challenges are part of the fun. Would you like to work with someone who’s always ready to take on something new?
        </p>
        <p className="fitforjob-text">
          My experience in both technical and creative projects means I can switch between roles, communicate clearly, and deliver results even under pressure. Let’s build something great together—are you ready?
        </p>
        <div className="fitforjob-qualities">
          <div className="quality-item">
            <span className="quality-title">Adaptable & Quick Learner</span>
            <span className="quality-desc">I pick up new tools and workflows fast. Throw me into a new project—I'll find my way.</span>
          </div>
          <div className="quality-item">
            <span className="quality-title">Responsible & Organized</span>
            <span className="quality-desc">Deadlines? No problem. I keep projects on track and make sure nothing falls through the cracks.</span>
          </div>
          <div className="quality-item">
            <span className="quality-title">Team Player Under Pressure</span>
            <span className="quality-desc">I communicate clearly, support my teammates, and stay focused—even when the clock is ticking.</span>
          </div>
          <div className="quality-item">
            <span className="quality-title">Delivery-Oriented</span>
            <span className="quality-desc">I care about results. My goal is always to deliver work that makes a difference.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FitForJob
