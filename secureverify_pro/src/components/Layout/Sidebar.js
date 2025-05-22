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
  // Active link style moved to JSX for better maintainability
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
      padding: '24px 0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      zIndex: 90
    }}>
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <h2 style={{ 
          fontSize: '14px', 
          color: 'var(--text-secondary)', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          fontWeight: '600',
          margin: 0
        }}>
          Navigation
        </h2>
      </div>

      <nav>
        <ul className="flex flex-col" style={{ gap: '2px' }}>
          {/* Core Features Group */}
          <div style={{ marginBottom: '16px' }}>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `
                  flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-blue-50'
                  }
                `}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ 
                  display: 'inline-flex', 
                  width: '20px', 
                  height: '20px',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  color: 'var(--primary-blue)' 
                }}>
                  <FaHome />
                </span>
                <span style={{ fontWeight: '500' }}>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => `
                  flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-blue-50'
                  }
                `}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ 
                  display: 'inline-flex', 
                  width: '20px', 
                  height: '20px',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  color: 'var(--primary-blue)' 
                }}>
                  <FaUser />
                </span>
                <span style={{ fontWeight: '500' }}>My Profile</span>
              </NavLink>
            </li>
          </div>

          {/* Verification Process Group */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ 
              padding: '0 16px', 
              marginBottom: '8px',
              marginTop: '16px' 
            }}>
              <h3 style={{ 
                fontSize: '12px', 
                color: 'var(--text-secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.5px',
                fontWeight: '600',
                margin: 0
              }}>
                Verification Process
              </h3>
            </div>
            <li>
              <NavLink 
                to="/personal-info" 
                className={({ isActive }) => `
                  flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-blue-50'
                  }
                `}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ 
                  display: 'inline-flex', 
                  width: '20px', 
                  height: '20px',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  color: 'var(--primary-blue)' 
                }}>
                  <FaIdCard />
                </span>
                <span style={{ fontWeight: '500' }}>Identity Details</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/document-upload" 
                className={({ isActive }) => `
                  flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-blue-50'
                  }
                `}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ 
                  display: 'inline-flex', 
                  width: '20px', 
                  height: '20px',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  color: 'var(--primary-blue)' 
                }}>
                  <FaFileUpload />
                </span>
                <span style={{ fontWeight: '500' }}>Document Upload</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/biometric-verification" 
                className={({ isActive }) => `
                  flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-blue-50'
                  }
                `}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ 
                  display: 'inline-flex', 
                  width: '20px', 
                  height: '20px',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  color: 'var(--primary-blue)' 
                }}>
                  <FaFingerprint />
                </span>
                <span style={{ fontWeight: '500' }}>Biometric Verification</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/verification-status" 
                className={({ isActive }) => `
                  flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-blue-50'
                  }
                `}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ 
                  display: 'inline-flex', 
                  width: '20px', 
                  height: '20px',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  color: 'var(--primary-blue)' 
                }}>
                  <FaCheckCircle />
                </span>
                <span style={{ fontWeight: '500' }}>Verification Status</span>
              </NavLink>
            </li>
          </div>

          {/* Settings and Support Group */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ 
              padding: '0 16px', 
              marginBottom: '8px' 
            }}>
              <h3 style={{ 
                fontSize: '12px', 
                color: 'var(--text-secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.5px',
                fontWeight: '600',
                margin: 0
              }}>
                Support & Settings
              </h3>
            </div>
            <li>
              <NavLink 
                to="/help" 
                className={({ isActive }) => `
                  flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-blue-50'
                  }
                `}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ 
                  display: 'inline-flex', 
                  width: '20px', 
                  height: '20px',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  color: 'var(--primary-blue)' 
                }}>
                  <FaQuestionCircle />
                </span>
                <span style={{ fontWeight: '500' }}>Help & Support</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => `
                  flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-blue-50'
                  }
                `}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ 
                  display: 'inline-flex', 
                  width: '20px', 
                  height: '20px',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  color: 'var(--primary-blue)' 
                }}>
                  <FaCog />
                </span>
                <span style={{ fontWeight: '500' }}>Settings</span>
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
