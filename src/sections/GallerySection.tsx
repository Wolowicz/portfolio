import React from 'react'
import './sections.css'

const galleryCategories = [
  {
    title: 'Hobby Art',
    color: '#ff9a8b',
    description: 'Personal explorations in traditional drawing and spatial composition.',
    items: [
      { name: 'Architectural Sketches', description: 'Building studies and urban perspectives' },
      { name: 'Perspective Studies', description: 'One, two, and three-point perspective exercises' },
      { name: 'Spatial Drawings', description: 'Interior and exterior space compositions' }
    ]
  },
  {
    title: 'Concept Art',
    color: '#c9b1ff',
    description: 'Game environments, mood explorations, and atmospheric studies.',
    items: [
      { name: 'Game Environments', description: 'Stylized scene concepts for games' },
      { name: 'Cyberiada Concepts', description: 'Pixel art and visual concepts from competitions' },
      { name: 'Atmosphere Studies', description: 'Color, mood, and lighting explorations' }
    ]
  },
  {
    title: '3D Environments',
    color: '#ffd93d',
    description: 'Rendered scenes and environment art pieces.',
    items: [
      { name: 'Isometric Rooms', description: 'Stylized interior environments' },
      { name: 'Lighting Studies', description: 'Golden hour and atmospheric lighting' },
      { name: 'Props & Details', description: 'Environmental storytelling through objects' }
    ]
  }
]

export default function GallerySection() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-content">
        <h2 className="section-title">Gallery</h2>
        <div className="section-subtitle">A collection of artistic explorations</div>
        
        <div className="artistic-statement">
          <h3>Artistic Vision</h3>
          <p>
            My work gravitates toward warmth — golden hour lighting, sunset palettes,
            and spaces that feel inviting rather than sterile. I find inspiration in
            the way light transforms ordinary spaces into something memorable.
          </p>
          <p>
            Whether sketching architecture or designing 3D environments, I aim to
            capture atmosphere and emotion. The goal is never just visual accuracy,
            but the feeling a space evokes.
          </p>
        </div>
        
        <div className="gallery-categories">
          {galleryCategories.map((category, index) => (
            <div 
              key={category.title}
              className="gallery-category"
              style={{ 
                '--accent-color': category.color,
                animationDelay: `${index * 0.15}s`
              } as React.CSSProperties}
            >
              <h3 className="category-title">{category.title}</h3>
              <p className="category-description">{category.description}</p>
              
              <div className="gallery-items">
                {category.items.map((item) => (
                  <div key={item.name} className="gallery-item">
                    <div className="item-placeholder">
                      <span className="placeholder-icon">🖼️</span>
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="gallery-note">
          <p>
            <em>Full gallery with high-resolution images coming soon.</em>
          </p>
        </div>
      </div>
    </section>
  )
}
