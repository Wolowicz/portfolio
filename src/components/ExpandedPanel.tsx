import React, { useEffect, useRef } from 'react'
import usePortfolioStore from '../store/usePortfolioStore'
import '../styles/expanded-panel.css'

export default function ExpandedPanel() {
  const open = usePortfolioStore((s) => s.expandedPanelOpen)
  const close = usePortfolioStore((s) => s.closeExpandedPanel)
  const currentSection = usePortfolioStore((s) => s.currentSection)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  if (!open) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      close()
    }
  }

  return (
    <div
      className="expanded-overlay"
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      aria-hidden={!open}
    >
      <div className="expanded-panel" role="dialog" aria-modal="true">
        <button className="expanded-close" onClick={() => close()} aria-label="Close">✕</button>

        <header className="expanded-header">
          <div className="expanded-meta">
            <span className="expanded-subtitle">{currentSection.subtitle}</span>
            <h2 className="expanded-title">{currentSection.title}</h2>
          </div>
        </header>

        <div className="expanded-body">
          {currentSection.fullContent?.map((p, i) => (
            <p className="expanded-paragraph" key={i}>{p}</p>
          ))}

          {currentSection.fullBullets && (
            <ul className="expanded-bullets">
              {currentSection.fullBullets.map((b, i) => (
                <li key={i} className="expanded-bullet">{b}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
