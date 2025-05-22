import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUser, 
  FaIdCard, 
  FaFileUpload, 
  FaCheckCircle, 
  FaFingerprint, 
  FaQuestionCircle, 
  FaCog 
} from 'react-icons/fa';

// PUBLIC_INTERFACE
/**
 * Sidebar component for SecureVerify Pro application
 * Provides navigation menu for authenticated users
 */
const Sidebar = () => {
  const activeStyle = {
    backgroundColor: 'var(--light-blue)',
    color: 'var(--primary-blue)',
    fontWeight: '500'
  };

  return (
    <aside className="sidebar" style={{
      width: '250px',
      backgroundColor: 'var(--white)',
      borderRight: '1px solid var(--medium-gray)',
      height: '100%',
      position: 'fixed',
      top: '80px',
      left: 0,
      overflowY: 'auto',
      padding: '20px 0',
      boxShadow: 'var(--box-shadow)'
    }}>
      <nav>
        <ul className="flex flex-col">
          <li>
            <NavLink 
              to="/dashboard" 
              className="flex items-center gap-2 p-3 mx-2 rounded mb-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/profile" 
              className="flex items-center gap-2 p-3 mx-2 rounded mb-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/identity-verification" 
              className="flex items-center gap-2 p-3 mx-2 rounded mb-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <FaIdCard /> Identity Details
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/document-upload" 
              className="flex items-center gap-2 p-3 mx-2 rounded mb-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <FaFileUpload /> Document Upload
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/biometric-verification" 
              className="flex items-center gap-2 p-3 mx-2 rounded mb-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <FaFingerprint /> Biometric Verification
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/verification-status" 
              className="flex items-center gap-2 p-3 mx-2 rounded mb-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <FaCheckCircle /> Verification Status
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/help" 
              className="flex items-center gap-2 p-3 mx-2 rounded mb-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <FaQuestionCircle /> Help & Support
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings" 
              className="flex items-center gap-2 p-3 mx-2 rounded mb-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <FaCog /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
