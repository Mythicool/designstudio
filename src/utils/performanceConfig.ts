/**
 * Performance Configuration
 * Central configuration for all performance optimizations
 */

export interface PerformanceConfig {
  animations: {
    targetFPS: number;
    maxDuration: number;
    preferredEasing: string;
    enableGPUAcceleration: boolean;
    reduceComplexity: boolean;
  };
  images: {
    lazyLoading: boolean;
    progressiveLoading: boolean;
    maxQuality: number;
    responsiveSizes: number[];
  };
  resources: {
    preloadCritical: boolean;
    prefetchNext: boolean;
    enableCompression: boolean;
  };
}

// High-performance configuration for 60fps target
export const HIGH_PERFORMANCE_CONFIG: PerformanceConfig = {
  animations: {
    targetFPS: 60,
    maxDuration: 0.4,
    preferredEasing: 'easeOut',
    enableGPUAcceleration: true,
    reduceComplexity: false
  },
  images: {
    lazyLoading: true,
    progressiveLoading: true,
    maxQuality: 85,
    responsiveSizes: [320, 640, 768, 1024, 1280, 1920]
  },
  resources: {
    preloadCritical: true,
    prefetchNext: true,
    enableCompression: true
  }
};

// Balanced configuration for 45-60fps
export const BALANCED_CONFIG: PerformanceConfig = {
  animations: {
    targetFPS: 50,
    maxDuration: 0.3,
    preferredEasing: 'easeOut',
    enableGPUAcceleration: true,
    reduceComplexity: true
  },
  images: {
    lazyLoading: true,
    progressiveLoading: true,
    maxQuality: 75,
    responsiveSizes: [320, 640, 1024, 1280]
  },
  resources: {
    preloadCritical: true,
    prefetchNext: false,
    enableCompression: true
  }
};

// Low-performance configuration for <45fps
export const LOW_PERFORMANCE_CONFIG: PerformanceConfig = {
  animations: {
    targetFPS: 30,
    maxDuration: 0.2,
    preferredEasing: 'linear',
    enableGPUAcceleration: true,
    reduceComplexity: true
  },
  images: {
    lazyLoading: true,
    progressiveLoading: false,
    maxQuality: 60,
    responsiveSizes: [320, 640, 1024]
  },
  resources: {
    preloadCritical: true,
    prefetchNext: false,
    enableCompression: true
  }
};

export const getPerformanceConfig = (currentFPS: number): PerformanceConfig => {
  if (currentFPS >= 55) {
    return HIGH_PERFORMANCE_CONFIG;
  } else if (currentFPS >= 45) {
    return BALANCED_CONFIG;
  } else {
    return LOW_PERFORMANCE_CONFIG;
  }
};

// CSS-in-JS styles for GPU acceleration
export const GPU_ACCELERATION_STYLES = {
  willChange: 'transform, opacity',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,
  isolation: 'isolate' as const
};

// Animation presets optimized for 60fps
export const OPTIMIZED_ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  stagger: {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
      }
    }
  }
};

// Performance monitoring thresholds
export const PERFORMANCE_THRESHOLDS = {
  EXCELLENT: 58,
  GOOD: 50,
  FAIR: 40,
  POOR: 30
};

export const getPerformanceGrade = (fps: number): 'excellent' | 'good' | 'fair' | 'poor' => {
  if (fps >= PERFORMANCE_THRESHOLDS.EXCELLENT) return 'excellent';
  if (fps >= PERFORMANCE_THRESHOLDS.GOOD) return 'good';
  if (fps >= PERFORMANCE_THRESHOLDS.FAIR) return 'fair';
  return 'poor';
};