import React, { useEffect, useState } from 'react'
import '../styles/hotspot.css'

function Hotspot({ hotspot, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 50)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className={`hotspot-popup ${isVisible ? 'visible' : ''}`}>
      <div className="hotspot-backdrop" onClick={handleClose} />
      <div className="hotspot-card">
        <button className="hotspot-close" onClick={handleClose}>×</button>
        <div className="hotspot-icon">{hotspot.icon}</div>
        <h3 className="hotspot-title">{hotspot.title}</h3>
        <p className="hotspot-content">{hotspot.content}</p>
      </div>
    </div>
  )
}

export default Hotspot
