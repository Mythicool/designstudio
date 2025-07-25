import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '../../data/types'
import { getProjectBySlug, getPublishedProjects } from '../../data/projects'
import { ImageCarousel } from './ImageCarousel'
import { ProjectSidebar } from './ProjectSidebar'
import { ProjectNavigation } from './ProjectNavigation'
import './ProjectDetail.styles.css'

interface ProjectDetailProps {
  slug: string
  className?: string
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  slug,
  className = ''
}) => {
  const [project, setProject] = useState<Project | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Load the specific project
        const foundProject = getProjectBySlug(slug)
        if (!foundProject) {
          setError('Project not found')
          return
        }
        
        // Load all projects for navigation
        const projects = getPublishedProjects()
        
        setProject(foundProject)
        setAllProjects(projects)
      } catch (err) {
        setError('Failed to load project')
        console.error('Error loading project:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [slug])

  if (isLoading) {
    return (
      <div className={`project-detail ${className}`}>
        <div className="project-detail-loading">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p>Loading project...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className={`project-detail ${className}`}>
        <div className="project-detail-error">
          <h2>Project Not Found</h2>
          <p>{error || 'The requested project could not be found.'}</p>
          <motion.button
            className="back-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
          >
            ← Back to Portfolio
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className={`project-detail ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Project Header */}
      <motion.header
        className="project-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="project-header-content">
          <motion.div
            className="project-breadcrumb"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span>Portfolio</span>
            <span className="breadcrumb-separator">→</span>
            <span className="current-project">{project.title}</span>
          </motion.div>
          
          <motion.h1
            className="project-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {project.title}
          </motion.h1>
          
          <motion.p
            className="project-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {project.description}
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="project-content">
        {/* Image Carousel */}
        <motion.div
          className="project-carousel-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ImageCarousel images={project.images} projectTitle={project.title} />
        </motion.div>

        {/* Project Information Sidebar */}
        <motion.div
          className="project-sidebar-section"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ProjectSidebar project={project} />
        </motion.div>
      </div>

      {/* Case Study Section */}
      {project.caseStudy && (
        <motion.section
          className="case-study-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="case-study-content">
            <motion.h2
              className="case-study-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Case Study
            </motion.h2>
            
            <div className="case-study-grid">
              <motion.div
                className="case-study-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <h3>Challenge</h3>
                <p>{project.caseStudy.challenge}</p>
              </motion.div>
              
              <motion.div
                className="case-study-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h3>Solution</h3>
                <p>{project.caseStudy.solution}</p>
              </motion.div>
              
              <motion.div
                className="case-study-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <h3>Results</h3>
                <p>{project.caseStudy.results}</p>
              </motion.div>
            </div>

            {/* Metrics */}
            {project.caseStudy.metrics && project.caseStudy.metrics.length > 0 && (
              <motion.div
                className="case-study-metrics"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h3>Key Metrics</h3>
                <div className="metrics-grid">
                  {project.caseStudy.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      className="metric-item"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                    >
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-label">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* Project Navigation */}
      <motion.div
        className="project-navigation-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <ProjectNavigation
          currentProject={project}
          allProjects={allProjects}
        />
      </motion.div>
    </motion.div>
  )
}