import { useEffect, useCallback, useRef, useState } from 'react'
import Scene from './canvas/Scene'
import ExpandedPanel from './components/ExpandedPanel'
import usePortfolioStore, { SECTIONS } from './store/usePortfolioStore'
import './styles/App.css'

function App() {
  const lastScrollTime = useRef(0)
  const scrollCooldown = 1500 // ms between section changes
  
  const currentSection = usePortfolioStore((s) => s.currentSection)
  const currentSectionIndex = usePortfolioStore((s) => s.currentSectionIndex)
  const isTransitioning = usePortfolioStore((s) => s.isTransitioning)
  const introComplete = usePortfolioStore((s) => s.introComplete)
  const panelVisible = usePortfolioStore((s) => s.panelVisible)
  const nextSection = usePortfolioStore((s) => s.nextSection)
  const prevSection = usePortfolioStore((s) => s.prevSection)
  const goToSection = usePortfolioStore((s) => s.goToSection)
  const setMousePosition = usePortfolioStore((s) => s.setMousePosition)
  const openExpandedPanel = usePortfolioStore((s) => s.openExpandedPanel)
  
  // Handle wheel scroll for section navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!introComplete || isTransitioning) return
    
    const now = Date.now()
    if (now - lastScrollTime.current < scrollCooldown) return
    
    if (e.deltaY > 50) {
      nextSection()
      lastScrollTime.current = now
    } else if (e.deltaY < -50) {
      prevSection()
      lastScrollTime.current = now
    }
  }, [introComplete, isTransitioning, nextSection, prevSection])
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!introComplete || isTransitioning) return
    
    const now = Date.now()
    if (now - lastScrollTime.current < scrollCooldown) return
    
    if (e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault()
      nextSection()
      lastScrollTime.current = now
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      prevSection()
      lastScrollTime.current = now
    }
  }, [introComplete, isTransitioning, nextSection, prevSection])
  
  // Handle mouse movement for parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setMousePosition(x, y)
  }, [setMousePosition])
  
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleWheel, handleKeyDown, handleMouseMove])
  
  const isHeroSection = currentSection.id === 'hero'
  const [showNudge, setShowNudge] = useState(false)

  useEffect(() => {
    // play a single nudge animation when landing on the hero section
    if (isHeroSection) {
      setShowNudge(true)
      const t = setTimeout(() => setShowNudge(false), 1400)
      return () => clearTimeout(t)
    }
    return
  }, [isHeroSection])
  
  return (
    <div className={`app ${isHeroSection && panelVisible ? 'overlay-active' : ''}`}>
      {/* Full-screen 3D Canvas */}
      <div className="canvas-container">
        <Scene />
      </div>
      
      {/* Hero Section - Full Screen Intro */}
      {isHeroSection && panelVisible && (
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">Patrycja Wołowicz</h1>
            <h2 className="hero-title">Aspiring Concept Artist Bridging Art & Tech</h2>
            <p className="hero-subtitle">Migration Project Leader | Junior Network Engineer</p>
            <p className="hero-tagline">
              I am a Computer Science Engineering student developing my skills in 2D and 3D art, enjoying working on team-based projects.
              <br />
              My focus is on visual aesthetics storytelling, atmosphere, and collaborative game development.
            </p>
            <div className="hero-cta">
              <button 
                className="cta-button primary"
                onClick={() => goToSection('projects')}
              >
                View Projects
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => goToSection('contact')}
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Content Panel - center grouped with model for other sections */}
      {!isHeroSection && (
        <div className={`center-stage ${panelVisible ? 'visible' : ''}`} style={{ '--accent-color': currentSection.color } as React.CSSProperties}>
          <div className={`panel-wrapper ${panelVisible ? 'visible' : ''} ${['about','skills','projects','fitforjob','contact'].includes(currentSection.id) ? 'light' : ''}`}>
            <div className="panel-icon">{currentSection.icon}</div>
            <span className="panel-subtitle">{currentSection.subtitle}</span>
            <h1 className="panel-title">{currentSection.title}</h1>
            <p className="panel-description">{currentSection.description}</p>
            
            {currentSection.items && (
              <ul className="panel-items">
                {currentSection.items.map((item, index) => (
                  <li 
                    key={index} 
                    className="panel-item"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            
            {currentSection.links && (
              <div className="panel-links">
                {currentSection.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel-link"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    {link.icon && <span className="link-icon">{link.icon}</span>}
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Expand button */}
            <button
              className="expand-btn"
              aria-label="Expand"
              onClick={() => openExpandedPanel()}
              title="Expand"
            >
              →
            </button>
          </div>

          {/* Invisible spacer represents the model area so the pair is centered */}
          <div className="model-spacer" aria-hidden />
        </div>
      )}

      {/* Expanded view */}
      <ExpandedPanel />
      
      {/* Navigation dots */}
      <nav className="section-nav">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            onClick={() => goToSection(section.id)}
            className={`nav-dot ${currentSectionIndex === index ? 'active' : ''}`}
            style={{ 
              '--dot-color': section.color,
              animationDelay: `${index * 0.1}s`
            } as React.CSSProperties}
            title={section.title}
            disabled={isTransitioning}
          >
            <span className="dot-tooltip">{section.title}</span>
            <span className="dot-icon">{section.icon}</span>
          </button>
        ))}
      </nav>
      
      {/* Scroll indicator (hidden when hero overlay is active) */}
      <div className="bottom-bar" aria-hidden>
        <div className={`scroll-indicator ${(!isTransitioning && isHeroSection) ? 'visible' : ''} ${showNudge ? 'nudge' : ''}`} role="status" aria-label="Scroll to explore">
          <span className="scroll-text" aria-hidden="true">Scroll To Explore</span>
          <span className="sr-only">Scroll to explore</span>
          <div className="scroll-arrow" aria-hidden>↓</div>
        </div>
      </div>
      
      {/* Section counter */}
      <div className="section-counter">
        <span className="current">{String(currentSectionIndex + 1).padStart(2, '0')}</span>
        <span className="divider">/</span>
        <span className="total">{String(SECTIONS.length).padStart(2, '0')}</span>
      </div>
      
      {/* Loading overlay */}
      <div className={`loading-overlay ${introComplete ? 'hidden' : ''}`}>
        <div className="loader">
          <div className="loader-ring"></div>
          <span>Loading experience...</span>
        </div>
      </div>
    </div>
  )
}

export default App
