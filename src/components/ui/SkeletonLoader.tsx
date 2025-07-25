import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'card' | 'image'
  width?: string | number
  height?: string | number
  lines?: number
  className?: string
  animate?: boolean
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = '20px',
  lines = 1,
  className = '',
  animate = true
}) => {
  const baseStyles: React.CSSProperties = {
    backgroundColor: '#324859',
    borderRadius: variant === 'circular' ? '50%' : '4px',
    width,
    height
  }

  const shimmerAnimation = animate ? {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear'
    }
  } : {}

  const shimmerStyles: React.CSSProperties = animate ? {
    background: 'linear-gradient(90deg, #324859 25%, #50afb6 50%, #324859 75%)',
    backgroundSize: '200% 100%',
    ...baseStyles
  } : baseStyles

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`skeleton-text-container ${className}`}>
        {Array.from({ length: lines }, (_, index) => (
          <motion.div
            key={index}
            animate={shimmerAnimation}
            style={{
              ...shimmerStyles,
              width: index === lines - 1 ? '60%' : '100%',
              marginBottom: index < lines - 1 ? '8px' : '0'
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`skeleton-card ${className}`} style={{ width, height }}>
        <motion.div
          animate={shimmerAnimation}
          style={{
            ...shimmerStyles,
            width: '100%',
            height: '60%',
            marginBottom: '12px'
          }}
        />
        <motion.div
          animate={shimmerAnimation}
          style={{
            ...shimmerStyles,
            width: '80%',
            height: '16px',
            marginBottom: '8px'
          }}
        />
        <motion.div
          animate={shimmerAnimation}
          style={{
            ...shimmerStyles,
            width: '60%',
            height: '16px'
          }}
        />
      </div>
    )
  }

  if (variant === 'image') {
    return (
      <div className={`skeleton-image ${className}`} style={{ width, height, position: 'relative' }}>
        <motion.div
          animate={shimmerAnimation}
          style={{
            ...shimmerStyles,
            width: '100%',
            height: '100%'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.3
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
              stroke="#50afb6"
              strokeWidth="2"
            />
            <circle cx="8.5" cy="8.5" r="1.5" stroke="#50afb6" strokeWidth="2" />
            <path d="M21 15l-5-5L5 21" stroke="#50afb6" strokeWidth="2" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className={`skeleton-loader ${className}`}
      animate={shimmerAnimation}
      style={shimmerStyles}
    />
  )
}

// Preset skeleton components for common use cases
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className 
}) => (
  <SkeletonLoader variant="text" lines={lines} className={className} />
)

export const SkeletonCard: React.FC<{ width?: string | number; height?: string | number; className?: string }> = ({ 
  width = '100%', 
  height = '200px', 
  className 
}) => (
  <SkeletonLoader variant="card" width={width} height={height} className={className} />
)

export const SkeletonImage: React.FC<{ width?: string | number; height?: string | number; className?: string }> = ({ 
  width = '100%', 
  height = '200px', 
  className 
}) => (
  <SkeletonLoader variant="image" width={width} height={height} className={className} />
)

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({ 
  size = 40, 
  className 
}) => (
  <SkeletonLoader variant="circular" width={size} height={size} className={className} />
)