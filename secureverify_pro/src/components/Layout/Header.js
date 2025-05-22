import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaUserCircle } from 'react-icons/fa';

// PUBLIC_INTERFACE
/**
 * Header component for SecureVerify Pro application
 * Provides navigation and branding elements
 */
const Header = () => {
  return (
    <header className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link to="/" className="logo">
            <FaLock className="logo-symbol" /> SecureVerify Pro
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/login" className="btn btn-secondary">
              <FaUserCircle /> Login
            </Link>
            <Link to="/register" className="btn">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
