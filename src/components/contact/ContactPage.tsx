'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'
import ContactMap from './ContactMap'
import { ContactForm as ContactFormType } from '../../data/types'
import { submitContactForm } from '../../utils/contactSubmission'
import { colors, typography, spacing, breakpoints } from '../../styles/tokens'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleFormSubmit = async (formData: ContactFormType) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const submission = await submitContactForm(formData)
      setSubmitStatus('success')
      setSubmitMessage(`Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.`)
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.')
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
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginBottom: spacing[10]
          }}
        >
          <h1 style={{
            fontSize: typography.sizes['5xl'],
            fontWeight: typography.weights.bold,
            color: colors.foreground.primary,
            marginBottom: spacing[4],
            background: `linear-gradient(135deg, ${colors.brand.primary}, ${colors.brand.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Let's Create Something Amazing
          </h1>
          <p style={{
            fontSize: typography.sizes.xl,
            color: colors.foreground.secondary,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: typography.lineHeights.relaxed
          }}>
            Ready to bring your vision to life? Get in touch and let's discuss 
            how we can help you achieve your design goals.
          </p>
        </motion.div>

        {/* Status Messages */}
        {submitStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: spacing[5],
              marginBottom: spacing[8],
              borderRadius: '12px',
              backgroundColor: submitStatus === 'success' ? '#10b981' : '#ef4444',
              color: 'white',
              textAlign: 'center',
              fontSize: typography.sizes.base,
              fontWeight: typography.weights.medium,
              maxWidth: '800px',
              margin: `0 auto ${spacing[8]} auto`
            }}
          >
            {submitMessage}
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: spacing[8],
          alignItems: 'start'
        }}>
          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm 
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>

          {/* Contact Info & Map Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[6]
          }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ContactInfo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ContactMap />
            </motion.div>
          </div>
        </div>

        {/* Additional Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: spacing[10],
            padding: spacing[8],
            backgroundColor: colors.background.card,
            borderRadius: '16px',
            border: `1px solid ${colors.interactive.border}`,
            textAlign: 'center'
          }}
        >
          <h2 style={{
            fontSize: typography.sizes['3xl'],
            fontWeight: typography.weights.semibold,
            color: colors.foreground.primary,
            marginBottom: spacing[4]
          }}>
            Prefer a Different Approach?
          </h2>
          
          <p style={{
            fontSize: typography.sizes.lg,
            color: colors.foreground.secondary,
            marginBottom: spacing[6],
            maxWidth: '600px',
            margin: `0 auto ${spacing[6]} auto`
          }}>
            We're flexible! Choose the communication method that works best for you.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: spacing[4],
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              {
                title: 'Schedule a Call',
                description: 'Book a 30-minute consultation',
                action: 'Schedule Now',
                href: 'https://calendly.com/designstudio',
                icon: '📅'
              },
              {
                title: 'Send an Email',
                description: 'Direct email communication',
                action: 'Send Email',
                href: 'mailto:hello@designstudio.com',
                icon: '✉️'
              },
              {
                title: 'WhatsApp Chat',
                description: 'Quick questions and updates',
                action: 'Start Chat',
                href: 'https://wa.me/15551234567',
                icon: '💬'
              },
              {
                title: 'View Portfolio',
                description: 'See our recent work first',
                action: 'Browse Work',
                href: '/portfolio',
                icon: '🎨'
              }
            ].map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: colors.background.primary
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'block',
                  padding: spacing[5],
                  backgroundColor: colors.background.primary,
                  borderRadius: '12px',
                  border: `1px solid ${colors.interactive.border}`,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  fontSize: typography.sizes['2xl'],
                  marginBottom: spacing[3]
                }}>
                  {method.icon}
                </div>
                <h3 style={{
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.medium,
                  color: colors.foreground.primary,
                  marginBottom: spacing[2]
                }}>
                  {method.title}
                </h3>
                <p style={{
                  fontSize: typography.sizes.sm,
                  color: colors.foreground.secondary,
                  marginBottom: spacing[3]
                }}>
                  {method.description}
                </p>
                <div style={{
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.medium,
                  color: colors.brand.primary
                }}>
                  {method.action} →
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            marginTop: spacing[10],
            padding: spacing[8],
            backgroundColor: colors.background.card,
            borderRadius: '16px',
            border: `1px solid ${colors.interactive.border}`
          }}
        >
          <h2 style={{
            fontSize: typography.sizes['3xl'],
            fontWeight: typography.weights.semibold,
            color: colors.foreground.primary,
            marginBottom: spacing[6],
            textAlign: 'center'
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: spacing[6]
          }}>
            {[
              {
                question: 'How quickly do you respond?',
                answer: 'We typically respond to all inquiries within 24 hours during business days.'
              },
              {
                question: 'What information should I include?',
                answer: 'Project details, timeline, budget range, and any specific requirements or preferences.'
              },
              {
                question: 'Do you offer free consultations?',
                answer: 'Yes! We offer a complimentary 30-minute consultation to discuss your project needs.'
              },
              {
                question: 'What file formats do you accept?',
                answer: 'We accept PDF, DOC, DOCX, JPG, PNG, and GIF files up to 10MB each.'
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                style={{
                  padding: spacing[4],
                  backgroundColor: colors.background.primary,
                  borderRadius: '8px',
                  border: `1px solid ${colors.interactive.border}`
                }}
              >
                <h3 style={{
                  fontSize: typography.sizes.base,
                  fontWeight: typography.weights.medium,
                  color: colors.brand.primary,
                  marginBottom: spacing[2]
                }}>
                  {faq.question}
                </h3>
                <p style={{
                  fontSize: typography.sizes.sm,
                  color: colors.foreground.secondary,
                  lineHeight: typography.lineHeights.relaxed
                }}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}