// Simple performance detection helper
// Determines whether to disable or scale down expensive features on mobile/low-power devices
export default function usePerformance() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : ''
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua)

  // Hardware hints
  const cores = typeof navigator !== 'undefined' && (navigator as any).hardwareConcurrency ? (navigator as any).hardwareConcurrency : 4
  const deviceMemory = typeof navigator !== 'undefined' && (navigator as any).deviceMemory ? (navigator as any).deviceMemory : 4

  const lowPower = isMobile || cores <= 2 || deviceMemory <= 1

  // Choose a conservative DPR for lower-end/phone devices
  const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)

  return {
    isMobile,
    lowPower,
    dpr
  }
}
