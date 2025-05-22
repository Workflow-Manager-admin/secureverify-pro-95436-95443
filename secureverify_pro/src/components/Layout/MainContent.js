import React from 'react';
import { useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * MainContent component for SecureVerify Pro application
 * Wrapper for page content that adjusts based on authentication state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render inside main content
 * @param {boolean} props.hasSidebar - Whether to show sidebar layout (for authenticated pages)
 */
const MainContent = ({ children, hasSidebar = false }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Apply different styles based on whether it's the home page
  const contentStyle = isHomePage 
    ? {} 
    : { paddingTop: '40px' };
  
  // Apply different styles based on whether sidebar is present
  const containerStyle = hasSidebar 
    ? { marginLeft: '250px', width: 'calc(100% - 250px)' } 
    : {};

  return (
    <main className="main-content" style={contentStyle}>
      <div className="container" style={containerStyle}>
        {children}
      </div>
    </main>
  );
};

export default MainContent;
