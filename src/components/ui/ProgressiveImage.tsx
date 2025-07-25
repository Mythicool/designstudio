import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface ProgressiveImageProps {
  src: string
  alt: string
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  sizes?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  placeholder,
  className = '',
  style = {},
  sizes,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Only load image when it's visible (for lazy loading)
  const isVisible = useIntersectionObserver(containerRef, {
    threshold: 0.1,
    rootMargin: '50px'
  })

  useEffect(() => {
    if (loading === 'eager' || isVisible) {
      loadImage()
    }
  }, [src, isVisible, loading])

  const loadImage = () => {
    const img = new Image()
    
    img.onload = () => {
      setImageSrc(src)
      setImageState('loaded')
      onLoad?.()
    }
    
    img.onerror = () => {
      setImageState('error')
      onError?.()
    }
    
    // Add sizes attribute for responsive images
    if (sizes) {
      img.sizes = sizes
    }
    
    img.src = src
  }

  const generatePlaceholder = () => {
    if (placeholder) return placeholder
    
    // Generate a simple SVG placeholder with blur effect
    const svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#324859;stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:#50afb6;stop-opacity:0.1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <circle cx="200" cy="150" r="30" fill="#50afb6" opacity="0.2" />
      </svg>
    `
    
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  return (
    <div
      ref={containerRef}
      className={`progressive-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1c2e38',
        ...style
      }}
    >
      <AnimatePresence mode="wait">
        {imageState === 'loading' && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={generatePlaceholder()}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(10px)',
                transform: 'scale(1.1)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <LoadingSpinner />
            </div>
          </motion.div>
        )}

        {imageState === 'loaded' && imageSrc && (
          <motion.img
            key="image"
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            sizes={sizes}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}

        {imageState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1c2e38',
              color: '#c4b5a0'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginBottom: '8px', opacity: 0.5 }}
              >
                <path
                  d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" />
                <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" />
              </svg>
              <p style={{ fontSize: '14px', opacity: 0.7 }}>Failed to load image</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const LoadingSpinner: React.FC = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    style={{
      width: '24px',
      height: '24px',
      border: '2px solid #324859',
      borderTop: '2px solid #50afb6',
      borderRadius: '50%'
    }}
  />
)