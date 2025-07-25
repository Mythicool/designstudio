import { useEffect, useState, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

interface PerformanceMetrics {
  fps: number
  memoryUsage?: number
  connectionType?: string
  isLowEndDevice: boolean
}

interface OptimizationSettings {
  reduceAnimations: boolean
  enableLazyLoading: boolean
  useSkeletonScreens: boolean
  optimizeImages: boolean
  reducedParticleCount: boolean
}

export function usePerformanceOptimization() {
  const shouldReduceMotion = useReducedMotion()
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    isLowEndDevice: false
  })
  const [settings, setSettings] = useState<OptimizationSettings>({
    reduceAnimations: false,
    enableLazyLoading: true,
    useSkeletonScreens: true,
    optimizeImages: true,
    reducedParticleCount: false
  })

  // Detect device capabilities
  useEffect(() => {
    const detectDeviceCapabilities = () => {
      // Check for low-end device indicators
      const isLowEndDevice = 
        // Check memory (if available)
        (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4 ||
        // Check hardware concurrency
        navigator.hardwareConcurrency <= 2 ||
        // Check connection type
        (navigator as any).connection?.effectiveType === 'slow-2g' ||
        (navigator as any).connection?.effectiveType === '2g'

      // Get connection info
      const connection = (navigator as any).connection
      const connectionType = connection?.effectiveType || 'unknown'

      setMetrics(prev => ({
        ...prev,
        isLowEndDevice,
        connectionType,
        memoryUsage: (navigator as any).deviceMemory
      }))

      // Adjust settings based on device capabilities
      setSettings(prev => ({
        ...prev,
        reduceAnimations: shouldReduceMotion || isLowEndDevice,
        reducedParticleCount: isLowEndDevice,
        optimizeImages: connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
      }))
    }

    detectDeviceCapabilities()
  }, [shouldReduceMotion])

  // FPS monitoring
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setMetrics(prev => ({ ...prev, fps }))
        
        // Adjust settings based on FPS
        if (fps < 30) {
          setSettings(prev => ({
            ...prev,
            reduceAnimations: true,
            reducedParticleCount: true
          }))
        }
        
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Image optimization utilities
  const getOptimizedImageSrc = useCallback((src: string, width?: number, quality?: number) => {
    if (!settings.optimizeImages) return src
    
    // In a real app, this would integrate with image optimization services
    // like Cloudinary, ImageKit, or Next.js Image Optimization
    const params = new URLSearchParams()
    
    if (width) params.append('w', width.toString())
    if (quality) params.append('q', quality.toString())
    
    // For slow connections, reduce quality
    if (metrics.connectionType === 'slow-2g' || metrics.connectionType === '2g') {
      params.set('q', '60')
    }
    
    return params.toString() ? `${src}?${params.toString()}` : src
  }, [settings.optimizeImages, metrics.connectionType])

  // Animation configuration based on performance
  const getAnimationConfig = useCallback(() => {
    if (settings.reduceAnimations) {
      return {
        duration: 0,
        ease: 'linear',
        skipAnimations: true
      }
    }

    // Aggressive optimization for 60fps target
    if (metrics.fps < 45) {
      return {
        duration: 0.15,
        ease: 'easeOut',
        reduceComplexity: true,
        skipAnimations: false
      }
    }

    if (metrics.fps < 55) {
      return {
        duration: 0.25,
        ease: 'easeOut',
        reduceComplexity: true,
        skipAnimations: false
      }
    }

    return {
      duration: 0.4,
      ease: 'easeInOut',
      reduceComplexity: false,
      skipAnimations: false
    }
  }, [settings.reduceAnimations, metrics.fps])

  // Get current FPS for real-time optimization
  const getCurrentFPS = useCallback(() => {
    return metrics.fps
  }, [metrics.fps])

  // Particle count based on performance
  const getOptimalParticleCount = useCallback((baseCount: number) => {
    if (settings.reducedParticleCount || metrics.isLowEndDevice) {
      return Math.max(Math.floor(baseCount * 0.3), 5)
    }
    
    if (metrics.fps < 45) {
      return Math.max(Math.floor(baseCount * 0.6), 10)
    }
    
    return baseCount
  }, [settings.reducedParticleCount, metrics.isLowEndDevice, metrics.fps])

  return {
    metrics,
    settings,
    getOptimizedImageSrc,
    getAnimationConfig,
    getOptimalParticleCount,
    getCurrentFPS,
    shouldReduceMotion: settings.reduceAnimations
  }
}

// Hook for preloading critical resources
export function useResourcePreloader() {
  const [preloadedResources, setPreloadedResources] = useState<Set<string>>(new Set())

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (preloadedResources.has(src)) {
        resolve()
        return
      }

      const img = new Image()
      img.onload = () => {
        setPreloadedResources(prev => new Set(prev).add(src))
        resolve()
      }
      img.onerror = reject
      img.src = src
    })
  }, [preloadedResources])

  const preloadImages = useCallback(async (sources: string[]) => {
    const promises = sources.map(src => preloadImage(src))
    await Promise.allSettled(promises)
  }, [preloadImage])

  const preloadFont = useCallback((fontFamily: string, fontWeight?: string) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    
    // This would need to be adapted based on your font loading strategy
    link.href = `/fonts/${fontFamily}-${fontWeight || 'regular'}.woff2`
    
    document.head.appendChild(link)
  }, [])

  return {
    preloadImage,
    preloadImages,
    preloadFont,
    isPreloaded: (src: string) => preloadedResources.has(src)
  }
}