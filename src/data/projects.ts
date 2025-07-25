// Sample project data for portfolio showcase

import { Project } from './types'

export const sampleProjects: Project[] = [
  {
    id: 'proj-001',
    title: 'E-Commerce Platform Redesign',
    description: 'Complete redesign and development of a modern e-commerce platform with focus on user experience and conversion optimization.',
    category: 'web',
    images: [
      {
        id: 'img-001-1',
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600',
        alt: 'E-commerce platform homepage design',
        width: 800,
        height: 600,
        caption: 'Homepage with modern hero section and product showcase'
      },
      {
        id: 'img-001-2',
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600',
        alt: 'Product listing page design',
        width: 800,
        height: 600,
        caption: 'Clean product grid with advanced filtering'
      },
      {
        id: 'img-001-3',
        url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600',
        alt: 'Shopping cart and checkout flow',
        width: 800,
        height: 600,
        caption: 'Streamlined checkout process with progress indicators'
      }
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Stripe', 'Tailwind CSS', 'Framer Motion'],
    client: 'TechStyle Commerce',
    year: 2024,
    featured: true,
    slug: 'ecommerce-platform-redesign',
    status: 'published',
    url: 'https://techstyle-demo.framer.website',
    caseStudy: {
      challenge: 'The existing e-commerce platform had a 68% cart abandonment rate and poor mobile experience. Users struggled with navigation and the checkout process was overly complex.',
      solution: 'We redesigned the entire user journey with a mobile-first approach, simplified the checkout to 3 steps, implemented smart product recommendations, and added real-time inventory updates.',
      results: 'Achieved a 45% reduction in cart abandonment, 78% increase in mobile conversions, and 23% improvement in overall user satisfaction scores.',
      metrics: [
        { label: 'Cart Abandonment Reduction', value: '45%' },
        { label: 'Mobile Conversion Increase', value: '78%' },
        { label: 'User Satisfaction Improvement', value: '23%' },
        { label: 'Page Load Speed Improvement', value: '2.3s' }
      ]
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20')
  },
  {
    id: 'proj-002',
    title: 'FinTech Mobile App',
    description: 'Native mobile application for personal finance management with AI-powered insights and budgeting tools.',
    category: 'mobile',
    images: [
      {
        id: 'img-002-1',
        url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800',
        alt: 'Mobile app dashboard with financial overview',
        width: 400,
        height: 800,
        caption: 'Dashboard with spending insights and budget tracking'
      },
      {
        id: 'img-002-2',
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=800',
        alt: 'Transaction history and categorization',
        width: 400,
        height: 800,
        caption: 'Smart transaction categorization with visual spending breakdown'
      }
    ],
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Plaid API', 'Chart.js'],
    client: 'MoneyWise Financial',
    year: 2023,
    featured: true,
    slug: 'fintech-mobile-app',
    status: 'published',
    caseStudy: {
      challenge: 'Users needed a simple way to track expenses across multiple accounts while getting actionable insights about their spending habits.',
      solution: 'Built a native mobile app with bank integration, AI-powered categorization, and personalized budgeting recommendations with push notifications.',
      results: 'Users reported 67% better awareness of spending habits and 34% improvement in meeting savings goals within the first 3 months.',
      metrics: [
        { label: 'User Engagement', value: '89%' },
        { label: 'Savings Goal Achievement', value: '34%' },
        { label: 'App Store Rating', value: '4.8/5' }
      ]
    },
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2023-11-15')
  },
  {
    id: 'proj-003',
    title: 'Brand Identity & Website',
    description: 'Complete brand identity design and website development for a sustainable fashion startup.',
    category: 'branding',
    images: [
      {
        id: 'img-003-1',
        url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600',
        alt: 'Brand identity design with logo variations',
        width: 800,
        height: 600,
        caption: 'Logo design with sustainable color palette'
      },
      {
        id: 'img-003-2',
        url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600',
        alt: 'Website design showcasing brand elements',
        width: 800,
        height: 600,
        caption: 'Website design reflecting brand values and sustainability focus'
      }
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Framer', 'CSS', 'JavaScript'],
    client: 'EcoThread Apparel',
    year: 2023,
    featured: false,
    slug: 'ecothread-brand-identity',
    status: 'published',
    caseStudy: {
      challenge: 'A new sustainable fashion brand needed a complete identity that would resonate with environmentally conscious consumers while standing out in a crowded market.',
      solution: 'Created a nature-inspired brand identity with earthy colors, sustainable packaging design, and a website that tells the brand story through interactive elements.',
      results: 'Brand recognition increased by 156% in the first 6 months, with 43% of customers citing brand values as their primary purchase driver.',
      metrics: [
        { label: 'Brand Recognition Increase', value: '156%' },
        { label: 'Customer Brand Affinity', value: '43%' },
        { label: 'Social Media Engagement', value: '89%' }
      ]
    },
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-06-10')
  },
  {
    id: 'proj-004',
    title: 'SaaS Dashboard Interface',
    description: 'Complex data visualization dashboard for a B2B analytics platform with real-time updates and customizable widgets.',
    category: 'ui-ux',
    images: [
      {
        id: 'img-004-1',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600',
        alt: 'Analytics dashboard with charts and metrics',
        width: 800,
        height: 600,
        caption: 'Main dashboard with customizable widget layout'
      },
      {
        id: 'img-004-2',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600',
        alt: 'Data visualization and reporting interface',
        width: 800,
        height: 600,
        caption: 'Advanced reporting with interactive charts and filters'
      }
    ],
    technologies: ['React', 'D3.js', 'TypeScript', 'Material-UI', 'WebSocket', 'Node.js'],
    client: 'DataFlow Analytics',
    year: 2024,
    featured: true,
    slug: 'saas-dashboard-interface',
    status: 'published',
    url: 'https://dataflow-demo.framer.website',
    caseStudy: {
      challenge: 'Users were overwhelmed by complex data and couldn\'t quickly identify key insights. The existing interface had poor usability and limited customization options.',
      solution: 'Designed a modular dashboard system with drag-and-drop widgets, intelligent data grouping, and contextual insights that highlight important trends automatically.',
      results: 'User task completion time decreased by 52%, and customer satisfaction scores improved by 41%. Dashboard customization usage increased by 78%.',
      metrics: [
        { label: 'Task Completion Time Reduction', value: '52%' },
        { label: 'Customer Satisfaction Increase', value: '41%' },
        { label: 'Feature Adoption Rate', value: '78%' }
      ]
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: 'proj-005',
    title: 'Restaurant Ordering System',
    description: 'Modern web application for restaurant ordering with real-time kitchen integration and customer notifications.',
    category: 'web',
    images: [
      {
        id: 'img-005-1',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600',
        alt: 'Restaurant ordering interface with menu display',
        width: 800,
        height: 600,
        caption: 'Clean menu interface with appetizing food photography'
      }
    ],
    technologies: ['Vue.js', 'Node.js', 'Socket.io', 'MongoDB', 'Stripe', 'PWA'],
    client: 'Bistro Modern',
    year: 2023,
    featured: false,
    slug: 'restaurant-ordering-system',
    status: 'published',
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-10-20')
  },
  {
    id: 'proj-006',
    title: 'Healthcare App Prototype',
    description: 'Patient management mobile app prototype with appointment scheduling and telemedicine features.',
    category: 'mobile',
    images: [
      {
        id: 'img-006-1',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=800',
        alt: 'Healthcare app interface showing appointment booking',
        width: 400,
        height: 800,
        caption: 'Appointment scheduling with doctor availability'
      }
    ],
    technologies: ['Flutter', 'Firebase', 'WebRTC', 'Dart', 'Google Cloud'],
    client: 'MedConnect Solutions',
    year: 2024,
    featured: false,
    slug: 'healthcare-app-prototype',
    status: 'draft',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  }
]

// Helper functions for data manipulation
export function getProjectById(id: string): Project | undefined {
  return sampleProjects.find(project => project.id === id)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return sampleProjects.find(project => project.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return sampleProjects.filter(project => project.featured && project.status === 'published')
}

export function getPublishedProjects(): Project[] {
  return sampleProjects.filter(project => project.status === 'published')
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') {
    return getPublishedProjects()
  }
  return sampleProjects.filter(
    project => project.category === category && project.status === 'published'
  )
}

export function getProjectsByYear(year: number): Project[] {
  return sampleProjects.filter(
    project => project.year === year && project.status === 'published'
  )
}

export function getUniqueCategories(): string[] {
  const categories = sampleProjects.map(project => project.category)
  return Array.from(new Set(categories))
}

export function getUniqueTechnologies(): string[] {
  const technologies = sampleProjects.flatMap(project => project.technologies)
  return Array.from(new Set(technologies)).sort()
}

export function getUniqueYears(): number[] {
  const years = sampleProjects.map(project => project.year)
  return Array.from(new Set(years)).sort((a, b) => b - a)
}