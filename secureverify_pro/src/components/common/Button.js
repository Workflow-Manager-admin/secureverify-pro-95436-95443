import React from 'react';

// PUBLIC_INTERFACE
/**
 * Button component for SecureVerify Pro
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='button'] - Button type (button, submit, reset)
 * @param {string} [props.variant='primary'] - Button style variant (primary, secondary)
 * @param {boolean} [props.isLarge=false] - Whether to show large button
 * @param {boolean} [props.isFullWidth=false] - Whether button should take full width
 * @param {boolean} [props.isDisabled=false] - Whether button is disabled
 * @param {boolean} [props.isLoading=false] - Whether to show loading state
 * @param {Function} [props.onClick] - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes to apply
 */
const Button = ({
  type = 'button',
  variant = 'primary',
  isLarge = false,
  isFullWidth = false,
  isDisabled = false,
  isLoading = false,
  onClick,
  children,
  className = '',
  ...rest
}) => {
  const baseClasses = 'btn';
  const variantClass = variant === 'secondary' ? 'btn-secondary' : '';
  const sizeClass = isLarge ? 'btn-large' : '';
  const widthClass = isFullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim();
  
  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      style={{ opacity: isDisabled ? 0.7 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer' }}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="loader" style={{ marginRight: '10px' }}></span>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
