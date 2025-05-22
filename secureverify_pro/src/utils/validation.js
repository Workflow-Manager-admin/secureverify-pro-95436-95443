// PUBLIC_INTERFACE
/**
 * Validates an email address
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export const isEmailValid = (email) => {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// PUBLIC_INTERFACE
/**
 * Validates a password meets minimum requirements
 * @param {string} password - Password to validate
 * @returns {boolean} True if password is valid
 */
export const isPasswordValid = (password) => {
  // Minimum 8 characters with at least one letter and one number
  return password && password.length >= 8 && 
         /[a-zA-Z]/.test(password) && 
         /[0-9]/.test(password);
};

// PUBLIC_INTERFACE
/**
 * Validates a full name
 * @param {string} name - Name to validate
 * @returns {boolean} True if name is valid
 */
export const isNameValid = (name) => {
  // Name must be at least 2 characters
  return name && name.trim().length >= 2;
};

// PUBLIC_INTERFACE
/**
 * Validates a date of birth (must be at least 18 years ago)
 * @param {string} dob - Date of birth string (YYYY-MM-DD)
 * @returns {boolean} True if date is valid and user is at least 18
 */
export const isDobValid = (dob) => {
  if (!dob) return false;
  
  const dobDate = new Date(dob);
  const today = new Date();
  
  // Check if date is valid
  if (isNaN(dobDate.getTime())) return false;
  
  // Calculate age
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
  
  return age >= 18;
};

// PUBLIC_INTERFACE
/**
 * Validates a phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const isPhoneValid = (phone) => {
  // Basic phone validation - allows various formats
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

// PUBLIC_INTERFACE
/**
 * Validates an address
 * @param {string} address - Address to validate
 * @returns {boolean} True if address is valid
 */
export const isAddressValid = (address) => {
  // Simple validation - address must be at least 10 characters
  return address && address.trim().length >= 10;
};

// PUBLIC_INTERFACE
/**
 * Validates a document image file
 * @param {File} file - Document image file
 * @returns {boolean} True if file is valid
 */
export const isDocumentFileValid = (file) => {
  if (!file) return false;
  
  // Check file type - accept common image types
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic', 'application/pdf'];
  const isValidType = validTypes.includes(file.type);
  
  // Check file size - max 10MB
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  const isValidSize = file.size <= maxSize;
  
  return isValidType && isValidSize;
};

// PUBLIC_INTERFACE
/**
 * Gets error message for document file validation
 * @param {File} file - Document image file
 * @returns {string|null} Error message or null if valid
 */
export const getDocumentFileError = (file) => {
  if (!file) return 'No file selected';
  
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic', 'application/pdf'];
  if (!validTypes.includes(file.type)) {
    return 'Invalid file type. Please upload JPG, PNG, HEIC or PDF files.';
  }
  
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return 'File is too large. Maximum size is 10MB.';
  }
  
  return null;
};

// PUBLIC_INTERFACE
/**
 * Custom form validator that returns error messages for each field
 * @param {Object} values - Form values object
 * @param {Array} requiredFields - List of required field names
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const validateForm = (values, requiredFields = []) => {
  const errors = {};
  
  // Check required fields
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
    }
  });
  
  // Specific field validations
  if (values.email && !isEmailValid(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (values.password && !isPasswordValid(values.password)) {
    errors.password = 'Password must be at least 8 characters with letters and numbers';
  }
  
  if (values.confirmPassword && values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (values.name && !isNameValid(values.name)) {
    errors.name = 'Please enter a valid name';
  }
  
  if (values.dob && !isDobValid(values.dob)) {
    errors.dob = 'You must be at least 18 years old';
  }
  
  if (values.phone && !isPhoneValid(values.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (values.address && !isAddressValid(values.address)) {
    errors.address = 'Please enter a complete address';
  }
  
  return errors;
};
