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
    status: 'published',
    caseStudy: {
      challenge: 'Healthcare providers needed a unified platform to manage patient appointments, medical records, and enable remote consultations during the pandemic.',
      solution: 'Developed a comprehensive mobile app with secure video calling, digital prescription management, and integrated health monitoring tools.',
      results: 'Reduced appointment no-shows by 35% and increased patient satisfaction scores by 42%. Enabled 89% of consultations to be conducted remotely.',
      metrics: [
        { label: 'Appointment No-Show Reduction', value: '35%' },
        { label: 'Patient Satisfaction Increase', value: '42%' },
        { label: 'Remote Consultation Rate', value: '89%' }
      ]
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'proj-007',
    title: 'AI-Powered Learning Platform',
    description: 'Educational platform with personalized learning paths, AI tutoring, and interactive coding challenges.',
    category: 'web',
    images: [
      {
        id: 'img-007-1',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600',
        alt: 'Learning platform dashboard with progress tracking',
        width: 800,
        height: 600,
        caption: 'Personalized dashboard with learning progress and recommendations'
      },
      {
        id: 'img-007-2',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600',
        alt: 'Interactive coding environment with AI assistance',
        width: 800,
        height: 600,
        caption: 'Built-in code editor with AI-powered hints and debugging'
      },
      {
        id: 'img-007-3',
        url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600',
        alt: 'Video lesson interface with note-taking features',
        width: 800,
        height: 600,
        caption: 'Interactive video lessons with synchronized notes and bookmarks'
      }
    ],
    technologies: ['React', 'Python', 'TensorFlow', 'WebRTC', 'Docker', 'PostgreSQL', 'Redis'],
    client: 'EduTech Innovations',
    year: 2024,
    featured: true,
    slug: 'ai-learning-platform',
    status: 'published',
    url: 'https://edutech-demo.framer.website',
    caseStudy: {
      challenge: 'Traditional online learning platforms had low completion rates (15%) and struggled to adapt to individual learning styles and paces.',
      solution: 'Built an AI-driven platform that analyzes learning patterns, provides personalized content recommendations, and offers real-time coding assistance with adaptive difficulty.',
      results: 'Achieved 73% course completion rate, 89% student satisfaction, and 156% improvement in coding skill assessments compared to traditional methods.',
      metrics: [
        { label: 'Course Completion Rate', value: '73%' },
        { label: 'Student Satisfaction', value: '89%' },
        { label: 'Skill Improvement', value: '156%' },
        { label: 'Average Learning Speed', value: '2.4x faster' }
      ]
    },
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-04-15')
  },
  {
    id: 'proj-008',
    title: 'Smart Home IoT Dashboard',
    description: 'Comprehensive IoT dashboard for smart home automation with real-time monitoring and voice control integration.',
    category: 'ui-ux',
    images: [
      {
        id: 'img-008-1',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600',
        alt: 'Smart home dashboard with device controls',
        width: 800,
        height: 600,
        caption: 'Central dashboard showing all connected devices and energy usage'
      },
      {
        id: 'img-008-2',
        url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600',
        alt: 'Mobile app interface for home automation',
        width: 800,
        height: 600,
        caption: 'Mobile companion app with room-based controls and scheduling'
      }
    ],
    technologies: ['Vue.js', 'Node.js', 'MQTT', 'InfluxDB', 'Grafana', 'Raspberry Pi', 'Arduino'],
    client: 'SmartLiving Technologies',
    year: 2023,
    featured: true,
    slug: 'smart-home-dashboard',
    status: 'published',
    url: 'https://smarthome-demo.framer.website',
    caseStudy: {
      challenge: 'Homeowners struggled with multiple apps for different smart devices, leading to poor user experience and underutilized automation features.',
      solution: 'Created a unified dashboard that connects all smart devices, provides intuitive controls, energy monitoring, and intelligent automation suggestions.',
      results: 'Users reported 67% reduction in time spent managing smart devices and 34% decrease in energy consumption through optimized automation.',
      metrics: [
        { label: 'Device Management Time Reduction', value: '67%' },
        { label: 'Energy Consumption Decrease', value: '34%' },
        { label: 'User Satisfaction Score', value: '4.7/5' },
        { label: 'Automation Usage Increase', value: '89%' }
      ]
    },
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-09-10')
  },
  {
    id: 'proj-009',
    title: 'Cryptocurrency Trading Bot',
    description: 'Algorithmic trading bot with machine learning predictions, risk management, and portfolio optimization.',
    category: 'fintech',
    images: [
      {
        id: 'img-009-1',
        url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600',
        alt: 'Trading bot dashboard with charts and analytics',
        width: 800,
        height: 600,
        caption: 'Real-time trading dashboard with performance metrics and market analysis'
      },
      {
        id: 'img-009-2',
        url: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600',
        alt: 'Portfolio management interface with risk analysis',
        width: 800,
        height: 600,
        caption: 'Portfolio optimization with risk assessment and diversification recommendations'
      }
    ],
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    client: 'CryptoTrade Pro',
    year: 2024,
    featured: false,
    slug: 'crypto-trading-bot',
    status: 'published',
    caseStudy: {
      challenge: 'Manual cryptocurrency trading was time-consuming and emotionally driven, leading to inconsistent results and missed opportunities in volatile markets.',
      solution: 'Developed an AI-powered trading bot that analyzes market patterns, executes trades based on predefined strategies, and continuously learns from market behavior.',
      results: 'Achieved 23% average monthly returns with 15% lower volatility compared to manual trading, processing over 10,000 trades with 78% success rate.',
      metrics: [
        { label: 'Average Monthly Returns', value: '23%' },
        { label: 'Volatility Reduction', value: '15%' },
        { label: 'Trade Success Rate', value: '78%' },
        { label: 'Trades Processed', value: '10,000+' }
      ]
    },
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-30')
  },
  {
    id: 'proj-010',
    title: 'Virtual Reality Art Gallery',
    description: 'Immersive VR experience for showcasing digital art with interactive exhibitions and social features.',
    category: 'vr-ar',
    images: [
      {
        id: 'img-010-1',
        url: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=600',
        alt: 'VR gallery interface with floating artworks',
        width: 800,
        height: 600,
        caption: 'Immersive gallery space with interactive art installations'
      },
      {
        id: 'img-010-2',
        url: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=600',
        alt: 'Social VR features with avatar interactions',
        width: 800,
        height: 600,
        caption: 'Multi-user experience with avatar-based social interactions'
      }
    ],
    technologies: ['Unity', 'C#', 'Oculus SDK', 'Photon Network', 'Blender', 'WebXR'],
    client: 'Digital Arts Collective',
    year: 2023,
    featured: true,
    slug: 'vr-art-gallery',
    status: 'published',
    caseStudy: {
      challenge: 'Digital artists lacked immersive platforms to showcase their work, and traditional galleries were limited by physical space and accessibility.',
      solution: 'Created a VR gallery platform where artists can create custom exhibition spaces, visitors can interact with artworks in 3D, and social features enable community building.',
      results: 'Hosted 150+ virtual exhibitions, attracted 25,000+ visitors globally, and increased artist sales by 340% compared to traditional online galleries.',
      metrics: [
        { label: 'Virtual Exhibitions Hosted', value: '150+' },
        { label: 'Global Visitors', value: '25,000+' },
        { label: 'Artist Sales Increase', value: '340%' },
        { label: 'Average Session Duration', value: '18 minutes' }
      ]
    },
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-08-25')
  },
  {
    id: 'proj-011',
    title: 'Sustainable Fashion Marketplace',
    description: 'E-commerce platform focused on sustainable fashion with carbon footprint tracking and ethical brand verification.',
    category: 'web',
    images: [
      {
        id: 'img-011-1',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600',
        alt: 'Sustainable fashion marketplace homepage',
        width: 800,
        height: 600,
        caption: 'Clean marketplace design highlighting sustainable fashion brands'
      },
      {
        id: 'img-011-2',
        url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=600',
        alt: 'Carbon footprint tracking interface',
        width: 800,
        height: 600,
        caption: 'Environmental impact dashboard showing carbon footprint and sustainability metrics'
      }
    ],
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL', 'Vercel'],
    client: 'GreenThread Marketplace',
    year: 2024,
    featured: false,
    slug: 'sustainable-fashion-marketplace',
    status: 'published',
    caseStudy: {
      challenge: 'Consumers wanted to shop sustainably but lacked transparency about fashion brands\' environmental impact and ethical practices.',
      solution: 'Built a marketplace that verifies sustainable brands, tracks carbon footprint of purchases, and provides detailed sustainability scores for each product.',
      results: 'Onboarded 200+ verified sustainable brands, facilitated $2M+ in eco-friendly purchases, and helped users reduce fashion-related carbon footprint by 45%.',
      metrics: [
        { label: 'Verified Sustainable Brands', value: '200+' },
        { label: 'Eco-Friendly Sales', value: '$2M+' },
        { label: 'Carbon Footprint Reduction', value: '45%' },
        { label: 'Customer Retention Rate', value: '68%' }
      ]
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-02-28')
  },
  {
    id: 'proj-012',
    title: 'Fitness Tracking Wearable App',
    description: 'Companion app for fitness wearables with AI-powered workout recommendations and health insights.',
    category: 'mobile',
    images: [
      {
        id: 'img-012-1',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=800',
        alt: 'Fitness app dashboard with health metrics',
        width: 400,
        height: 800,
        caption: 'Comprehensive health dashboard with real-time biometric data'
      },
      {
        id: 'img-012-2',
        url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=800',
        alt: 'Workout tracking interface with AI recommendations',
        width: 400,
        height: 800,
        caption: 'AI-powered workout planner with personalized exercise recommendations'
      }
    ],
    technologies: ['React Native', 'TensorFlow Lite', 'HealthKit', 'Firebase', 'Python', 'AWS'],
    client: 'FitTech Wearables',
    year: 2023,
    featured: false,
    slug: 'fitness-wearable-app',
    status: 'published',
    caseStudy: {
      challenge: 'Fitness wearable users received generic workout recommendations that didn\'t adapt to their progress, preferences, or physical limitations.',
      solution: 'Developed an AI-powered app that learns from user behavior, biometric data, and workout performance to provide personalized fitness plans and real-time coaching.',
      results: 'Users achieved 89% better adherence to workout plans, 67% faster fitness goal attainment, and 45% reduction in workout-related injuries.',
      metrics: [
        { label: 'Workout Plan Adherence', value: '89%' },
        { label: 'Faster Goal Achievement', value: '67%' },
        { label: 'Injury Reduction', value: '45%' },
        { label: 'User Satisfaction', value: '4.6/5' }
      ]
    },
    createdAt: new Date('2023-04-12'),
    updatedAt: new Date('2023-07-08')
  },
  {
    id: 'proj-013',
    title: 'Real Estate Investment Platform',
    description: 'Comprehensive platform for real estate investment analysis, property management, and portfolio tracking.',
    category: 'fintech',
    images: [
      {
        id: 'img-013-1',
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600',
        alt: 'Real estate investment dashboard with property analytics',
        width: 800,
        height: 600,
        caption: 'Investment dashboard with property performance metrics and market analysis'
      },
      {
        id: 'img-013-2',
        url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600',
        alt: 'Property management interface with tenant tracking',
        width: 800,
        height: 600,
        caption: 'Property management tools with tenant communication and maintenance tracking'
      }
    ],
    technologies: ['Angular', 'Node.js', 'MongoDB', 'D3.js', 'Stripe', 'Google Maps API'],
    client: 'PropertyInvest Pro',
    year: 2024,
    featured: false,
    slug: 'real-estate-investment-platform',
    status: 'published',
    caseStudy: {
      challenge: 'Real estate investors struggled with fragmented tools for property analysis, management, and portfolio tracking, leading to inefficient decision-making.',
      solution: 'Created an all-in-one platform that provides market analysis, ROI calculations, property management tools, and automated reporting for investment portfolios.',
      results: 'Helped investors manage $50M+ in real estate assets, improved investment decision accuracy by 78%, and reduced property management time by 60%.',
      metrics: [
        { label: 'Assets Under Management', value: '$50M+' },
        { label: 'Investment Decision Accuracy', value: '78%' },
        { label: 'Management Time Reduction', value: '60%' },
        { label: 'Platform Users', value: '2,500+' }
      ]
    },
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-04-25')
  },
  {
    id: 'proj-014',
    title: 'AR Interior Design Tool',
    description: 'Augmented reality mobile app for visualizing furniture and decor in real spaces before purchase.',
    category: 'vr-ar',
    images: [
      {
        id: 'img-014-1',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=800',
        alt: 'AR furniture placement in living room',
        width: 400,
        height: 800,
        caption: 'AR visualization of furniture placement in real living spaces'
      },
      {
        id: 'img-014-2',
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=800',
        alt: 'Interior design planning interface',
        width: 400,
        height: 800,
        caption: 'Design planning tools with measurement and color coordination features'
      }
    ],
    technologies: ['Swift', 'ARKit', 'Core ML', 'Firebase', 'Unity', '3D Modeling'],
    client: 'HomeDesign AR',
    year: 2023,
    featured: true,
    slug: 'ar-interior-design-tool',
    status: 'published',
    caseStudy: {
      challenge: 'Customers frequently returned furniture due to size, color, or style mismatches, leading to high return rates and customer dissatisfaction.',
      solution: 'Developed an AR app that allows users to virtually place furniture in their actual space, see accurate scale and lighting, and experiment with different arrangements.',
      results: 'Reduced furniture return rates by 73%, increased customer purchase confidence by 89%, and improved overall satisfaction scores by 56%.',
      metrics: [
        { label: 'Return Rate Reduction', value: '73%' },
        { label: 'Purchase Confidence Increase', value: '89%' },
        { label: 'Satisfaction Improvement', value: '56%' },
        { label: 'App Downloads', value: '500K+' }
      ]
    },
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-09-30')
  },
  {
    id: 'proj-015',
    title: 'Music Collaboration Platform',
    description: 'Cloud-based platform for musicians to collaborate remotely, share tracks, and produce music together.',
    category: 'web',
    images: [
      {
        id: 'img-015-1',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600',
        alt: 'Music collaboration interface with waveform editor',
        width: 800,
        height: 600,
        caption: 'Real-time collaborative music editing with multi-track support'
      },
      {
        id: 'img-015-2',
        url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600',
        alt: 'Virtual studio with instrument plugins',
        width: 800,
        height: 600,
        caption: 'Virtual studio environment with professional audio plugins and effects'
      }
    ],
    technologies: ['React', 'Web Audio API', 'WebRTC', 'Node.js', 'Socket.io', 'AWS S3'],
    client: 'SoundCollab Studios',
    year: 2024,
    featured: false,
    slug: 'music-collaboration-platform',
    status: 'published',
    caseStudy: {
      challenge: 'Musicians struggled to collaborate remotely due to latency issues, file compatibility problems, and lack of real-time editing capabilities.',
      solution: 'Built a web-based platform with low-latency audio streaming, universal file format support, and real-time collaborative editing with version control.',
      results: 'Enabled 10,000+ musicians to collaborate globally, reduced project completion time by 45%, and facilitated creation of 2,500+ collaborative tracks.',
      metrics: [
        { label: 'Active Musicians', value: '10,000+' },
        { label: 'Project Completion Time Reduction', value: '45%' },
        { label: 'Collaborative Tracks Created', value: '2,500+' },
        { label: 'Platform Uptime', value: '99.9%' }
      ]
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-05')
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