/**
 * Animation Performance Optimizer
 * Provides utilities to ensure 60fps animation performance
 */

interface AnimationOptimizationConfig {
  targetFPS: number;
  currentFPS: number;
  deviceCapabilities: {
    memory: number;
    cores: number;
    isLowEnd: boolean;
  };
}

export class AnimationOptimizer {
  private static instance: AnimationOptimizer;
  private currentFPS: number = 60;
  private frameCount: number = 0;
  private lastTime: number = performance.now();
  private animationFrame: number | null = null;
  private optimizationLevel: 'high' | 'medium' | 'low' = 'high';

  private constructor() {
    this.startFPSMonitoring();
    this.detectOptimizationLevel();
  }

  static getInstance(): AnimationOptimizer {
    if (!AnimationOptimizer.instance) {
      AnimationOptimizer.instance = new AnimationOptimizer();
    }
    return AnimationOptimizer.instance;
  }

  private startFPSMonitoring(): void {
    const measureFPS = (currentTime: number) => {
      this.frameCount++;
      
      if (currentTime >= this.lastTime + 1000) {
        this.currentFPS = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.adjustOptimizationLevel();
        
        this.frameCount = 0;
        this.lastTime = currentTime;
      }
      
      this.animationFrame = requestAnimationFrame(measureFPS);
    };
    
    this.animationFrame = requestAnimationFrame(measureFPS);
  }

  private detectOptimizationLevel(): void {
    // @ts-ignore - Navigator properties may not be available
    const deviceMemory = navigator.deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    
    if (deviceMemory <= 2 || hardwareConcurrency <= 2) {
      this.optimizationLevel = 'low';
    } else if (deviceMemory <= 4 || hardwareConcurrency <= 4) {
      this.optimizationLevel = 'medium';
    } else {
      this.optimizationLevel = 'high';
    }
  }

  private adjustOptimizationLevel(): void {
    if (this.currentFPS < 45) {
      this.optimizationLevel = 'low';
    } else if (this.currentFPS < 55) {
      this.optimizationLevel = 'medium';
    } else if (this.currentFPS >= 58) {
      // Only upgrade to high if consistently good performance
      this.optimizationLevel = 'high';
    }
  }

  getCurrentFPS(): number {
    return this.currentFPS;
  }

  getOptimizationLevel(): 'high' | 'medium' | 'low' {
    return this.optimizationLevel;
  }

  getOptimizedTransition(baseTransition: any = {}): any {
    const { duration = 0.6, ease = 'easeInOut', ...rest } = baseTransition;

    switch (this.optimizationLevel) {
      case 'low':
        return {
          ...rest,
          duration: Math.min(duration, 0.2),
          ease: 'linear',
          type: 'tween'
        };
      
      case 'medium':
        return {
          ...rest,
          duration: Math.min(duration, 0.4),
          ease: 'easeOut',
          type: 'tween'
        };
      
      case 'high':
      default:
        return {
          ...rest,
          duration,
          ease,
          type: 'tween'
        };
    }
  }

  getOptimizedAnimationProps(baseProps: any = {}): any {
    const optimizedTransition = this.getOptimizedTransition(baseProps.transition);
    
    return {
      ...baseProps,
      transition: optimizedTransition,
      style: {
        ...baseProps.style,
        // Force GPU acceleration
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        // Optimize for compositing
        isolation: 'isolate'
      }
    };
  }

  shouldSkipAnimation(): boolean {
    return this.optimizationLevel === 'low' && this.currentFPS < 30;
  }

  getParticleCount(baseCount: number): number {
    switch (this.optimizationLevel) {
      case 'low':
        return Math.max(Math.floor(baseCount * 0.1), 1);
      case 'medium':
        return Math.max(Math.floor(baseCount * 0.5), 5);
      case 'high':
      default:
        return baseCount;
    }
  }

  optimizeForScrollAnimations(): {
    threshold: number;
    rootMargin: string;
    triggerOnce: boolean;
  } {
    switch (this.optimizationLevel) {
      case 'low':
        return {
          threshold: 0.3,
          rootMargin: '0px',
          triggerOnce: true
        };
      case 'medium':
        return {
          threshold: 0.2,
          rootMargin: '50px',
          triggerOnce: true
        };
      case 'high':
      default:
        return {
          threshold: 0.1,
          rootMargin: '100px',
          triggerOnce: false
        };
    }
  }

  getStaggerDelay(baseDelay: number = 0.1): number {
    switch (this.optimizationLevel) {
      case 'low':
        return 0;
      case 'medium':
        return baseDelay * 0.5;
      case 'high':
      default:
        return baseDelay;
    }
  }

  destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}

// Utility functions for easy access
export const getAnimationOptimizer = () => AnimationOptimizer.getInstance();

export const optimizeAnimation = (props: any) => {
  const optimizer = getAnimationOptimizer();
  return optimizer.getOptimizedAnimationProps(props);
};

export const shouldSkipAnimation = () => {
  const optimizer = getAnimationOptimizer();
  return optimizer.shouldSkipAnimation();
};

export const getOptimalParticleCount = (baseCount: number) => {
  const optimizer = getAnimationOptimizer();
  return optimizer.getParticleCount(baseCount);
};

// React hook for animation optimization
export const useAnimationOptimization = () => {
  const optimizer = getAnimationOptimizer();
  
  return {
    currentFPS: optimizer.getCurrentFPS(),
    optimizationLevel: optimizer.getOptimizationLevel(),
    optimizeProps: (props: any) => optimizer.getOptimizedAnimationProps(props),
    shouldSkip: optimizer.shouldSkipAnimation(),
    getParticleCount: (count: number) => optimizer.getParticleCount(count),
    scrollConfig: optimizer.optimizeForScrollAnimations(),
    staggerDelay: (delay: number) => optimizer.getStaggerDelay(delay)
  };
};