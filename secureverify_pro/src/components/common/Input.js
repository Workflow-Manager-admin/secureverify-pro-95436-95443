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
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span style={{ color: 'var(--error-red)' }}> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`form-input ${className}`}
        required={required}
        style={error ? { borderColor: 'var(--error-red)' } : {}}
        {...rest}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
