declare module '../store/useInteractionStore' {
  export default function useInteractionStore<T = any>(selector?: (state: any) => T): T
}
type InteractionStore = {
  scrollProgress: number
  cameraMode: 'explore' | 'focused'
  focusedObject: string | null
  hoveredObject: string | null
  isTransitioning: boolean
  activeContent: any
  contentVisible: boolean

  setScrollProgress: (progress: number) => void
  setHoveredObject: (objectId: string | null) => void
  focusOnObject: (objectId: string | null, contentData?: any) => void
  unfocus: () => void
  reset: () => void
}

declare const useInteractionStore: <T = any>(selector: (state: InteractionStore) => T) => T
export default useInteractionStore
