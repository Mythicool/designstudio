'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { colors, typography, spacing } from '../../styles/tokens'

interface ContactMapProps {
  className?: string
}

export default function ContactMap({ className }: ContactMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Mock location data - in a real app, you'd use actual coordinates
  const location = {
    name: 'Design Studio HQ',
    address: '123 Design Street, Creative District, NY 10001',
    coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates
    mapUrl: 'https://maps.google.com/?q=123+Design+Street+NY'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
      style={{
        backgroundColor: colors.background.card,
        borderRadius: '12px',
        border: `1px solid ${colors.interactive.border}`,
        overflow: 'hidden'
      }}
    >
      {/* Map Header */}
      <div style={{
        padding: spacing[4],
        borderBottom: `1px solid ${colors.interactive.border}`
      }}>
        <h3 style={{
          fontSize: typography.sizes.lg,
          fontWeight: typography.weights.medium,
          color: colors.foreground.primary,
          marginBottom: spacing[2]
        }}>
          Our Location
        </h3>
        <p style={{
          fontSize: typography.sizes.sm,
          color: colors.foreground.secondary
        }}>
          {location.address}
        </p>
      </div>

      {/* Interactive Map Placeholder */}
      <div style={{
        position: 'relative',
        height: '300px',
        backgroundColor: colors.background.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Mock Map Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${colors.brand.primary}20, ${colors.brand.secondary}20)`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Map Pin */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5,
              type: 'spring',
              stiffness: 200
            }}
            style={{
              fontSize: '48px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}
          >
            📍
          </motion.div>

          {/* Location Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            style={{
              position: 'absolute',
              bottom: spacing[4],
              left: spacing[4],
              right: spacing[4],
              backgroundColor: colors.background.card,
              padding: spacing[3],
              borderRadius: '8px',
              border: `1px solid ${colors.interactive.border}`,
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: typography.sizes.sm,
              fontWeight: typography.weights.medium,
              color: colors.foreground.primary,
              marginBottom: spacing[1]
            }}>
              {location.name}
            </div>
            <div style={{
              fontSize: typography.sizes.xs,
              color: colors.foreground.secondary
            }}>
              Click to open in Google Maps
            </div>
          </motion.div>

          {/* Interactive Overlay */}
          <motion.a
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease'
            }}
          />
        </motion.div>
      </div>

      {/* Map Actions */}
      <div style={{
        padding: spacing[4],
        display: 'flex',
        gap: spacing[3],
        borderTop: `1px solid ${colors.interactive.border}`
      }}>
        <motion.a
          href={location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 1,
            padding: spacing[3],
            backgroundColor: colors.brand.primary,
            color: colors.background.primary,
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: typography.sizes.sm,
            fontWeight: typography.weights.medium,
            transition: 'all 0.2s ease'
          }}
        >
          🗺️ Open in Maps
        </motion.a>

        <motion.a
          href={`https://maps.google.com/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 1,
            padding: spacing[3],
            backgroundColor: colors.background.primary,
            color: colors.foreground.primary,
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: typography.sizes.sm,
            fontWeight: typography.weights.medium,
            border: `1px solid ${colors.interactive.border}`,
            transition: 'all 0.2s ease'
          }}
        >
          🧭 Get Directions
        </motion.a>
      </div>

      {/* Nearby Landmarks */}
      <div style={{
        padding: spacing[4],
        borderTop: `1px solid ${colors.interactive.border}`,
        backgroundColor: colors.background.primary
      }}>
        <h4 style={{
          fontSize: typography.sizes.sm,
          fontWeight: typography.weights.medium,
          color: colors.foreground.primary,
          marginBottom: spacing[3]
        }}>
          Nearby Landmarks
        </h4>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[2]
        }}>
          {[
            { name: 'Central Park', distance: '0.5 miles', icon: '🌳' },
            { name: 'Times Square', distance: '1.2 miles', icon: '🎭' },
            { name: 'Grand Central', distance: '0.8 miles', icon: '🚂' }
          ].map((landmark, index) => (
            <motion.div
              key={landmark.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[3],
                fontSize: typography.sizes.xs,
                color: colors.foreground.secondary
              }}
            >
              <span>{landmark.icon}</span>
              <span>{landmark.name}</span>
              <span style={{ marginLeft: 'auto' }}>{landmark.distance}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}