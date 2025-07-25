import { colors, typography, spacing, animations } from '../../styles/tokens';

export const footerStyles = {
  footer: {
    backgroundColor: colors.background.sidebar,
    borderTop: `1px solid ${colors.interactive.border}`,
    padding: `${spacing[16]} 0 ${spacing[8]} 0`,
    marginTop: spacing[20]
  },
  
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: spacing[12],
    marginBottom: spacing[12]
  },
  
  heading: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.brand.primary,
    marginBottom: spacing[4]
  },
  
  secondaryHeading: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.brand.secondary,
    marginBottom: spacing[4]
  },
  
  paragraph: {
    color: colors.foreground.secondary,
    fontSize: typography.sizes.base,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[6]
  },
  
  sectionTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.foreground.primary,
    marginBottom: spacing[3]
  },
  
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2]
  },
  
  contactLink: {
    color: colors.foreground.secondary,
    textDecoration: 'none',
    fontSize: typography.sizes.sm,
    transition: `color ${animations.durations.normal} ${animations.easings.easeInOut}`
  },
  
  contactText: {
    color: colors.foreground.secondary,
    fontSize: typography.sizes.sm
  },
  
  socialContainer: {
    display: 'flex',
    gap: spacing[4],
    alignItems: 'center'
  },
  
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: colors.background.card,
    color: colors.foreground.secondary,
    textDecoration: 'none',
    border: `1px solid ${colors.interactive.border}`,
    transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`
  },
  
  formGroup: {
    marginBottom: spacing[4]
  },
  
  label: {
    display: 'block',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.foreground.primary,
    marginBottom: spacing[2]
  },
  
  input: {
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    backgroundColor: colors.background.card,
    border: `1px solid ${colors.interactive.border}`,
    borderRadius: '8px',
    color: colors.foreground.primary,
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.body,
    transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
    outline: 'none'
  },
  
  errorText: {
    color: '#ef4444',
    fontSize: typography.sizes.sm,
    marginTop: spacing[1]
  },
  
  button: {
    width: '100%',
    padding: `${spacing[3]} ${spacing[6]}`,
    backgroundColor: colors.brand.primary,
    color: colors.background.primary,
    border: 'none',
    borderRadius: '8px',
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fonts.body,
    cursor: 'pointer',
    transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`
  },
  
  successButton: {
    backgroundColor: '#10b981'
  },
  
  successText: {
    color: '#10b981',
    fontSize: typography.sizes.sm,
    textAlign: 'center'
  },
  
  footerBottom: {
    borderTop: `1px solid ${colors.interactive.border}`,
    paddingTop: spacing[6],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4]
  },
  
  footerBottomFlex: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4]
  },
  
  copyright: {
    color: colors.foreground.secondary,
    fontSize: typography.sizes.sm,
    margin: 0
  },
  
  legalLinks: {
    display: 'flex',
    gap: spacing[6],
    flexWrap: 'wrap'
  },
  
  legalLink: {
    color: colors.foreground.secondary,
    textDecoration: 'none',
    fontSize: typography.sizes.sm,
    transition: `color ${animations.durations.normal} ${animations.easings.easeInOut}`
  }
};