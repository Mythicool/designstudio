import React, { useState } from 'react'
import { ProgressiveImage } from '../ui/ProgressiveImage'
import { SkeletonLoader, SkeletonCard, SkeletonText, SkeletonImage } from '../ui/SkeletonLoader'
import { OptimizedMotionDiv, ScrollTriggeredAnimation, StaggeredAnimation } from '../ui/OptimizedMotion'
import { PerformanceMonitor, PerformanceOptimizer } from '../ui/PerformanceMonitor'
import { usePerformanceOptimization, useResourcePreloader } from '../../hooks/usePerformanceOptimization'

export const PerformanceDemo: React.FC = () => {
  const [showSkeletons, setShowSkeletons] = useState(false)
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({})
  const { metrics, settings, getOptimizedImageSrc, getOptimalParticleCount } = usePerformanceOptimization()
  const { preloadImages } = useResourcePreloader()

  // Sample images for demonstration
  const sampleImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600'
  ]

  const handlePreloadImages = async () => {
    try {
      await preloadImages(sampleImages)
      alert('Images preloaded successfully!')
    } catch (error) {
      console.error('Failed to preload images:', error)
    }
  }

  const toggleSkeletons = () => {
    setShowSkeletons(prev => !prev)
    if (!showSkeletons) {
      // Simulate loading delay
      setTimeout(() => setShowSkeletons(false), 3000)
    }
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#12242e', minHeight: '100vh' }}>
      <PerformanceOptimizer />
      <PerformanceMonitor showDebugInfo={true} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#f3e3ea', marginBottom: '2rem', textAlign: 'center' }}>
          Performance Optimization Demo
        </h1>

        {/* Performance Metrics Display */}
        <div style={{ 
          backgroundColor: '#1c2e38', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid #324859'
        }}>
          <h2 style={{ color: '#50afb6', marginBottom: '1rem' }}>Current Performance Metrics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <div style={{ color: '#c4b5a0', fontSize: '14px' }}>FPS</div>
              <div style={{ color: '#f3e3ea', fontSize: '24px', fontWeight: 'bold' }}>{metrics.fps}</div>
            </div>
            <div>
              <div style={{ color: '#c4b5a0', fontSize: '14px' }}>Device Memory</div>
              <div style={{ color: '#f3e3ea', fontSize: '24px', fontWeight: 'bold' }}>
                {metrics.memoryUsage || 'Unknown'}GB
              </div>
            </div>
            <div>
              <div style={{ color: '#c4b5a0', fontSize: '14px' }}>Connection</div>
              <div style={{ color: '#f3e3ea', fontSize: '24px', fontWeight: 'bold' }}>
                {metrics.connectionType || 'Unknown'}
              </div>
            </div>
            <div>
              <div style={{ color: '#c4b5a0', fontSize: '14px' }}>Low-end Device</div>
              <div style={{ 
                color: metrics.isLowEndDevice ? '#ef4444' : '#4ade80', 
                fontSize: '24px', 
                fontWeight: 'bold' 
              }}>
                {metrics.isLowEndDevice ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ 
          backgroundColor: '#1c2e38', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid #324859'
        }}>
          <h2 style={{ color: '#50afb6', marginBottom: '1rem' }}>Demo Controls</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={toggleSkeletons}
              style={{
                backgroundColor: '#50afb6',
                color: '#12242e',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {showSkeletons ? 'Hide' : 'Show'} Skeleton Loading
            </button>
            <button
              onClick={handlePreloadImages}
              style={{
                backgroundColor: '#fbe2a7',
                color: '#12242e',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Preload Images
            </button>
          </div>
        </div>

        {/* Progressive Image Loading Demo */}
        <ScrollTriggeredAnimation>
          <div style={{ 
            backgroundColor: '#1c2e38', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            border: '1px solid #324859'
          }}>
            <h2 style={{ color: '#50afb6', marginBottom: '1rem' }}>Progressive Image Loading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {sampleImages.map((src, index) => (
                <div key={index} style={{ aspectRatio: '16/10' }}>
                  <ProgressiveImage
                    src={getOptimizedImageSrc(src, 600, 80)}
                    alt={`Demo image ${index + 1}`}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onLoad={() => setImageLoadingStates(prev => ({ ...prev, [src]: true }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollTriggeredAnimation>

        {/* Skeleton Loading Demo */}
        <ScrollTriggeredAnimation>
          <div style={{ 
            backgroundColor: '#1c2e38', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            border: '1px solid #324859'
          }}>
            <h2 style={{ color: '#50afb6', marginBottom: '1rem' }}>Skeleton Loading States</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {showSkeletons ? (
                <>
                  <SkeletonCard width="100%" height="200px" />
                  <SkeletonCard width="100%" height="200px" />
                  <SkeletonCard width="100%" height="200px" />
                </>
              ) : (
                <>
                  <div style={{ backgroundColor: '#324859', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ color: '#f3e3ea', marginBottom: '0.5rem' }}>Card Content 1</h3>
                    <p style={{ color: '#c4b5a0', fontSize: '14px' }}>
                      This is sample content that would normally load after the skeleton.
                    </p>
                  </div>
                  <div style={{ backgroundColor: '#324859', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ color: '#f3e3ea', marginBottom: '0.5rem' }}>Card Content 2</h3>
                    <p style={{ color: '#c4b5a0', fontSize: '14px' }}>
                      This is sample content that would normally load after the skeleton.
                    </p>
                  </div>
                  <div style={{ backgroundColor: '#324859', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ color: '#f3e3ea', marginBottom: '0.5rem' }}>Card Content 3</h3>
                    <p style={{ color: '#c4b5a0', fontSize: '14px' }}>
                      This is sample content that would normally load after the skeleton.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </ScrollTriggeredAnimation>

        {/* Optimized Animations Demo */}
        <ScrollTriggeredAnimation>
          <div style={{ 
            backgroundColor: '#1c2e38', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            border: '1px solid #324859'
          }}>
            <h2 style={{ color: '#50afb6', marginBottom: '1rem' }}>Optimized Animations</h2>
            <p style={{ color: '#c4b5a0', marginBottom: '1rem', fontSize: '14px' }}>
              These animations automatically adapt based on device performance and user preferences.
            </p>
            
            <StaggeredAnimation
              staggerDelay={0.1}
              childAnimation={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
              }}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <OptimizedMotionDiv
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    backgroundColor: '#324859',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  <h4 style={{ color: '#f3e3ea', marginBottom: '0.5rem' }}>
                    Animated Item {i + 1}
                  </h4>
                  <p style={{ color: '#c4b5a0', fontSize: '14px' }}>
                    This item uses optimized animations that respect performance constraints.
                  </p>
                </OptimizedMotionDiv>
              ))}
            </StaggeredAnimation>
          </div>
        </ScrollTriggeredAnimation>

        {/* Particle Count Optimization Demo */}
        <ScrollTriggeredAnimation>
          <div style={{ 
            backgroundColor: '#1c2e38', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            border: '1px solid #324859'
          }}>
            <h2 style={{ color: '#50afb6', marginBottom: '1rem' }}>Particle Count Optimization</h2>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <div style={{ color: '#c4b5a0', fontSize: '14px' }}>Base Particle Count</div>
                <div style={{ color: '#f3e3ea', fontSize: '24px', fontWeight: 'bold' }}>100</div>
              </div>
              <div>
                <div style={{ color: '#c4b5a0', fontSize: '14px' }}>Optimized Count</div>
                <div style={{ color: '#50afb6', fontSize: '24px', fontWeight: 'bold' }}>
                  {getOptimalParticleCount(100)}
                </div>
              </div>
              <div style={{ color: '#c4b5a0', fontSize: '14px', flex: 1 }}>
                The particle count is automatically reduced based on device performance and user preferences.
              </div>
            </div>
          </div>
        </ScrollTriggeredAnimation>

        {/* Settings Display */}
        <div style={{ 
          backgroundColor: '#1c2e38', 
          padding: '1.5rem', 
          borderRadius: '12px',
          border: '1px solid #324859'
        }}>
          <h2 style={{ color: '#50afb6', marginBottom: '1rem' }}>Current Optimization Settings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#c4b5a0', fontSize: '14px' }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <span style={{ 
                  color: value ? '#4ade80' : '#ef4444', 
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {value ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}