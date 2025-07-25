# Cloudflare Pages Deployment Instructions

## Automatic Deployment (Recommended)

1. **Connect GitHub Repository**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect to GitHub and select the repository: Mythicool/designstudio

2. **Configure Build Settings**
   - Framework preset: None (Static HTML)
   - Build command: `npm run build:optimize`
   - Build output directory: `dist`
   - Root directory: `/`

3. **Environment Variables**
   Add these environment variables in Cloudflare Pages:
   ```
   NODE_ENV=production
   CUSTOM_DOMAIN=designstudio.com
   GA_TRACKING_ID=GA-XXXXXXXXX-X
   ```

4. **Custom Domain Setup**
   - Go to Custom domains tab
   - Add your domain: designstudio.com
   - Configure DNS records as instructed

## Manual Deployment

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   wrangler pages publish dist --project-name=designstudio
   ```

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
3. Test locally with `npm run preview`
4. Review _headers and _redirects syntax

---

🚀 **Your Design Studio website is ready for deployment!**
