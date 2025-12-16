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
  // Expanded panel content
  fullContent?: string[]
  fullBullets?: string[]
}

// Sekcje z pozycjami kamery - kamera będzie się przemieszczać między obiektami
export const SECTIONS: Section[] = [
  {
    id: 'hero',
    title: 'Patrycja Wołowicz',
    subtitle: 'Aspiring Environment & Concept Artist',
    description: 'Computer Science Engineering student developing skills in 2D and 3D art for games. Focused on visual storytelling, atmosphere, and collaborative game development.',
    color: '#ffb87a',
    icon: '🙋‍♀️',
    cameraPosition: {
      position: new THREE.Vector3(0, 3, 12),
      target: new THREE.Vector3(0, -1, 0)
    }
  },
  {
    id: 'about',
    title: 'About Me',
    subtitle: 'Who I Am',
    description: 'Computer Science Engineering student with a strong interest in art, game development, and visual design. Combining technical education with creative projects.',
    color: '#8b5cf6',
    icon: '✨',
    cameraPosition: {
      position: new THREE.Vector3(-2, 3, 9),
      target: new THREE.Vector3(-0.9, -0.5, 0)
    },
    items: [
      'Artistic Approach',
      'Game Development & Jams',
      'Blender & SolidWorks',
      'Three.js & Web 3D'
    ],
    fullContent: [
      'I am a Computer Science Engineering student passionate about visual storytelling and environment design. I combine technical problem-solving with artistic sensibility to create immersive experiences that communicate mood and narrative.',
      'My work spans 2D and 3D, including concept art, environment design, and interactive web experiences. I enjoy collaborating with interdisciplinary teams and learning new tools to push visual design forward.',
      'I approach projects with attention to composition, lighting, and atmosphere — always focused on clear communication and polish.'
    ],
    fullBullets: [
      'Strong foundation in 3D modeling and texturing',
      'Experience with Blender, Three.js, and game engines',
      'Collaborative mindset and iterative design process'
    ]
  },
  {
    id: 'skills',
    title: 'Skills',
    subtitle: 'Tools & Expertise',
    description: 'Technologies and tools I use to bring ideas to life.',
    color: '#f59e0b',
    icon: '🎯',
    cameraPosition: {
      position: new THREE.Vector3(-5, 3, 7),
      target: new THREE.Vector3(-1, 0, -1)
    },
    items: [
      'Environment Design',
      'Blender & 3D Modeling',
      'Unity & Game Jams',
      'Pixel Art & Concept Art',
      'Three.js & React',
      'SolidWorks & CAD'
    ],
    fullContent: [
      'My technical skillset allows me to move rapidly from concept to polished assets. I specialize in environment composition, lighting, and asset optimization for interactive applications.',
      'I prioritize readability and performance while maintaining an aesthetic that supports the project’s narrative and gameplay goals.'
    ],
    fullBullets: [
      'Asset creation: modeling, UVs, texturing',
      'Realtime pipelines: optimization and LOD',
      'Tooling: Three.js, React, Unity integration'
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'My Work',
    description: 'A collection of projects showcasing my skills in game development and visual design.',
    color: '#10b981',
    icon: '💡',
    cameraPosition: {
      position: new THREE.Vector3(3, 1, 6),
      target: new THREE.Vector3(0, -1, 0)
    },
    items: [
      'Interactive 3D Portfolio',
      'Unity Game Project (Team Lead)',
      'Cyberiada - Pixel Art',
      'Project Meduza - SolidWorks'
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Wolowicz', icon: 'GH' }
    ],
    fullContent: [
      'Projects illustrate my capacity to lead and execute: I have delivered interactive web experiences, led small teams in game jams, and produced both 2D and 3D assets to shipping quality.',
      'Each project focuses on solving design constraints efficiently while preserving an original visual voice.'
    ],
    fullBullets: [
      'Interactive portfolio with real-time 3D presentation',
      'Game design and implementation during jams',
      'Cross-disciplinary collaboration and documentation'
    ]
  },
  {
    id: 'fitforjob',
    title: 'Fit for a Job',
    subtitle: 'Why Me',
    description: 'Artistic sensitivity, technical awareness, and experience working in teams under pressure.',
    color: '#06b6d4',
    icon: '💼',
    cameraPosition: {
      position: new THREE.Vector3(5, 3, 8),
      target: new THREE.Vector3(0, -1, 0)
    },
    items: [
      'Adaptable & Quick Learner',
      'Responsible & Organized',
      'Team Player Under Pressure',
      'Delivery-Oriented'
    ],
    fullContent: [
      'I bring a professional mindset to every assignment: clear communication, punctual delivery, and a willingness to adapt to changing priorities. I excel in iterative environments where feedback is frequent and actionable.',
      'I aim to contribute not just as an artist, but as a reliable team member who understands technical constraints and product timelines.'
    ],
    fullBullets: [
      'Reliable communicator across disciplines',
      'Focused on delivering production-ready assets',
      'Comfortable with technical constraints and pipelines'
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'Get In Touch',
    description: 'Environment & Concept Art Portfolio',
    color: '#ec4899',
    icon: '🗨️',
    cameraPosition: {
      position: new THREE.Vector3(0, 2, 10),
      target: new THREE.Vector3(-0.5, -0.5, 0)
    },
    links: [
      { label: 'Email', url: 'mailto:pati.wolowicz@gmail.com', icon: 'E' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/patrycja-wo%C5%82owicz-979613329', icon: 'LI' }
    ]
  }
]

// Quick lookup for content by id/category
export const SECTION_CONTENT: Record<string, Section> = SECTIONS.reduce((acc, s) => {
  acc[s.id] = s
  return acc
}, {} as Record<string, Section>)

// Store state interface
interface PortfolioState {
  // Current section
  currentSectionIndex: number
  currentSection: Section
  
  // UI state
  introComplete: boolean
  isTransitioning: boolean
  panelVisible: boolean
  // Expanded panel state
  expandedPanelOpen: boolean
  openExpandedPanel: () => void
  closeExpandedPanel: () => void
  
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
  expandedPanelOpen: false,
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
    // Wrap to first section when reaching the end
    if (currentSectionIndex < SECTIONS.length - 1) {
      get().setCurrentSectionIndex(currentSectionIndex + 1)
    } else {
      get().setCurrentSectionIndex(0)
    }
  },
  
  prevSection: () => {
    const { currentSectionIndex, isTransitioning } = get()
    if (isTransitioning) return
    // Wrap to last section when going back from first
    if (currentSectionIndex > 0) {
      get().setCurrentSectionIndex(currentSectionIndex - 1)
    } else {
      get().setCurrentSectionIndex(SECTIONS.length - 1)
    }
  },
  
  setIntroComplete: (complete) => set({ introComplete: complete, panelVisible: complete }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  setPanelVisible: (visible) => set({ panelVisible: visible }),
  openExpandedPanel: () => set({ expandedPanelOpen: true }),
  closeExpandedPanel: () => set({ expandedPanelOpen: false }),
  setMousePosition: (x, y) => set({ mousePosition: { x, y } })

}))

export default usePortfolioStore
