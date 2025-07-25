import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  loadTime: number;
  resourceCount: number;
  connectionType: string;
  deviceMemory: number;
  hardwareConcurrency: number;
}

interface PerformanceMonitorProps {
  visible?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onToggle?: (visible: boolean) => void;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  visible = false,
  position = 'top-right',
  onToggle
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    loadTime: 0,
    resourceCount: 0,
    connectionType: 'unknown',
    deviceMemory: 0,
    hardwareConcurrency: 0
  });
  
  const [isVisible, setIsVisible] = useState(visible);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrame = useRef<number>();

  useEffect(() => {
    // Initialize performance monitoring
    initializeMetrics();
    startFPSMonitoring();
    
    // Keyboard shortcut to toggle monitor
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        toggleVisibility();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const initializeMetrics = () => {
    // Get initial performance metrics
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource');
    
    // @ts-ignore - Navigator properties may not be available in all browsers
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    setMetrics(prev => ({
      ...prev,
      loadTime: navigation ? navigation.loadEventEnd - navigation.navigationStart : 0,
      resourceCount: resources.length,
      connectionType: connection ? connection.effectiveType || 'unknown' : 'unknown',
      // @ts-ignore - Navigator properties may not be available in all browsers
      deviceMemory: navigator.deviceMemory || 0,
      hardwareConcurrency: navigator.hardwareConcurrency || 0
    }));
  };

  const startFPSMonitoring = () => {
    const measureFPS = (currentTime: number) => {
      frameCount.current++;
      
      if (currentTime >= lastTime.current + 1000) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          // @ts-ignore - Performance memory may not be available in all browsers
          memory: (performance as any).memory ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 0
        }));
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationFrame.current = requestAnimationFrame(measureFPS);
    };
    
    animationFrame.current = requestAnimationFrame(measureFPS);
  };

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onToggle?.(newVisibility);
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      zIndex: 9999,
      padding: '12px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '12px',
      lineHeight: '1.4',
      minWidth: '200px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const positions = {
      'top-left': { top: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'bottom-right': { bottom: '20px', right: '20px' }
    };

    return { ...baseStyles, ...positions[position] };
  };

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return '#4ade80'; // Green
    if (fps >= 45) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  };

  const getMemoryColor = (memory: number) => {
    if (memory < 50) return '#4ade80'; // Green
    if (memory < 100) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={getPositionStyles()}
        >
          <div style={{ marginBottom: '8px', fontWeight: 'bold', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '4px' }}>
            Performance Monitor
          </div>
          
          <div style={{ display: 'grid', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>FPS:</span>
              <span style={{ color: getFPSColor(metrics.fps), fontWeight: 'bold' }}>
                {metrics.fps}
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Memory:</span>
              <span style={{ color: getMemoryColor(metrics.memory) }}>
                {metrics.memory}MB
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Load Time:</span>
              <span>{(metrics.loadTime / 1000).toFixed(2)}s</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Resources:</span>
              <span>{metrics.resourceCount}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Connection:</span>
              <span>{metrics.connectionType}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Device RAM:</span>
              <span>{metrics.deviceMemory || 'N/A'}GB</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>CPU Cores:</span>
              <span>{metrics.hardwareConcurrency}</span>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '8px', 
            paddingTop: '8px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '10px',
            opacity: 0.7
          }}>
            Press Ctrl+Shift+P to toggle
          </div>
          
          <button
            onClick={toggleVisibility}
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              opacity: 0.7,
              padding: '2px'
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for programmatic performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    loadTime: 0,
    resourceCount: 0,
    connectionType: 'unknown',
    deviceMemory: 0,
    hardwareConcurrency: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrame: number;

    const measurePerformance = (currentTime: number) => {
      frameCount++;
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          // @ts-ignore
          memory: (performance as any).memory ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 0
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationFrame = requestAnimationFrame(measurePerformance);
    };
    
    animationFrame = requestAnimationFrame(measurePerformance);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return metrics;
};