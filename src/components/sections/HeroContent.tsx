import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { colors, typography, spacing, breakpoints } from '../../styles/tokens';

interface HeroContentProps {
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ className }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < parseInt(breakpoints.tablet));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.3 : 1,
        delay: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut'
      }}
      className={className}
      style={{
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        padding: `0 ${spacing[6]}`,
      }}
    >
      {/* Main Headline with Typewriter Effect */}
      <TypewriterHeadline />
      
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: shouldReduceMotion ? 0.3 : 0.8,
          delay: shouldReduceMotion ? 0.1 : 2.5,
          ease: 'easeOut'
        }}
        style={{
          fontSize: typography.sizes.xl,
          color: colors.foreground.secondary || colors.foreground.primary,
          marginBottom: spacing[8],
          lineHeight: typography.lineHeights.relaxed,
          fontWeight: typography.weights.normal,
        }}
      >
        Crafting exceptional digital experiences through innovative design and cutting-edge technology
      </motion.p>

      {/* Call-to-Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: shouldReduceMotion ? 0.3 : 0.8,
          delay: shouldReduceMotion ? 0.2 : 3,
          ease: 'easeOut'
        }}
        style={{
          display: 'flex',
          gap: isMobile ? spacing[3] : spacing[4],
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          marginBottom: spacing[12],
        }}
      >
        <CTAButton primary isMobile={isMobile}>View Our Work</CTAButton>
        <CTAButton isMobile={isMobile}>Get In Touch</CTAButton>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </motion.div>
  );
};

// Typewriter Effect Component
const TypewriterHeadline: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  
  const fullText = "Design Studio";
  const typingSpeed = 150; // milliseconds per character
  
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(fullText);
      setShowCursor(false);
      return;
    }

    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else {
      // Blink cursor after typing is complete
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, shouldReduceMotion]);

  // Check if mobile for responsive font size
  const [isMobile, setIsMobileHeadline] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileHeadline(window.innerWidth < parseInt('768px'));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <h1
      style={{
        fontSize: isMobile ? typography.sizes['4xl'] : typography.sizes['6xl'],
        fontWeight: typography.weights.bold,
        color: colors.foreground.primary,
        marginBottom: spacing[6],
        fontFamily: typography.fonts.heading,
        lineHeight: typography.lineHeights.tight,
      }}
    >
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          style={{ 
            color: colors.brand.primary,
            marginLeft: '2px'
          }}
        >
          |
        </motion.span>
      )}
    </h1>
  );
};

// Call-to-Action Button Component
interface CTAButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, primary = false, onClick, isMobile = false }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={shouldReduceMotion ? {} : { 
        scale: 1.05,
        boxShadow: `0 8px 25px ${primary ? colors.brand.primary : colors.interactive.ring}40`
      }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={{
        padding: isMobile ? `${spacing[3]} ${spacing[6]}` : `${spacing[4]} ${spacing[8]}`,
        fontSize: isMobile ? typography.sizes.base : typography.sizes.lg,
        fontWeight: typography.weights.semibold,
        borderRadius: '8px',
        border: primary ? 'none' : `2px solid ${colors.interactive.ring}`,
        background: primary ? colors.brand.primary : 'transparent',
        color: primary ? colors.background.primary : colors.interactive.ring,
        cursor: 'pointer',
        transition: shouldReduceMotion ? 'none' : 'all 0.3s ease',
        fontFamily: typography.fonts.body,
        width: isMobile ? '100%' : 'auto',
        maxWidth: isMobile ? '280px' : 'none',
      }}
    >
      {children}
    </motion.button>
  );
};

// Scroll Indicator Component
const ScrollIndicator: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.3 : 1,
        delay: shouldReduceMotion ? 0.3 : 4
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing[2],
      }}
    >
      <span
        style={{
          fontSize: typography.sizes.sm,
          color: colors.foreground.secondary || colors.foreground.primary,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: typography.weights.medium,
        }}
      >
        Scroll to explore
      </span>
      
      <motion.div
        animate={shouldReduceMotion ? {} : {
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: '24px',
          height: '40px',
          border: `2px solid ${colors.interactive.ring}`,
          borderRadius: '12px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '8px',
        }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : {
            y: [0, 12, 0],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: '4px',
            height: '8px',
            background: colors.interactive.ring,
            borderRadius: '2px',
          }}
        />
      </motion.div>
    </motion.div>
  );
};