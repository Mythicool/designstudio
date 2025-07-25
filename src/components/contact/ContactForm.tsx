'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContactForm as ContactFormType } from '../../data/types'
import { validateContactForm, validateContactFormField } from '../../data/validation'
import { colors, typography, spacing, animations } from '../../styles/tokens'

interface ContactFormProps {
  onSubmit: (formData: ContactFormType) => Promise<void>
  isSubmitting?: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function ContactForm({ onSubmit, isSubmitting = false }: ContactFormProps) {
  const [formData, setFormData] = useState<Partial<ContactFormType>>({
    name: '',
    email: '',
    company: '',
    projectType: undefined,
    budget: undefined,
    message: '',
    timeline: '',
    attachments: []
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Real-time field validation
  const validateField = useCallback((fieldName: keyof ContactFormType, value: any) => {
    const error = validateContactFormField(fieldName, value)
    setErrors(prev => ({
      ...prev,
      [fieldName]: error?.message || ''
    }))
  }, [])

  // Handle input changes with real-time validation
  const handleInputChange = useCallback((fieldName: keyof ContactFormType, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
    
    // Only validate if field has been touched or form has been submitted
    if (touchedFields.has(fieldName) || isSubmitted) {
      validateField(fieldName, value)
    }
  }, [touchedFields, isSubmitted, validateField])

  // Handle field blur (mark as touched)
  const handleFieldBlur = useCallback((fieldName: keyof ContactFormType) => {
    setTouchedFields(prev => new Set([...prev, fieldName]))
    validateField(fieldName, formData[fieldName])
  }, [formData, validateField])

  // Handle file upload
  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return
    
    const fileArray = Array.from(files)
    handleInputChange('attachments', fileArray)
  }, [handleInputChange])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Validate entire form
    const validation = validateContactForm(formData)
    
    if (!validation.isValid) {
      const errorMap: FormErrors = {}
      validation.errors.forEach(error => {
        errorMap[error.field] = error.message
      })
      setErrors(errorMap)
      return
    }

    try {
      await onSubmit(formData as ContactFormType)
      // Reset form on successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: undefined,
        budget: undefined,
        message: '',
        timeline: '',
        attachments: []
      })
      setErrors({})
      setTouchedFields(new Set())
      setIsSubmitted(false)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: spacing[3],
    fontSize: typography.sizes.base,
    backgroundColor: colors.background.primary,
    borderRadius: '8px',
    color: colors.foreground.primary,
    transition: `border-color ${animations.durations.fast} ${animations.easings.easeInOut}`,
    outline: 'none'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: spacing[2],
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.foreground.primary
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: spacing[6],
        backgroundColor: colors.background.card,
        borderRadius: '12px',
        border: `1px solid ${colors.interactive.border}`
      }}
    >
      {/* Name Field */}
      <div style={{ marginBottom: spacing[5] }}>
        <label htmlFor="name" style={labelStyle}>Name *</label>
        <input
          id="name"
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={() => handleFieldBlur('name')}
          disabled={isSubmitting}
          style={{
            ...inputStyle,
            border: `1px solid ${errors.name ? '#ef4444' : colors.interactive.border}`
          }}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                color: '#ef4444',
                fontSize: typography.sizes.sm,
                marginTop: spacing[1]
              }}
            >
              {errors.name}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Email Field */}
      <div style={{ marginBottom: spacing[5] }}>
        <label htmlFor="email" style={labelStyle}>Email *</label>
        <input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={() => handleFieldBlur('email')}
          disabled={isSubmitting}
          style={{
            ...inputStyle,
            border: `1px solid ${errors.email ? '#ef4444' : colors.interactive.border}`
          }}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                color: '#ef4444',
                fontSize: typography.sizes.sm,
                marginTop: spacing[1]
              }}
            >
              {errors.email}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Company Field */}
      <div style={{ marginBottom: spacing[5] }}>
        <label htmlFor="company" style={labelStyle}>Company</label>
        <input
          id="company"
          type="text"
          value={formData.company || ''}
          onChange={(e) => handleInputChange('company', e.target.value)}
          onBlur={() => handleFieldBlur('company')}
          disabled={isSubmitting}
          style={{
            ...inputStyle,
            border: `1px solid ${errors.company ? '#ef4444' : colors.interactive.border}`
          }}
        />
        <AnimatePresence>
          {errors.company && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                color: '#ef4444',
                fontSize: typography.sizes.sm,
                marginTop: spacing[1]
              }}
            >
              {errors.company}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Type Field */}
      <div style={{ marginBottom: spacing[5] }}>
        <label htmlFor="projectType" style={labelStyle}>Project Type *</label>
        <select
          id="projectType"
          value={formData.projectType || ''}
          onChange={(e) => handleInputChange('projectType', e.target.value as ContactFormType['projectType'])}
          onBlur={() => handleFieldBlur('projectType')}
          disabled={isSubmitting}
          style={{
            ...inputStyle,
            border: `1px solid ${errors.projectType ? '#ef4444' : colors.interactive.border}`
          }}
        >
          <option value="">Select project type</option>
          <option value="web">Web Development</option>
          <option value="mobile">Mobile App</option>
          <option value="branding">Branding & Design</option>
          <option value="consultation">Consultation</option>
        </select>
        <AnimatePresence>
          {errors.projectType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                color: '#ef4444',
                fontSize: typography.sizes.sm,
                marginTop: spacing[1]
              }}
            >
              {errors.projectType}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Budget Field */}
      <div style={{ marginBottom: spacing[5] }}>
        <label htmlFor="budget" style={labelStyle}>Budget Range *</label>
        <select
          id="budget"
          value={formData.budget || ''}
          onChange={(e) => handleInputChange('budget', e.target.value as ContactFormType['budget'])}
          onBlur={() => handleFieldBlur('budget')}
          disabled={isSubmitting}
          style={{
            ...inputStyle,
            border: `1px solid ${errors.budget ? '#ef4444' : colors.interactive.border}`
          }}
        >
          <option value="">Select budget range</option>
          <option value="under-10k">Under $10,000</option>
          <option value="10k-25k">$10,000 - $25,000</option>
          <option value="25k-50k">$25,000 - $50,000</option>
          <option value="50k+">$50,000+</option>
        </select>
        <AnimatePresence>
          {errors.budget && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                color: '#ef4444',
                fontSize: typography.sizes.sm,
                marginTop: spacing[1]
              }}
            >
              {errors.budget}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Timeline Field */}
      <div style={{ marginBottom: spacing[5] }}>
        <label htmlFor="timeline" style={labelStyle}>Timeline</label>
        <input
          id="timeline"
          type="text"
          placeholder="e.g., 3 months, ASAP, Q2 2024"
          value={formData.timeline || ''}
          onChange={(e) => handleInputChange('timeline', e.target.value)}
          onBlur={() => handleFieldBlur('timeline')}
          disabled={isSubmitting}
          style={{
            ...inputStyle,
            border: `1px solid ${errors.timeline ? '#ef4444' : colors.interactive.border}`
          }}
        />
        <AnimatePresence>
          {errors.timeline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                color: '#ef4444',
                fontSize: typography.sizes.sm,
                marginTop: spacing[1]
              }}
            >
              {errors.timeline}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message Field */}
      <div style={{ marginBottom: spacing[5] }}>
        <label htmlFor="message" style={labelStyle}>Message *</label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project..."
          value={formData.message || ''}
          onChange={(e) => handleInputChange('message', e.target.value)}
          onBlur={() => handleFieldBlur('message')}
          disabled={isSubmitting}
          style={{
            ...inputStyle,
            border: `1px solid ${errors.message ? '#ef4444' : colors.interactive.border}`,
            resize: 'vertical',
            minHeight: '120px'
          }}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                color: '#ef4444',
                fontSize: typography.sizes.sm,
                marginTop: spacing[1]
              }}
            >
              {errors.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* File Upload Field */}
      <div style={{ marginBottom: spacing[6] }}>
        <label htmlFor="attachments" style={labelStyle}>
          Project Brief / Attachments
        </label>
        <input
          id="attachments"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
          onChange={(e) => handleFileUpload(e.target.files)}
          disabled={isSubmitting}
          style={{
            ...inputStyle,
            border: `1px solid ${errors.attachments ? '#ef4444' : colors.interactive.border}`,
            paddingTop: spacing[2],
            paddingBottom: spacing[2]
          }}
        />
        <div style={{
          fontSize: typography.sizes.xs,
          color: colors.foreground.secondary,
          marginTop: spacing[1]
        }}>
          Max 5 files, 10MB each. Supported: PDF, DOC, DOCX, JPG, PNG, GIF
        </div>
        <AnimatePresence>
          {errors.attachments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                color: '#ef4444',
                fontSize: typography.sizes.sm,
                marginTop: spacing[1]
              }}
            >
              {errors.attachments}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          padding: spacing[4],
          fontSize: typography.sizes.base,
          fontWeight: typography.weights.medium,
          backgroundColor: isSubmitting ? colors.foreground.secondary : colors.brand.primary,
          color: colors.background.primary,
          border: 'none',
          borderRadius: '8px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: `all ${animations.durations.fast} ${animations.easings.easeInOut}`
        }}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </motion.form>
  )
}