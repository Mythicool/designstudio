/**
 * Monitoring and Backup Configuration
 * Production monitoring, alerting, and backup settings
 */

export default {
  // Uptime monitoring
  uptime: {
    enabled: true,
    checks: [
      {
        name: 'Homepage',
        url: 'https://designstudio.com',
        method: 'GET',
        interval: '5m',
        timeout: '10s',
        expectedStatus: 200,
        expectedContent: 'Design Studio'
      },
      {
        name: 'Portfolio Page',
        url: 'https://designstudio.com/portfolio',
        method: 'GET',
        interval: '10m',
        timeout: '15s',
        expectedStatus: 200
      },
      {
        name: 'Contact Form',
        url: 'https://designstudio.com/contact',
        method: 'GET',
        interval: '15m',
        timeout: '10s',
        expectedStatus: 200
      }
    ],
    locations: [
      'us-east-1',
      'eu-west-1',
      'ap-southeast-1'
    ],
    alerts: {
      email: {
        enabled: true,
        recipients: ['admin@designstudio.com'],
        threshold: 2 // Alert after 2 consecutive failures
      },
      slack: {
        enabled: true,
        webhook: process.env.SLACK_WEBHOOK,
        channel: '#alerts'
      },
      sms: {
        enabled: false,
        numbers: []
      }
    }
  },

  // Performance monitoring
  performance: {
    enabled: true,
    realUserMonitoring: {
      enabled: true,
      sampleRate: 0.1, // Monitor 10% of users
      metrics: [
        'first-contentful-paint',
        'largest-contentful-paint',
        'first-input-delay',
        'cumulative-layout-shift',
        'time-to-interactive'
      ]
    },
    syntheticTests: {
      enabled: true,
      frequency: '1h',
      locations: ['us-east-1', 'eu-west-1'],
      tests: [
        {
          name: 'Homepage Performance',
          url: 'https://designstudio.com',
          device: 'desktop',
          connection: '4g',
          thresholds: {
            'first-contentful-paint': 2000,
            'largest-contentful-paint': 3000,
            'time-to-interactive': 4000
          }
        },
        {
          name: 'Mobile Performance',
          url: 'https://designstudio.com',
          device: 'mobile',
          connection: '3g',
          thresholds: {
            'first-contentful-paint': 3000,
            'largest-contentful-paint': 4000,
            'time-to-interactive': 5000
          }
        }
      ]
    },
    alerts: {
      performanceRegression: {
        enabled: true,
        threshold: 20, // Alert if performance degrades by 20%
        recipients: ['dev@designstudio.com']
      },
      coreWebVitals: {
        enabled: true,
        thresholds: {
          lcp: 2500, // Largest Contentful Paint
          fid: 100,  // First Input Delay
          cls: 0.1   // Cumulative Layout Shift
        }
      }
    }
  },

  // Error tracking
  errorTracking: {
    enabled: true,
    captureUnhandledRejections: true,
    captureConsoleErrors: true,
    sourceMaps: {
      enabled: true,
      uploadOnBuild: true
    },
    filters: {
      ignoreUrls: [
        /chrome-extension/,
        /moz-extension/,
        /safari-extension/
      ],
      ignoreErrors: [
        'Script error',
        'Non-Error promise rejection captured'
      ]
    },
    alerts: {
      newError: {
        enabled: true,
        recipients: ['dev@designstudio.com']
      },
      errorSpike: {
        enabled: true,
        threshold: 10, // Alert if error rate increases by 10x
        timeWindow: '5m'
      }
    }
  },

  // Security monitoring
  security: {
    enabled: true,
    checks: [
      {
        name: 'SSL Certificate',
        type: 'ssl',
        url: 'https://designstudio.com',
        alertDaysBefore: 30 // Alert 30 days before expiration
      },
      {
        name: 'Security Headers',
        type: 'headers',
        url: 'https://designstudio.com',
        expectedHeaders: [
          'Strict-Transport-Security',
          'X-Content-Type-Options',
          'X-Frame-Options',
          'Content-Security-Policy'
        ]
      }
    ],
    vulnerabilityScanning: {
      enabled: true,
      frequency: 'weekly',
      scanTypes: ['dependencies', 'containers', 'infrastructure']
    }
  },

  // Backup configuration
  backup: {
    enabled: true,
    schedule: {
      full: 'daily at 2:00 AM UTC',
      incremental: 'every 6 hours'
    },
    retention: {
      daily: 30,   // Keep daily backups for 30 days
      weekly: 12,  // Keep weekly backups for 12 weeks
      monthly: 12  // Keep monthly backups for 12 months
    },
    storage: {
      primary: {
        type: 'cloud',
        provider: 'aws-s3',
        bucket: 'designstudio-backups',
        region: 'us-east-1',
        encryption: true
      },
      secondary: {
        type: 'cloud',
        provider: 'gcp-storage',
        bucket: 'designstudio-backups-secondary',
        region: 'us-central1',
        encryption: true
      }
    },
    verification: {
      enabled: true,
      frequency: 'weekly',
      testRestore: true
    },
    alerts: {
      backupFailure: {
        enabled: true,
        recipients: ['admin@designstudio.com']
      },
      verificationFailure: {
        enabled: true,
        recipients: ['admin@designstudio.com']
      }
    }
  },

  // Analytics and reporting
  analytics: {
    enabled: true,
    providers: {
      googleAnalytics: {
        enabled: true,
        trackingId: process.env.GA_TRACKING_ID,
        enhancedEcommerce: false,
        anonymizeIp: true
      },
      framerAnalytics: {
        enabled: true,
        trackPageViews: true,
        trackInteractions: true,
        trackPerformance: true
      }
    },
    customEvents: [
      'portfolio_view',
      'contact_form_submit',
      'service_inquiry',
      'project_download'
    ],
    reports: {
      daily: {
        enabled: true,
        recipients: ['analytics@designstudio.com'],
        metrics: ['pageviews', 'users', 'bounce_rate', 'avg_session_duration']
      },
      weekly: {
        enabled: true,
        recipients: ['team@designstudio.com'],
        includePerformance: true,
        includeErrors: true
      },
      monthly: {
        enabled: true,
        recipients: ['management@designstudio.com'],
        comprehensive: true
      }
    }
  },

  // Maintenance windows
  maintenance: {
    scheduled: [
      {
        name: 'Weekly Maintenance',
        schedule: 'Sunday 3:00-4:00 AM UTC',
        tasks: ['security_updates', 'performance_optimization', 'backup_verification']
      },
      {
        name: 'Monthly Maintenance',
        schedule: 'First Sunday of month 2:00-5:00 AM UTC',
        tasks: ['full_system_update', 'security_audit', 'performance_review']
      }
    ],
    notifications: {
      advance: '24h',
      channels: ['email', 'status_page'],
      recipients: ['users@designstudio.com']
    }
  }
};