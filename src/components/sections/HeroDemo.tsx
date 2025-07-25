import React from 'react';
import { Hero } from './Hero';

/**
 * Demo component for the Hero section
 * This demonstrates the animated hero background with:
 * - Full-screen animated background with gradient transitions
 * - Geometric shapes with rotation and scaling animations
 * - Floating particle effects
 * - Parallax scrolling effects
 * - 60fps optimized animations
 */
export const HeroDemo: React.FC = () => {
  return (
    <div style={{ height: '200vh', background: '#0a1520' }}>
      <Hero />
      
      {/* Additional content to demonstrate parallax scrolling */}
      <div 
        style={{ 
          height: '100vh', 
          background: 'linear-gradient(to bottom, #12242e, #1c2e38)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f3e3ea',
          fontSize: '1.5rem',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div>
          <h2>Scroll up to see the parallax effect</h2>
          <p>The hero background elements move at different speeds to create depth</p>
        </div>
      </div>
    </div>
  );
};

export default HeroDemo;