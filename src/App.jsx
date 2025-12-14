import React, { useEffect } from 'react'
import Scene from './canvas/Scene'
import ContentPanel from './components/ContentPanel'
import useInteractionStore from './store/useInteractionStore'
import './styles/App.css'

function App() {
  const reset = useInteractionStore(state => state.reset)
  const focusedObject = useInteractionStore(state => state.focusedObject)
  
  useEffect(() => {
    reset()
  }, [reset])
  
  return (
    <div className="app">
      {/* 3D Scene */}
      <Scene />
      
      {/* Content Panel */}
      <ContentPanel />
      
      {/* Branding */}
      <header className="header">
        <h1 className="logo">Portfolio</h1>
        <p className="tagline">Creative Developer & 3D Artist</p>
      </header>
      
      {/* Instructions */}
      <div className={`instructions ${focusedObject ? 'hidden' : ''}`}>
        <div className="instruction">
          <span className="instruction-icon">🖱️</span>
          <span>Drag to rotate</span>
        </div>
        <div className="instruction">
          <span className="instruction-icon">🔍</span>
          <span>Scroll to zoom</span>
        </div>
        <div className="instruction">
          <span className="instruction-icon">👆</span>
          <span>Click objects to explore</span>
        </div>
      </div>
    </div>
  )
}

export default App
