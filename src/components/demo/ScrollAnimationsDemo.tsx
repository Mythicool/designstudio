import React from 'react'
import { motion } from 'framer-motion'
import { 
  ScrollReveal, 
  Parallax, 
  StaggeredGrid, 
  CounterAnimation, 
  TextReveal,
  ScrollProgress
} from '../ui/ScrollAnimations'
import { colors, typography, spacing } from '../../styles/tokens'

export const ScrollAnimationsDemo: React.FC = () => {
  const demoCards = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Demo Card ${i + 1}`,
    description: `This is a demonstration card showing scroll-triggered animations with staggered reveals.`
  }))

  const stats = [
    { label: 'Projects Completed', value: 150, suffix: '+' },
    { label: 'Happy Clients', value: 98, suffix: '%' },
    { label: 'Years Experience', value: 8, suffix: '' },
    { label: 'Team Members', value: 25, suffix: '+' }
  ]

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.background.primary,
      color: colors.foreground.primary 
    }}>
      {/* Scroll Progress Indicator */}
      <ScrollProgress 
        position="top"
        height="4px"
        progressColor={colors.brand.primary}
        backgroundColor={`${colors.interactive.border}40`}
      />

      {/* Hero Section with Parallax */}
      <section style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Parallax Background */}
        <Parallax speed={0.5} offset={[0, 400]}>
          <div style={{
            position: 'absolute',
            top: '-20%',
            left: '-20%',
            right: '-20%',
            bottom: '-20%',
            background: `radial-gradient(circle at 30% 70%, ${colors.brand.accent}20 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, ${colors.interactive.ring}15 0%, transparent 50%)`,
          }} />
        </Parallax>

        {/* Hero Content */}
        <ScrollReveal direction="up" distance={60} duration={1.2}>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <TextReveal
              text="Scroll Animation Showcase"
              mode="words"
              staggerDelay={0.1}
              style={{
                fontSize: typography.sizes['5xl'],
                fontWeight: typography.weights.bold,
                marginBottom: spacing[6],
                background: `linear-gradient(135deg, ${colors.foreground.primary} 0%, ${colors.brand.primary} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            />
            <ScrollReveal direction="up" delay={0.5}>
              <p style={{
                fontSize: typography.sizes.xl,
                color: colors.foreground.secondary,
                maxWidth: '600px',
                lineHeight: typography.lineHeights.relaxed
              }}>
                Experience smooth, performance-optimized scroll animations that enhance user engagement
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </section>

      {/* Stats Section with Counter Animations */}
      <section style={{
        padding: `${spacing[16]} ${spacing[5]}`,
        backgroundColor: colors.background.card
      }}>
        <ScrollReveal direction="up" threshold={0.3}>
          <h2 style={{
            fontSize: typography.sizes['3xl'],
            fontWeight: typography.weights.bold,
            textAlign: 'center',
            marginBottom: spacing[12],
            color: colors.foreground.primary
          }}>
            Our Impact in Numbers
          </h2>
        </ScrollReveal>

        <StaggeredGrid
          columns={4}
          staggerDelay={0.2}
          animationDirection="up"
          threshold={0.2}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          {stats.map((stat, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: spacing[6],
              backgroundColor: colors.background.primary,
              borderRadius: '12px',
              border: `1px solid ${colors.interactive.border}`
            }}>
              <CounterAnimation
                from={0}
                to={stat.value}
                duration={2}
                suffix={stat.suffix}
                threshold={0.5}
                style={{
                  fontSize: typography.sizes['4xl'],
                  fontWeight: typography.weights.bold,
                  color: colors.brand.primary,
                  display: 'block',
                  marginBottom: spacing[2]
                }}
              />
              <p style={{
                fontSize: typography.sizes.sm,
                color: colors.foreground.secondary,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </StaggeredGrid>
      </section>

      {/* Card Grid with Staggered Animations */}
      <section style={{
        padding: `${spacing[16]} ${spacing[5]}`,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <ScrollReveal direction="up" threshold={0.2}>
          <h2 style={{
            fontSize: typography.sizes['3xl'],
            fontWeight: typography.weights.bold,
            textAlign: 'center',
            marginBottom: spacing[12],
            color: colors.foreground.primary
          }}>
            Staggered Card Animations
          </h2>
        </ScrollReveal>

        <StaggeredGrid
          columns={3}
          staggerDelay={0.1}
          animationDirection="up"
          threshold={0.1}
          gap="2rem"
        >
          {demoCards.map((card) => (
            <motion.div
              key={card.id}
              style={{
                padding: spacing[6],
                backgroundColor: colors.background.card,
                borderRadius: '12px',
                border: `1px solid ${colors.interactive.border}`,
                cursor: 'pointer'
              }}
              whileHover={{
                scale: 1.02,
                borderColor: colors.brand.primary,
                boxShadow: `0 8px 25px ${colors.brand.primary}20`
              }}
              transition={{ duration: 0.2 }}
            >
              <h3 style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.foreground.primary,
                marginBottom: spacing[3]
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: typography.sizes.sm,
                color: colors.foreground.secondary,
                lineHeight: typography.lineHeights.relaxed,
                margin: 0
              }}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </StaggeredGrid>
      </section>

      {/* Text Reveal Section */}
      <section style={{
        padding: `${spacing[16]} ${spacing[5]}`,
        backgroundColor: colors.background.sidebar,
        textAlign: 'center'
      }}>
        <TextReveal
          text="Beautiful Typography Animations"
          mode="words"
          staggerDelay={0.08}
          threshold={0.3}
          style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.bold,
            marginBottom: spacing[8],
            color: colors.foreground.primary
          }}
        />

        <ScrollReveal direction="up" delay={0.5} threshold={0.3}>
          <p style={{
            fontSize: typography.sizes.lg,
            color: colors.foreground.secondary,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: typography.lineHeights.relaxed
          }}>
            Text animations can create engaging reading experiences by revealing content progressively. 
            This technique draws attention to key messages and creates a sense of discovery as users scroll.
          </p>
        </ScrollReveal>
      </section>

      {/* Parallax Section */}
      <section style={{
        height: '80vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Parallax Layers */}
        <Parallax speed={0.3} offset={[0, 300]}>
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${colors.brand.secondary}30, ${colors.brand.accent}20)`,
            filter: 'blur(1px)'
          }} />
        </Parallax>

        <Parallax speed={0.7} offset={[0, 500]}>
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '150px',
            height: '150px',
            borderRadius: '20%',
            background: `linear-gradient(135deg, ${colors.interactive.ring}25, ${colors.brand.primary}15)`,
            filter: 'blur(0.5px)'
          }} />
        </Parallax>

        {/* Content */}
        <ScrollReveal direction="up" threshold={0.4}>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <h2 style={{
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
              marginBottom: spacing[6],
              color: colors.foreground.primary
            }}>
              Parallax Depth Effects
            </h2>
            <p style={{
              fontSize: typography.sizes.lg,
              color: colors.foreground.secondary,
              maxWidth: '600px',
              lineHeight: typography.lineHeights.relaxed
            }}>
              Multiple layers moving at different speeds create depth and visual interest
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA Section */}
      <section style={{
        padding: `${spacing[16]} ${spacing[5]}`,
        backgroundColor: colors.background.primary,
        textAlign: 'center'
      }}>
        <ScrollReveal direction="up" threshold={0.3}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: spacing[8],
            backgroundColor: colors.background.card,
            borderRadius: '16px',
            border: `1px solid ${colors.interactive.border}`
          }}>
            <h2 style={{
              fontSize: typography.sizes['3xl'],
              fontWeight: typography.weights.bold,
              marginBottom: spacing[4],
              color: colors.foreground.primary
            }}>
              Ready to Enhance Your Site?
            </h2>
            <p style={{
              fontSize: typography.sizes.base,
              color: colors.foreground.secondary,
              marginBottom: spacing[6],
              lineHeight: typography.lineHeights.relaxed
            }}>
              These scroll animations are optimized for performance and accessibility, 
              ensuring a smooth experience for all users.
            </p>
            <motion.button
              style={{
                padding: `${spacing[4]} ${spacing[8]}`,
                backgroundColor: colors.brand.primary,
                color: colors.background.primary,
                border: 'none',
                borderRadius: '8px',
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.medium,
                cursor: 'pointer'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 8px 25px ${colors.brand.primary}40`
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}