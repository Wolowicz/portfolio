import React from 'react'
import './sections.css'

const skillGroups = [
  {
    title: 'Art & Environment',
    color: '#ff9a8b',
    skills: [
      'Environment Design & Worldbuilding',
      'Stylized 3D Art',
      'Lighting & Mood',
      'Color Theory & Composition',
      'Visual Storytelling'
    ]
  },
  {
    title: '3D & Tools',
    color: '#ffd93d',
    skills: [
      'Blender',
      'SolidWorks',
      'Fusion 360',
      'Three.js / React Three Fiber',
      'GLSL Shaders (fundamentals)'
    ]
  },
  {
    title: 'Game & Interactive',
    color: '#c9b1ff',
    skills: [
      'Unity Engine',
      'Game Jam Experience (5+)',
      '2D Pixel Art',
      'Rapid Prototyping',
      'Iterative Design'
    ]
  },
  {
    title: 'Design & Visual Communication',
    color: '#7ed6a5',
    skills: [
      'Graphic Design',
      'Typography',
      'Poster & Flyer Design',
      'Visual Branding',
      'Layout & Composition'
    ]
  },
  {
    title: 'Leadership & Collaboration',
    color: '#88d8f9',
    skills: [
      'Team Leadership',
      'Project Coordination',
      'Migration Leadership',
      'Cross-functional Communication',
      'Delivery Under Pressure'
    ]
  }
]

export default function SkillsSection() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-content">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="section-subtitle">A blend of technical precision and artistic vision</div>
        
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div 
              key={group.title} 
              className="skill-group"
              style={{ 
                '--accent-color': group.color,
                animationDelay: `${index * 0.1}s`
              } as React.CSSProperties}
            >
              <h3 className="skill-group-title">{group.title}</h3>
              <ul className="skill-list">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="skills-note">
          <p>
            <strong>Languages:</strong> Polish (native), English (advanced/business)
          </p>
        </div>
      </div>
    </section>
  )
}
