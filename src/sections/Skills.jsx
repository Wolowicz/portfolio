import React, { useRef, useEffect } from 'react'
import '../styles/sections.css'

function Skills({ isActive, registerRef }) {
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (registerRef && contentRef.current) {
      registerRef(contentRef.current)
    }
  }, [registerRef])

  const skillCategories = [
    {
      title: 'Art & Environment',
      skills: ['Environment Design', 'Color Theory', 'Lighting & Mood', 'Composition', 'Visual Storytelling']
    },
    {
      title: '3D & Tools',
      skills: ['Blender', 'SolidWorks', 'Fusion 360', 'Three.js', 'React Three Fiber']
    },
    {
      title: 'Game & Interactive',
      skills: ['Unity', 'Pixel Art', '2D Game Assets', 'Game Jams', 'Rapid Prototyping']
    },
    {
      title: 'Design & Visual',
      skills: ['Graphic Design', 'Typography', 'Poster Design', 'Visual Branding', 'UI Layouts']
    },
    {
      title: 'Leadership',
      skills: ['Team Coordination', 'Project Planning', 'Creative Direction', 'Deadline Management', 'Collaboration']
    }
  ]

  return (
    <section className={`section skills-section ${isActive ? 'active' : ''}`} id="skills">
      <div className="section-content" ref={contentRef}>
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category">
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, skillIdx) => (
                  <span key={skillIdx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
