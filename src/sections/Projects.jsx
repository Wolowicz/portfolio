import React, { useRef, useEffect } from 'react'
import '../styles/sections.css'

function Projects({ isActive, registerRef }) {
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (registerRef && contentRef.current) {
      registerRef(contentRef.current)
    }
  }, [registerRef])

  const projects = [
    {
      title: 'Interactive 3D Room Portfolio',
      description: 'A stylized environment serving as an interactive portfolio space. Features scroll-driven camera movement, warm lighting, and carefully composed scenes that guide viewers through my work.',
      tech: ['Three.js', 'React Three Fiber', 'Blender'],
      highlight: true
    },
    {
      title: 'Unity Arcade Game — Team Leader',
      description: 'Leading a student team developing an arcade-style shooter inspired by Chicken Invaders. Responsible for team coordination, task planning, creative direction, and maintaining visual consistency across all game assets.',
      tech: ['Unity', 'C#', 'Team Leadership']
    },
    {
      title: 'Cyberiada Competition — 2D Pixel Artist',
      description: 'Two-time competitor creating pixel art assets and visual concepts for game jam-style competitions. Delivered polished game graphics under strict time constraints while collaborating with programmers and designers.',
      tech: ['Pixel Art', 'Game Assets', 'Team Collaboration']
    },
    {
      title: 'Game Jams — 5+ Participations',
      description: 'Rapid prototyping and creative problem-solving under pressure. Each jam strengthened my ability to iterate quickly, communicate with team members, and deliver playable experiences within 48-72 hours.',
      tech: ['Rapid Prototyping', 'Teamwork', 'Creative Problem Solving']
    },
    {
      title: 'Project Meduza — Mechanical Design',
      description: 'Designed a sealed mechanical cover for a robotic jellyfish as part of a government-funded academic project. Created in SolidWorks with focus on form, functionality, environmental constraints, and underwater durability.',
      tech: ['SolidWorks', 'Mechanical Design', 'Academic Research']
    }
  ]

  return (
    <section className={`section projects-section ${isActive ? 'active' : ''}`} id="projects">
      <div className="section-content" ref={contentRef}>
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={idx} className={`project-card ${project.highlight ? 'highlighted' : ''}`}>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tech.map((tech, techIdx) => (
                  <span key={techIdx} className="project-tag">
                    {tech}
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

export default Projects
