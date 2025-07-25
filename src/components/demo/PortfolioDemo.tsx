import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PortfolioPage } from '../portfolio/PortfolioPage'
import { PortfolioGrid } from '../portfolio/PortfolioGrid'
import { FeaturedProjects } from '../portfolio/FeaturedProjects'
import { PortfolioStats } from '../portfolio/PortfolioStats'
import { ProjectCategory } from '../../data/types'
import { OptimizedMotionDiv } from '../ui/OptimizedMotion'
import { ScrollReveal } from '../ui/ScrollAnimations'

export const PortfolioDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<'full' | 'grid' | 'featured' | 'stats'>('full')
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')

  const demoOptions = [
    { id: 'full', label: 'Full Portfolio Page', icon: '🎯' },
    { id: 'grid', label: 'Portfolio Grid', icon: '📱' },
    { id: 'featured', label: 'Featured Projects', icon: '⭐' },
    { id: 'stats', label: 'Portfolio Stats', icon: '📊' }
  ]

  const renderDemo = () => {
    switch (activeDemo) {
      case 'full':
        return <PortfolioPage initialCategory={selectedCategory} />
      case 'grid':
        return (
          <div style={{ padding: '2rem', backgroundColor: '#12242e', minHeight: '100vh' }}>
            <h2 style={{ 
              color: '#f3e3ea', 
              textAlign: 'center', 
              marginBottom: '2rem',
              fontSize: '2rem'
            }}>
              Portfolio Grid Demo
            </h2>
            <PortfolioGrid 
              initialCategory={selectedCategory}
              showFilters={true}
              itemsPerPage={6}
            />
          </div>
        )
      case 'featured':
        return (
          <div style={{ padding: '4rem 2rem', backgroundColor: '#12242e', minHeight: '100vh' }}>
            <h2 style={{ 
              color: '#f3e3ea', 
              textAlign: 'center', 
              marginBottom: '3rem',
              fontSize: '2rem'
            }}>
              Featured Projects Demo
            </h2>
            <FeaturedProjects />
          </div>
        )
      case 'stats':
        return (
          <div style={{ padding: '4rem 2rem', backgroundColor: '#12242e', minHeight: '100vh' }}>
            <h2 style={{ 
              color: '#f3e3ea', 
              textAlign: 'center', 
              marginBottom: '3rem',
              fontSize: '2rem'
            }}>
              Portfolio Stats Demo
            </h2>
            <PortfolioStats />
          </div>
        )
      default:
        return <PortfolioPage />
    }
  }

  return (
    <div className="portfolio-demo">
      {/* Demo Controls */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: '#1c2e38',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid #324859',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{
          color: '#f3e3ea',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Portfolio Demos
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {demoOptions.map((option) => (
            <OptimizedMotionDiv
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setActiveDemo(option.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: activeDemo === option.id ? '#50afb6' : 'transparent',
                  color: activeDemo === option.id ? '#12242e' : '#c4b5a0',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            </OptimizedMotionDiv>
          ))}
        </div>

        {/* Category Filter for Grid Demo */}
        {activeDemo === 'grid' && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #324859' }}>
            <h4 style={{
              color: '#f3e3ea',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Filter Category
            </h4>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory)}
              style={{
                width: '100%',
                padding: '6px 8px',
                backgroundColor: '#324859',
                color: '#f3e3ea',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <option value="all">All Projects</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Apps</option>
              <option value="ui-ux">UI/UX Design</option>
              <option value="branding">Branding</option>
              <option value="fintech">FinTech</option>
              <option value="vr-ar">VR/AR</option>
            </select>
          </div>
        )}
      </div>

      {/* Demo Content */}
      <motion.div
        key={activeDemo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {renderDemo()}
      </motion.div>

      {/* Demo Info Overlay */}
      <ScrollReveal direction="up" delay={0.5}>
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#1c2e38',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid #324859',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          maxWidth: '300px',
          zIndex: 1000
        }}>
          <h4 style={{
            color: '#50afb6',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            {demoOptions.find(opt => opt.id === activeDemo)?.label}
          </h4>
          <p style={{
            color: '#c4b5a0',
            fontSize: '12px',
            lineHeight: '1.4',
            margin: 0
          }}>
            {getDemoDescription(activeDemo)}
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}

function getDemoDescription(demo: string): string {
  const descriptions = {
    full: 'Complete portfolio page with hero section, stats, featured projects, and filterable grid.',
    grid: 'Interactive project grid with category filtering, infinite scroll, and masonry layout.',
    featured: 'Rotating showcase of featured projects with detailed information and metrics.',
    stats: 'Animated statistics and achievements with impressive numbers and visual effects.'
  }
  return descriptions[demo as keyof typeof descriptions] || ''
}