import React, { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'
import { colors, typography, spacing, animations } from '../../styles/tokens'

// Enhanced button with micro-interactions
interface InteractiveButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className,
  style,
  icon,
  iconPosition = 'left'
}) => {
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.brand.primary,
          color: colors.background.primary,
          border: `2px solid ${colors.brand.primary}`,
          hoverBg: colors.interactive.hover,
          hoverBorder: colors.interactive.hover,
          activeBg: colors.brand.accent,
          shadow: `${colors.brand.primary}40`
        }
      case 'secondary':
        return {
          backgroundColor: colors.brand.secondary,
          color: colors.background.primary,
          border: `2px solid ${colors.brand.secondary}`,
          hoverBg: colors.brand.accent,
          hoverBorder: colors.brand.accent,
          activeBg: colors.interactive.ring,
          shadow: `${colors.brand.secondary}40`
        }
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.brand.primary,
          border: `2px solid ${colors.brand.primary}`,
          hoverBg: colors.brand.primary,
          hoverBorder: colors.brand.primary,
          hoverColor: colors.background.primary,
          activeBg: colors.brand.accent,
          shadow: `${colors.brand.primary}20`
        }
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.foreground.primary,
          border: '2px solid transparent',
          hoverBg: `${colors.interactive.hover}20`,
          hoverBorder: colors.interactive.border,
          activeBg: `${colors.interactive.hover}30`,
          shadow: `${colors.interactive.ring}20`
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: `${spacing[2]} ${spacing[4]}`,
          fontSize: typography.sizes.sm,
          borderRadius: '6px'
        }
      case 'md':
        return {
          padding: `${spacing[3]} ${spacing[6]}`,
          fontSize: typography.sizes.base,
          borderRadius: '8px'
        }
      case 'lg':
        return {
          padding: `${spacing[4]} ${spacing[8]}`,
          fontSize: typography.sizes.lg,
          borderRadius: '10px'
        }
    }
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  const baseStyles = {
    ...sizeStyles,
    ...variantStyles,
    fontWeight: typography.weights.medium,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
    opacity: disabled ? 0.6 : 1,
    ...style
  }

  const hoverAnimation = shouldReduceMotion || animationConfig.skipAnimations ? {} : {
    scale: 1.02,
    backgroundColor: variantStyles.hoverBg,
    borderColor: variantStyles.hoverBorder,
    color: variantStyles.hoverColor || variantStyles.color,
    boxShadow: `0 8px 25px ${variantStyles.shadow}`,
    y: -2
  }

  const tapAnimation = shouldReduceMotion || animationConfig.skipAnimations ? {} : {
    scale: 0.98,
    y: 0
  }

  return (
    <motion.button
      className={className}
      style={baseStyles}
      whileHover={disabled || loading ? {} : hoverAnimation}
      whileTap={disabled || loading ? {} : tapAnimation}
      whileFocus={{
        boxShadow: `0 0 0 3px ${colors.interactive.ring}40`,
        outline: 'none'
      }}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      transition={{
        duration: animationConfig.duration || 0.2,
        ease: animationConfig.ease || 'easeOut'
      }}
    >
      {/* Ripple effect overlay */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle, ${colors.foreground.primary}20 0%, transparent 70%)`,
          opacity: 0,
          pointerEvents: 'none'
        }}
        whileTap={shouldReduceMotion || animationConfig.skipAnimations ? {} : {
          opacity: [0, 0.3, 0],
          scale: [0.8, 1.2, 1.4]
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Loading spinner */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              width: '16px',
              height: '16px',
              border: `2px solid ${variantStyles.color}40`,
              borderTop: `2px solid ${variantStyles.color}`,
              borderRadius: '50%',
              marginRight: spacing[2]
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      {icon && iconPosition === 'left' && !loading && (
        <motion.span
          whileHover={shouldReduceMotion ? {} : { x: -2 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}

      {/* Button text */}
      <span>{children}</span>

      {/* Icon */}
      {icon && iconPosition === 'right' && !loading && (
        <motion.span
          whileHover={shouldReduceMotion ? {} : { x: 2 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  )
}

// Interactive card with hover effects
interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  hoverable?: boolean
  glowEffect?: boolean
  tiltEffect?: boolean
  scaleEffect?: boolean
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className,
  style,
  onClick,
  hoverable = true,
  glowEffect = true,
  tiltEffect = false,
  scaleEffect = true
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const baseStyles = {
    padding: spacing[6],
    backgroundColor: colors.background.card,
    borderRadius: '12px',
    border: `1px solid ${colors.interactive.border}`,
    cursor: onClick ? 'pointer' : 'default',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
    ...style
  }

  const getHoverAnimation = () => {
    if (shouldReduceMotion || animationConfig.skipAnimations || !hoverable) return {}
    
    let animation: any = {
      borderColor: colors.brand.primary
    }

    if (scaleEffect) {
      animation.scale = 1.02
    }

    if (tiltEffect) {
      animation.rotateY = 5
      animation.rotateX = 2
    }

    if (glowEffect) {
      animation.boxShadow = `0 8px 25px ${colors.brand.primary}20, 0 0 0 1px ${colors.brand.primary}30`
    }

    return animation
  }

  return (
    <motion.div
      className={className}
      style={baseStyles}
      whileHover={getHoverAnimation()}
      whileTap={onClick && !shouldReduceMotion && !animationConfig.skipAnimations ? { scale: 0.98 } : {}}
      whileFocus={{
        boxShadow: `0 0 0 3px ${colors.interactive.ring}40`,
        outline: 'none'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      transition={{
        duration: animationConfig.duration || 0.3,
        ease: animationConfig.ease || 'easeOut'
      }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {/* Glow effect overlay */}
      {glowEffect && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${colors.brand.primary}05, ${colors.brand.secondary}03)`,
            opacity: 0,
            pointerEvents: 'none'
          }}
          animate={{
            opacity: isHovered && !shouldReduceMotion && !animationConfig.skipAnimations ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {children}
    </motion.div>
  )
}

