import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '../../data/types'
import { getFeaturedProjects } from '../../data/cms'
import { ProgressiveImage } from '../ui/ProgressiveImage'
import { OptimizedMotionDiv } from '../ui/OptimizedMotion'
import { ScrollReveal } from '../ui/ScrollAnimations'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'

export const FeaturedProjects: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { getOptimizedImageSrc, getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const projects = await getFeaturedProjects()
        setFeaturedProjects(projects)
        if (projects.length > 0) {
          setSelectedProject(projects[0])
        }
      } catch (error) {
        console.error('Failed to load featured projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFeaturedProjects()
  }, [])

  // Auto-rotate featured projects
  useEffect(() => {
    if (featuredProjects.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % featuredProjects.length
          setSelectedProject(featuredProjects[nextIndex])
          return nextIndex
        })
      }, 8000) // Change every 8 seconds

      return () => clearInterval(interval)
    }
  }, [featuredProjects])

  const handleProjectSelect = (project: Project, index: number) => {
    setSelectedProject(project)
    setCurrentIndex(index)
  }

  const handleViewProject = (project: Project) => {
    window.location.href = `/portfolio/${project.slug}`
  }

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: '#c4b5a0'
      }}>
        <div>Loading featured projects...</div>
      </div>
    )
  }

  if (featuredProjects.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem',
        color: '#c4b5a0'
      }}>
        <h3>No featured projects available</h3>
      </div>
    )
  }

  return (
    <div className="featured-projects" style={{ position: 'relative' }}>
      {/* Main Featured Project Display */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
        marginBottom: '3rem',
        minHeight: '500px'
      }}>
        {/* Project Info */}
        <ScrollReveal direction="left" delay={0.2}>
          <AnimatePresence mode="wait">
            {selectedProject && (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ padding: '2rem 0' }}
              >
                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#50afb6',
                    color: '#12242e',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '1rem'
                  }}
                >
                  {selectedProject.category}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    fontWeight: '700',
                    color: '#f3e3ea',
                    marginBottom: '1rem',
                    lineHeight: '1.2'
                  }}
                >
                  {selectedProject.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    fontSize: '1.1rem',
                    color: '#c4b5a0',
                    lineHeight: '1.6',
                    marginBottom: '2rem'
                  }}
                >
                  {selectedProject.description}
                </motion.p>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ marginBottom: '2rem' }}
                >
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#f3e3ea',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Technologies Used
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {selectedProject.technologies.slice(0, 6).map((tech, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: '#324859',
                          color: '#50afb6',
                          padding: '4px 12px',
                          borderRadius: '16px',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Case Study Metrics */}
                {selectedProject.caseStudy?.metrics && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ marginBottom: '2rem' }}
                  >
                    <h4 style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#f3e3ea',
                      marginBottom: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Key Results
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                      gap: '1rem'
                    }}>
                      {selectedProject.caseStudy.metrics.slice(0, 3).map((metric, index) => (
                        <div
                          key={index}
                          style={{
                            textAlign: 'center',
                            padding: '1rem',
                            backgroundColor: '#1c2e38',
                            borderRadius: '8px',
                            border: '1px solid #324859'
                          }}
                        >
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#50afb6',
                            marginBottom: '0.25rem'
                          }}>
                            {metric.value}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#c4b5a0',
                            lineHeight: '1.2'
                          }}>
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <OptimizedMotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => handleViewProject(selectedProject)}
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
                      View Case Study
                    </button>
                  </OptimizedMotionDiv>

                  {selectedProject.url && (
                    <OptimizedMotionDiv
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => window.open(selectedProject.url, '_blank')}
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
                        Live Demo
                      </button>
                    </OptimizedMotionDiv>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>

        {/* Project Image */}
        <ScrollReveal direction="right" delay={0.4}>
          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                  }}
                >
                  <ProgressiveImage
                    src={getOptimizedImageSrc(selectedProject.images[0]?.url || '', 800, 90)}
                    alt={selectedProject.images[0]?.alt || selectedProject.title}
                    loading="eager"
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(transparent, rgba(18, 36, 46, 0.8))',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '2rem'
                  }}>
                    <div>
                      <div style={{
                        color: '#f3e3ea',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '0.25rem'
                      }}>
                        {selectedProject.client}
                      </div>
                      <div style={{
                        color: '#c4b5a0',
                        fontSize: '12px'
                      }}>
                        {selectedProject.year}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>

      {/* Project Navigation */}
      <ScrollReveal direction="up" delay={0.6}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {featuredProjects.map((project, index) => (
            <OptimizedMotionDiv
              key={project.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => handleProjectSelect(project, index)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: currentIndex === index ? '#50afb6' : '#324859',
                  color: currentIndex === index ? '#12242e' : '#c4b5a0',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {project.title}
                
                {/* Progress indicator for auto-rotation */}
                {currentIndex === index && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 8, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: '2px',
                      backgroundColor: '#12242e',
                      opacity: 0.5
                    }}
                  />
                )}
              </button>
            </OptimizedMotionDiv>
          ))}
        </div>
      </ScrollReveal>
    </div>
  )
}