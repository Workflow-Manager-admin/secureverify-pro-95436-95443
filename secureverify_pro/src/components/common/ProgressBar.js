import React from 'react';

// PUBLIC_INTERFACE
/**
 * ProgressBar component for SecureVerify Pro
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Current progress value (0-100)
 * @param {string} [props.label] - Label to display
 * @param {boolean} [props.showPercentage=false] - Whether to show percentage text
 * @param {string} [props.className] - Additional CSS classes
 */
const ProgressBar = ({ 
  value, 
  label, 
  showPercentage = false,
  className = '',
  ...rest 
}) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between mb-1">
          <span>{label}</span>
          {showPercentage && <span>{normalizedValue}%</span>}
        </div>
      )}
      <div className="progress-bar-container" {...rest}>
        <div 
          className="progress-bar" 
          style={{ width: `${normalizedValue}%` }}
          role="progressbar"
          aria-valuenow={normalizedValue}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
