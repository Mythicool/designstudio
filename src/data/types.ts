// Project data types for portfolio showcase system

export interface Image {
  id: string
  url: string
  alt: string
  width: number
  height: number
  caption?: string
}

export interface ProcessStep {
  id: string
  title: string
  description: string
  order: number
}

export interface CaseStudy {
  challenge: string
  solution: string
  results: string
  metrics?: {
    label: string
    value: string
  }[]
}

export interface Project {
  id: string
  title: string
  description: string
  category: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'fintech' | 'vr-ar'
  images: Image[]
  technologies: string[]
  client: string
  year: number
  featured: boolean
  slug: string
  caseStudy?: CaseStudy
  url?: string
  status: 'published' | 'draft' | 'archived'
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  features: string[]
  pricing?: {
    type: 'fixed' | 'hourly' | 'project'
    amount?: number
    currency: string
  }
  process: ProcessStep[]
}

export interface ContactForm {
  name: string
  email: string
  company?: string
  projectType: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'fintech' | 'vr-ar' | 'consultation'
  budget: 'under-10k' | '10k-25k' | '25k-50k' | '50k+'
  message: string
  timeline?: string
  attachments?: File[]
}

export interface ContactFormSubmission extends ContactForm {
  id: string
  submittedAt: Date
  status: 'pending' | 'reviewed' | 'responded'
}

// Filter and sorting types
export type ProjectCategory = Project['category'] | 'all'
export type ProjectSortBy = 'year' | 'title' | 'featured' | 'createdAt'
export type SortOrder = 'asc' | 'desc'

export interface ProjectFilters {
  category: ProjectCategory
  featured?: boolean
  year?: number
  technologies?: string[]
}

export interface ProjectQuery {
  filters?: ProjectFilters
  sortBy?: ProjectSortBy
  sortOrder?: SortOrder
  limit?: number
  offset?: number
}