import React from 'react'
import './sections.css'

const projects = [
  {
    title: 'Interactive 3D Room Portfolio',
    category: 'Featured Project',
    color: '#ff9a8b',
    description: 'A stylized isometric bedroom environment designed to showcase my work in an immersive, scroll-driven web experience. Built with Three.js and React Three Fiber.',
    details: [
      'Custom 3D environment with baked lighting',
      'Warm, sunset-inspired color palette',
      'Scroll-based narrative flow',
      'Optimized for web performance'
    ],
    tags: ['Three.js', 'React', 'Blender', 'Environment Art']
  },
  {
    title: 'Arcade Space Shooter',
    category: 'Team Lead — Unity Project',
    color: '#c9b1ff',
    description: 'An arcade-style game inspired by Chicken Invaders, developed as a student project. As Team Leader, I coordinate development, manage task planning, and ensure visual consistency.',
    details: [
      'Team leadership and coordination',
      'Creative direction and visual style',
      'Task planning and milestone tracking',
      'Unity-based game development'
    ],
    tags: ['Unity', 'C#', 'Game Design', 'Leadership']
  },
  {
    title: 'Cyberiada Competitions',
    category: '2D Pixel Art — 2 Editions',
    color: '#ffd93d',
    description: 'Participated twice as a 2D pixel art graphic artist. Created visual assets, character concepts, and environment tiles under strict time constraints.',
    details: [
      'Pixel art asset creation',
      'Visual concept development',
      'Team collaboration under pressure',
      'Fast iteration and delivery'
    ],
    tags: ['Pixel Art', '2D Art', 'Competition', 'Teamwork']
  },
  {
    title: 'Game Jam Portfolio',
    category: '5+ Completed Jams',
    color: '#7ed6a5',
    description: 'Extensive experience in rapid game development through multiple game jams. Developed skills in fast prototyping, creative problem-solving, and effective teamwork.',
    details: [
      'Rapid prototyping skills',
      'Creative solutions under time pressure',
      'Cross-disciplinary collaboration',
      'Complete game delivery'
    ],
    tags: ['Game Jams', 'Prototyping', 'Teamwork', 'Game Dev']
  },
  {
    title: 'Project Meduza',
    category: 'Academic Engineering Project',
    color: '#88d8f9',
    description: 'A government-funded academic project focused on designing a sealed mechanical cover for a robotic jellyfish. Modeled in SolidWorks with emphasis on form, function, and environmental constraints.',
    details: [
      'Mechanical design in SolidWorks',
      'Functional and aesthetic considerations',
      'Environmental constraint engineering',
      'Academic research collaboration'
    ],
    tags: ['SolidWorks', 'Mechanical Design', 'Research', 'Engineering']
  }
]

export default function ProjectsSection() {
  return (
    <section className="section projects-section" id="projects">
      <div className="section-content">
        <h2 className="section-title">Projects</h2>
        <div className="section-subtitle">From game jams to immersive 3D experiences</div>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article 
              key={project.title}
              className="project-card"
              style={{ 
                '--accent-color': project.color,
                animationDelay: `${index * 0.1}s`
              } as React.CSSProperties}
            >
              <div className="project-header">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <ul className="project-details">
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
