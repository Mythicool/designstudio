import { Service } from './types';

// Sample service data for the design studio
export const services: Service[] = [
  {
    id: 'web-design',
    name: 'Web Design & Development',
    description: 'Custom websites that combine stunning visuals with seamless functionality, built with modern technologies and optimized for performance.',
    icon: 'globe',
    features: [
      'Responsive design for all devices',
      'Custom animations and interactions',
      'Performance optimization',
      'SEO-friendly architecture',
      'Content management systems',
      'E-commerce integration'
    ],
    pricing: {
      type: 'project',
      amount: 15000,
      currency: 'USD'
    },
    process: [
      {
        id: 'discovery',
        title: 'Discovery & Strategy',
        description: 'We start by understanding your business goals, target audience, and project requirements through detailed consultation.',
        order: 1
      },
      {
        id: 'design',
        title: 'Design & Prototyping',
        description: 'Creating wireframes, mockups, and interactive prototypes to visualize the final product before development.',
        order: 2
      },
      {
        id: 'development',
        title: 'Development & Testing',
        description: 'Building your website with clean, scalable code and thorough testing across devices and browsers.',
        order: 3
      },
      {
        id: 'launch',
        title: 'Launch & Support',
        description: 'Deploying your website and providing ongoing support, maintenance, and optimization services.',
        order: 4
      }
    ]
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Design',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences and drive engagement.',
    icon: 'smartphone',
    features: [
      'iOS and Android development',
      'Cross-platform solutions',
      'User interface design',
      'User experience optimization',
      'App store optimization',
      'Analytics integration'
    ],
    pricing: {
      type: 'project',
      amount: 25000,
      currency: 'USD'
    },
    process: [
      {
        id: 'research',
        title: 'Research & Planning',
        description: 'Market research, competitor analysis, and user journey mapping to inform the app strategy.',
        order: 1
      },
      {
        id: 'ux-design',
        title: 'UX/UI Design',
        description: 'Creating intuitive user interfaces and seamless user experiences tailored for mobile platforms.',
        order: 2
      },
      {
        id: 'development',
        title: 'App Development',
        description: 'Building robust, scalable mobile applications with native performance and cross-platform compatibility.',
        order: 3
      },
      {
        id: 'testing',
        title: 'Testing & Deployment',
        description: 'Comprehensive testing, app store submission, and post-launch monitoring and updates.',
        order: 4
      }
    ]
  },
  {
    id: 'branding',
    name: 'Brand Identity & Design',
    description: 'Comprehensive branding solutions that create memorable identities and consistent visual experiences across all touchpoints.',
    icon: 'palette',
    features: [
      'Logo design and brand marks',
      'Brand guidelines and systems',
      'Marketing collateral design',
      'Packaging and print design',
      'Brand strategy consulting',
      'Digital asset creation'
    ],
    pricing: {
      type: 'project',
      amount: 8000,
      currency: 'USD'
    },
    process: [
      {
        id: 'brand-discovery',
        title: 'Brand Discovery',
        description: 'Understanding your brand values, mission, and target audience to create a strategic foundation.',
        order: 1
      },
      {
        id: 'concept-development',
        title: 'Concept Development',
        description: 'Exploring creative directions and developing initial concepts for your brand identity.',
        order: 2
      },
      {
        id: 'design-refinement',
        title: 'Design & Refinement',
        description: 'Creating final brand assets and refining designs based on feedback and testing.',
        order: 3
      },
      {
        id: 'brand-guidelines',
        title: 'Guidelines & Delivery',
        description: 'Developing comprehensive brand guidelines and delivering all assets in various formats.',
        order: 4
      }
    ]
  },
  {
    id: 'ui-ux-consulting',
    name: 'UI/UX Consulting',
    description: 'Expert consultation and design audits to improve user experience, increase conversions, and optimize digital products.',
    icon: 'users',
    features: [
      'UX audits and analysis',
      'User research and testing',
      'Interface design optimization',
      'Conversion rate optimization',
      'Accessibility improvements',
      'Design system development'
    ],
    pricing: {
      type: 'hourly',
      amount: 150,
      currency: 'USD'
    },
    process: [
      {
        id: 'audit',
        title: 'UX Audit & Analysis',
        description: 'Comprehensive review of your current digital products to identify improvement opportunities.',
        order: 1
      },
      {
        id: 'user-research',
        title: 'User Research',
        description: 'Conducting user interviews, surveys, and usability testing to gather insights.',
        order: 2
      },
      {
        id: 'recommendations',
        title: 'Strategy & Recommendations',
        description: 'Developing actionable recommendations and improvement strategies based on research findings.',
        order: 3
      },
      {
        id: 'implementation',
        title: 'Implementation Support',
        description: 'Providing ongoing support and guidance during the implementation of recommended changes.',
        order: 4
      }
    ]
  }
];

// Helper functions for service data
export const getServiceById = (id: string): Service | undefined => {
  for (let i = 0; i < services.length; i++) {
    if (services[i].id === id) {
      return services[i];
    }
  }
  return undefined;
};

export const getServicesByCategory = (category: string): Service[] => {
  // This could be extended if services had categories
  return services;
};

export const getFeaturedServices = (): Service[] => {
  // Return first 3 services as featured for now
  return services.slice(0, 3);
};