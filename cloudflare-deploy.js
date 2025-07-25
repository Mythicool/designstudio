#!/usr/bin/env node

/**
 * Cloudflare Pages Deployment Script
 * Optimizes and deploys the Design Studio website
 */

const fs = require('fs');
const path = require('path');

class CloudflareDeployment {
  constructor() {
    this.buildDir = 'dist';
    this.sourceFiles = [
      'index.html',
      'package.json',
      'README.md',
      '_headers',
      '_redirects',
      'wrangler.toml'
    ];
  }

  async deploy() {
    console.log('☁️  Starting Cloudflare Pages deployment preparation...');
    
    await this.createBuildDirectory();
    await this.copySourceFiles();
    await this.optimizeForCloudflare();
    await this.generateManifest();
    await this.createDeploymentInstructions();
    
    console.log('✅ Cloudflare deployment preparation completed!');
  }

  async createBuildDirectory() {
    console.log('📁 Creating build directory...');
    
    if (!fs.existsSync(this.buildDir)) {
      fs.mkdirSync(this.buildDir, { recursive: true });
    }
    
    // Create subdirectories
    const subdirs = ['assets', 'images', 'fonts', 'css', 'js'];
    subdirs.forEach(dir => {
      const dirPath = path.join(this.buildDir, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
  }

  async copySourceFiles() {
    console.log('📋 Copying source files...');
    
    for (const file of this.sourceFiles) {
      if (fs.existsSync(file)) {
        const destPath = path.join(this.buildDir, file);
        fs.copyFileSync(file, destPath);
        console.log(`   ✓ Copied ${file}`);
      }
    }
  }

  async optimizeForCloudflare() {
    console.log('⚡ Optimizing for Cloudflare Pages...');
    
    // Read the HTML file
    const htmlPath = path.join(this.buildDir, 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Add Cloudflare-specific optimizations
    const cloudflareOptimizations = `
    <!-- Cloudflare Web Analytics -->
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "your-token-here"}'></script>
    
    <!-- Cloudflare Performance Optimizations -->
    <meta name="cf-2fa-verify" content="your-verification-code">
    <link rel="preconnect" href="https://cloudflare.com">
    `;
    
    // Insert before closing head tag
    html = html.replace('</head>', `${cloudflareOptimizations}</head>`);
    
    // Add service worker registration
    const serviceWorkerScript = `
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
        });
      }
    </script>
    `;
    
    html = html.replace('</body>', `${serviceWorkerScript}</body>`);
    
    fs.writeFileSync(htmlPath, html);
    console.log('   ✓ Added Cloudflare optimizations');
  }

  async generateManifest() {
    console.log('📱 Generating web app manifest...');
    
    const manifest = {
      name: "Design Studio - Creative Digital Experiences",
      short_name: "Design Studio",
      description: "A visually stunning design studio showcasing exceptional web design and interactive experiences",
      start_url: "/",
      display: "standalone",
      background_color: "#0a0a0a",
      theme_color: "#ff6b6b",
      icons: [
        {
          src: "/images/icon-192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/images/icon-512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      categories: ["design", "portfolio", "business"],
      lang: "en",
      orientation: "portrait-primary"
    };
    
    fs.writeFileSync(
      path.join(this.buildDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log('   ✓ Generated manifest.json');
  }

  async createDeploymentInstructions() {
    console.log('📝 Creating deployment instructions...');
    
    const instructions = `# Cloudflare Pages Deployment Instructions

## Automatic Deployment (Recommended)

1. **Connect GitHub Repository**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect to GitHub and select the repository: Mythicool/designstudio

2. **Configure Build Settings**
   - Framework preset: None (Static HTML)
   - Build command: \`npm run build:optimize\`
   - Build output directory: \`dist\`
   - Root directory: \`/\`

3. **Environment Variables**
   Add these environment variables in Cloudflare Pages:
   \`\`\`
   NODE_ENV=production
   CUSTOM_DOMAIN=designstudio.com
   GA_TRACKING_ID=GA-XXXXXXXXX-X
   \`\`\`

4. **Custom Domain Setup**
   - Go to Custom domains tab
   - Add your domain: designstudio.com
   - Configure DNS records as instructed

## Manual Deployment

1. **Install Wrangler CLI**
   \`\`\`bash
   npm install -g wrangler
   \`\`\`

2. **Login to Cloudflare**
   \`\`\`bash
   wrangler login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   wrangler pages publish dist --project-name=designstudio
   \`\`\`

## Performance Optimizations Included

✅ **Headers Configuration** (_headers)
- Security headers (CSP, HSTS, etc.)
- Caching policies for static assets
- Performance optimizations

✅ **Redirects Configuration** (_redirects)
- SPA fallback routing
- HTTPS enforcement
- Legacy URL redirects

✅ **Web App Manifest** (manifest.json)
- PWA capabilities
- App icons and metadata
- Offline support preparation

✅ **Service Worker Ready**
- Caching strategies
- Offline functionality
- Performance monitoring

## Post-Deployment Checklist

- [ ] Verify SSL certificate is active
- [ ] Test all page routes and redirects
- [ ] Check performance scores (Lighthouse)
- [ ] Verify security headers
- [ ] Test mobile responsiveness
- [ ] Configure analytics tracking
- [ ] Set up monitoring alerts

## Monitoring & Analytics

The site includes:
- Real-time performance monitoring
- Google Analytics integration
- Cloudflare Web Analytics
- Error tracking and reporting

## Support

For deployment issues:
1. Check Cloudflare Pages build logs
2. Verify environment variables
3. Test locally with \`npm run preview\`
4. Review _headers and _redirects syntax

---

🚀 **Your Design Studio website is ready for deployment!**
`;

    fs.writeFileSync('DEPLOYMENT.md', instructions);
    console.log('   ✓ Created DEPLOYMENT.md');
  }
}

// Run deployment preparation
if (require.main === module) {
  const deployer = new CloudflareDeployment();
  deployer.deploy().catch(error => {
    console.error('❌ Deployment preparation failed:', error.message);
    process.exit(1);
  });
}