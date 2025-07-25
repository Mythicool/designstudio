import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ProcessStep } from '../../data/types';
import { colors, typography, spacing, animations, shadows } from '../../styles/tokens';

interface ServiceTimelineProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  serviceId?: string;
}

interface TimelineStepProps {
  step: ProcessStep;
  index: number;
  isLast: boolean;
  onStepClick?: (stepId: string) => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ 
  step, 
  index, 
  isLast, 
  onStepClick 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: animations.easings.easeOut
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.2 + 0.3,
        ease: animations.easings.easeInOut
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2 + 0.1,
        ease: animations.easings.bounce
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={stepVariants}
      initial="hidden"
      animate={controls}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing[6],
        marginBottom: isLast ? 0 : spacing[8],
        position: 'relative',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Timeline line and number */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Step number */}
        <motion.div
          variants={numberVariants}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: colors.brand.primary,
            color: colors.background.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: typography.sizes.lg,
            fontWeight: typography.weights.bold,
            boxShadow: shadows.md,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: colors.interactive.hover,
            boxShadow: `0 8px 25px ${colors.brand.primary}40`,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStepClick?.(step.id)}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${colors.brand.secondary}40 0%, ${colors.brand.accent}40 100%)`,
              opacity: 0,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>
            {step.order}
          </span>
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            variants={lineVariants}
            style={{
              width: '2px',
              height: '80px',
              backgroundColor: colors.interactive.border,
              marginTop: spacing[2],
              transformOrigin: 'top',
              position: 'relative',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: colors.brand.primary,
                transformOrigin: 'top',
                scaleY: 0,
              }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ 
                duration: 1,
                delay: index * 0.2 + 0.5,
                ease: animations.easings.easeInOut
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Step content */}
      <motion.div
        style={{
          flex: 1,
          backgroundColor: colors.background.card,
          borderRadius: '16px',
          padding: spacing[6],
          border: `1px solid ${colors.interactive.border}`,
          boxShadow: shadows.sm,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover={{
          y: -4,
          boxShadow: shadows.lg,
          borderColor: colors.brand.primary,
        }}
        onClick={() => onStepClick?.(step.id)}
      >
        {/* Background gradient overlay */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${colors.brand.primary}08 0%, ${colors.brand.secondary}08 100%)`,
            opacity: 0,
            borderRadius: '16px',
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Step title */}
          <motion.h3
            style={{
              fontSize: typography.sizes.xl,
              fontWeight: typography.weights.semibold,
              color: colors.foreground.primary,
              margin: 0,
              marginBottom: spacing[3],
              lineHeight: typography.lineHeights.tight,
            }}
            animate={{ 
              color: isHovered ? colors.brand.primary : colors.foreground.primary 
            }}
            transition={{ duration: 0.2 }}
          >
            {step.title}
          </motion.h3>

          {/* Step description */}
          <p style={{
            fontSize: typography.sizes.base,
            color: colors.foreground.secondary,
            lineHeight: typography.lineHeights.relaxed,
            margin: 0,
          }}>
            {step.description}
          </p>

          {/* Interactive indicator */}
          <motion.div
            style={{
              position: 'absolute',
              top: spacing[4],
              right: spacing[4],
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: colors.brand.primary,
              opacity: 0,
            }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? [1, 1.5, 1] : 1,
            }}
            transition={{ 
              opacity: { duration: 0.2 },
              scale: { duration: 1, repeat: Infinity }
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServiceTimeline: React.FC<ServiceTimelineProps> = ({
  steps,
  title = "Our Process",
  subtitle = "A step-by-step approach to delivering exceptional results",
  serviceId
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const handleStepClick = (stepId: string) => {
    console.log('Step clicked:', stepId, 'for service:', serviceId);
    // In a real app, this could show more details, open a modal, etc.
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: animations.easings.easeOut
      }
    }
  };

  return (
    <motion.section
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        padding: `${spacing[12]} ${spacing[5]}`,
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* Section Header */}
      <motion.div
        variants={headerVariants}
        style={{
          textAlign: 'center',
          marginBottom: spacing[12],
        }}
      >
        <motion.h2
          style={{
            fontSize: typography.sizes['3xl'],
            fontWeight: typography.weights.bold,
            color: colors.foreground.primary,
            fontFamily: typography.fonts.heading,
            margin: 0,
            marginBottom: spacing[4],
            lineHeight: typography.lineHeights.tight,
          }}
          whileInView={{
            backgroundImage: `linear-gradient(135deg, ${colors.foreground.primary} 0%, ${colors.brand.primary} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        
        <motion.p
          style={{
            fontSize: typography.sizes.lg,
            color: colors.foreground.secondary,
            lineHeight: typography.lineHeights.relaxed,
            maxWidth: '500px',
            margin: '0 auto',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Timeline Steps */}
      <div style={{
        position: 'relative',
      }}>
        {steps
          .sort((a, b) => a.order - b.order)
          .map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              onStepClick={handleStepClick}
            />
          ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
        transition={{ duration: 0.6, delay: 1 }}
        style={{
          textAlign: 'center',
          marginTop: spacing[12],
          padding: spacing[6],
          backgroundColor: `${colors.brand.primary}10`,
          borderRadius: '16px',
          border: `1px solid ${colors.brand.primary}30`,
        }}
      >
        <h3 style={{
          fontSize: typography.sizes.xl,
          fontWeight: typography.weights.semibold,
          color: colors.foreground.primary,
          margin: 0,
          marginBottom: spacing[3],
        }}>
          Ready to get started?
        </h3>
        
        <p style={{
          fontSize: typography.sizes.base,
          color: colors.foreground.secondary,
          lineHeight: typography.lineHeights.relaxed,
          margin: 0,
          marginBottom: spacing[4],
        }}>
          Let's discuss your project and create something amazing together.
        </p>

        <motion.button
          style={{
            padding: `${spacing[3]} ${spacing[6]}`,
            backgroundColor: colors.brand.primary,
            color: colors.background.primary,
            border: 'none',
            borderRadius: '8px',
            fontSize: typography.sizes.base,
            fontWeight: typography.weights.medium,
            cursor: 'pointer',
            transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
          }}
          whileHover={{
            backgroundColor: colors.interactive.hover,
            scale: 1.05,
            boxShadow: `0 8px 25px ${colors.brand.primary}40`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Project
        </motion.button>
      </motion.div>
    </motion.section>
  );
};