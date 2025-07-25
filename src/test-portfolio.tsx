import React from 'react'
import { createRoot } from 'react-dom/client'
import { PortfolioDemo } from './components/demo/PortfolioDemo'

// Test page for portfolio showcase
const TestPortfolio: React.FC = () => {
  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, sans-serif',
      backgroundColor: '#12242e',
      minHeight: '100vh'
    }}>
      <PortfolioDemo />
    </div>
  )
}

// Mount the test component
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<TestPortfolio />)
}