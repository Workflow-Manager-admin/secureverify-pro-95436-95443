import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

// PUBLIC_INTERFACE
/**
 * Footer component for SecureVerify Pro application
 * Contains copyright info, links, and contact information
 */
const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-3 gap-6">
          <div>
            <Link to="/" className="logo mb-4" style={{ display: 'inline-block' }}>
              <FaLock className="logo-symbol" /> SecureVerify Pro
            </Link>
            <p className="mb-4">
              A comprehensive electronic Know Your Customer (eKYC) solution 
              designed for professional-grade identity verification and onboarding processes.
            </p>
          </div>
          
          <div>
            <h3 className="section-title mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="section-title mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>123 Security Street, Digital City</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope />
                <span>contact@secureverifypro.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--medium-gray)' }}>
          <p className="text-center">
            &copy; {year} SecureVerify Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
