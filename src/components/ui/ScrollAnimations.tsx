import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'framer-motion'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'
import { useAnimationOptimization } from '../../utils/animationOptimizer'

// Enhanced scroll-triggered reveal animation with performance optimization
interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  duration?: number
  delay?: number
  threshold?: number
  rootMargin?: string
  once?: boolean
  stagger?: boolean
  staggerDelay?: number
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  stagger = false,
  staggerDelay = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { optimizeProps, shouldSkip, scrollConfig, staggerDelay: optimizedStaggerDelay } = useAnimationOptimization()
  
  // Use optimized scroll configuration
  const optimizedThreshold = threshold || scrollConfig.threshold
  const optimizedRootMargin = rootMargin || scrollConfig.rootMargin
  const optimizedOnce = once || scrollConfig.triggerOnce
  
  const isInView = useInView(ref, { 
    once: optimizedOnce, 
    amount: optimizedThreshold, 
    margin: optimizedRootMargin 
  })

  // Skip animations if reduced motion is preferred or performance is poor
  if (shouldReduceMotion || shouldSkip) {
    return <div ref={ref} className={className}>{children}</div>
  }

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance }
      case 'down': return { opacity: 0, y: -distance }
      case 'left': return { opacity: 0, x: distance }
      case 'right': return { opacity: 0, x: -distance }
      case 'fade': return { opacity: 0 }
      default: return { opacity: 0, y: distance }
    }
  }

  const getAnimateTransform = () => {
    switch (direction) {
      case 'up':
      case 'down': return { opacity: 1, y: 0 }
      case 'left':
      case 'right': return { opacity: 1, x: 0 }
      case 'fade': return { opacity: 1 }
      default: return { opacity: 1, y: 0 }
    }
  }

  const optimizedStagger = optimizedStaggerDelay(staggerDelay)
  
  const containerVariants = stagger ? {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: optimizedStagger,
        delayChildren: delay
      }
    }
  } : undefined

  const itemVariants = stagger ? {
    hidden: getInitialTransform(),
    visible: getAnimateTransform()
  } : undefined

  if (stagger && React.Children.count(children) > 1) {
    const optimizedContainerProps = optimizeProps({
      variants: containerVariants,
      initial: "hidden",
      animate: isInView ? "visible" : "hidden"
    })
    
    const optimizedItemProps = optimizeProps({
      variants: itemVariants,
      transition: { duration, ease: 'easeOut' }
    })

    return (
      <motion.div
        ref={ref}
        className={className}
        {...optimizedContainerProps}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} {...optimizedItemProps}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  const optimizedProps = optimizeProps({
    initial: getInitialTransform(),
    animate: isInView ? getAnimateTransform() : getInitialTransform(),
    transition: {
      duration,
      delay,
      ease: 'easeOut'
    }
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      {...optimizedProps}
    >
      {children}
    </motion.div>
  )
}

// Parallax scroll effect with performance optimization
interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'vertical' | 'horizontal'
  offset?: number[]
  disabled?: boolean
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className,
  speed = 0.5,
  direction = 'vertical',
  offset = [0, 200],
  disabled = false
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY, scrollX } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const { shouldReduceMotion: performanceReduceMotion } = usePerformanceOptimization()
  
  const reduceMotion = shouldReduceMotion || performanceReduceMotion || disabled

  // Create smooth spring animation for parallax
  const scrollValue = direction === 'vertical' ? scrollY : scrollX
  const transform = useTransform(scrollValue, offset, [0, (offset[1] - offset[0]) * speed])
  const smoothTransform = useSpring(transform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  if (reduceMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  const motionStyle = direction === 'vertical' 
    ? { y: smoothTransform }
    : { x: smoothTransform }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...motionStyle,
        willChange: 'transform'
      }}
    >
      {children}
    </motion.div>
  )
}

// Staggered grid animation for cards/items
interface StaggeredGridProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  columns?: number
  gap?: string
  animationDirection?: 'up' | 'down' | 'left' | 'right' | 'scale'
  threshold?: number
}

export const StaggeredGrid: React.FC<StaggeredGridProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  columns = 3,
  gap = '1.5rem',
  animationDirection = 'up',
  threshold = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  if (shouldReduceMotion || animationConfig.skipAnimations) {
    return (
      <div 
        ref={ref}
        className={className}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
        }}
      >
        {children}
      </div>
    )
  }

  const getInitialState = () => {
    switch (animationDirection) {
      case 'up': return { opacity: 0, y: 30 }
      case 'down': return { opacity: 0, y: -30 }
      case 'left': return { opacity: 0, x: 30 }
      case 'right': return { opacity: 0, x: -30 }
      case 'scale': return { opacity: 0, scale: 0.8 }
      default: return { opacity: 0, y: 30 }
    }
  }

  const getAnimateState = () => {
    switch (animationDirection) {
      case 'up':
      case 'down': return { opacity: 1, y: 0 }
      case 'left':
      case 'right': return { opacity: 1, x: 0 }
      case 'scale': return { opacity: 1, scale: 1 }
      default: return { opacity: 1, y: 0 }
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: getInitialState(),
    visible: {
      ...getAnimateState(),
      transition: {
        duration: animationConfig.duration || 0.6,
        ease: animationConfig.ease || 'easeOut'
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        willChange: 'transform, opacity'
      }}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Scroll-triggered counter animation
interface CounterAnimationProps {
  from: number
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
  threshold?: number
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  from,
  to,
  duration = 2,
  className,
  suffix = '',
  prefix = '',
  threshold = 0.5
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const count = useTransform(
    useSpring(isInView ? to : from, {
      duration: shouldReduceMotion || animationConfig.skipAnimations ? 0 : duration * 1000,
      bounce: 0
    }),
    (value) => Math.round(value)
  )

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>{count}</motion.span>
      {suffix}
    </motion.span>
  )
}

// Text reveal animation (word by word or character by character)
interface TextRevealProps {
  text: string
  className?: string
  mode?: 'words' | 'characters'
  staggerDelay?: number
  threshold?: number
  once?: boolean
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  mode = 'words',
  staggerDelay = 0.05,
  threshold = 0.1,
  once = true
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  if (shouldReduceMotion || animationConfig.skipAnimations) {
    return <div ref={ref} className={className}>{text}</div>
  }

  const elements = mode === 'words' ? text.split(' ') : text.split('')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
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

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ willChange: 'transform, opacity' }}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          style={{ display: mode === 'words' ? 'inline-block' : 'inline' }}
        >
          {element}
          {mode === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Scroll progress indicator
interface ScrollProgressProps {
  className?: string
  height?: string
  backgroundColor?: string
  progressColor?: string
  position?: 'top' | 'bottom'
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className,
  height = '4px',
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  progressColor = '#fbe2a7',
  position = 'top'
}) => {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const { shouldReduceMotion: performanceReduceMotion } = usePerformanceOptimization()
  
  const reduceMotion = shouldReduceMotion || performanceReduceMotion

  if (reduceMotion) {
    return null
  }

  return (
    <motion.div
      className={className}
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        height,
        backgroundColor,
        zIndex: 1000,
        transformOrigin: '0%'
      }}
    >
      <motion.div
        style={{
          height: '100%',
          backgroundColor: progressColor,
          scaleX: scrollYProgress,
          transformOrigin: '0%'
        }}
      />
    </motion.div>
  )
}