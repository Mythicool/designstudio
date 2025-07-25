'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import { ContactForm as ContactFormType } from '../../data/types'
import { submitContactForm } from '../../utils/contactSubmission'
import { colors, typography, spacing } from '../../styles/tokens'

export default function ContactFormDemo() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleFormSubmit = async (formData: ContactFormType) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const submission = await submitContactForm(formData)
      setSubmitStatus('success')
      setSubmitMessage(`Thank you! Your message has been sent successfully. Submission ID: ${submission.id}`)
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background.primary,
      padding: spacing[6]
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: spacing[8]
          }}
        >
          <h1 style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.bold,
            color: colors.foreground.primary,
            marginBottom: spacing[4]
          }}>
            Contact Form Demo
          </h1>
          <p style={{
            fontSize: typography.sizes.lg,
            color: colors.foreground.secondary,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Experience our interactive contact form with real-time validation, 
            animated feedback, and file upload capabilities.
          </p>
        </motion.div>

        {/* Status Messages */}
        {submitStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: spacing[4],
              marginBottom: spacing[6],
              borderRadius: '8px',
              backgroundColor: submitStatus === 'success' ? '#10b981' : '#ef4444',
              color: 'white',
              textAlign: 'center'
            }}
          >
            {submitMessage}
          </motion.div>
        )}

        {/* Contact Form */}
        <ContactForm 
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: spacing[8],
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
            marginBottom: spacing[4]
          }}>
            Form Features
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: spacing[4]
          }}>
            <div>
              <h3 style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.medium,
                color: colors.brand.primary,
                marginBottom: spacing[2]
              }}>
                Real-time Validation
              </h3>
              <p style={{
                fontSize: typography.sizes.sm,
                color: colors.foreground.secondary,
                lineHeight: typography.lineHeights.relaxed
              }}>
                Fields are validated as you type, providing immediate feedback 
                to help users correct errors before submission.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.medium,
                color: colors.brand.primary,
                marginBottom: spacing[2]
              }}>
                Animated Feedback
              </h3>
              <p style={{
                fontSize: typography.sizes.sm,
                color: colors.foreground.secondary,
                lineHeight: typography.lineHeights.relaxed
              }}>
                Smooth animations for error messages, form transitions, 
                and interactive elements enhance the user experience.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.medium,
                color: colors.brand.primary,
                marginBottom: spacing[2]
              }}>
                File Upload Support
              </h3>
              <p style={{
                fontSize: typography.sizes.sm,
                color: colors.foreground.secondary,
                lineHeight: typography.lineHeights.relaxed
              }}>
                Upload project briefs and attachments with file type 
                and size validation for a complete submission.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.medium,
                color: colors.brand.primary,
                marginBottom: spacing[2]
              }}>
              Email Notifications
              </h3>
              <p style={{
                fontSize: typography.sizes.sm,
                color: colors.foreground.secondary,
                lineHeight: typography.lineHeights.relaxed
              }}>
                Automatic email notifications to both business and client 
                ensure no inquiries are missed.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}