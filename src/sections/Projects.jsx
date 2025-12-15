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
      description: 'Ever wondered how a portfolio can become an experience? This stylized 3D room reacts to your scroll and clicks, guiding you through my work with camera movement and animation. Can you spot all the interactive elements?',
      details: 'Focus: Mood, atmosphere, lighting, color, composition, and interactive presentation.',
      tech: ['Three.js', 'React', 'Blender'],
      highlight: true
    },
    {
      title: 'Unity Game Project - Team Leader',
      description: 'Arcade-style game inspired by Chicken Invaders. As team leader, I planned sprints, kept the team motivated, and made sure art and code worked together. What would you do differently in a fast-paced student project?',
      details: 'Developed leadership skills and understanding of team-based creative workflows.',
      tech: ['Unity', 'Team Leadership', 'Creative Direction']
    },
    {
      title: 'Cyberiada - National Championship (x2)',
      description: 'Two-time finalist as 2D pixel art artist. My job? Create assets and concepts on the fly, working closely with programmers. How do you keep your creativity flowing under time pressure?',
      details: 'Required fast iteration, adaptability, and clear visual communication under time constraints.',
      tech: ['Pixel Art', 'Concept Art', 'Team Collaboration']
    },
    {
      title: 'Game Jams (5+)',
      description: 'Five game jams, five unique teams, countless ideas. I learned to prototype fast, solve problems creatively, and focus on what really matters: atmosphere and clarity. What would you build in 48 hours?',
      details: 'Prioritizing atmosphere and clarity over unnecessary complexity.',
      tech: ['Rapid Prototyping', 'Teamwork', 'Problem Solving']
    },
    {
      title: 'Project Meduza - Academic Project',
      description: 'How do you design for the real world? In this government-funded project, I created a sealed mechanical cover for a robotic jellyfish, balancing durability, form, and constraints. Would your design survive underwater?',
      details: 'Strengthened understanding of design decisions interacting with real-world constraints.',
      tech: ['SolidWorks', 'Mechanical Design', 'Research']
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