// Interactive icon with hover effects
interface InteractiveIconProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'secondary'
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  tooltip?: string
}

export const InteractiveIcon: React.FC<InteractiveIconProps> = ({
  children,
  size = 'md',
  variant = 'default',
  onClick,
  className,
  style,
  tooltip
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return { width: '32px', height: '32px', fontSize: '14px' }
      case 'md': return { width: '40px', height: '40px', fontSize: '16px' }
      case 'lg': return { width: '48px', height: '48px', fontSize: '20px' }
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          color: colors.brand.primary,
          hoverBg: `${colors.brand.primary}20`,
          hoverColor: colors.brand.primary
        }
      case 'secondary':
        return {
          color: colors.brand.secondary,
          hoverBg: `${colors.brand.secondary}20`,
          hoverColor: colors.brand.secondary
        }
      default:
        return {
          color: colors.foreground.secondary,
          hoverBg: `${colors.interactive.hover}20`,
          hoverColor: colors.foreground.primary
        }
    }
  }

  const sizeStyles = getSizeStyles()
  const variantStyles = getVariantStyles()

  const baseStyles = {
    ...sizeStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: onClick ? 'pointer' : 'default',
    position: 'relative' as const,
    color: variantStyles.color,
    transition: `all ${animations.durations.fast} ${animations.easings.easeInOut}`,
    ...style
  }

  const hoverAnimation = shouldReduceMotion || animationConfig.skipAnimations ? {} : {
    scale: 1.1,
    backgroundColor: variantStyles.hoverBg,
    color: variantStyles.hoverColor,
    rotate: onClick ? 5 : 0
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <motion.div
        className={className}
        style={baseStyles}
        whileHover={hoverAnimation}
        whileTap={onClick && !shouldReduceMotion && !animationConfig.skipAnimations ? { scale: 0.95 } : {}}
        whileFocus={{
          boxShadow: `0 0 0 2px ${colors.interactive.ring}60`,
          outline: 'none'
        }}
        onClick={onClick}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        transition={{
          duration: animationConfig.duration || 0.2,
          ease: animationConfig.ease || 'easeOut'
        }}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : undefined}
      >
        {children}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && showTooltip && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '120%',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: `${spacing[2]} ${spacing[3]}`,
              backgroundColor: colors.background.sidebar,
              color: colors.foreground.primary,
              fontSize: typography.sizes.xs,
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              zIndex: 1000,
              border: `1px solid ${colors.interactive.border}`,
              boxShadow: `0 4px 12px ${colors.background.primary}40`
            }}
          >
            {tooltip}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: `4px solid ${colors.background.sidebar}`
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Loading animation component
interface LoadingAnimationProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  type = 'spinner',
  size = 'md',
  color = colors.brand.primary,
  className
}) => {
  const shouldReduceMotion = useReducedMotion()
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const getSizeValue = () => {
    switch (size) {
      case 'sm': return '16px'
      case 'md': return '24px'
      case 'lg': return '32px'
    }
  }

  if (shouldReduceMotion || animationConfig.skipAnimations) {
    return (
      <div 
        className={className}
        style={{
          width: getSizeValue(),
          height: getSizeValue(),
          backgroundColor: color,
          borderRadius: type === 'spinner' ? '50%' : '2px',
          opacity: 0.6
        }}
      />
    )
  }

  switch (type) {
    case 'spinner':
      return (
        <motion.div
          className={className}
          style={{
            width: getSizeValue(),
            height: getSizeValue(),
            border: `2px solid ${color}20`,
            borderTop: `2px solid ${color}`,
            borderRadius: '50%'
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )

    case 'dots':
      return (
        <div className={className} style={{ display: 'flex', gap: '4px' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: color,
                borderRadius: '50%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )

    case 'pulse':
      return (
        <motion.div
          className={className}
          style={{
            width: getSizeValue(),
            height: getSizeValue(),
            backgroundColor: color,
            borderRadius: '50%'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )

    default:
      return null
  }
}

// Focus trap for accessibility
interface FocusTrapProps {
  children: React.ReactNode
  active: boolean
  className?: string
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  active,
  className
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!active || !containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [active])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}