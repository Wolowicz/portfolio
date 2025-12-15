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
    title: 'Welcome',
    subtitle: 'Creative Developer',
    description: 'Building immersive digital experiences',
    color: '#ffb87a',
    icon: '✨',
    cameraPosition: {
      position: new THREE.Vector3(0, 3.5, 8),
      target: new THREE.Vector3(0, 1, 0)
    }
  },
  {
    id: 'about',
    title: 'About Me',
    subtitle: 'Who I Am',
    description: 'Passionate developer crafting beautiful, interactive web experiences. I blend creativity with technical expertise to build memorable digital products.',
    color: '#8b5cf6',
    icon: '👨‍💻',
    cameraPosition: {
      position: new THREE.Vector3(-4, 2.5, 4),
      target: new THREE.Vector3(-2, 1, 0)
    },
    items: [
      '🎨 Creative Problem Solver',
      '💡 UI/UX Enthusiast', 
      '🚀 Continuous Learner',
      '🌍 Open Source Contributor'
    ]
  },
  {
    id: 'skills',
    title: 'Skills',
    subtitle: 'What I Do',
    description: 'Technologies and tools I use to bring ideas to life.',
    color: '#f59e0b',
    icon: '⚡',
    cameraPosition: {
      position: new THREE.Vector3(3, 3, 5),
      target: new THREE.Vector3(1.5, 1.5, 0)
    },
    items: [
      '⚛️ React & TypeScript',
      '🎮 Three.js & WebGL',
      '🖥️ Node.js & Python',
      '🎨 Figma & UI Design',
      '📱 React Native',
      '☁️ AWS & Cloud'
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
      position: new THREE.Vector3(4, 2, 3),
      target: new THREE.Vector3(2, 1.5, -1)
    },
    items: [
      '🌐 3D Portfolio Website',
      '📊 Interactive Data Viz',
      '📱 Mobile Applications',
      '🎮 WebGL Games'
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com', icon: '🔗' },
      { label: 'Live Demo', url: '#', icon: '🌐' }
    ]
  },
  {
    id: 'gallery',
    title: 'Gallery',
    subtitle: 'Visual Journey',
    description: 'A visual showcase of my creative work and experiments.',
    color: '#06b6d4',
    icon: '🎨',
    cameraPosition: {
      position: new THREE.Vector3(-3, 4, 5),
      target: new THREE.Vector3(0, 1, 0)
    },
    items: [
      '🖼️ UI/UX Designs',
      '🎬 Motion Graphics',
      '📸 Photography',
      '✏️ Illustrations'
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: "Let's Connect",
    description: "Got a project in mind? Let's make something amazing together!",
    color: '#ec4899',
    icon: '💬',
    cameraPosition: {
      position: new THREE.Vector3(0, 2, 6),
      target: new THREE.Vector3(0, 1, 0)
    },
    links: [
      { label: 'Email Me', url: 'mailto:hello@example.com', icon: '📧' },
      { label: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
      { label: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
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
