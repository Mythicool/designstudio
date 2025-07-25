import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, typography, spacing, animations } from '../../styles/tokens';
import { headerStyles } from './Header.styles';

interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (href: string) => void;
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const Header: React.FC<HeaderProps> = ({ 
  currentPath = '/', 
  onNavigate 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    onNavigate?.(href);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: animations.easings.easeOut }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isScrolled 
          ? `${colors.background.sidebar}ee` 
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled 
          ? `1px solid ${colors.interactive.border}` 
          : 'none',
        transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
      }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${spacing[4]} ${spacing[5]}`,
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: 'pointer' }}
          onClick={() => handleNavigation('/')}
        >
          <motion.h1
            style={{
              fontSize: typography.sizes['2xl'],
              fontWeight: typography.weights.bold,
              color: colors.brand.primary,
              fontFamily: typography.fonts.heading,
              margin: 0,
            }}
            whileHover={{
              color: colors.interactive.hover,
              transition: { duration: 0.2 }
            }}
          >
            Design Studio
          </motion.h1>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: spacing[8],
            margin: 0,
            padding: 0,
          }}>
            {navigationItems.map((item, index) => {
              const isActive = currentPath === item.href;
              
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: animations.easings.easeOut 
                  }}
                >
                  <motion.a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href);
                    }}
                    style={{
                      color: isActive ? colors.brand.primary : colors.foreground.primary,
                      textDecoration: 'none',
                      fontSize: typography.sizes.base,
                      fontWeight: isActive ? typography.weights.semibold : typography.weights.normal,
                      position: 'relative',
                      padding: `${spacing[2]} ${spacing[3]}`,
                      borderRadius: '6px',
                      transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
                      outline: 'none',
                    }}
                    whileHover={{
                      color: colors.interactive.hover,
                      backgroundColor: `${colors.background.card}80`,
                    }}
                    whileTap={{ scale: 0.95 }}
                    whileFocus={{
                      boxShadow: `0 0 0 2px ${colors.interactive.ring}`,
                      backgroundColor: `${colors.background.card}60`,
                    }}
                  >
                    {item.label}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        style={{
                          position: 'absolute',
                          bottom: '-2px',
                          left: '50%',
                          width: '20px',
                          height: '2px',
                          backgroundColor: colors.brand.primary,
                          borderRadius: '1px',
                        }}
                        initial={{ x: '-50%', scaleX: 0 }}
                        animate={{ x: '-50%', scaleX: 1 }}
                        transition={{ duration: 0.3, ease: animations.easings.easeOut }}
                      />
                    )}
                  </motion.a>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <motion.button
          className="hamburger-button"
          onClick={toggleMenu}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: spacing[2],
            borderRadius: '6px',
            outline: 'none',
          }}
          whileHover={{ backgroundColor: `${colors.background.card}80` }}
          whileTap={{ scale: 0.95 }}
          whileFocus={{
            boxShadow: `0 0 0 2px ${colors.interactive.ring}`,
            backgroundColor: `${colors.background.card}60`,
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <motion.span
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: colors.foreground.primary,
              borderRadius: '1px',
              transformOrigin: 'center',
            }}
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 1 : -4,
            }}
            transition={{ duration: 0.3, ease: animations.easings.easeInOut }}
          />
          <motion.span
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: colors.foreground.primary,
              borderRadius: '1px',
              transformOrigin: 'center',
            }}
            animate={{
              opacity: isMenuOpen ? 0 : 1,
              scaleX: isMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: animations.easings.easeInOut }}
          />
          <motion.span
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: colors.foreground.primary,
              borderRadius: '1px',
              transformOrigin: 'center',
            }}
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -1 : 4,
            }}
            transition={{ duration: 0.3, ease: animations.easings.easeInOut }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ 
              duration: 0.4, 
              ease: animations.easings.easeInOut 
            }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '280px',
              height: '100vh',
              backgroundColor: colors.background.sidebar,
              borderLeft: `1px solid ${colors.interactive.border}`,
              padding: spacing[6],
              paddingTop: '100px',
              zIndex: 999,
            }}
          >
            <nav>
              <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}>
                {navigationItems.map((item, index) => {
                  const isActive = currentPath === item.href;
                  
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.4,
                        ease: animations.easings.easeOut 
                      }}
                      style={{ marginBottom: spacing[4] }}
                    >
                      <motion.a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(item.href);
                        }}
                        style={{
                          display: 'block',
                          color: isActive ? colors.brand.primary : colors.foreground.primary,
                          textDecoration: 'none',
                          fontSize: typography.sizes.lg,
                          fontWeight: isActive ? typography.weights.semibold : typography.weights.normal,
                          padding: spacing[4],
                          borderRadius: '8px',
                          backgroundColor: isActive ? `${colors.brand.primary}20` : 'transparent',
                          border: isActive ? `1px solid ${colors.brand.primary}40` : '1px solid transparent',
                          transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
                          outline: 'none',
                        }}
                        whileHover={{
                          backgroundColor: `${colors.background.card}80`,
                          borderColor: colors.interactive.border,
                          x: 5,
                        }}
                        whileTap={{ scale: 0.98 }}
                        whileFocus={{
                          boxShadow: `0 0 0 2px ${colors.interactive.ring}`,
                          backgroundColor: `${colors.background.card}60`,
                          borderColor: colors.interactive.ring,
                        }}
                      >
                        {item.label}
                      </motion.a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998,
            }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};