import React from 'react'
import { motion, MotionProps, useReducedMotion } from 'framer-motion'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'

// Optimized motion components that respect performance constraints
interface OptimizedMotionProps extends MotionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  enableGPUAcceleration?: boolean
}

export const OptimizedMotionDiv: React.FC<OptimizedMotionProps> = ({
  children,
  fallback,
  enableGPUAcceleration = true,
  animate,
  initial,
  transition,
  ...props
}) => {
  const { getAnimationConfig, shouldReduceMotion } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()
  
  const animationConfig = getAnimationConfig()
  
  // If reduced motion is preferred, render fallback or static version
  if (prefersReducedMotion || shouldReduceMotion) {
    if (fallback) {
      return <>{fallback}</>
    }
    
    return (
      <div {...(props as any)}>
        {children}
      </div>
    )
  }

  // Optimize transition settings
  const optimizedTransition: any = {
    ...transition,
    duration: animationConfig.skipAnimations ? 0 : (transition?.duration || animationConfig.duration),
    ease: transition?.ease || animationConfig.ease,
    // Force GPU-optimized properties
    type: 'tween'
  }

  // Add GPU acceleration styles
  const gpuStyles = enableGPUAcceleration ? {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const,
    perspective: 1000
  } : {}

  return (
    <motion.div
      {...props}
      initial={animationConfig.skipAnimations ? false : initial}
      animate={animationConfig.skipAnimations ? false : animate}
      transition={optimizedTransition}
      style={{
        ...props.style,
        ...gpuStyles
      }}
    >
      {children}
    </motion.div>
  )
}

export const OptimizedMotionSpan: React.FC<OptimizedMotionProps> = ({
  children,
  fallback,
  enableGPUAcceleration = true,
  animate,
  initial,
  transition,
  ...props
}) => {
  const { getAnimationConfig, shouldReduceMotion } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()
  
  const animationConfig = getAnimationConfig()
  
  if (prefersReducedMotion || shouldReduceMotion) {
    if (fallback) {
      return <>{fallback}</>
    }
    
    return (
      <span {...(props as any)}>
        {children}
      </span>
    )
  }

  const optimizedTransition: any = {
    ...transition,
    duration: animationConfig.skipAnimations ? 0 : (transition?.duration || animationConfig.duration),
    ease: transition?.ease || animationConfig.ease,
    type: 'tween'
  }

  const gpuStyles = enableGPUAcceleration ? {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const
  } : {}

  return (
    <motion.span
      {...props}
      initial={animationConfig.skipAnimations ? false : initial}
      animate={animationConfig.skipAnimations ? false : animate}
      transition={optimizedTransition}
      style={{
        ...props.style,
        ...gpuStyles
      }}
    >
      {children}
    </motion.span>
  )
}

// Scroll-triggered animation with performance optimization
interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  animation?: {
    initial: any
    animate: any
    transition?: any
  }
  fallback?: React.ReactNode
}

export const ScrollTriggeredAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className,
  threshold = 0.1,
  rootMargin = '0px',
  animation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },
  fallback
}) => {
  const { shouldReduceMotion } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion || shouldReduceMotion) {
    if (fallback) {
      return <>{fallback}</>
    }
    
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={animation.initial}
      whileInView={animation.animate}
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        ...animation.transition
      }}
      style={{
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation with performance optimization
interface StaggeredAnimationProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  containerAnimation?: any
  childAnimation?: any
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  containerAnimation = {},
  childAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }
}) => {
  const { shouldReduceMotion, getAnimationConfig } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()
  const animationConfig = getAnimationConfig()
  
  if (prefersReducedMotion || shouldReduceMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animationConfig.skipAnimations ? 0 : staggerDelay,
        ...containerAnimation.transition
      }
    }
  }

  const childVariants = {
    hidden: childAnimation.initial,
    visible: {
      ...childAnimation.animate,
      transition: {
        duration: animationConfig.duration,
        ease: animationConfig.ease,
        type: 'tween'
      } as any
    }
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={childVariants}
          style={{ willChange: 'transform, opacity' }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}