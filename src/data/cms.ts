// CMS integration layer for portfolio projects
// This simulates Framer CMS functionality for development and testing

import { Project, ProjectQuery, ProjectFilters, ProjectSortBy, SortOrder } from './types'
import { validateProject, validateProjectFilters, ValidationResult } from './validation'
import { sampleProjects } from './projects'

// Simulated CMS class for project management
export class ProjectCMS {
  private projects: Project[] = [...sampleProjects]

  // Get all projects with optional filtering and sorting
  async getProjects(query?: ProjectQuery): Promise<Project[]> {
    let filteredProjects = [...this.projects]

    // Apply filters
    if (query?.filters) {
      const filterValidation = validateProjectFilters(query.filters)
      if (!filterValidation.isValid) {
        throw new Error(`Invalid filters: ${filterValidation.errors.map(e => e.message).join(', ')}`)
      }
      filteredProjects = this.applyFilters(filteredProjects, query.filters)
    }

    // Apply sorting
    if (query?.sortBy) {
      filteredProjects = this.applySorting(filteredProjects, query.sortBy, query.sortOrder || 'desc')
    }

    // Apply pagination
    if (query?.offset !== undefined || query?.limit !== undefined) {
      const offset = query.offset || 0
      const limit = query.limit || filteredProjects.length
      filteredProjects = filteredProjects.slice(offset, offset + limit)
    }

    return filteredProjects
  }

  // Get a single project by ID
  async getProjectById(id: string): Promise<Project | null> {
    const project = this.projects.find(p => p.id === id)
    return project || null
  }

  // Get a single project by slug
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const project = this.projects.find(p => p.slug === slug)
    return project || null
  }

  // Get featured projects
  async getFeaturedProjects(limit?: number): Promise<Project[]> {
    const featured = this.projects.filter(p => p.featured && p.status === 'published')
    return limit ? featured.slice(0, limit) : featured
  }

  // Get published projects only
  async getPublishedProjects(): Promise<Project[]> {
    return this.projects.filter(p => p.status === 'published')
  }

  // Create a new project
  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const newProject: Project = {
      ...projectData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const validation = validateProject(newProject)
    if (!validation.isValid) {
      throw new Error(`Project validation failed: ${validation.errors.map(e => e.message).join(', ')}`)
    }

    this.projects.push(newProject)
    return newProject
  }

  // Update an existing project
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const projectIndex = this.projects.findIndex(p => p.id === id)
    if (projectIndex === -1) {
      throw new Error(`Project with ID ${id} not found`)
    }

    const updatedProject: Project = {
      ...this.projects[projectIndex],
      ...updates,
      id, // Ensure ID cannot be changed
      updatedAt: new Date()
    }

    const validation = validateProject(updatedProject)
    if (!validation.isValid) {
      throw new Error(`Project validation failed: ${validation.errors.map(e => e.message).join(', ')}`)
    }

    this.projects[projectIndex] = updatedProject
    return updatedProject
  }

  // Delete a project
  async deleteProject(id: string): Promise<boolean> {
    const projectIndex = this.projects.findIndex(p => p.id === id)
    if (projectIndex === -1) {
      return false
    }

    this.projects.splice(projectIndex, 1)
    return true
  }

  // Get project statistics
  async getProjectStats(): Promise<{
    total: number
    published: number
    draft: number
    archived: number
    featured: number
    byCategory: Record<string, number>
    byYear: Record<number, number>
  }> {
    const stats = {
      total: this.projects.length,
      published: this.projects.filter(p => p.status === 'published').length,
      draft: this.projects.filter(p => p.status === 'draft').length,
      archived: this.projects.filter(p => p.status === 'archived').length,
      featured: this.projects.filter(p => p.featured).length,
      byCategory: {} as Record<string, number>,
      byYear: {} as Record<number, number>
    }

    // Count by category
    this.projects.forEach(project => {
      stats.byCategory[project.category] = (stats.byCategory[project.category] || 0) + 1
    })

    // Count by year
    this.projects.forEach(project => {
      stats.byYear[project.year] = (stats.byYear[project.year] || 0) + 1
    })

    return stats
  }

  // Search projects by text
  async searchProjects(searchTerm: string): Promise<Project[]> {
    const term = searchTerm.toLowerCase()
    return this.projects.filter(project => 
      project.status === 'published' && (
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.client.toLowerCase().includes(term) ||
        project.technologies.some(tech => tech.toLowerCase().includes(term))
      )
    )
  }

  // Private helper methods
  private applyFilters(projects: Project[], filters: ProjectFilters): Project[] {
    return projects.filter(project => {
      // Category filter
      if (filters.category && filters.category !== 'all' && project.category !== filters.category) {
        return false
      }

      // Featured filter
      if (filters.featured !== undefined && project.featured !== filters.featured) {
        return false
      }

      // Year filter
      if (filters.year && project.year !== filters.year) {
        return false
      }

      // Technologies filter
      if (filters.technologies && filters.technologies.length > 0) {
        const hasMatchingTech = filters.technologies.some(tech => 
          project.technologies.includes(tech)
        )
        if (!hasMatchingTech) {
          return false
        }
      }

      return true
    })
  }

  private applySorting(projects: Project[], sortBy: ProjectSortBy, sortOrder: SortOrder): Project[] {
    return projects.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'year':
          comparison = a.year - b.year
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'featured':
          comparison = (a.featured ? 1 : 0) - (b.featured ? 1 : 0)
          break
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime()
          break
        default:
          return 0
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })
  }

  private generateId(): string {
    return `proj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// Export singleton instance
export const projectCMS = new ProjectCMS()

// Utility functions for common operations
export async function getAllProjects(): Promise<Project[]> {
  return projectCMS.getProjects()
}

export async function getPublishedProjects(): Promise<Project[]> {
  return projectCMS.getPublishedProjects()
}

export async function getFeaturedProjects(limit?: number): Promise<Project[]> {
  return projectCMS.getFeaturedProjects(limit)
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  return projectCMS.getProjects({
    filters: { category: category as any }
  })
}

export async function searchProjects(searchTerm: string): Promise<Project[]> {
  return projectCMS.searchProjects(searchTerm)
}

// Mock API endpoints for testing
export const mockAPI = {
  // GET /api/projects
  getProjects: async (query?: ProjectQuery) => {
    return {
      data: await projectCMS.getProjects(query),
      status: 200,
      message: 'Projects retrieved successfully'
    }
  },

  // GET /api/projects/:id
  getProject: async (id: string) => {
    const project = await projectCMS.getProjectById(id)
    if (!project) {
      return {
        data: null,
        status: 404,
        message: 'Project not found'
      }
    }
    return {
      data: project,
      status: 200,
      message: 'Project retrieved successfully'
    }
  },

  // GET /api/projects/slug/:slug
  getProjectBySlug: async (slug: string) => {
    const project = await projectCMS.getProjectBySlug(slug)
    if (!project) {
      return {
        data: null,
        status: 404,
        message: 'Project not found'
      }
    }
    return {
      data: project,
      status: 200,
      message: 'Project retrieved successfully'
    }
  },

  // GET /api/projects/featured
  getFeaturedProjects: async (limit?: number) => {
    return {
      data: await projectCMS.getFeaturedProjects(limit),
      status: 200,
      message: 'Featured projects retrieved successfully'
    }
  },

  // GET /api/projects/stats
  getProjectStats: async () => {
    return {
      data: await projectCMS.getProjectStats(),
      status: 200,
      message: 'Project statistics retrieved successfully'
    }
  }
}