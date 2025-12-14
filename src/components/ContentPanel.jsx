import React, { useEffect, useState } from 'react'
import useInteractionStore from '../store/useInteractionStore'
import '../styles/content-panel.css'

function ContentPanel() {
  const activeContent = useInteractionStore(state => state.activeContent)
  const contentVisible = useInteractionStore(state => state.contentVisible)
  const unfocus = useInteractionStore(state => state.unfocus)
  
  const [displayContent, setDisplayContent] = useState(null)
  
  useEffect(() => {
    if (activeContent) {
      setDisplayContent(activeContent)
    }
  }, [activeContent])
  
  useEffect(() => {
    if (!contentVisible && !activeContent) {
      const timer = setTimeout(() => setDisplayContent(null), 400)
      return () => clearTimeout(timer)
    }
  }, [contentVisible, activeContent])
  
  // ESC key handler
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && activeContent) {
        unfocus()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeContent, unfocus])
  
  if (!displayContent) return null
  
  return (
    <div className={`content-overlay ${contentVisible ? 'visible' : ''}`}>
      <div className="content-backdrop" onClick={unfocus} />
      
      <div 
        className="content-card"
        style={{ '--accent': displayContent.color }}
      >
        <button className="close-btn" onClick={unfocus}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        
        <div className="content-icon">{displayContent.icon}</div>
        
        <div className="content-header">
          <span className="content-subtitle">{displayContent.subtitle}</span>
          <h2 className="content-title">{displayContent.title}</h2>
        </div>
        
        <p className="content-description">{displayContent.description}</p>
        
        {displayContent.details && (
          <ul className="content-list">
            {displayContent.details.map((item, i) => (
              <li key={i} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                <span className="bullet" />
                {item}
              </li>
            ))}
          </ul>
        )}
        
        <div className="content-hint">Press ESC or click outside to close</div>
      </div>
    </div>
  )
}

export default ContentPanel
