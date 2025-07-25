export default {
  // Custom domain configuration
  domain: "designstudio.framer.website",
  
  // Production deployment settings
  deployment: {
    customDomain: "designstudio.com",
    ssl: {
      enabled: true,
      forceHttps: true,
      hsts: true
    },
    cdn: {
      enabled: true,
      regions: ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
      caching: {
        static: '1y',
        dynamic: '1h',
        api: '5m'
      }
    },
    compression: {
      gzip: true,
      brotli: true
    }
  },
  
  // Site metadata
  site: {
    title: "Design Studio - Creative Digital Experiences",
    description: "A visually stunning design studio showcasing exceptional web design and interactive experiences",
    author: "Design Studio",
    url: "https://designstudio.com"
  },
  
  // Responsive breakpoints configuration
  breakpoints: {
    mobile: 390,
    tablet: 768,
    desktop: 1200,
    large: 1440
  },
  
  // Grid system configuration
  grid: {
    columns: 12,
    gutter: 24,
    margin: 20,
    maxWidth: 1200
  },
  
  // Performance optimization
  optimization: {
    images: {
      formats: ['webp', 'avif', 'jpg'],
      quality: 85,
      progressive: true,
      responsive: {
        breakpoints: [320, 640, 768, 1024, 1280, 1920],
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      },
      lazy: true,
      placeholder: 'blur'
    },
    animations: {
      reducedMotion: true,
      fps: 60,
      gpuAcceleration: true,
      willChange: 'auto'
    },
    assets: {
      minify: true,
      compress: true,
      treeshake: true,
      splitChunks: true
    },
    loading: {
      preload: {
        fonts: true,
        criticalImages: true,
        criticalCSS: true
      },
      prefetch: {
        nextPage: true,
        images: true
      }
    }
  },
  
  // SEO configuration
  seo: {
    sitemap: true,
    robots: true,
    openGraph: true,
    structuredData: true,
    analytics: {
      googleAnalytics: process.env.GA_TRACKING_ID,
      framerAnalytics: true
    }
  },
  
  // Security configuration
  security: {
    contentSecurityPolicy: {
      enabled: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
        'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        'font-src': ["'self'", "https://fonts.gstatic.com"],
        'img-src': ["'self'", "data:", "https:"],
        'connect-src': ["'self'", "https://api.framer.com"]
      }
    },
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  
  // Monitoring and backup
  monitoring: {
    uptime: {
      enabled: true,
      interval: '5m',
      alerts: {
        email: process.env.ALERT_EMAIL,
        webhook: process.env.ALERT_WEBHOOK
      }
    },
    performance: {
      enabled: true,
      realUserMonitoring: true,
      syntheticTests: true
    },
    backup: {
      enabled: true,
      frequency: 'daily',
      retention: '30d',
      storage: 'cloud'
    }
  }
};