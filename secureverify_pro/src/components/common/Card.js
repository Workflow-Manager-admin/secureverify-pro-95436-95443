import React from 'react';

// PUBLIC_INTERFACE
/**
 * Card component for SecureVerify Pro
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.title] - Card title
 * @param {boolean} [props.hoverable=false] - Whether card has hover effect
 * @param {string} [props.className] - Additional CSS classes to apply
 */
const Card = ({ children, title, hoverable = false, className = '', ...rest }) => {
  const cardStyle = {
    transition: 'all 0.3s ease',
    ...(hoverable ? { cursor: 'pointer', ':hover': { transform: 'translateY(-5px)' } } : {})
  };

  return (
    <div className={`card ${className}`} style={cardStyle} {...rest}>
      {title && <h3 className="card-title mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
