import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServicesGrid } from './ServicesGrid';
import { ServiceTimeline } from './ServiceTimeline';
import { services, getServiceById } from '../../data/services';
import { Service } from '../../data/types';
import { colors, typography, spacing, animations } from '../../styles/tokens';

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleLearnMore = (serviceId: string) => {
    const service = getServiceById(serviceId);
    if (service) {
      setSelectedService(service);
      setShowTimeline(true);
      
      // Smooth scroll to timeline section
      setTimeout(() => {
        const timelineElement = document.getElementById('service-timeline');
        if (timelineElement) {
          timelineElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  const handleGetQuote = (serviceId: string) => {
    console.log('Get quote for service:', serviceId);
    // In a real app, this would open a contact form or navigate to quote page
    if (serviceId === 'custom') {
      alert('Opening custom consultation form...');
    } else {
      const service = getServiceById(serviceId);
      alert(`Getting quote for: ${service?.name || serviceId}`);
    }
  };

  const handleBackToServices = () => {
    setShowTimeline(false);
    setSelectedService(null);
    
    // Smooth scroll back to services grid
    setTimeout(() => {
      const servicesElement = document.getElementById('services-grid');
      if (servicesElement) {
        servicesElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background.primary,
      paddingTop: '80px', // Account for fixed header
    }}>
      {/* Services Grid Section */}
      <div id="services-grid">
        <ServicesGrid
          services={services}
          onLearnMore={handleLearnMore}
          onGetQuote={handleGetQuote}
          title="Our Services"
          subtitle="We offer comprehensive design and development solutions to bring your vision to life with cutting-edge technology and creative expertise."
        />
      </div>

      {/* Service Timeline Section */}
      <AnimatePresence>
        {showTimeline && selectedService && (
          <motion.div
            id="service-timeline"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.6,
              ease: animations.easings.easeInOut
            }}
            style={{
              backgroundColor: `${colors.background.sidebar}80`,
              borderTop: `1px solid ${colors.interactive.border}`,
              overflow: 'hidden',
            }}
          >
            {/* Timeline Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                textAlign: 'center',
                padding: `${spacing[8]} ${spacing[5]} 0`,
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing[4],
                marginBottom: spacing[6],
              }}>
                <motion.button
                  onClick={handleBackToServices}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[2],
                    padding: `${spacing[2]} ${spacing[4]}`,
                    backgroundColor: 'transparent',
                    color: colors.brand.primary,
                    border: `1px solid ${colors.brand.primary}`,
                    borderRadius: '8px',
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.medium,
                    cursor: 'pointer',
                    transition: `all ${animations.durations.normal} ${animations.easings.easeInOut}`,
                  }}
                  whileHover={{
                    backgroundColor: `${colors.brand.primary}20`,
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Services
                </motion.button>

                <div style={{
                  padding: `${spacing[2]} ${spacing[4]}`,
                  backgroundColor: `${colors.brand.primary}20`,
                  borderRadius: '20px',
                  border: `1px solid ${colors.brand.primary}40`,
                }}>
                  <span style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.medium,
                    color: colors.brand.primary,
                  }}>
                    {selectedService.name}
                  </span>
                </div>
              </div>

              <h2 style={{
                fontSize: typography.sizes['3xl'],
                fontWeight: typography.weights.bold,
                color: colors.foreground.primary,
                margin: 0,
                marginBottom: spacing[3],
              }}>
                How We Work
              </h2>

              <p style={{
                fontSize: typography.sizes.lg,
                color: colors.foreground.secondary,
                lineHeight: typography.lineHeights.relaxed,
                margin: 0,
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                Our proven process for {selectedService.name.toLowerCase()} ensures quality results and client satisfaction at every step.
              </p>
            </motion.div>

            {/* Timeline Component */}
            <ServiceTimeline
              steps={selectedService.process}
              title="Our Process"
              subtitle={`A step-by-step approach to ${selectedService.name.toLowerCase()}`}
              serviceId={selectedService.id}
            />

            {/* Service Features Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                padding: `${spacing[8]} ${spacing[5]}`,
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              <div style={{
                backgroundColor: colors.background.card,
                borderRadius: '16px',
                padding: spacing[6],
                border: `1px solid ${colors.interactive.border}`,
              }}>
                <h3 style={{
                  fontSize: typography.sizes.xl,
                  fontWeight: typography.weights.semibold,
                  color: colors.foreground.primary,
                  margin: 0,
                  marginBottom: spacing[4],
                  textAlign: 'center',
                }}>
                  What You Get
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: spacing[4],
                }}>
                  {selectedService.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing[3],
                        padding: spacing[3],
                        backgroundColor: `${colors.brand.primary}10`,
                        borderRadius: '8px',
                        border: `1px solid ${colors.brand.primary}20`,
                      }}
                    >
                      <motion.div
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: colors.brand.primary,
                          borderRadius: '50%',
                          flexShrink: 0,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                      />
                      <span style={{
                        fontSize: typography.sizes.sm,
                        color: colors.foreground.primary,
                        fontWeight: typography.weights.medium,
                      }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};