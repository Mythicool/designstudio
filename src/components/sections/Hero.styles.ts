import { colors, typography, spacing, animations, breakpoints } from '../../styles/tokens';

export const heroStyles = {
  container: {
    position: 'relative' as const,
    height: '100vh',
    minHeight: '600px',
    overflow: 'hidden',
    background: colors.background.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundLayer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  contentContainer: {
    position: 'relative' as const,
    zIndex: 10,
    textAlign: 'center' as const,
    color: colors.foreground.primary,
    padding: `0 ${spacing[6]}`,
    maxWidth: '1200px',
    width: '100%',
  },

  // Responsive styles
  mobile: {
    container: {
      minHeight: '500px',
      padding: `0 ${spacing[4]}`,
    },
    contentContainer: {
      padding: `0 ${spacing[4]}`,
    },
    headline: {
      fontSize: typography.sizes['4xl'],
    },
    subtitle: {
      fontSize: typography.sizes.lg,
    },
    buttonContainer: {
      flexDirection: 'column' as const,
      gap: spacing[3],
    },
  },

  tablet: {
    container: {
      minHeight: '600px',
    },
    headline: {
      fontSize: typography.sizes['5xl'],
    },
  },
};

// Animation variants for scroll-triggered animations
export const heroAnimationVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

// Parallax configuration
export const parallaxConfig = {
  background: {
    inputRange: [0, 1000],
    outputRange: [0, -300],
  },
  shapes: {
    inputRange: [0, 1000],
    outputRange: [0, -150],
  },
  particles: {
    inputRange: [0, 1000],
    outputRange: [0, -100],
  },
};

// Performance optimization settings
export const performanceConfig = {
  // Use transform3d for GPU acceleration
  willChange: 'transform',
  // Optimize for 60fps
  animationFillMode: 'both',
  // Reduce motion for accessibility
  respectReducedMotion: true,
};