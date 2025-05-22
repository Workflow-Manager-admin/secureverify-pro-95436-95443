import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Layout components
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

// Contexts
import { useAuth } from '../../context/AuthContext';

// PUBLIC_INTERFACE
/**
 * Main application layout component for SecureVerify Pro
 * Handles the overall page structure and conditionally renders sidebar
 */
const AppLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Determine if page should show sidebar
  const hasSidebar = isAuthenticated() && !['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className="app">
      <Header />
      
      {hasSidebar && <Sidebar />}
      
      <MainContent hasSidebar={hasSidebar}>
        <Outlet />
      </MainContent>
      
      <Footer />
    </div>
  );
};

export default AppLayout;
