import React from 'react'
import '../styles/navigation.css'

const SECTION_LABELS = {
  hero: 'Home',
  about: 'About',
  skills: 'Skills',
  projects: 'Projects',
  gallery: 'Gallery',
  contact: 'Contact'
}

function Navigation({ sections, activeSection, setActiveSection }) {
  return (
    <nav className="navigation">
      <div className="nav-dots">
        {sections.map((section) => (
          <button
            key={section}
            className={`nav-dot ${activeSection === section ? 'active' : ''}`}
            onClick={() => setActiveSection(section)}
            aria-label={SECTION_LABELS[section]}
          >
            <span className="nav-label">{SECTION_LABELS[section]}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
