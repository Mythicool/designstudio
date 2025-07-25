import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { OptimizedMotionDiv } from '../ui/OptimizedMotion'
import { ScrollReveal } from '../ui/ScrollAnimations'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'

interface StatItem {
  id: string
  label: string
  value: number
  suffix: string
  icon: string
  color: string
  description: string
}

const statsData: StatItem[] = [
  {
    id: 'projects',
    label: 'Projects Completed',
    value: 150,
    suffix: '+',
    icon: '🚀',
    color: '#50afb6',
    description: 'Successful projects delivered across various industries'
  },
  {
    id: 'clients',
    label: 'Happy Clients',
    value: 89,
    suffix: '+',
    icon: '😊',
    color: '#c77b96',
    description: 'Satisfied clients who trust our expertise'
  },
  {
    id: 'technologies',
    label: 'Technologies Mastered',
    value: 45,
    suffix: '+',
    icon: '⚡',
    color: '#fbe2a7',
    description: 'Cutting-edge tools and frameworks in our arsenal'
  },
  {
    id: 'experience',
    label: 'Years of Experience',
    value: 8,
    suffix: '+',
    icon: '🎯',
    color: '#50afb6',
    description: 'Years of expertise in design and development'
  },
  {
    id: 'awards',
    label: 'Design Awards',
    value: 23,
    suffix: '',
    icon: '🏆',
    color: '#c77b96',
    description: 'Recognition for outstanding design and innovation'
  },
  {
    id: 'satisfaction',
    label: 'Client Satisfaction',
    value: 98,
    suffix: '%',
    icon: '⭐',
    color: '#fbe2a7',
    description: 'Average client satisfaction rating'
  }
]

export const PortfolioStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const statsRef = React.useRef<HTMLDivElement>(null)
  const isInView = useIntersectionObserver(statsRef, { threshold: 0.3 })

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true)
      animateNumbers()
    }
  }, [isInView, isVisible])

  const animateNumbers = () => {
    statsData.forEach((stat) => {
      let current = 0
      const increment = stat.value / 60 // 60 frames for smooth animation
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setAnimatedValues(prev => ({
          ...prev,
          [stat.id]: Math.floor(current)
        }))
      }, 16) // ~60fps
    })
  }

  return (
    <div ref={statsRef} className="portfolio-stats">
      <ScrollReveal direction="up" delay={0.2}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#f3e3ea',
            marginBottom: '1rem'
          }}>
            Our Impact in Numbers
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#c4b5a0',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Delivering exceptional results through innovative design and development solutions
          </p>
        </div>
      </ScrollReveal>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {statsData.map((stat, index) => (
          <ScrollReveal
            key={stat.id}
            direction="up"
            delay={0.1 * index}
            threshold={0.1}
          >
            <OptimizedMotionDiv
              whileHover={{ 
                scale: 1.05,
                y: -5
              }}
              transition={{ 
                duration: animationConfig.duration || 0.3,
                ease: 'easeOut'
              }}
            >
              <div style={{
                backgroundColor: '#1c2e38',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid #324859',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}>
                {/* Background gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
                  borderRadius: '16px 16px 0 0'
                }} />

                {/* Icon */}
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}>
                  {stat.icon}
                </div>

                {/* Animated Number */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: 'backOut'
                  }}
                  style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: stat.color,
                    marginBottom: '0.5rem',
                    fontFamily: 'monospace'
                  }}
                >
                  {animatedValues[stat.id] || 0}{stat.suffix}
                </motion.div>

                {/* Label */}
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#f3e3ea',
                  marginBottom: '0.5rem'
                }}>
                  {stat.label}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.9rem',
                  color: '#c4b5a0',
                  lineHeight: '1.4',
                  opacity: 0.8
                }}>
                  {stat.description}
                </p>

                {/* Hover effect overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
                    borderRadius: '16px',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </OptimizedMotionDiv>
          </ScrollReveal>
        ))}
      </div>

      {/* Additional metrics */}
      <ScrollReveal direction="up" delay={0.8}>
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          backgroundColor: '#1c2e38',
          borderRadius: '16px',
          border: '1px solid #324859',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#f3e3ea',
            marginBottom: '1.5rem'
          }}>
            Why Choose Our Portfolio?
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {[
              { icon: '🎨', title: 'Creative Excellence', desc: 'Award-winning designs that stand out' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Projects completed on time, every time' },
              { icon: '🔧', title: 'Technical Expertise', desc: 'Latest technologies and best practices' },
              { icon: '🤝', title: 'Client Partnership', desc: 'Collaborative approach to success' }
            ].map((item, index) => (
              <OptimizedMotionDiv
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {item.icon}
                  </div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#f3e3ea',
                    marginBottom: '0.5rem'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#c4b5a0',
                    lineHeight: '1.4'
                  }}>
                    {item.desc}
                  </p>
                </div>
              </OptimizedMotionDiv>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}