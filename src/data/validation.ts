// Data validation functions for project data

import { Project, Image, CaseStudy, ProjectFilters, ContactForm } from './types'

// Validation error types
export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Image validation
export function validateImage(image: Image): ValidationResult {
  const errors: ValidationError[] = []

  if (!image.id || image.id.trim() === '') {
    errors.push({ field: 'id', message: 'Image ID is required' })
  }

  if (!image.url || image.url.trim() === '') {
    errors.push({ field: 'url', message: 'Image URL is required' })
  } else if (!isValidUrl(image.url)) {
    errors.push({ field: 'url', message: 'Image URL must be a valid URL' })
  }

  if (!image.alt || image.alt.trim() === '') {
    errors.push({ field: 'alt', message: 'Image alt text is required for accessibility' })
  }

  if (!image.width || image.width <= 0) {
    errors.push({ field: 'width', message: 'Image width must be a positive number' })
  }

  if (!image.height || image.height <= 0) {
    errors.push({ field: 'height', message: 'Image height must be a positive number' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Case study validation
export function validateCaseStudy(caseStudy: CaseStudy): ValidationResult {
  const errors: ValidationError[] = []

  if (!caseStudy.challenge || caseStudy.challenge.trim() === '') {
    errors.push({ field: 'challenge', message: 'Case study challenge is required' })
  }

  if (!caseStudy.solution || caseStudy.solution.trim() === '') {
    errors.push({ field: 'solution', message: 'Case study solution is required' })
  }

  if (!caseStudy.results || caseStudy.results.trim() === '') {
    errors.push({ field: 'results', message: 'Case study results are required' })
  }

  // Validate metrics if provided
  if (caseStudy.metrics) {
    caseStudy.metrics.forEach((metric, index) => {
      if (!metric.label || metric.label.trim() === '') {
        errors.push({ 
          field: `metrics[${index}].label`, 
          message: 'Metric label is required' 
        })
      }
      if (!metric.value || metric.value.trim() === '') {
        errors.push({ 
          field: `metrics[${index}].value`, 
          message: 'Metric value is required' 
        })
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Project validation
export function validateProject(project: Project): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields validation
  if (!project.id || project.id.trim() === '') {
    errors.push({ field: 'id', message: 'Project ID is required' })
  }

  if (!project.title || project.title.trim() === '') {
    errors.push({ field: 'title', message: 'Project title is required' })
  }

  if (!project.description || project.description.trim() === '') {
    errors.push({ field: 'description', message: 'Project description is required' })
  }

  if (!project.category) {
    errors.push({ field: 'category', message: 'Project category is required' })
  } else if (!['web', 'mobile', 'branding', 'ui-ux'].includes(project.category)) {
    errors.push({ 
      field: 'category', 
      message: 'Project category must be one of: web, mobile, branding, ui-ux' 
    })
  }

  if (!project.client || project.client.trim() === '') {
    errors.push({ field: 'client', message: 'Client name is required' })
  }

  if (!project.year || project.year < 2000 || project.year > new Date().getFullYear() + 1) {
    errors.push({ 
      field: 'year', 
      message: 'Project year must be between 2000 and next year' 
    })
  }

  if (!project.slug || project.slug.trim() === '') {
    errors.push({ field: 'slug', message: 'Project slug is required for URL generation' })
  } else if (!isValidSlug(project.slug)) {
    errors.push({ 
      field: 'slug', 
      message: 'Project slug must contain only lowercase letters, numbers, and hyphens' 
    })
  }

  if (!project.status || !['published', 'draft', 'archived'].includes(project.status)) {
    errors.push({ 
      field: 'status', 
      message: 'Project status must be one of: published, draft, archived' 
    })
  }

  // Images validation
  if (!project.images || project.images.length === 0) {
    errors.push({ field: 'images', message: 'At least one project image is required' })
  } else {
    project.images.forEach((image, index) => {
      const imageValidation = validateImage(image)
      if (!imageValidation.isValid) {
        imageValidation.errors.forEach(error => {
          errors.push({
            field: `images[${index}].${error.field}`,
            message: error.message
          })
        })
      }
    })
  }

  // Technologies validation
  if (!project.technologies || project.technologies.length === 0) {
    errors.push({ field: 'technologies', message: 'At least one technology is required' })
  }

  // Case study validation (if provided)
  if (project.caseStudy) {
    const caseStudyValidation = validateCaseStudy(project.caseStudy)
    if (!caseStudyValidation.isValid) {
      caseStudyValidation.errors.forEach(error => {
        errors.push({
          field: `caseStudy.${error.field}`,
          message: error.message
        })
      })
    }
  }

  // URL validation (if provided)
  if (project.url && !isValidUrl(project.url)) {
    errors.push({ field: 'url', message: 'Project URL must be a valid URL' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Project filters validation
export function validateProjectFilters(filters: ProjectFilters): ValidationResult {
  const errors: ValidationError[] = []

  if (filters.category && !['web', 'mobile', 'branding', 'ui-ux', 'all'].includes(filters.category)) {
    errors.push({ 
      field: 'category', 
      message: 'Filter category must be one of: web, mobile, branding, ui-ux, all' 
    })
  }

  if (filters.year && (filters.year < 2000 || filters.year > new Date().getFullYear() + 1)) {
    errors.push({ 
      field: 'year', 
      message: 'Filter year must be between 2000 and next year' 
    })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Helper functions
function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

// Contact form validation
export function validateContactForm(form: Partial<ContactForm>): ValidationResult {
  const errors: ValidationError[] = []

  // Name validation
  if (!form.name || form.name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required' })
  } else if (form.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' })
  }

  // Email validation
  if (!form.email || form.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!isValidEmail(form.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }

  // Company validation (optional but if provided, must be valid)
  if (form.company && form.company.trim().length < 2) {
    errors.push({ field: 'company', message: 'Company name must be at least 2 characters long' })
  }

  // Project type validation
  if (!form.projectType) {
    errors.push({ field: 'projectType', message: 'Project type is required' })
  } else if (!['web', 'mobile', 'branding', 'consultation'].includes(form.projectType)) {
    errors.push({ 
      field: 'projectType', 
      message: 'Project type must be one of: web, mobile, branding, consultation' 
    })
  }

  // Budget validation
  if (!form.budget) {
    errors.push({ field: 'budget', message: 'Budget range is required' })
  } else if (!['under-10k', '10k-25k', '25k-50k', '50k+'].includes(form.budget)) {
    errors.push({ 
      field: 'budget', 
      message: 'Budget must be one of: under-10k, 10k-25k, 25k-50k, 50k+' 
    })
  }

  // Message validation
  if (!form.message || form.message.trim() === '') {
    errors.push({ field: 'message', message: 'Message is required' })
  } else if (form.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long' })
  } else if (form.message.trim().length > 2000) {
    errors.push({ field: 'message', message: 'Message must be less than 2000 characters' })
  }

  // Timeline validation (optional)
  if (form.timeline && form.timeline.trim().length < 3) {
    errors.push({ field: 'timeline', message: 'Timeline must be at least 3 characters long' })
  }

  // File attachments validation (optional)
  if (form.attachments && form.attachments.length > 0) {
    const maxFileSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    
    form.attachments.forEach((file, index) => {
      if (file.size > maxFileSize) {
        errors.push({ 
          field: `attachments[${index}]`, 
          message: `File "${file.name}" is too large. Maximum size is 10MB` 
        })
      }
      
      if (!allowedTypes.includes(file.type)) {
        errors.push({ 
          field: `attachments[${index}]`, 
          message: `File "${file.name}" has an unsupported format. Allowed formats: PDF, JPG, PNG, GIF, DOC, DOCX` 
        })
      }
    })

    if (form.attachments.length > 5) {
      errors.push({ field: 'attachments', message: 'Maximum 5 files allowed' })
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Real-time field validation for better UX
export function validateContactFormField(fieldName: keyof ContactForm, value: any): ValidationError | null {
  switch (fieldName) {
    case 'name':
      if (!value || value.trim() === '') {
        return { field: 'name', message: 'Name is required' }
      }
      if (value.trim().length < 2) {
        return { field: 'name', message: 'Name must be at least 2 characters long' }
      }
      break

    case 'email':
      if (!value || value.trim() === '') {
        return { field: 'email', message: 'Email is required' }
      }
      if (!isValidEmail(value)) {
        return { field: 'email', message: 'Please enter a valid email address' }
      }
      break

    case 'company':
      if (value && value.trim().length < 2) {
        return { field: 'company', message: 'Company name must be at least 2 characters long' }
      }
      break

    case 'message':
      if (!value || value.trim() === '') {
        return { field: 'message', message: 'Message is required' }
      }
      if (value.trim().length < 10) {
        return { field: 'message', message: 'Message must be at least 10 characters long' }
      }
      if (value.trim().length > 2000) {
        return { field: 'message', message: 'Message must be less than 2000 characters' }
      }
      break

    case 'timeline':
      if (value && value.trim().length < 3) {
        return { field: 'timeline', message: 'Timeline must be at least 3 characters long' }
      }
      break
  }

  return null
}

// Utility function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}