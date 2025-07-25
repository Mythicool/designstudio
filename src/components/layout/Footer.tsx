import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { colors, typography, spacing, animations } from '../../styles/tokens';

// Social media icons as SVG components
const TwitterIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const DribbbleIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm9.568 7.375c.77 1.423 1.216 3.06 1.216 4.625 0 .414-.025.823-.075 1.226-.314-.067-.678-.134-1.118-.2-2.680-.402-5.11-.402-6.884.201-.433-.996-.903-1.932-1.373-2.733 2.207-.909 4.04-2.293 5.234-4.119zm-1.568-1.375c-1.194 1.826-3.027 3.21-5.234 4.119-.47-.801-.94-1.737-1.373-2.733 1.774-.603 4.204-.603 6.884-.201.44.066.804.133 1.118.2.05.403.075.812.075 1.226 0-1.565-.446-3.202-1.216-4.625-.154.004-.31.014-.254.014zm-7.568 16.625c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.748 0 3.37.562 4.686 1.513-.433.996-.903 1.932-1.373 2.733-2.207-.909-4.04-2.293-5.234-4.119 1.194-1.826 3.027-3.21 5.234-4.119.47.801.94 1.737 1.373 2.733-1.316-.951-2.938-1.513-4.686-1.513z"/>
  </svg>
);

interface FooterProps {
  className?: string;
}

