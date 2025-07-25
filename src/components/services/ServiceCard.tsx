import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '../../data/types';
import { colors, typography, spacing, animations, shadows } from '../../styles/tokens';
import { InteractiveButton, InteractiveIcon } from '../ui/InteractiveElements';

interface ServiceCardProps {
  service: Service;
  onLearnMore?: (serviceId: string) => void;
  onGetQuote?: (serviceId: string) => void;
  delay?: number;
}

// Icon components for services
const ServiceIcon: React.FC<{ icon: string; isHovered: boolean }> = ({ icon, isHovered }) => {
  const iconSize = 32;
  const strokeWidth = 2;
  
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 }
  };

  const pathVariants = {
    initial: { pathLength: 1, opacity: 1 },
    hover: { pathLength: 1, opacity: 1 },
    animate: { 
      pathLength: [0, 1], 
      opacity: [0, 1],
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  switch (icon) {
    case 'globe':
      return (
        <motion.svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          variants={iconVariants}
          animate={isHovered ? "hover" : "initial"}
          whileTap="tap"
        >
          <motion.circle cx="12" cy="12" r="10" variants={pathVariants} />
          <motion.path d="M2 12h20" variants={pathVariants} />
          <motion.path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" variants={pathVariants} />
        </motion.svg>
      );
    case 'smartphone':
      return (
        <motion.svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          variants={iconVariants}
          animate={isHovered ? "hover" : "initial"}
          whileTap="tap"
        >
          <motion.rect x="5" y="2" width="14" height="20" rx="2" ry="2" variants={pathVariants} />
          <motion.line x1="12" y1="18" x2="12.01" y2="18" variants={pathVariants} />
        </motion.svg>
      );
    case 'palette':
      return (
        <motion.svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          variants={iconVariants}
          animate={isHovered ? "hover" : "initial"}
          whileTap="tap"
        >
          <motion.circle cx="13.5" cy="6.5" r=".5" variants={pathVariants} />
          <motion.circle cx="17.5" cy="10.5" r=".5" variants={pathVariants} />
          <motion.circle cx="8.5" cy="7.5" r=".5" variants={pathVariants} />
          <motion.circle cx="6.5" cy="12.5" r=".5" variants={pathVariants} />
          <motion.path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" variants={pathVariants} />
        </motion.svg>
      );
    case 'users':
      return (
        <motion.svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          variants={iconVariants}
          animate={isHovered ? "hover" : "initial"}
          whileTap="tap"
        >
          <motion.path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" variants={pathVariants} />
          <motion.circle cx="9" cy="7" r="4" variants={pathVariants} />
          <motion.path d="M23 21v-2a4 4 0 0 0-3-3.87" variants={pathVariants} />
          <motion.path d="M16 3.13a4 4 0 0 1 0 7.75" variants={pathVariants} />
        </motion.svg>
      );
    default:
      return (
        <motion.div
          style={{
            width: iconSize,
            height: iconSize,
            backgroundColor: colors.brand.primary,
            borderRadius: '50%',
          }}
          variants={iconVariants}
          animate={isHovered ? "hover" : "initial"}
          whileTap="tap"
        />
      );
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onLearnMore,
  onGetQuote,
  delay = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPricing = (pricing: Service['pricing']) => {
    if (!pricing) return 'Contact for pricing';
    
    const { type, amount, currency } = pricing;
    const formattedAmount = amount ? `${currency === 'USD' ? '$' : currency}${amount.toLocaleString()}` : '';
    
    switch (type) {
      case 'hourly':
        return `${formattedAmount}/hour`;
      case 'project':
        return `Starting at ${formattedAmount}`;
      case 'fixed':
        return formattedAmount;
      default:
        return 'Contact for pricing';
    }
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: animations.easings.easeOut
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: animations.easings.easeOut
      }
    }
  };

  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: animations.easings.easeInOut },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        backgroundColor: colors.background.card,
        borderRadius: '16px',
        padding: spacing[6],
        border: `1px solid ${colors.interactive.border}`,
        boxShadow: shadows.md,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
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

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: spacing[4],
          marginBottom: spacing[4]
        }}>
          {/* Icon */}
          <motion.div
            style={{
              padding: spacing[3],
              backgroundColor: `${colors.brand.primary}20`,
              borderRadius: '12px',
              color: colors.brand.primary,
              flexShrink: 0,
            }}
            whileHover={{
              backgroundColor: `${colors.brand.primary}30`,
              boxShadow: `0 0 20px ${colors.brand.primary}40`,
            }}
          >
            <ServiceIcon icon={service.icon} isHovered={isHovered} />
          </motion.div>

          {/* Title and pricing */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <motion.h3
              style={{
                fontSize: typography.sizes.xl,
                fontWeight: typography.weights.semibold,
                color: colors.foreground.primary,
                margin: 0,
                marginBottom: spacing[2],
                lineHeight: typography.lineHeights.tight,
              }}
              animate={{ color: isHovered ? colors.brand.primary : colors.foreground.primary }}
              transition={{ duration: 0.2 }}
            >
              {service.name}
            </motion.h3>
            
            <motion.div
              style={{
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.medium,
                color: colors.brand.secondary,
                backgroundColor: `${colors.brand.secondary}20`,
                padding: `${spacing[1]} ${spacing[3]}`,
                borderRadius: '20px',
                display: 'inline-block',
              }}
              whileHover={{
                backgroundColor: `${colors.brand.secondary}30`,
                scale: 1.05,
              }}
            >
              {formatPricing(service.pricing)}
            </motion.div>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: typography.sizes.base,
          color: colors.foreground.secondary,
          lineHeight: typography.lineHeights.relaxed,
          margin: 0,
          marginBottom: spacing[4],
        }}>
          {service.description}
        </p>

        {/* Expand/Collapse button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'none',
            border: 'none',
            color: colors.brand.primary,
            fontSize: typography.sizes.sm,
            fontWeight: typography.weights.medium,
            cursor: 'pointer',
            padding: 0,
            marginBottom: spacing[4],
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
          }}
          whileHover={{ color: colors.interactive.hover }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{isExpanded ? 'Show less' : 'Show features'}</span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </motion.button>

        {/* Expandable features */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                backgroundColor: `${colors.background.primary}60`,
                borderRadius: '12px',
                padding: spacing[4],
                marginBottom: spacing[5],
              }}>
                <h4 style={{
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.semibold,
                  color: colors.foreground.primary,
                  margin: 0,
                  marginBottom: spacing[3],
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  What's Included
                </h4>
                <ul style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'grid',
                  gap: spacing[2],
                }}>
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing[2],
                        fontSize: typography.sizes.sm,
                        color: colors.foreground.secondary,
                      }}
                    >
                      <motion.div
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: colors.brand.primary,
                          borderRadius: '50%',
                          flexShrink: 0,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.2 }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: spacing[3],
          flexWrap: 'wrap',
        }}>
          <InteractiveButton
            variant="primary"
            size="md"
            onClick={() => onLearnMore?.(service.id)}
            style={{ flex: 1, minWidth: '120px' }}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            }
            iconPosition="right"
          >
            Learn More
          </InteractiveButton>

          <InteractiveButton
            variant="outline"
            size="md"
            onClick={() => onGetQuote?.(service.id)}
            style={{ flex: 1, minWidth: '120px' }}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
            iconPosition="right"
          >
            Get Quote
          </InteractiveButton>
        </div>
      </div>
    </motion.div>
  );
};