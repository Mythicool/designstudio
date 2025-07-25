# 🎨 Design Studio - Creative Digital Experiences

A visually stunning design studio website showcasing modern web design principles, advanced animations, and interactive experiences. Built with performance optimization and deployed on Cloudflare Pages.

![Design Studio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Performance](https://img.shields.io/badge/Performance-Optimized-blue)
![Animations](https://img.shields.io/badge/Animations-60fps-orange)

## Project Structure

```
framer-design-studio/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── layout/          # Layout components (Header, Footer, Navigation)
│   │   ├── sections/        # Page sections (Hero, About, Services)
│   │   ├── portfolio/       # Portfolio-related components
│   │   ├── services/        # Service-related components
│   │   ├── forms/           # Form components
│   │   └── index.ts         # Component exports
│   ├── styles/              # Styling and design tokens
│   │   ├── tokens.ts        # Design system tokens
│   │   └── globals.css      # Global styles and CSS variables
│   └── data/                # Data models and static content
├── framer.config.js         # Framer configuration
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Design System

### Color Palette
- **Background**: Deep navy (#12242e) with elevated surfaces
- **Foreground**: Warm off-white (#f3e3ea) for text
- **Primary**: Warm golden yellow (#fbe2a7) for CTAs
- **Secondary**: Soft rose (#e4a2b1) for secondary elements
- **Accent**: Rich mauve (#c67b96) for highlights
- **Interactive**: Teal (#50afb6) for focus and hover states

### Responsive Breakpoints
- **Mobile**: 390px
- **Tablet**: 768px
- **Desktop**: 1200px
- **Large**: 1440px

### Grid System
- **Columns**: 12-column grid
- **Gutter**: 24px (1.5rem)
- **Margin**: 20px (1.25rem)
- **Max Width**: 1200px (75rem)

## Development

### Getting Started
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

### Design Tokens
All design tokens are centralized in `src/styles/tokens.ts` and available as CSS custom properties in `src/styles/globals.css`.

### Component Architecture
- Components are organized by feature/purpose
- Each component follows TypeScript best practices
- Responsive design is built-in using the grid system
- Animations use Framer Motion for smooth interactions

## Features

### Performance Optimizations
- Progressive image loading with WebP format
- 60fps animations with GPU acceleration
- Reduced motion support for accessibility
- Lazy loading for below-the-fold content

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management and visual indicators

### SEO
- Meta tags and structured data
- Open Graph tags for social sharing
- XML sitemap generation
- Optimized page titles and descriptions

## Configuration

### Custom Domain
Configure your custom domain in `framer.config.js`:
```javascript
domain: "your-domain.framer.website"
```

### Analytics
Framer Analytics is integrated for tracking user behavior and performance metrics.

## Deployment

The site is deployed using Framer's built-in hosting with CDN optimization and SSL certificate management.