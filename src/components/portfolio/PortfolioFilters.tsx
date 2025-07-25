import React from 'react'
import { motion } from 'framer-motion'
import { ProjectCategory } from '../../data/types'
import { OptimizedMotionDiv } from '../ui/OptimizedMotion'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'

interface PortfolioFiltersProps {
  selectedCategory: ProjectCategory
  onCategoryChange: (category: ProjectCategory) => void
  projectCounts: Record<string, number>
  className?: string
}

const categoryLabels: Record<ProjectCategory, string> = {
  all: 'All Projects',
  web: 'Web Development',
  mobile: 'Mobile Apps',
  'ui-ux': 'UI/UX Design',
  branding: 'Branding',
  fintech: 'FinTech',
  'vr-ar': 'VR/AR'
}

const categoryIcons: Record<ProjectCategory, string> = {
  all: '🎯',
  web: '🌐',
  mobile: '📱',
  'ui-ux': '🎨',
  branding: '✨',
  fintech: '💰',
  'vr-ar': '🥽'
}

export const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  projectCounts,
  className = ''
}) => {
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  const categories: ProjectCategory[] = ['all', 'web', 'mobile', 'ui-ux', 'branding', 'fintech', 'vr-ar']

  return (
    <div className={`portfolio-filters ${className}`} style={{ marginBottom: '3rem' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category
          const count = category === 'all' 
            ? Object.values(projectCounts).reduce((sum, count) => sum + count, 0)
            : projectCounts[category] || 0

          return (
            <OptimizedMotionDiv
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: animationConfig.duration || 0.2 }}
            >
              <button
                onClick={() => onCategoryChange(category)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '25px',
                  border: 'none',
                  backgroundColor: isSelected ? '#50afb6' : '#324859',
                  color: isSelected ? '#12242e' : '#c4b5a0',
                  fontSize: '14px',
                  fontWeight: isSelected ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#3d5a6b'
                    e.currentTarget.style.color = '#f3e3ea'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#324859'
                    e.currentTarget.style.color = '#c4b5a0'
                  }
                }}
              >
                <span style={{ fontSize: '16px' }}>
                  {categoryIcons[category]}
                </span>
                <span>{categoryLabels[category]}</span>
                {count > 0 && (
                  <span
                    style={{
                      backgroundColor: isSelected ? 'rgba(18, 36, 46, 0.2)' : 'rgba(80, 175, 182, 0.3)',
                      color: isSelected ? '#12242e' : '#50afb6',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}
                  >
                    {count}
                  </span>
                )}

                {/* Animated background for selected state */}
                {isSelected && (
                  <motion.div
                    layoutId="selectedCategory"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: '#50afb6',
                      borderRadius: '25px',
                      zIndex: -1
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </OptimizedMotionDiv>
          )
        })}
      </div>

      {/* Category description */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#c4b5a0',
          fontSize: '14px',
          fontStyle: 'italic'
        }}
      >
        {getCategoryDescription(selectedCategory, projectCounts[selectedCategory] || 0)}
      </motion.div>
    </div>
  )
}

function getCategoryDescription(category: ProjectCategory, count: number): string {
  const descriptions: Record<ProjectCategory, string> = {
    all: 'Showcasing diverse projects across all categories and technologies',
    web: 'Modern web applications built with cutting-edge technologies',
    mobile: 'Native and cross-platform mobile applications for iOS and Android',
    'ui-ux': 'User-centered design solutions focused on exceptional experiences',
    branding: 'Complete brand identity systems and visual design solutions',
    fintech: 'Financial technology solutions with security and compliance focus',
    'vr-ar': 'Immersive virtual and augmented reality experiences'
  }

  const baseDescription = descriptions[category]
  const countText = category === 'all' 
    ? `${count} total projects` 
    : `${count} ${count === 1 ? 'project' : 'projects'}`

  return `${baseDescription} • ${countText}`
}