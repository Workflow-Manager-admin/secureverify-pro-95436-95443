import React from 'react';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';

// PUBLIC_INTERFACE
/**
 * Alert component for SecureVerify Pro
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='info'] - Alert type (success, info, warning, error)
 * @param {React.ReactNode} props.children - Alert content
 * @param {boolean} [props.dismissible=false] - Whether the alert can be dismissed
 * @param {Function} [props.onDismiss] - Dismiss handler function
 * @param {string} [props.className] - Additional CSS classes
 */
const Alert = ({ 
  type = 'info', 
  children, 
  dismissible = false, 
  onDismiss, 
  className = '',
  ...rest 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'error':
        return <FaExclamationCircle />;
      case 'info':
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <div 
      className={`alert alert-${type} ${className}`} 
      role="alert"
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      {...rest}
    >
      <span>{getIcon()}</span>
      <span style={{ flex: 1 }}>{children}</span>
      
      {dismissible && onDismiss && (
        <button 
          type="button" 
          onClick={onDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
            padding: '0',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
