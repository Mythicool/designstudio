import React from 'react'
import { motion } from 'framer-motion'
import { SkeletonCard } from '../ui/SkeletonLoader'

interface LoadingGridProps {
  itemCount?: number
  columns?: number
  className?: string
}

export const LoadingGrid: React.FC<LoadingGridProps> = ({
  itemCount = 6,
  columns = 3,
  className = ''
}) => {
  return (
    <div 
      className={`loading-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '2rem',
        padding: '2rem 0'
      }}
    >
      {Array.from({ length: itemCount }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: 'easeOut'
          }}
        >
          <SkeletonCard 
            width="100%" 
            height="400px"
            style={{
              backgroundColor: '#1c2e38',
              borderRadius: '12px',
              border: '1px solid #324859'
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}