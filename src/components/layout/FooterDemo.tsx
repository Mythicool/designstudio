import React from 'react';
import { Footer } from './Footer';

const FooterDemo: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#12242e',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Demo content to show footer at bottom */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{ 
          textAlign: 'center',
          color: '#f3e3ea'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            color: '#fbe2a7'
          }}>
            Footer Component Demo
          </h1>
          <p style={{ 
            fontSize: '1.125rem',
            color: '#c4b5a0',
            maxWidth: '600px'
          }}>
            Scroll down to see the footer component with contact information, 
            social media links, and newsletter signup form.
          </p>
        </div>
      </div>
      
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default FooterDemo;