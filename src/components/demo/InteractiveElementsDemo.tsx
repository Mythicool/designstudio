import React, { useState } from 'react'
import { 
  InteractiveButton, 
  InteractiveCard, 
  InteractiveIcon, 
  LoadingAnimation,
  FocusTrap
} from '../ui/InteractiveElements'
import { 
  PageTransition, 
  RouteTransition, 
  ModalTransition, 
  DrawerTransition,
  ToastTransition
} from '../ui/PageTransitions'
import { colors, typography, spacing } from '../../styles/tokens'

export const InteractiveElementsDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('buttons')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  const handleLoadingDemo = async () => {
    setButtonLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setButtonLoading(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const pages = {
    buttons: (
      <div style={{ padding: spacing[8] }}>
        <h2 style={{ 
          fontSize: typography.sizes['3xl'], 
          color: colors.foreground.primary,
          marginBottom: spacing[8]
        }}>
          Interactive Buttons
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: spacing[6],
          marginBottom: spacing[8]
        }}>
          <InteractiveButton variant="primary" size="lg">
            Primary Large
          </InteractiveButton>
          
          <InteractiveButton variant="secondary" size="md">
            Secondary Medium
          </InteractiveButton>
          
          <InteractiveButton variant="outline" size="sm">
            Outline Small
          </InteractiveButton>
          
          <InteractiveButton variant="ghost">
            Ghost Button
          </InteractiveButton>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: spacing[6],
          marginBottom: spacing[8]
        }}>
          <InteractiveButton 
            variant="primary"
            loading={buttonLoading}
            onClick={handleLoadingDemo}
          >
            {buttonLoading ? 'Loading...' : 'Test Loading'}
          </InteractiveButton>
          
          <InteractiveButton 
            variant="outline"
            disabled
          >
            Disabled Button
          </InteractiveButton>
          
          <InteractiveButton 
            variant="primary"
            icon={<span>🚀</span>}
            iconPosition="left"
          >
            With Icon Left
          </InteractiveButton>
          
          <InteractiveButton 
            variant="secondary"
            icon={<span>→</span>}
            iconPosition="right"
          >
            With Icon Right
          </InteractiveButton>
        </div>

        <h3 style={{ 
          fontSize: typography.sizes.xl, 
          color: colors.foreground.primary,
          marginBottom: spacing[4]
        }}>
          Interactive Icons
        </h3>
        
        <div style={{ 
          display: 'flex', 
          gap: spacing[4],
          marginBottom: spacing[8]
        }}>
          <InteractiveIcon 
            size="sm" 
            variant="default"
            tooltip="Small Default Icon"
            onClick={() => console.log('Small icon clicked')}
          >
            ⭐
          </InteractiveIcon>
          
          <InteractiveIcon 
            size="md" 
            variant="primary"
            tooltip="Medium Primary Icon"
            onClick={() => console.log('Medium icon clicked')}
          >
            💎
          </InteractiveIcon>
          
          <InteractiveIcon 
            size="lg" 
            variant="secondary"
            tooltip="Large Secondary Icon"
            onClick={() => console.log('Large icon clicked')}
          >
            🎨
          </InteractiveIcon>
        </div>

        <h3 style={{ 
          fontSize: typography.sizes.xl, 
          color: colors.foreground.primary,
          marginBottom: spacing[4]
        }}>
          Loading Animations
        </h3>
        
        <div style={{ 
          display: 'flex', 
          gap: spacing[6],
          alignItems: 'center',
          marginBottom: spacing[8]
        }}>
          <div style={{ textAlign: 'center' }}>
            <LoadingAnimation type="spinner" size="lg" />
            <p style={{ fontSize: typography.sizes.sm, color: colors.foreground.secondary, marginTop: spacing[2] }}>
              Spinner
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <LoadingAnimation type="dots" size="md" />
            <p style={{ fontSize: typography.sizes.sm, color: colors.foreground.secondary, marginTop: spacing[2] }}>
              Dots
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <LoadingAnimation type="pulse" size="lg" />
            <p style={{ fontSize: typography.sizes.sm, color: colors.foreground.secondary, marginTop: spacing[2] }}>
              Pulse
            </p>
          </div>
        </div>
      </div>
    ),

    cards: (
      <div style={{ padding: spacing[8] }}>
        <h2 style={{ 
          fontSize: typography.sizes['3xl'], 
          color: colors.foreground.primary,
          marginBottom: spacing[8]
        }}>
          Interactive Cards
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: spacing[6]
        }}>
          <InteractiveCard
            hoverable={true}
            glowEffect={true}
            scaleEffect={true}
            onClick={() => console.log('Card 1 clicked')}
          >
            <h3 style={{ color: colors.foreground.primary, marginBottom: spacing[3] }}>
              Hover & Scale Card
            </h3>
            <p style={{ color: colors.foreground.secondary, margin: 0 }}>
              This card has hover effects with glow and scale animations.
            </p>
          </InteractiveCard>
          
          <InteractiveCard
            hoverable={true}
            tiltEffect={true}
            glowEffect={true}
            onClick={() => console.log('Card 2 clicked')}
          >
            <h3 style={{ color: colors.foreground.primary, marginBottom: spacing[3] }}>
              Tilt Effect Card
            </h3>
            <p style={{ color: colors.foreground.secondary, margin: 0 }}>
              This card tilts slightly on hover for a 3D effect.
            </p>
          </InteractiveCard>
          
          <InteractiveCard
            hoverable={true}
            glowEffect={false}
            scaleEffect={false}
          >
            <h3 style={{ color: colors.foreground.primary, marginBottom: spacing[3] }}>
              Minimal Hover Card
            </h3>
            <p style={{ color: colors.foreground.secondary, margin: 0 }}>
              This card has subtle hover effects without scaling or glowing.
            </p>
          </InteractiveCard>
        </div>
      </div>
    ),

    transitions: (
      <div style={{ padding: spacing[8] }}>
        <h2 style={{ 
          fontSize: typography.sizes['3xl'], 
          color: colors.foreground.primary,
          marginBottom: spacing[8]
        }}>
          Page Transitions & Modals
        </h2>
        
        <div style={{ 
          display: 'flex', 
          gap: spacing[4],
          flexWrap: 'wrap',
          marginBottom: spacing[8]
        }}>
          <InteractiveButton 
            variant="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </InteractiveButton>
          
          <InteractiveButton 
            variant="secondary"
            onClick={() => setIsDrawerOpen(true)}
          >
            Open Drawer
          </InteractiveButton>
          
          <InteractiveButton 
            variant="outline"
            onClick={() => {
              setShowToast(true)
              setTimeout(() => setShowToast(false), 3000)
            }}
          >
            Show Toast
          </InteractiveButton>
          
          <InteractiveButton 
            variant="ghost"
            onClick={() => {
              setIsLoading(true)
              setTimeout(() => setIsLoading(false), 2000)
            }}
          >
            Test Route Loading
          </InteractiveButton>
        </div>

        <RouteTransition isLoading={isLoading} pageKey="demo-content">
          <div style={{
            padding: spacing[6],
            backgroundColor: colors.background.card,
            borderRadius: '12px',
            border: `1px solid ${colors.interactive.border}`
          }}>
            <h3 style={{ color: colors.foreground.primary, marginBottom: spacing[4] }}>
              Route Transition Demo
            </h3>
            <p style={{ color: colors.foreground.secondary, margin: 0 }}>
              This content demonstrates route transitions with loading states. 
              Click "Test Route Loading" to see the loading animation.
            </p>
          </div>
        </RouteTransition>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.background.primary 
    }}>
      {/* Navigation */}
      <nav style={{
        padding: spacing[4],
        backgroundColor: colors.background.card,
        borderBottom: `1px solid ${colors.interactive.border}`,
        display: 'flex',
        gap: spacing[4]
      }}>
        {Object.keys(pages).map((pageKey) => (
          <InteractiveButton
            key={pageKey}
            variant={currentPage === pageKey ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setCurrentPage(pageKey)}
          >
            {pageKey.charAt(0).toUpperCase() + pageKey.slice(1)}
          </InteractiveButton>
        ))}
      </nav>

      {/* Page Content with Transitions */}
      <PageTransition pageKey={currentPage} direction="horizontal">
        {pages[currentPage as keyof typeof pages]}
      </PageTransition>

      {/* Modal Demo */}
      <ModalTransition
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div style={{
          backgroundColor: colors.background.card,
          padding: spacing[8],
          borderRadius: '16px',
          border: `1px solid ${colors.interactive.border}`,
          maxWidth: '500px',
          width: '100%'
        }}>
          <h3 style={{ 
            color: colors.foreground.primary, 
            marginBottom: spacing[4],
            fontSize: typography.sizes.xl
          }}>
            Modal Demo
          </h3>
          <p style={{ 
            color: colors.foreground.secondary, 
            marginBottom: spacing[6],
            lineHeight: typography.lineHeights.relaxed
          }}>
            This is a modal with smooth entrance and exit animations. 
            It includes backdrop blur and focus trapping for accessibility.
          </p>
          
          <FocusTrap active={isModalOpen}>
            <div style={{ display: 'flex', gap: spacing[3] }}>
              <InteractiveButton 
                variant="primary"
                onClick={() => setIsModalOpen(false)}
              >
                Close Modal
              </InteractiveButton>
              <InteractiveButton 
                variant="outline"
                onClick={() => console.log('Secondary action')}
              >
                Secondary Action
              </InteractiveButton>
            </div>
          </FocusTrap>
        </div>
      </ModalTransition>

      {/* Drawer Demo */}
      <DrawerTransition
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        side="right"
      >
        <div style={{ padding: spacing[6] }}>
          <h3 style={{ 
            color: colors.foreground.primary, 
            marginBottom: spacing[4],
            fontSize: typography.sizes.lg
          }}>
            Drawer Menu
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <InteractiveButton
                key={item}
                variant="ghost"
                style={{ justifyContent: 'flex-start' }}
                onClick={() => console.log(`Navigate to ${item}`)}
              >
                {item}
              </InteractiveButton>
            ))}
          </div>
          
          <div style={{ marginTop: spacing[6] }}>
            <InteractiveButton 
              variant="outline"
              onClick={() => setIsDrawerOpen(false)}
              style={{ width: '100%' }}
            >
              Close Drawer
            </InteractiveButton>
          </div>
        </div>
      </DrawerTransition>

      {/* Toast Demo */}
      <ToastTransition
        isVisible={showToast}
        position="top-right"
      >
        <div style={{
          backgroundColor: colors.background.card,
          padding: spacing[4],
          borderRadius: '8px',
          border: `1px solid ${colors.interactive.border}`,
          boxShadow: `0 4px 12px ${colors.background.primary}40`,
          display: 'flex',
          alignItems: 'center',
          gap: spacing[3],
          minWidth: '300px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            backgroundColor: colors.brand.primary,
            borderRadius: '50%'
          }} />
          <div>
            <p style={{ 
              color: colors.foreground.primary, 
              margin: 0,
              fontSize: typography.sizes.sm,
              fontWeight: typography.weights.medium
            }}>
              Action completed successfully!
            </p>
            <p style={{ 
              color: colors.foreground.secondary, 
              margin: 0,
              fontSize: typography.sizes.xs
            }}>
              This toast will disappear automatically.
            </p>
          </div>
        </div>
      </ToastTransition>
    </div>
  )
}