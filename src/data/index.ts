// Data layer exports for portfolio showcase system

// Types
export type {
  Project,
  Image,
  CaseStudy,
  Service,
  ContactForm,
  ProcessStep,
  ProjectCategory,
  ProjectSortBy,
  SortOrder,
  ProjectFilters,
  ProjectQuery
} from './types'

// Validation
export {
  validateProject,
  validateImage,
  validateCaseStudy,
  validateProjectFilters,
  generateSlug,
  type ValidationResult,
  type ValidationError
} from './validation'

// Sample data
export {
  sampleProjects,
  getProjectById,
  getProjectBySlug,
  getFeaturedProjects,
  getPublishedProjects,
  getProjectsByCategory,
  getProjectsByYear,
  getUniqueCategories,
  getUniqueTechnologies,
  getUniqueYears
} from './projects'

// CMS integration
export {
  ProjectCMS,
  projectCMS,
  getAllProjects,
  getProjectsByCategory as getCMSProjectsByCategory,
  searchProjects,
  mockAPI
} from './cms'