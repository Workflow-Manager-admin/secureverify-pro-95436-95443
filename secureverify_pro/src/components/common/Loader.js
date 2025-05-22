import React from 'react';

// PUBLIC_INTERFACE
/**
 * Loader component for SecureVerify Pro
 * 
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Loader size (small, medium, large)
 * @param {string} [props.color='primary'] - Loader color
 * @param {string} [props.className] - Additional CSS classes
 */
const Loader = ({ size = 'medium', color = 'primary', className = '', ...rest }) => {
  const sizeMap = {
    small: { width: '16px', height: '16px', borderWidth: '2px' },
    medium: { width: '24px', height: '24px', borderWidth: '2px' },
    large: { width: '32px', height: '32px', borderWidth: '3px' },
  };
  
  const colorMap = {
    primary: 'var(--primary-blue)',
    secondary: 'var(--secondary-blue)',
    white: 'var(--white)',
  };

  const loaderStyle = {
    ...sizeMap[size],
    borderColor: 'var(--light-blue)',
    borderTopColor: colorMap[color] || color,
  };

  return (
    <div 
      className={`loader ${className}`} 
      style={loaderStyle}
      {...rest} 
    />
  );
};

export default Loader;
