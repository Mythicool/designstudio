import React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'
import { colors } from '../../styles/tokens'

// Page transition wrapper
interface PageTransitionProps {
  children: React.ReactNode
  pageKey: string
  direction?: 'horizontal' | 'vertical' | 'fade' | 'scale'
  duration?: number
  className?: string
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  pageKey,
  direction = 'horizontal',
  duration = 0.5,
  className
}) => {
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  if (shouldReduceMotion || animationConfig.skipAnimations) {
    return <div className={className}>{children}</div>
  }

  const getTransitionVariants = () => {
    switch (direction) {
      case 'horizontal':
        return {
          initial: { opacity: 0, x: 100 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -100 }
        }
      case 'vertical':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -50 }
        }
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 }
        }
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
    }
  }

  const variants = getTransitionVariants()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        className={className}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{
          duration: animationConfig.duration || duration,
          ease: animationConfig.ease || 'easeInOut'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Route transition with loading state
interface RouteTransitionProps {
  children: React.ReactNode
  isLoading?: boolean
  pageKey: string
  className?: string
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  isLoading = false,
  pageKey,
  className
}) => {
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  return (
    <div className={className} style={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.background.primary,
              zIndex: 1000
            }}
          >
            <LoadingSpinner />
          </motion.div>
        ) : (
          <motion.div
            key={pageKey}
            initial={shouldReduceMotion || animationConfig.skipAnimations ? false : { 
              opacity: 0, 
              y: 20 
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion || animationConfig.skipAnimations ? false : { 
              opacity: 0, 
              y: -20 
            }}
            transition={{
              duration: animationConfig.duration || 0.3,
              ease: animationConfig.ease || 'easeOut'
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Modal transition
interface ModalTransitionProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
  overlayClassName?: string
}

export const ModalTransition: React.FC<ModalTransitionProps> = ({
  children,
  isOpen,
  onClose,
  className,
  overlayClassName
}) => {
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={overlayClassName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: `${colors.background.primary}80`,
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              cursor: 'pointer'
            }}
            transition={{
              duration: animationConfig.duration || 0.2
            }}
          />

          {/* Modal content */}
          <motion.div
            className={className}
            initial={shouldReduceMotion || animationConfig.skipAnimations ? false : {
              opacity: 0,
              scale: 0.9,
              y: 50
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={shouldReduceMotion || animationConfig.skipAnimations ? false : {
              opacity: 0,
              scale: 0.9,
              y: 50
            }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            transition={{
              duration: animationConfig.duration || 0.3,
              ease: animationConfig.ease || 'easeOut'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Drawer/Sidebar transition
interface DrawerTransitionProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  side?: 'left' | 'right' | 'top' | 'bottom'
  className?: string
  overlayClassName?: string
}

export const DrawerTransition: React.FC<DrawerTransitionProps> = ({
  children,
  isOpen,
  onClose,
  side = 'left',
  className,
  overlayClassName
}) => {
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const getSlideVariants = () => {
    switch (side) {
      case 'right':
        return {
          initial: { x: '100%' },
          animate: { x: 0 },
          exit: { x: '100%' }
        }
      case 'top':
        return {
          initial: { y: '-100%' },
          animate: { y: 0 },
          exit: { y: '-100%' }
        }
      case 'bottom':
        return {
          initial: { y: '100%' },
          animate: { y: 0 },
          exit: { y: '100%' }
        }
      case 'left':
      default:
        return {
          initial: { x: '-100%' },
          animate: { x: 0 },
          exit: { x: '-100%' }
        }
    }
  }

  const slideVariants = getSlideVariants()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={overlayClassName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: `${colors.background.primary}60`,
              zIndex: 1000,
              cursor: 'pointer'
            }}
            transition={{
              duration: animationConfig.duration || 0.2
            }}
          />

          {/* Drawer content */}
          <motion.div
            className={className}
            initial={shouldReduceMotion || animationConfig.skipAnimations ? false : slideVariants.initial}
            animate={slideVariants.animate}
            exit={shouldReduceMotion || animationConfig.skipAnimations ? false : slideVariants.exit}
            style={{
              position: 'fixed',
              [side]: 0,
              ...(side === 'left' || side === 'right' ? {
                top: 0,
                bottom: 0,
                width: '300px'
              } : {
                left: 0,
                right: 0,
                height: '300px'
              }),
              zIndex: 1001,
              backgroundColor: colors.background.card,
              boxShadow: `0 4px 20px ${colors.background.primary}40`
            }}
            transition={{
              duration: animationConfig.duration || 0.3,
              ease: animationConfig.ease || 'easeOut'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Loading spinner component
const LoadingSpinner: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  if (shouldReduceMotion || animationConfig.skipAnimations) {
    return (
      <div style={{
        width: '40px',
        height: '40px',
        backgroundColor: colors.brand.primary,
        borderRadius: '50%',
        opacity: 0.6
      }} />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <motion.div
        style={{
          width: '40px',
          height: '40px',
          border: `3px solid ${colors.interactive.border}`,
          borderTop: `3px solid ${colors.brand.primary}`,
          borderRadius: '50%'
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <motion.p
        style={{
          color: colors.foreground.secondary,
          fontSize: '14px',
          margin: 0
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        Loading...
      </motion.p>
    </div>
  )
}

// Toast notification transition
interface ToastTransitionProps {
  children: React.ReactNode
  isVisible: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  className?: string
}

export const ToastTransition: React.FC<ToastTransitionProps> = ({
  children,
  isVisible,
  position = 'top-right',
  className
}) => {
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const getPositionStyles = () => {
    const base = { position: 'fixed' as const, zIndex: 1000 }
    
    switch (position) {
      case 'top-right':
        return { ...base, top: '20px', right: '20px' }
      case 'top-left':
        return { ...base, top: '20px', left: '20px' }
      case 'bottom-right':
        return { ...base, bottom: '20px', right: '20px' }
      case 'bottom-left':
        return { ...base, bottom: '20px', left: '20px' }
      case 'top-center':
        return { ...base, top: '20px', left: '50%', transform: 'translateX(-50%)' }
      case 'bottom-center':
        return { ...base, bottom: '20px', left: '50%', transform: 'translateX(-50%)' }
    }
  }

  const getSlideDirection = () => {
    if (position.includes('right')) return { x: 100 }
    if (position.includes('left')) return { x: -100 }
    if (position.includes('top')) return { y: -100 }
    if (position.includes('bottom')) return { y: 100 }
    return { y: -100 }
  }

  const slideDirection = getSlideDirection()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          style={getPositionStyles()}
          initial={shouldReduceMotion || animationConfig.skipAnimations ? false : {
            opacity: 0,
            ...slideDirection
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0
          }}
          exit={shouldReduceMotion || animationConfig.skipAnimations ? false : {
            opacity: 0,
            ...slideDirection
          }}
          transition={{
            duration: animationConfig.duration || 0.3,
            ease: animationConfig.ease || 'easeOut'
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}