import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image } from '../../data/types'
import { ProgressiveImage } from '../ui/ProgressiveImage'
import { OptimizedMotionDiv } from '../ui/OptimizedMotion'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'
import './ImageCarousel.styles.css'

interface ImageCarouselProps {
  images: Image[]
  projectTitle: string
  className?: string
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  projectTitle,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({})
  const { getOptimizedImageSrc, getAnimationConfig } = usePerformanceOptimization()

  const currentImage = images[currentIndex]
  const animationConfig = getAnimationConfig()

  // Preload images for smooth transitions
  useEffect(() => {
    images.forEach((image) => {
      const img = new window.Image()
      img.onload = () => {
        setImageLoadStates(prev => ({ ...prev, [image.id]: true }))
      }
      img.src = image.url
    })
  }, [images])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFullscreen) return
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          event.preventDefault()
          goToNext()
          break
        case 'Escape':
          event.preventDefault()
          setIsFullscreen(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, goToNext, goToPrevious])

  if (images.length === 0) {
    return (
      <div className={`image-carousel empty ${className}`}>
        <div className="carousel-placeholder">
          <p>No images available</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`image-carousel ${className}`}>
        {/* Main Image Display */}
        <div className="carousel-main">
          <AnimatePresence mode="wait">
            <OptimizedMotionDiv
              key={currentIndex}
              className="carousel-image-container"
              initial={{ opacity: 0, x: animationConfig.skipAnimations ? 0 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: animationConfig.skipAnimations ? 0 : -100 }}
              transition={{ duration: animationConfig.duration, ease: animationConfig.ease }}
            >
              <ProgressiveImage
                src={getOptimizedImageSrc(currentImage.url, 800, 85)}
                alt={currentImage.alt}
                className="carousel-image"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
                onLoad={() => setImageLoadStates(prev => ({ ...prev, [currentImage.id]: true }))}
              />
              
              <motion.div
                className="carousel-image-overlay"
                whileHover={animationConfig.skipAnimations ? {} : { scale: 1.02 }}
                transition={{ duration: animationConfig.duration }}
                onClick={toggleFullscreen}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  cursor: 'pointer'
                }}
              />

              {/* Image Caption */}
              {currentImage.caption && (
                <motion.div
                  className="image-caption"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {currentImage.caption}
                </motion.div>
              )}

              {/* Fullscreen Button */}
              <motion.button
                className="fullscreen-button"
                onClick={toggleFullscreen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                className="carousel-nav carousel-prev"
                onClick={goToPrevious}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              <motion.button
                className="carousel-nav carousel-next"
                onClick={goToNext}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <motion.div
            className="carousel-thumbnails"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {images.map((image, index) => (
              <motion.button
                key={image.id}
                className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <img
                  src={image.url}
                  alt={`${projectTitle} thumbnail ${index + 1}`}
                  loading="lazy"
                />
                <div className="thumbnail-overlay" />
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <motion.div
            className="image-counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {currentIndex + 1} / {images.length}
          </motion.div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fullscreen-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleFullscreen}
          >
            <motion.div
              className="fullscreen-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                className="fullscreen-image"
              />
              
              <button
                className="fullscreen-close"
                onClick={toggleFullscreen}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {images.length > 1 && (
                <>
                  <button
                    className="fullscreen-nav fullscreen-prev"
                    onClick={goToPrevious}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 18l-6-6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    className="fullscreen-nav fullscreen-next"
                    onClick={goToNext}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}