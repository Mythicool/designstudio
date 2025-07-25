// Design tokens based on the specified color palette
export const colors = {
  // Background colors
  background: {
    primary: '#12242e',    // Deep navy base
    card: '#1c2e38',       // Elevated surface color
    sidebar: '#101f28',    // Navigation background
  },
  
  // Foreground colors
  foreground: {
    primary: '#f3e3ea',    // Warm off-white text
    secondary: '#c4b5a0',  // Muted text variant
  },
  
  // Brand colors
  brand: {
    primary: '#fbe2a7',    // Warm golden yellow for main CTAs
    secondary: '#e4a2b1',  // Soft rose for secondary elements
    accent: '#c67b96',     // Rich mauve for highlights
  },
  
  // Interactive colors
  interactive: {
    border: '#324859',     // Subtle borders and dividers
    ring: '#50afb6',       // Focus states and interactive feedback
    hover: '#50afb6',      // Hover states
  },
  
  // Chart/data visualization colors
  chart: {
    primary: '#50afb6',
    secondary: '#e4a2b1',
    tertiary: '#c67b96',
    quaternary: '#175c6c',
    quinary: '#24272b',
  }
};

// Typography tokens
export const typography = {
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    mono: 'JetBrains Mono, Consolas, monospace',
  },
  
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
};

// Spacing tokens
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
};

// Breakpoints
export const breakpoints = {
  mobile: '390px',
  tablet: '768px',
  desktop: '1200px',
  large: '1440px',
};

// Grid system
export const grid = {
  columns: 12,
  gutter: '1.5rem',  // 24px
  margin: '1.25rem', // 20px
  maxWidth: '75rem', // 1200px
};

// Animation tokens
export const animations = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
  },
  
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
};

// Shadow tokens
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};