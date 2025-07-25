#!/usr/bin/env node

/**
 * Critical Resource Preloading Script
 * Identifies and configures preloading for critical resources
 */

const fs = require('fs');
const path = require('path');

class CriticalResourcePreloader {
  constructor() {
    this.criticalResources = {
      fonts: [],
      images: [],
      css: [],
      js: []
    };
  }

  async generatePreloadConfig() {
    console.log('🔄 Analyzing critical resources...');
    
    await this.identifyCriticalFonts();
    await this.identifyCriticalImages();
    await this.identifyCriticalCSS();
    await this.identifyCriticalJS();
    await this.generatePreloadHTML();
    await this.generateResourceHints();
    
    console.log('✅ Critical resource preloading configured!');
  }

  async identifyCriticalFonts() {
    console.log('🔤 Identifying critical fonts...');
    
    // Critical fonts that should be preloaded
    const criticalFonts = [
      {
        name: 'Inter',
        weights: [400, 500, 600, 700],
        formats: ['woff2', 'woff'],
        display: 'swap'
      },
      {
        name: 'Playfair Display',
        weights: [400, 700],
        formats: ['woff2', 'woff'],
        display: 'swap'
      }
    ];

    for (const font of criticalFonts) {
      for (const weight of font.weights) {
        for (const format of font.formats) {
          const fontResource = {
            type: 'font',
            name: `${font.name}-${weight}`,
            url: `/fonts/${font.name.toLowerCase().replace(' ', '-')}-${weight}.${format}`,
            format: format,
            display: font.display,
            crossorigin: 'anonymous'
          };
          
          this.criticalResources.fonts.push(fontResource);
          console.log(`   Added: ${fontResource.name}.${format}`);
        }
      }
    }
  }

  async identifyCriticalImages() {
    console.log('🖼️  Identifying critical images...');
    
    // Above-the-fold images that should be preloaded
    const criticalImages = [
      {
        name: 'hero-background',
        url: '/images/hero-background.webp',
        sizes: '100vw',
        type: 'image/webp'
      },
      {
        name: 'logo',
        url: '/images/logo.svg',
        sizes: '200px',
        type: 'image/svg+xml'
      },
      {
        name: 'hero-portrait',
        url: '/images/hero-portrait.webp',
        sizes: '(max-width: 768px) 100vw, 50vw',
        type: 'image/webp'
      }
    ];

    for (const image of criticalImages) {
      this.criticalResources.images.push({
        type: 'image',
        name: image.name,
        url: image.url,
        sizes: image.sizes,
        mimeType: image.type
      });
      
      console.log(`   Added: ${image.name}`);
    }
  }

  async identifyCriticalCSS() {
    console.log('🎨 Identifying critical CSS...');
    
    // Critical CSS files for above-the-fold content
    const criticalCSS = [
      {
        name: 'critical-styles',
        url: '/css/critical.css',
        media: 'all'
      },
      {
        name: 'layout-styles',
        url: '/css/layout.css',
        media: 'all'
      }
    ];

    for (const css of criticalCSS) {
      this.criticalResources.css.push({
        type: 'style',
        name: css.name,
        url: css.url,
        media: css.media
      });
      
      console.log(`   Added: ${css.name}`);
    }
  }

  async identifyCriticalJS() {
    console.log('📦 Identifying critical JavaScript...');
    
    // Critical JavaScript for initial page functionality
    const criticalJS = [
      {
        name: 'runtime',
        url: '/js/runtime.js',
        module: false
      },
      {
        name: 'vendor',
        url: '/js/vendor.js',
        module: false
      },
      {
        name: 'main',
        url: '/js/main.js',
        module: true
      }
    ];

    for (const js of criticalJS) {
      this.criticalResources.js.push({
        type: 'script',
        name: js.name,
        url: js.url,
        module: js.module
      });
      
      console.log(`   Added: ${js.name}`);
    }
  }

  async generatePreloadHTML() {
    console.log('📝 Generating preload HTML...');
    
    let preloadHTML = '<!-- Critical Resource Preloads -->\n';
    
    // Font preloads
    for (const font of this.criticalResources.fonts) {
      preloadHTML += `<link rel="preload" href="${font.url}" as="font" type="font/${font.format}" crossorigin="${font.crossorigin}">\n`;
    }
    
    // Image preloads
    for (const image of this.criticalResources.images) {
      preloadHTML += `<link rel="preload" href="${image.url}" as="image" type="${image.mimeType}"`;
      if (image.sizes) {
        preloadHTML += ` imagesizes="${image.sizes}"`;
      }
      preloadHTML += '>\n';
    }
    
    // CSS preloads
    for (const css of this.criticalResources.css) {
      preloadHTML += `<link rel="preload" href="${css.url}" as="style" media="${css.media}">\n`;
    }
    
    // JS preloads
    for (const js of this.criticalResources.js) {
      preloadHTML += `<link rel="preload" href="${js.url}" as="script"`;
      if (js.module) {
        preloadHTML += ' crossorigin="anonymous"';
      }
      preloadHTML += '>\n';
    }
    
    // Create preload directory if it doesn't exist
    if (!fs.existsSync('dist/preload')) {
      fs.mkdirSync('dist/preload', { recursive: true });
    }
    
    fs.writeFileSync('dist/preload/critical-preloads.html', preloadHTML);
    console.log('   Generated: dist/preload/critical-preloads.html');
  }

  async generateResourceHints() {
    console.log('💡 Generating resource hints...');
    
    const resourceHints = {
      preload: this.criticalResources,
      prefetch: {
        // Non-critical resources to prefetch
        images: [
          '/images/portfolio-grid-bg.webp',
          '/images/services-bg.webp'
        ],
        pages: [
          '/portfolio',
          '/services',
          '/contact'
        ]
      },
      preconnect: [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://api.framer.com'
      ]
    };

    // Generate resource hints HTML
    let hintsHTML = '<!-- Resource Hints -->\n';
    
    // Preconnect hints
    for (const origin of resourceHints.preconnect) {
      hintsHTML += `<link rel="preconnect" href="${origin}" crossorigin>\n`;
    }
    
    // DNS prefetch for external resources
    hintsHTML += '<link rel="dns-prefetch" href="//fonts.googleapis.com">\n';
    hintsHTML += '<link rel="dns-prefetch" href="//api.framer.com">\n';
    
    // Prefetch non-critical resources
    for (const image of resourceHints.prefetch.images) {
      hintsHTML += `<link rel="prefetch" href="${image}" as="image">\n`;
    }
    
    for (const page of resourceHints.prefetch.pages) {
      hintsHTML += `<link rel="prefetch" href="${page}">\n`;
    }
    
    fs.writeFileSync('dist/preload/resource-hints.html', hintsHTML);
    console.log('   Generated: dist/preload/resource-hints.html');

    // Generate JSON configuration for programmatic use
    fs.writeFileSync(
      'dist/preload/resource-config.json',
      JSON.stringify(resourceHints, null, 2)
    );
    console.log('   Generated: dist/preload/resource-config.json');
  }
}

// Run preload configuration
const preloader = new CriticalResourcePreloader();
preloader.generatePreloadConfig().catch(console.error);