import React, { useState } from 'react';
import { Header } from './Header';

export const HeaderDemo: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigation = (href: string) => {
    setCurrentPath(href);
    console.log(`Navigating to: ${href}`);
  };

  return (
    <div style={{ minHeight: '200vh', paddingTop: '100px' }}>
      <Header 
        currentPath={currentPath} 
        onNavigate={handleNavigation} 
      />
      
      <div style={{ 
        padding: '2rem', 
        maxWidth: '1200px', 
        margin: '0 auto',
        color: '#f3e3ea'
      }}>
        <h1>Header Demo</h1>
        <p>Current path: {currentPath}</p>
        <p>Scroll down to test the sticky header behavior...</p>
        
        <div style={{ height: '100vh', marginTop: '2rem' }}>
          <h2>Scroll Content</h2>
          <p>This content demonstrates the sticky header behavior.</p>
          <p>The header should become semi-transparent with a backdrop blur when scrolled.</p>
        </div>
        
        <div style={{ height: '100vh' }}>
          <h2>More Content</h2>
          <p>Test the mobile hamburger menu by resizing your browser window.</p>
          <p>The desktop navigation should hide and hamburger menu should appear on mobile.</p>
        </div>
      </div>
    </div>
  );
};