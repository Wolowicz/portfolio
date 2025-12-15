import { create } from 'zustand'
import * as THREE from 'three'

// Camera position for each section
export interface CameraPosition {
  position: THREE.Vector3
  target: THREE.Vector3
}

export interface Section {
  id: string
  title: string
  subtitle: string
  description: string
  color: string
  icon: string
  cameraPosition: CameraPosition
  items?: string[]
  links?: { label: string; url: string; icon?: string }[]
}

// Sekcje z pozycjami kamery - kamera będzie się przemieszczać między obiektami
export const SECTIONS: Section[] = [
  {
    id: 'hero',
    title: 'Patrycja Wołowicz',
    subtitle: 'Environment Artist & Creative Technologist',
    description: 'Creating immersive 3D worlds, blending technology with artistic vision. Building atmospheric spaces that tell stories.',
    color: '#ffb87a',
    icon: '🎨',
    cameraPosition: {
      position: new THREE.Vector3(0, 2, 12),
      target: new THREE.Vector3(0, 0, 0)
    }
  },
  {
    id: 'about',
    title: 'About Me',
    subtitle: 'Who I Am',
    description: 'Creative technologist passionate about building immersive environments. Blending engineering precision with artistic expression.',
    color: '#8b5cf6',
    icon: '✨',
    cameraPosition: {
      position: new THREE.Vector3(-1, 2, 10),
      target: new THREE.Vector3(0, 0, 0)
    },
    items: [
      '🎨 Artistic Approach',
      '🎮 Game Development & Jams',
      '⚙️ Blender & SolidWorks',
      '🌐 Three.js & Web 3D'
    ]
  },
  {
    id: 'skills',
    title: 'Skills',
    subtitle: 'My Tools',
    description: 'Technologies and tools I use to bring ideas to life.',
    color: '#f59e0b',
    icon: '⚡',
    cameraPosition: {
      position: new THREE.Vector3(-6, 2, 8),
      target: new THREE.Vector3(-1, 0, 0)
    },
    items: [
      '🎨 Environment Design',
      '💻 Blender & 3D Modeling',
      '🎮 Unity & Game Jams',
      '🖼️ Pixel Art & Concept Art',
      '🌐 Three.js & React',
      '⚙️ SolidWorks & CAD'
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'My Work',
    description: 'A collection of projects showcasing my skills and creativity.',
    color: '#10b981',
    icon: '🚀',
    cameraPosition: {
      position: new THREE.Vector3(3, 1, 3),
      target: new THREE.Vector3(-1, 0, 0)
    },
    items: [
      '🏠 Interactive 3D Portfolio',
      '🎮 Arcade Space Shooter (Team Lead)',
      '🎨 Cyberiada - Pixel Art',
      '🔧 Project Meduza - SolidWorks'
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Wolowicz', icon: '🔗' },
      { label: 'ArtStation', url: '#', icon: '🎨' }
    ]
  },
  {
    id: 'gallery',
    title: 'Gallery',
    subtitle: 'Visual Journey',
    description: 'A visual showcase of my artistic work and experiments.',
    color: '#06b6d4',
    icon: '🖼️',
    cameraPosition: {
      position: new THREE.Vector3(-5, 3, 8),
      target: new THREE.Vector3(0, 0, 0)
    },
    items: [
      '✏️ Hobby Art & Sketches',
      '🎨 Concept Art',
      '🏠 3D Environments',
      '🎮 Game Assets'
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: "Let's Connect",
    description: "Have a project in mind? Let's create something amazing together!",
    color: '#ec4899',
    icon: '💬',
    cameraPosition: {
      position: new THREE.Vector3(0, 2, 10),
      target: new THREE.Vector3(0, 0, 0)
    },
    links: [
      { label: 'Email', url: 'mailto:patrycja.wolowicz@example.com', icon: '📧' },
      { label: 'GitHub', url: 'https://github.com/Wolowicz', icon: '💻' },
      { label: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
      { label: 'ArtStation', url: 'https://artstation.com', icon: '🎨' }
    ]
  }
]

// Store state interface
interface PortfolioState {
  // Current section
  currentSectionIndex: number
  currentSection: Section
  
  // UI state
  introComplete: boolean
  isTransitioning: boolean
  panelVisible: boolean
  
  // Mouse position for parallax
  mousePosition: { x: number; y: number }
  
  // Actions
  setCurrentSectionIndex: (index: number) => void
  goToSection: (sectionId: string) => void
  nextSection: () => void
  prevSection: () => void
  setIntroComplete: (complete: boolean) => void
  setTransitioning: (transitioning: boolean) => void
  setPanelVisible: (visible: boolean) => void
  setMousePosition: (x: number, y: number) => void
}

const usePortfolioStore = create<PortfolioState>((set, get) => ({
  // Initial state
  currentSectionIndex: 0,
  currentSection: SECTIONS[0],
  introComplete: false,
  isTransitioning: false,
  panelVisible: false,
  mousePosition: { x: 0, y: 0 },
  
  // Actions
  setCurrentSectionIndex: (index) => {
    const clampedIndex = Math.max(0, Math.min(index, SECTIONS.length - 1))
    set({ 
      currentSectionIndex: clampedIndex,
      currentSection: SECTIONS[clampedIndex],
      isTransitioning: true,
      panelVisible: false
    })
    // Auto-show panel after camera transition
    setTimeout(() => {
      set({ isTransitioning: false, panelVisible: true })
    }, 1200)
  },
  
  goToSection: (sectionId) => {
    const index = SECTIONS.findIndex(s => s.id === sectionId)
    if (index !== -1) {
      get().setCurrentSectionIndex(index)
    }
  },
  
  nextSection: () => {
    const { currentSectionIndex, isTransitioning } = get()
    if (isTransitioning) return
    if (currentSectionIndex < SECTIONS.length - 1) {
      get().setCurrentSectionIndex(currentSectionIndex + 1)
    }
  },
  
  prevSection: () => {
    const { currentSectionIndex, isTransitioning } = get()
    if (isTransitioning) return
    if (currentSectionIndex > 0) {
      get().setCurrentSectionIndex(currentSectionIndex - 1)
    }
  },
  
  setIntroComplete: (complete) => set({ introComplete: complete, panelVisible: complete }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  setPanelVisible: (visible) => set({ panelVisible: visible }),
  setMousePosition: (x, y) => set({ mousePosition: { x, y } })
}))

export default usePortfolioStore
