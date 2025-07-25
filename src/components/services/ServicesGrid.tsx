import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import { Service } from '../../data/types';
import { colors, typography, spacing, animations } from '../../styles/tokens';
import { ScrollReveal, StaggeredGrid, TextReveal } from '../ui/ScrollAnimations';

interface ServicesGridProps {
  services: Service[];
  onLearnMore?: (serviceId: string) => void;
  onGetQuote?: (serviceId: string) => void;
  title?: string;
  subtitle?: string;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  services,
  onLearnMore,
  onGetQuote,
  title = "Our Services",
  subtitle = "We offer comprehensive design and development solutions to bring your vision to life"
}) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
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
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{
        padding: `${spacing[16]} ${spacing[5]}`,
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section Header */}
      <ScrollReveal
        direction="up"
        threshold={0.2}
        style={{
          textAlign: 'center',
          marginBottom: spacing[12],
        }}
      >
        <TextReveal
          text={title}
          mode="words"
          staggerDelay={0.1}
          style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.bold,
            color: colors.foreground.primary,
            fontFamily: typography.fonts.heading,
            margin: 0,
            marginBottom: spacing[4],
            lineHeight: typography.lineHeights.tight,
            background: `linear-gradient(135deg, ${colors.foreground.primary} 0%, ${colors.brand.primary} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        />
        
        <ScrollReveal
          direction="up"
          delay={0.3}
          style={{
            fontSize: typography.sizes.lg,
            color: colors.foreground.secondary,
            lineHeight: typography.lineHeights.relaxed,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {subtitle}
        </ScrollReveal>
      </ScrollReveal>

      {/* Services Grid */}
      <StaggeredGrid
        columns={0} // Auto-fit
        staggerDelay={0.15}
        animationDirection="up"
        threshold={0.1}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: spacing[6],
          alignItems: 'start',
        }}
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onLearnMore={onLearnMore}
            onGetQuote={onGetQuote}
          />
        ))}
      </StaggeredGrid>

      {/* Call to Action */}
      <ScrollReveal
        direction="up"
        threshold={0.3}
        delay={0.2}
        style={{
          textAlign: 'center',
          marginTop: spacing[12],
          padding: spacing[8],
          backgroundColor: `${colors.brand.primary}10`,
          borderRadius: '16px',
          border: `1px solid ${colors.brand.primary}30`,
        }}
      >
        <h3 style={{
          fontSize: typography.sizes['2xl'],
          fontWeight: typography.weights.semibold,
          color: colors.foreground.primary,
          margin: 0,
          marginBottom: spacing[3],
        }}>
          Need something custom?
        </h3>
        
        <p style={{
          fontSize: typography.sizes.base,
          color: colors.foreground.secondary,
          lineHeight: typography.lineHeights.relaxed,
          margin: 0,
          marginBottom: spacing[5],
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Every project is unique. Let's discuss your specific needs and create a tailored solution that perfectly fits your requirements.
        </p>

        <motion.button
          style={{
            padding: `${spacing[4]} ${spacing[8]}`,
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
          onClick={() => onGetQuote?.('custom')}
        >
          Start a Conversation
        </motion.button>
      </ScrollReveal>
    </motion.section>
  );
};