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
      title: '2D, 3D & Tools',
      skills: [
        'SolidWorks (mechanical design, prototyping)',
        'Fusion 360 (CAD modeling)',
        'Blender (3D scenes, asset creation)',
        '2D Pixel Art & Concept Art',
        'Unity (gameplay prototyping, workflow)',
        'Asset creation for games and interactive projects'
      ],
      description: 'From technical CAD to expressive 3D and 2D art—my toolkit lets me move from idea to implementation. Need a prototype or a polished asset? I can help.'
    },
    {
      title: 'Design & Visual Communication',
      skills: [
        'Posters, flyers, business cards',
        'Layout, typography, and visual clarity',
        'Communicating ideas through visuals',
        'Aesthetic sensitivity shaped by music and art education',
        'Color & composition for mood and storytelling'
      ],
      description: 'Good design is more than looks—it’s about clear communication. I make sure every visual element supports your message.'
    },
    {
      title: 'Leadership & Collaboration',
      skills: [
        'Team leadership and coordination',
        'Working efficiently under time pressure',
        'Teamwork and clear communication',
        'Advanced English (business level)',
        'Responsible, organized, delivery-oriented'
      ],
      description: 'I know how to motivate a team, keep projects on track, and deliver—even when the clock is ticking. Want to work with someone who thrives under pressure? Let’s talk.'
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
              <p className="skill-category-desc">{category.description}</p>
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
