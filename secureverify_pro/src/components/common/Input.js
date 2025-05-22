import React from 'react';

// PUBLIC_INTERFACE
/**
 * Input component for SecureVerify Pro
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Input ID for label association
 * @param {string} props.label - Input label text
 * @param {string} props.name - Input name
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.placeholder] - Input placeholder
 * @param {string} [props.value] - Input value
 * @param {Function} [props.onChange] - Change handler function
 * @param {Function} [props.onBlur] - Blur handler function
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.required=false] - Whether input is required
 * @param {boolean} [props.disabled=false] - Whether input is disabled
 * @param {string} [props.className] - Additional CSS classes for input
 * @param {React.ReactNode} [props.icon] - Optional icon to show with the input
 * @param {string} [props.min] - Minimum value for number/date inputs
 * @param {string} [props.max] - Maximum value for number/date inputs
 */
const Input = ({
  id,
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = '',
  icon = null,
  ...rest
}) => {
  // Prepare the input container class with icon support
  const inputContainerClass = icon ? 'input-with-icon' : '';
  
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span style={{ color: 'var(--error-red)' }}> *</span>}
      </label>
      
      <div className={inputContainerClass} style={{ position: 'relative' }}>
        {icon && (
          <div 
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--medium-gray)'
            }}
          >
            {icon}
          </div>
        )}
        
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`form-input ${className} ${icon ? 'pl-10' : ''}`}
          required={required}
          style={{
            ...(error ? { borderColor: 'var(--error-red)' } : {}),
            ...(icon ? { paddingLeft: '36px' } : {})
          }}
          {...rest}
        />
      </div>
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
