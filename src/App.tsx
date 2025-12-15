import { useEffect, useCallback, useRef } from 'react'
import Scene from './canvas/Scene'
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
  
  return (
    <div className="app">
      {/* Full-screen 3D Canvas */}
      <div className="canvas-container">
        <Scene />
      </div>
      
      {/* Content Panel - animated */}
      <div 
        className={`content-panel ${panelVisible ? 'visible' : ''}`}
        style={{ '--accent-color': currentSection.color } as React.CSSProperties}
      >
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
      </div>
      
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
      
      {/* Scroll indicator */}
      <div className={`scroll-indicator ${introComplete && !isTransitioning ? 'visible' : ''}`}>
        <span>Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
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
