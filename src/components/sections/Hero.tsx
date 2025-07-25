import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { colors } from '../../styles/tokens';
import { heroStyles, parallaxConfig, performanceConfig } from './Hero.styles';
import { HeroContent } from './HeroContent';
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization';
import { Parallax, ScrollReveal } from '../ui/ScrollAnimations';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const { getOptimalParticleCount, shouldReduceMotion: performanceReduceMotion } = usePerformanceOptimization();
  
  const reduceMotion = shouldReduceMotion || performanceReduceMotion;
  
  // Parallax transforms for background elements (disabled if reduced motion is preferred)
  const backgroundY = useTransform(
    scrollY, 
    parallaxConfig.background.inputRange, 
    reduceMotion ? [0, 0] : parallaxConfig.background.outputRange
  );
  const shapesY = useTransform(
    scrollY, 
    parallaxConfig.shapes.inputRange, 
    reduceMotion ? [0, 0] : parallaxConfig.shapes.outputRange
  );
  const particlesY = useTransform(
    scrollY, 
    parallaxConfig.particles.inputRange, 
    reduceMotion ? [0, 0] : parallaxConfig.particles.outputRange
  );

  return (
    <section 
      className={`hero-section ${className || ''}`}
      style={heroStyles.container}
    >
      {/* Animated Background Layer */}
      <Parallax
        speed={0.2}
        offset={[0, 300]}
        style={heroStyles.backgroundLayer}
      >
        <AnimatedBackground />
      </Parallax>

      {/* Geometric Shapes Layer */}
      <Parallax
        speed={0.4}
        offset={[0, 400]}
        style={heroStyles.backgroundLayer}
      >
        <GeometricShapes />
      </Parallax>

      {/* Particles Layer */}
      <Parallax
        speed={0.6}
        offset={[0, 500]}
        style={heroStyles.backgroundLayer}
      >
        <ParticleField />
      </Parallax>

      {/* Hero Content with Typewriter Effect */}
      <ScrollReveal
        direction="up"
        distance={50}
        duration={1}
        threshold={0.1}
        style={heroStyles.contentContainer}
      >
        <HeroContent />
      </ScrollReveal>
    </section>
  );
};

// Animated Background Component
const AnimatedBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, 
          ${colors.background.primary} 0%, 
          ${colors.background.card} 50%, 
          ${colors.background.sidebar} 100%)`,
        willChange: performanceConfig.willChange,
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          background: [
            `radial-gradient(circle at 20% 80%, ${colors.brand.accent}20 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, ${colors.interactive.ring}15 0%, transparent 50%)`,
            `radial-gradient(circle at 40% 40%, ${colors.brand.secondary}10 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          willChange: performanceConfig.willChange,
        }}
      />
    </div>
  );
};

// Geometric Shapes Component
const GeometricShapes: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  
  const shapes = [
    { size: 200, x: '10%', y: '20%', delay: 0 },
    { size: 150, x: '80%', y: '60%', delay: 1 },
    { size: 100, x: '60%', y: '10%', delay: 2 },
    { size: 120, x: '20%', y: '70%', delay: 1.5 },
    { size: 80, x: '90%', y: '30%', delay: 0.5 },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: 0,
          }}
          animate={shouldReduceMotion ? {
            opacity: 0.2,
            scale: 1,
            rotate: 0,
          } : { 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 6 + index,
            repeat: shouldReduceMotion ? 0 : Infinity,
            delay: shouldReduceMotion ? 0 : shape.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            background: `linear-gradient(45deg, ${colors.brand.primary}20, ${colors.interactive.ring}15)`,
            borderRadius: index % 2 === 0 ? '50%' : '20%',
            border: `1px solid ${colors.interactive.border}40`,
            transform: 'translate(-50%, -50%)',
            willChange: performanceConfig.willChange,
          }}
        />
      ))}
    </>
  );
};

// Particle Field Component
const ParticleField: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { getOptimalParticleCount } = usePerformanceOptimization();
  
  // Reduce particle count for better performance and respect reduced motion
  const baseParticleCount = 50;
  const particleCount = shouldReduceMotion ? 5 : getOptimalParticleCount(baseParticleCount);
  
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            opacity: 0,
            y: shouldReduceMotion ? 0 : '100vh',
          }}
          animate={shouldReduceMotion ? {
            opacity: 0.3,
            y: 0,
          } : { 
            opacity: [0, 0.6, 0],
            y: '-100vh',
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : particle.duration,
            repeat: shouldReduceMotion ? 0 : Infinity,
            delay: shouldReduceMotion ? 0 : particle.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: shouldReduceMotion ? `${particle.y}%` : 0,
            width: particle.size,
            height: particle.size,
            background: colors.interactive.ring,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size * 2}px ${colors.interactive.ring}50`,
            willChange: shouldReduceMotion ? 'auto' : performanceConfig.willChange,
          }}
        />
      ))}
    </>
  );
};