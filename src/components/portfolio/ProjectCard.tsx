import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Project } from '../../data/types'
import { ProgressiveImage } from '../ui/ProgressiveImage'
import { OptimizedMotionDiv } from '../ui/OptimizedMotion'
import { InteractiveCard } from '../ui/InteractiveElements'
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization'

interface ProjectCardProps {
  project: Project
  className?: string
  onClick?: () => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = '',
  onClick
}) => {
  const { getOptimizedImageSrc, getAnimationConfig } = usePerformanceOptimization()
  const animationConfig = getAnimationConfig()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onClick?.()
    // Navigate to project detail page
    window.location.href = `/portfolio/${project.slug}`
  }

  return (
    <InteractiveCard
      className={`project-card ${className}`}
      onClick={handleClick}
      hoverable={true}
      glowEffect={true}
      scaleEffect={true}
      tiltEffect={false}
      style={{
        backgroundColor: '#1c2e38',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '2rem',
        border: '1px solid #324859',
        padding: 0
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div style={{ position: 'relative', aspectRatio: '16/10' }}>
        <ProgressiveImage
          src={getOptimizedImageSrc(project.images[0]?.url || '', 600, 80)}
          alt={project.images[0]?.alt || project.title}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
        
        {/* Category Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'rgba(251, 226, 167, 0.9)',
            color: '#12242e',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {project.category}
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(80, 175, 182, 0.9)',
              color: '#f3e3ea',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: '600',
              textTransform: 'uppercase'
            }}
          >
            Featured
          </div>
        )}

        {/* Enhanced Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: animationConfig.duration || 0.3 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(80, 175, 182, 0.85), rgba(199, 123, 150, 0.85))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)'
          }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
            animate={isHovered ? { 
              scale: 1, 
              opacity: 1, 
              rotate: 0 
            } : { 
              scale: 0.6, 
              opacity: 0, 
              rotate: -10 
            }}
            transition={{ 
              duration: animationConfig.duration || 0.4, 
              delay: isHovered ? 0.1 : 0,
              ease: 'backOut'
            }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              padding: '20px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            <motion.svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M13 7l5 5-5 5M6 7l5 5-5 5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>

          {/* Additional floating elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isHovered ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              position: 'absolute',
              top: '20%',
              right: '20%',
              width: '8px',
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isHovered ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '25%',
              left: '25%',
              width: '6px',
              height: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
            }}
          />
        </motion.div>
      </div>

      {/* Project Info */}
      <div style={{ padding: '20px' }}>
        <h3
          style={{
            color: '#f3e3ea',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '8px',
            lineHeight: '1.3'
          }}
        >
          {project.title}
        </h3>
        
        <p
          style={{
            color: '#c4b5a0',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#324859',
                  color: '#50afb6',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '500'
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span
                style={{
                  color: '#c4b5a0',
                  fontSize: '11px',
                  padding: '2px 4px'
                }}
              >
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Project Meta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#c4b5a0'
          }}
        >
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </InteractiveCard>
  )
}