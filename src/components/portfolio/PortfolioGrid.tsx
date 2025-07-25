import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project, ProjectCategory } from '../../data/types'
import { getPublishedProjects, getProjectsByCategory } from '../../data/cms'
import { ProjectCard } from './ProjectCard'
import { PortfolioFilters } from './PortfolioFilters'
import { LoadingGrid } from './LoadingGrid'
import { SkeletonCard } from '../ui/SkeletonLoader'
import { OptimizedMotionDiv, StaggeredAnimation } from '../ui/OptimizedMotion'
import { ScrollReveal, StaggeredGrid } from '../ui/ScrollAnimations'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'
import { useScrollTrigger, useStaggeredAnimation } from '../../hooks/useScrollAnimations'
import './PortfolioGrid.styles.css'

interface PortfolioGridProps {
  initialCategory?: ProjectCategory
  showFilters?: boolean
  itemsPerPage?: number
  className?: string
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  initialCategory = 'all',
  showFilters = true,
  itemsPerPage = 6,
  className = ''
}) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(initialCategory)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const isLoadMoreVisible = useIntersectionObserver(loadMoreRef, { threshold: 0.1 })
  const { getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  // Load initial projects
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true)
      try {
        const allProjects = await getPublishedProjects()
        setProjects(allProjects)
      } catch (error) {
        console.error('Failed to load projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Filter projects by category
  useEffect(() => {
    const filterProjects = async () => {
      try {
        const filtered = selectedCategory === 'all' 
          ? projects 
          : await getProjectsByCategory(selectedCategory)
        
        setFilteredProjects(filtered)
        setCurrentPage(1)
        setHasMore(filtered.length > itemsPerPage)
      } catch (error) {
        console.error('Failed to filter projects:', error)
        setFilteredProjects([])
      }
    }

    if (projects.length > 0) {
      filterProjects()
    }
  }, [selectedCategory, projects, itemsPerPage])

  // Update displayed projects based on pagination
  useEffect(() => {
    const startIndex = 0
    const endIndex = currentPage * itemsPerPage
    const newDisplayed = filteredProjects.slice(startIndex, endIndex)
    
    setDisplayedProjects(newDisplayed)
    setHasMore(endIndex < filteredProjects.length)
  }, [filteredProjects, currentPage, itemsPerPage])

  // Load more projects when intersection observer triggers
  useEffect(() => {
    if (isLoadMoreVisible && hasMore && !isLoadingMore && !isLoading) {
      loadMoreProjects()
    }
  }, [isLoadMoreVisible, hasMore, isLoadingMore, isLoading])

  const loadMoreProjects = useCallback(async () => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setCurrentPage(prev => prev + 1)
    setIsLoadingMore(false)
  }, [isLoadingMore, hasMore])

  const handleCategoryChange = useCallback((category: ProjectCategory) => {
    setSelectedCategory(category)
  }, [])

  // Memoized grid layout calculation for masonry effect
  const gridColumns = useMemo(() => {
    return displayedProjects.reduce((acc, project, index) => {
      const columnIndex = index % 3 // 3 columns for desktop
      if (!acc[columnIndex]) acc[columnIndex] = []
      acc[columnIndex].push(project)
      return acc
    }, [] as Project[][])
  }, [displayedProjects])

  if (isLoading) {
    return (
      <div className={`portfolio-grid ${className}`}>
        {showFilters && (
          <div className="portfolio-filters-skeleton" style={{ marginBottom: '2rem' }}>
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonCard key={i} width="120px" height="40px" />
            ))}
          </div>
        )}
        <div className="portfolio-skeleton-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {Array.from({ length: itemsPerPage }, (_, i) => (
            <SkeletonCard key={i} width="100%" height="400px" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`portfolio-grid ${className}`}>
      {showFilters && (
        <PortfolioFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          projectCounts={projects.reduce((acc, project) => {
            acc[project.category] = (acc[project.category] || 0) + 1
            return acc
          }, {} as Record<string, number>)}
        />
      )}

      <div className="portfolio-grid-container">
        <AnimatePresence mode="wait">
          {displayedProjects.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="portfolio-empty-state"
            >
              <h3>No projects found</h3>
              <p>Try selecting a different category or check back later.</p>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${selectedCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="portfolio-masonry-grid"
            >
              {/* Desktop masonry layout */}
              <div className="masonry-columns desktop-only">
                {gridColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="masonry-column">
                    <ScrollReveal
                      direction="up"
                      stagger={true}
                      staggerDelay={0.1}
                      threshold={0.1}
                      delay={columnIndex * 0.05}
                    >
                      {column.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </ScrollReveal>
                  </div>
                ))}
              </div>

              {/* Mobile/tablet single column layout */}
              <div className="single-column mobile-tablet-only">
                <StaggeredGrid
                  columns={1}
                  staggerDelay={0.1}
                  animationDirection="up"
                  threshold={0.1}
                >
                  {displayedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </StaggeredGrid>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load more trigger */}
        {hasMore && (
          <div ref={loadMoreRef} className="load-more-trigger">
            {isLoadingMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="loading-more"
              >
                <div className="loading-spinner" />
                <span>Loading more projects...</span>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}