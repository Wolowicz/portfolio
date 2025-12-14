import { create } from 'zustand'

// Central state management for 3D interactions
// Prevents conflicts between scroll and click states
const useInteractionStore = create((set, get) => ({
  // Camera state
  scrollProgress: 0,
  cameraMode: 'explore', // 'explore' | 'focused'
  
  // Interaction state
  focusedObject: null,
  hoveredObject: null,
  isTransitioning: false,
  
  // Content panel state
  activeContent: null,
  contentVisible: false,
  
  // Actions
  setScrollProgress: (progress) => set({ scrollProgress: Math.max(0, Math.min(1, progress)) }),
  
  setHoveredObject: (objectId) => {
    const { isTransitioning } = get()
    if (!isTransitioning) {
      set({ hoveredObject: objectId })
    }
  },
  
  focusOnObject: (objectId, contentData) => {
    const { focusedObject, isTransitioning } = get()
    
    // Prevent interaction during transitions
    if (isTransitioning) return
    
    // If clicking the same object, unfocus
    if (focusedObject === objectId) {
      set({ 
        isTransitioning: true,
        contentVisible: false
      })
      
      // Wait for content to fade out before unfocusing
      setTimeout(() => {
        set({ 
          focusedObject: null,
          activeContent: null,
          cameraMode: 'explore',
          isTransitioning: false
        })
      }, 400)
      return
    }
    
    // Focus on new object
    set({ 
      isTransitioning: true,
      contentVisible: false
    })
    
    // Slight delay before showing new content
    setTimeout(() => {
      set({ 
        focusedObject: objectId,
        activeContent: contentData,
        cameraMode: 'focused',
        isTransitioning: false,
        contentVisible: true
      })
    }, 300)
  },
  
  unfocus: () => {
    set({ 
      isTransitioning: true,
      contentVisible: false
    })
    
    setTimeout(() => {
      set({ 
        focusedObject: null,
        activeContent: null,
        cameraMode: 'explore',
        isTransitioning: false
      })
    }, 400)
  },
  
  reset: () => set({
    scrollProgress: 0,
    cameraMode: 'explore',
    focusedObject: null,
    hoveredObject: null,
    isTransitioning: false,
    activeContent: null,
    contentVisible: false
  })
}))

export default useInteractionStore
