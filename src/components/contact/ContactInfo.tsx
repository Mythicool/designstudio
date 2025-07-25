'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { colors, typography, spacing } from '../../styles/tokens'

interface ContactMethod {
  id: string
  type: 'email' | 'phone' | 'address' | 'social'
  label: string
  value: string
  href: string
  icon: string
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    value: 'hello@designstudio.com',
    href: 'mailto:hello@designstudio.com',
    icon: '✉️'
  },
  {
    id: 'phone',
    type: 'phone',
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    icon: '📞'
  },
  {
    id: 'address',
    type: 'address',
    label: 'Office',
    value: '123 Design Street, Creative District, NY 10001',
    href: 'https://maps.google.com/?q=123+Design+Street+NY',
    icon: '📍'
  },
  {
    id: 'linkedin',
    type: 'social',
    label: 'LinkedIn',
    value: '@designstudio',
    href: 'https://linkedin.com/company/designstudio',
    icon: '💼'
  }
]

interface ContactInfoProps {
  className?: string
}

export default function ContactInfo({ className }: ContactInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
      style={{
        padding: spacing[6],
        backgroundColor: colors.background.card,
        borderRadius: '12px',
        border: `1px solid ${colors.interactive.border}`
      }}
    >
      <h2 style={{
        fontSize: typography.sizes['2xl'],
        fontWeight: typography.weights.semibold,
        color: colors.foreground.primary,
        marginBottom: spacing[6]
      }}>
        Get in Touch
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[5]
      }}>
        {contactMethods.map((method, index) => (
          <motion.a
            key={method.id}
            href={method.href}
            target={method.type === 'social' || method.type === 'address' ? '_blank' : undefined}
            rel={method.type === 'social' || method.type === 'address' ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: colors.background.primary
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[4],
              padding: spacing[4],
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <div style={{
              fontSize: typography.sizes['2xl'],
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.brand.primary,
              borderRadius: '50%'
            }}>
              {method.icon}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.medium,
                color: colors.foreground.secondary,
                marginBottom: spacing[1]
              }}>
                {method.label}
              </div>
              <div style={{
                fontSize: typography.sizes.base,
                color: colors.foreground.primary,
                fontWeight: typography.weights.medium
              }}>
                {method.value}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          marginTop: spacing[6],
          padding: spacing[4],
          backgroundColor: colors.background.primary,
          borderRadius: '8px',
          border: `1px solid ${colors.interactive.border}`
        }}
      >
        <h3 style={{
          fontSize: typography.sizes.lg,
          fontWeight: typography.weights.medium,
          color: colors.brand.primary,
          marginBottom: spacing[3]
        }}>
          Business Hours
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[2]
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: typography.sizes.sm,
            color: colors.foreground.secondary
          }}>
            <span>Monday - Friday</span>
            <span>9:00 AM - 6:00 PM EST</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: typography.sizes.sm,
            color: colors.foreground.secondary
          }}>
            <span>Saturday</span>
            <span>10:00 AM - 4:00 PM EST</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: typography.sizes.sm,
            color: colors.foreground.secondary
          }}>
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          marginTop: spacing[4],
          padding: spacing[4],
          backgroundColor: colors.brand.secondary,
          borderRadius: '8px',
          textAlign: 'center'
        }}
      >
        <div style={{
          fontSize: typography.sizes.base,
          fontWeight: typography.weights.medium,
          color: colors.background.primary,
          marginBottom: spacing[1]
        }}>
          ⚡ Quick Response
        </div>
        <div style={{
          fontSize: typography.sizes.sm,
          color: colors.background.primary,
          opacity: 0.9
        }}>
          We typically respond within 24 hours
        </div>
      </motion.div>
    </motion.div>
  )
}