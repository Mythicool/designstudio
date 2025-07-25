import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { useIntersectionObserver } from './useIntersectionObserver'
import { usePerformanceOptimization } from './usePerformanceOptimization'

// Hook for scroll-triggered animations with performance optimization
export function useScrollTrigger(
  threshold: number = 0.1,
  rootMargin: string = '0px',
  once: boolean = true
) {
  const ref = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(ref, {
    threshold,
    rootMargin,
    freezeOnceVisible: once
  })
  const { shouldReduceMotion } = usePerformanceOptimization()

  return {
    ref,
    isVisible: shouldReduceMotion ? true : isVisible,
    shouldAnimate: !shouldReduceMotion && isVisible
  }
}

// Hook for parallax effects with performance optimization
export function useParallax(
  speed: number = 0.5,
  offset: [number, number] = [0, 200],
  direction: 'vertical' | 'horizontal' = 'vertical'
) {
  const { scrollY, scrollX } = useScroll()
  const { shouldReduceMotion } = usePerformanceOptimization()
  
  const scrollValue = direction === 'vertical' ? scrollY : scrollX
  
  const transform = useTransform(
    scrollValue,
    offset,
    shouldReduceMotion ? [0, 0] : [0, (offset[1] - offset[0]) * speed]
  )
  
  const smoothTransform = useSpring(transform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return shouldReduceMotion ? 0 : smoothTransform
}

// Hook for staggered animations
export function useStaggeredAnimation(
  itemCount: number,
  staggerDelay: number = 0.1,
  threshold: number = 0.1
) {
  const ref = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(ref, { threshold, freezeOnceVisible: true })
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animationConfig.skipAnimations ? 0 : staggerDelay,
        delayChildren: animationConfig.skipAnimations ? 0 : 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationConfig.duration || 0.6,
        ease: animationConfig.ease || 'easeOut'
      }
    }
  }

  return {
    ref,
    isVisible,
    containerVariants,
    itemVariants,
    shouldAnimate: !animationConfig.skipAnimations && isVisible
  }
}

// Hook for scroll-based value transformations
export function useScrollTransform(
  inputRange: [number, number],
  outputRange: [number, number],
  options?: {
    clamp?: boolean
    ease?: (t: number) => number
  }
) {
  const { scrollY } = useScroll()
  const { shouldReduceMotion } = usePerformanceOptimization()
  
  const transform = useTransform(
    scrollY,
    inputRange,
    shouldReduceMotion ? [outputRange[0], outputRange[0]] : outputRange,
    options
  )

  return shouldReduceMotion ? outputRange[0] : transform
}

// Hook for scroll-triggered counters
export function useScrollCounter(
  from: number,
  to: number,
  duration: number = 2000,
  threshold: number = 0.5
) {
  const ref = useRef<HTMLElement>(null)
  const [count, setCount] = useState(from)
  const isVisible = useIntersectionObserver(ref, { threshold, freezeOnceVisible: true })
  const { shouldReduceMotion } = usePerformanceOptimization()

  useEffect(() => {
    if (!isVisible || shouldReduceMotion) {
      setCount(to)
      return
    }

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = from + (to - from) * easeOutQuart
      
      setCount(Math.round(currentCount))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, from, to, duration, shouldReduceMotion])

  return { ref, count, isVisible }
}

// Hook for scroll-based text reveal
export function useTextReveal(
  text: string,
  mode: 'words' | 'characters' = 'words',
  staggerDelay: number = 0.05,
  threshold: number = 0.1
) {
  const ref = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(ref, { threshold, freezeOnceVisible: true })
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const elements = mode === 'words' ? text.split(' ') : text.split('')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animationConfig.skipAnimations ? 0 : staggerDelay,
        delayChildren: animationConfig.skipAnimations ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationConfig.duration || 0.4,
        ease: animationConfig.ease || 'easeOut'
      }
    }
  }

  return {
    ref,
    elements,
    isVisible,
    containerVariants,
    itemVariants,
    shouldAnimate: !animationConfig.skipAnimations
  }
}

// Hook for scroll progress tracking
export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  const { shouldReduceMotion } = usePerformanceOptimization()
  
  return shouldReduceMotion ? 0 : scrollYProgress
}

// Hook for element-specific scroll progress
export function useElementScrollProgress() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const { shouldReduceMotion } = usePerformanceOptimization()

  return {
    ref,
    progress: shouldReduceMotion ? 0 : scrollYProgress
  }
}

// Hook for scroll-based morphing animations
export function useScrollMorph(
  scrollRange: [number, number],
  morphStates: any[],
  options?: {
    ease?: (t: number) => number
    clamp?: boolean
  }
) {
  const { scrollY } = useScroll()
  const { shouldReduceMotion } = usePerformanceOptimization()
  
  if (shouldReduceMotion) {
    return morphStates[0]
  }

  // Create transforms for each property that changes between states
  const transforms: Record<string, MotionValue<any>> = {}
  
  if (morphStates.length >= 2) {
    const firstState = morphStates[0]
    const lastState = morphStates[morphStates.length - 1]
    
    Object.keys(firstState).forEach(key => {
      if (typeof firstState[key] === 'number' && typeof lastState[key] === 'number') {
        transforms[key] = useTransform(
          scrollY,
          scrollRange,
          [firstState[key], lastState[key]],
          options
        )
      }
    })
  }

  return transforms
}

// Hook for scroll-triggered page transitions
export function useScrollPageTransition(
  sections: string[],
  threshold: number = 0.5
) {
  const [currentSection, setCurrentSection] = useState(sections[0])
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const { shouldReduceMotion } = usePerformanceOptimization()

  useEffect(() => {
    if (shouldReduceMotion) return

    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSection(sections[index])
          }
        },
        { threshold }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [sections, threshold, shouldReduceMotion])

  const registerSection = useCallback((index: number) => (ref: HTMLElement | null) => {
    sectionRefs.current[index] = ref
  }, [])

  return {
    currentSection,
    registerSection
  }
}