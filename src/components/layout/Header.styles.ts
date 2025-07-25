import { colors, typography, spacing, animations } from '../../styles/tokens';

export const headerStyles = {
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
  },
  
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing[4]} ${spacing[5]}`,
    maxWidth: '1200px',
    margin: '0 auto',
  },
  
  logo: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.brand.primary,
    fontFamily: typography.fonts.heading,
    margin: 0,
    cursor: 'pointer',
  },
  
  desktopNav: {
    display: 'flex',
    listStyle: 'none',
    gap: spacing[8],
    margin: 0,
    padding: 0,
  },
  
  navLink: {
    textDecoration: 'none',
    fontSize: typography.sizes.base,
    position: 'relative' as const,
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: '6px',
    transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
  },
  
  activeIndicator: {
    position: 'absolute' as const,
    bottom: '-2px',
    left: '50%',
    width: '20px',
    height: '2px',
    backgroundColor: colors.brand.primary,
    borderRadius: '1px',
  },
  
  hamburgerButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: spacing[2],
    borderRadius: '6px',
  },
  
  hamburgerLine: {
    width: '20px',
    height: '2px',
    backgroundColor: colors.foreground.primary,
    borderRadius: '1px',
    transformOrigin: 'center',
  },
  
  mobileMenu: {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: colors.background.sidebar,
    borderLeft: `1px solid ${colors.interactive.border}`,
    padding: spacing[6],
    paddingTop: '100px',
    zIndex: 999,
  },
  
  mobileNavList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  
  mobileNavItem: {
    marginBottom: spacing[4],
  },
  
  mobileNavLink: {
    display: 'block',
    textDecoration: 'none',
    fontSize: typography.sizes.lg,
    padding: spacing[4],
    borderRadius: '8px',
    border: '1px solid transparent',
    transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
  },
  
  backdrop: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
};