interface NewsletterFormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const [newsletterForm, setNewsletterForm] = useState<NewsletterFormData>({
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle newsletter form submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validate email
    if (!newsletterForm.email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(newsletterForm.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setNewsletterForm({ email: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      setErrors({ email: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewsletterForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Social media links data
  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/designstudio',
      icon: TwitterIcon,
      hoverColor: '#1DA1F2'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/designstudio',
      icon: LinkedInIcon,
      hoverColor: '#0077B5'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/designstudio',
      icon: InstagramIcon,
      hoverColor: '#E4405F'
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com/designstudio',
      icon: DribbbleIcon,
      hoverColor: '#EA4C89'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const socialIconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer
      className={`footer ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        backgroundColor: colors.background.sidebar,
        borderTop: `1px solid ${colors.interactive.border}`,
        padding: `${spacing[16]} 0 ${spacing[8]} 0`,
        marginTop: spacing[20]
      }}
    >
      <div className="container">
        <div 
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: spacing[12],
            marginBottom: spacing[12]
          }}
        >
          
          {/* Company Info Section */}
          <motion.div variants={itemVariants}>
            <h3 style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['2xl'],
              fontWeight: typography.weights.bold,
              color: colors.brand.primary,
              marginBottom: spacing[4]
            }}>
              Design Studio
            </h3>
            <p style={{
              color: colors.foreground.secondary,
              fontSize: typography.sizes.base,
              lineHeight: typography.lineHeights.relaxed,
              marginBottom: spacing[6]
            }}>
              Creating exceptional digital experiences through innovative design and cutting-edge technology.
            </p>
            
            {/* Contact Information */}
            <div style={{ marginBottom: spacing[6] }}>
              <h4 style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.foreground.primary,
                marginBottom: spacing[3]
              }}>
                Contact Us
              </h4>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: spacing[2] 
              }}>
                <a 
                  href="mailto:hello@designstudio.com"
                  style={{
                    color: colors.foreground.secondary,
                    textDecoration: 'none',
                    fontSize: typography.sizes.sm,
                    transition: `color ${animations.durations.normal} ${animations.easings.easeInOut}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.brand.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.foreground.secondary;
                  }}
                >
                  hello@designstudio.com
                </a>
                <a 
                  href="tel:+1234567890"
                  style={{
                    color: colors.foreground.secondary,
                    textDecoration: 'none',
                    fontSize: typography.sizes.sm,
                    transition: `color ${animations.durations.normal} ${animations.easings.easeInOut}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.brand.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.foreground.secondary;
                  }}
                >
                  +1 (234) 567-890
                </a>
                <span style={{
                  color: colors.foreground.secondary,
                  fontSize: typography.sizes.sm
                }}>
                  123 Design Street, Creative City, CC 12345
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.foreground.primary,
                marginBottom: spacing[3]
              }}>
                Follow Us
              </h4>
              <div style={{
                display: 'flex',
                gap: spacing[4],
                alignItems: 'center'
              }}>
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={socialIconVariants}
                      initial="rest"
                      whileHover="hover"
                      style={{
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
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = social.hoverColor;
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.borderColor = social.hoverColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = colors.background.card;
                        e.currentTarget.style.color = colors.foreground.secondary;
                        e.currentTarget.style.borderColor = colors.interactive.border;
                      }}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <IconComponent />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Newsletter Signup Section */}
          <motion.div variants={itemVariants}>
            <h3 style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['2xl'],
              fontWeight: typography.weights.bold,
              color: colors.brand.secondary,
              marginBottom: spacing[4]
            }}>
              Stay Updated
            </h3>
            <p style={{
              color: colors.foreground.secondary,
              fontSize: typography.sizes.base,
              lineHeight: typography.lineHeights.relaxed,
              marginBottom: spacing[6]
            }}>
              Subscribe to our newsletter for the latest design insights, project updates, and industry trends.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} style={{ marginBottom: spacing[6] }}>
              <div style={{ marginBottom: spacing[4] }}>
                <label 
                  htmlFor="newsletter-email"
                  style={{
                    display: 'block',
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.medium,
                    color: colors.foreground.primary,
                    marginBottom: spacing[2]
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    id="newsletter-email"
                    name="email"
                    value={newsletterForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: `${spacing[3]} ${spacing[4]}`,
                      backgroundColor: colors.background.card,
                      border: `1px solid ${errors.email ? '#ef4444' : colors.interactive.border}`,
                      borderRadius: '8px',
                      color: colors.foreground.primary,
                      fontSize: typography.sizes.base,
                      fontFamily: typography.fonts.body,
                      transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = colors.interactive.ring;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.interactive.ring}33`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.email ? '#ef4444' : colors.interactive.border;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      color: '#ef4444',
                      fontSize: typography.sizes.sm,
                      marginTop: spacing[1]
                    }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: `${spacing[3]} ${spacing[6]}`,
                  backgroundColor: isSubmitted ? '#10b981' : colors.brand.primary,
                  color: colors.background.primary,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: typography.sizes.base,
                  fontWeight: typography.weights.semibold,
                  fontFamily: typography.fonts.body,
                  cursor: isSubmitting || isSubmitted ? 'default' : 'pointer',
                  transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && !isSubmitted) {
                    e.currentTarget.style.backgroundColor = colors.brand.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && !isSubmitted) {
                    e.currentTarget.style.backgroundColor = colors.brand.primary;
                  }
                }}
              >
                {isSubmitting ? 'Subscribing...' : isSubmitted ? '✓ Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>

            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: '#10b981',
                  fontSize: typography.sizes.sm,
                  textAlign: 'center'
                }}
              >
                Thank you for subscribing! Check your email for confirmation.
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          variants={itemVariants}
          style={{
            borderTop: `1px solid ${colors.interactive.border}`,
            paddingTop: spacing[6],
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[4]
          }}
        >
          <div 
            className="footer-bottom-flex"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[4]
            }}
          >
            <p style={{
              color: colors.foreground.secondary,
              fontSize: typography.sizes.sm,
              margin: 0
            }}>
              © 2024 Design Studio. All rights reserved.
            </p>
            
            <div style={{
              display: 'flex',
              gap: spacing[6],
              flexWrap: 'wrap'
            }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    color: colors.foreground.secondary,
                    textDecoration: 'none',
                    fontSize: typography.sizes.sm,
                    transition: `color ${animations.durations.normal} ${animations.easings.easeInOut}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.brand.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.foreground.secondary;
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>


    </motion.footer>
  );
};

export default Footer;