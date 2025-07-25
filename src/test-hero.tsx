import React from 'react';
import { Hero, HeroContent, HeroDemo } from './components';

// Simple test to verify Hero components compile
const TestHero = () => {
  return (
    <div>
      <Hero />
      <HeroContent />
      <HeroDemo />
    </div>
  );
};

export default TestHero;