import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PortfolioGrid } from './PortfolioGrid'
import { ProjectDetail } from './ProjectDetail'
import { PortfolioStats } from './PortfolioStats'
import { FeaturedProjects } from './FeaturedProjects'
import { ProjectCategory } from '../../data/types'
import { ScrollReveal } from '../ui/ScrollAnimations'
import { OptimizedMotionDiv } from '../ui/OptimizedMotion'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'

interface PortfolioPageProps {
  initialCategory?: ProjectCategory
  selectedProjectSlug?: string
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  initialCategory = 'all',
  selectedProjectSlug
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(initialCategory)
  const [showProjectDetail, setShowProjectDetail] = useState(!!selectedProjectSlug)
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  useEffect(() => {
    if (selectedProjectSlug) {
      setShowProjectDetail(true)
    }
  }, [selectedProjectSlug])

  if (showProjectDetail && selectedProjectSlug) {
    return (
      <ProjectDetail
        projectSlug={selectedProjectSlug}
        onBack={() => setShowProjectDetail(false)}
      />
    )
  }

  return (
    <div className="portfolio-page" style={{ 
      minHeight: '100vh',
      backgroundColor: '#12242e',
      paddingTop: '2rem'
    }}>
      {/* Hero Section */}
      <ScrollReveal direction="up" delay={0.2}>
        <section style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              color: '#f3e3ea',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #f3e3ea 0%, #50afb6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Portfolio Showcase
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              color: '#c4b5a0',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Explore our diverse collection of projects spanning web development, 
              mobile apps, UI/UX design, and emerging technologies.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '2rem'
            }}>
              <OptimizedMotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#50afb6',
                    color: '#12242e',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  View Featured Work
                </button>
              </OptimizedMotionDiv>
              
              <OptimizedMotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => document.getElementById('all-projects')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    color: '#50afb6',
                    border: '2px solid #50afb6',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Browse All Projects
                </button>
              </OptimizedMotionDiv>
            </div>
          </motion.div>
        </section>
      </ScrollReveal>

      {/* Portfolio Stats */}
      <ScrollReveal direction="up" delay={0.4}>
        <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <PortfolioStats />
        </section>
      </ScrollReveal>

      {/* Featured Projects */}
      <ScrollReveal direction="up" delay={0.6}>
        <section id="featured-projects" style={{ 
          padding: '4rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#f3e3ea',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Featured Projects
          </h2>
          <FeaturedProjects />
        </section>
      </ScrollReveal>

      {/* All Projects Grid */}
      <ScrollReveal direction="up" delay={0.8}>
        <section id="all-projects" style={{ 
          padding: '4rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#f3e3ea',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            All Projects
          </h2>
          
          <PortfolioGrid
            initialCategory={selectedCategory}
            showFilters={true}
            itemsPerPage={9}
          />
        </section>
      </ScrollReveal>

      {/* Call to Action */}
      <ScrollReveal direction="up" delay={1.0}>
        <section style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          backgroundColor: '#1c2e38',
          margin: '4rem 0 0'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#f3e3ea',
              marginBottom: '1rem'
            }}>
              Ready to Start Your Project?
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#c4b5a0',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Let's collaborate to bring your vision to life with cutting-edge technology 
              and exceptional design.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <OptimizedMotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => window.location.href = '/contact'}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#50afb6',
                    color: '#12242e',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Start a Project
                </button>
              </OptimizedMotionDiv>
              
              <OptimizedMotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => window.location.href = '/services'}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: 'transparent',
                    color: '#50afb6',
                    border: '2px solid #50afb6',
                    borderRadius: '25px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  View Services
                </button>
              </OptimizedMotionDiv>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}