import React, { useState, useRef, useEffect } from 'react'
import '../styles/sections.css'

function Gallery({ isActive, registerRef }) {
  const contentRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  
  useEffect(() => {
    if (registerRef && contentRef.current) {
      registerRef(contentRef.current)
    }
  }, [registerRef])

  // Gallery items - replace src with your actual images
  const galleryItems = [
    {
      id: 1,
      title: 'Sunset Room',
      category: 'Environment Art',
      src: null, // Replace with: '/gallery/sunset-room.jpg'
      placeholder: '🌅'
    },
    {
      id: 2,
      title: 'Cozy Corner',
      category: 'Interior Design',
      src: null, // Replace with: '/gallery/cozy-corner.jpg'
      placeholder: '🪴'
    },
    {
      id: 3,
      title: 'Golden Hour',
      category: 'Lighting Study',
      src: null, // Replace with: '/gallery/golden-hour.jpg'
      placeholder: '☀️'
    },
    {
      id: 4,
      title: 'Pastel Dreams',
      category: 'Concept Art',
      src: null, // Replace with: '/gallery/pastel-dreams.jpg'
      placeholder: '🎨'
    },
    {
      id: 5,
      title: 'Urban Sketch',
      category: 'Architecture',
      src: null, // Replace with: '/gallery/urban-sketch.jpg'
      placeholder: '🏙️'
    },
    {
      id: 6,
      title: 'Nature Study',
      category: 'Environment',
      src: null, // Replace with: '/gallery/nature-study.jpg'
      placeholder: '🌿'
    }
  ]

  const handleImageClick = (item) => {
    setSelectedImage(item)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <section className={`section gallery-section ${isActive ? 'active' : ''}`} id="gallery">
      <div className="section-content" ref={contentRef}>
        <h2 className="section-title">Art Gallery</h2>
        <p className="gallery-intro">
          My artistic vision gravitates toward warm, inviting spaces — environments 
          bathed in soft sunset light, rendered in bright pastels. Click on any 
          piece to view it in full size.
        </p>
        
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item"
              onClick={() => handleImageClick(item)}
            >
              {item.src ? (
                <img src={item.src} alt={item.title} />
              ) : (
                <div className="gallery-placeholder">
                  <span className="gallery-placeholder-icon">{item.placeholder}</span>
                  <span>Add your artwork</span>
                </div>
              )}
              <div className="gallery-item-overlay">
                <h4 className="gallery-item-title">{item.title}</h4>
                <span className="gallery-item-category">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-note" style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'linear-gradient(135deg, rgba(232, 168, 124, 0.1), rgba(255, 255, 255, 0.5))',
          borderRadius: '12px',
          fontSize: '0.85rem',
          color: '#7a6a62',
          textAlign: 'center'
        }}>
          💡 <em>Tip: Add your images to /public/gallery/ and update the src paths above</em>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="lightbox-overlay"
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(90, 74, 66, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '80vw',
              maxHeight: '80vh',
              textAlign: 'center',
              animation: 'scaleIn 0.3s ease'
            }}
          >
            {selectedImage.src ? (
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '60vh',
                  borderRadius: '12px'
                }}
              />
            ) : (
              <div style={{
                width: '300px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(232, 168, 124, 0.2), rgba(244, 181, 149, 0.3))',
                borderRadius: '12px'
              }}>
                <span style={{ fontSize: '4rem' }}>{selectedImage.placeholder}</span>
                <span style={{ color: '#7a6a62', marginTop: '1rem' }}>Image placeholder</span>
              </div>
            )}
            <h3 style={{ 
              marginTop: '1rem', 
              color: '#5a4a42',
              fontFamily: 'Quicksand, sans-serif'
            }}>
              {selectedImage.title}
            </h3>
            <p style={{ color: '#d4846a', fontSize: '0.9rem' }}>
              {selectedImage.category}
            </p>
            <button
              onClick={closeLightbox}
              style={{
                marginTop: '1.5rem',
                padding: '0.7rem 2rem',
                background: 'linear-gradient(135deg, #e8a87c, #d4846a)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  )
}

export default Gallery
