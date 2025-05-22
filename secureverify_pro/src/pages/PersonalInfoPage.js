import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FaUser, FaCalendarAlt, FaPhone, FaMapMarkerAlt, FaIdCard, FaEnvelope, FaGlobeAmericas } from 'react-icons/fa';
import * as Yup from 'yup';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import ProgressBar from '../components/common/ProgressBar';
import Loader from '../components/common/Loader';
import { useVerification } from '../context/VerificationContext';
import { isPhoneValid, isDobValid, isAddressValid } from '../utils/validation';

// Validation schema for personal information
const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name is too short')
    .max(50, 'First name is too long')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name is too short')
    .max(50, 'Last name is too long')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  dob: Yup.date()
    .test('dob', 'You must be at least 18 years old', value => isDobValid(value))
    .required('Date of birth is required'),
  phone: Yup.string()
    .test('phone', 'Phone number is not valid', value => isPhoneValid(value))
    .required('Phone number is required'),
  address: Yup.string()
    .test('address', 'Address is too short', value => isAddressValid(value))
    .required('Address is required'),
  city: Yup.string()
    .min(2, 'City name is too short')
    .required('City is required'),
  state: Yup.string()
    .min(2, 'State name is too short')
    .required('State/Province is required'),
  country: Yup.string()
    .required('Country is required'),
  postalCode: Yup.string()
    .matches(/^[0-9a-zA-Z\s-]{3,10}$/, 'Invalid postal code format')
    .required('Postal code is required'),
  idNumber: Yup.string()
    .min(5, 'ID number is too short')
    .required('National ID number is required'),
  idType: Yup.string()
    .oneOf(['nationalId', 'passport', 'drivingLicense'], 'Please select a valid ID type')
    .required('ID type is required')
});

// PUBLIC_INTERFACE
/**
 * Personal Information Page Component
 * First step in the verification process where users enter their personal details
 */
const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const { verificationState, updatePersonalInfo, getVerificationProgress } = useVerification();
  const [submitError, setSubmitError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
  // Pre-fill the form if data already exists
  const initialValues = verificationState.personalInfo || {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    idNumber: '',
    idType: 'nationalId'
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitError(null);
    
    try {
      // Simulate API call delay
      setTimeout(() => {
        try {
          updatePersonalInfo(values);
          setSubmissionSuccess(true);
          
          // Navigate after a slight delay to show success state
          setTimeout(() => {
            navigate('/document-upload');
          }, 500);
        } catch (error) {
          console.error('Error saving personal info:', error);
          setSubmitError('Failed to save your information. Please try again.');
        } finally {
          setSubmitting(false);
        }
      }, 1000);
    } catch (error) {
      console.error('Error in form submission:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  const idTypeOptions = [
    { value: 'nationalId', label: 'National ID' },
    { value: 'passport', label: 'Passport' },
    { value: 'drivingLicense', label: 'Driving License' }
  ];

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">Identity Details</h1>
        <p className="text-secondary">
          Please provide your personal details for verification
        </p>
      </div>

      <ProgressBar 
        value={getVerificationProgress()} 
        label="Verification Progress" 
        showPercentage 
        className="mb-6" 
      />

      <Card>
        <Alert type="info" className="mb-4">
          Please ensure all information matches your identification documents exactly.
        </Alert>

        {submitError && (
          <Alert type="error" className="mb-4">
            {submitError}
          </Alert>
        )}

        {submissionSuccess && (
          <Alert type="success" className="mb-4">
            Information saved successfully!
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={PersonalInfoSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-1 grid-cols-sm-2 gap-4">
                <Input
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && errors.firstName}
                  required
                  icon={<FaUser />}
                  disabled={isSubmitting}
                />
                
                <Input
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && errors.lastName}
                  required
                  icon={<FaUser />}
                  disabled={isSubmitting}
                />
              </div>

              <Input
                id="email"
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                required
                icon={<FaEnvelope />}
                disabled={isSubmitting}
              />

              <div className="grid grid-cols-1 grid-cols-sm-2 gap-4">
                <Input
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dob && errors.dob}
                  required
                  icon={<FaCalendarAlt />}
                  disabled={isSubmitting}
                  max={new Date(Date.now() - (18 * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
                />
                
                <Input
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && errors.phone}
                  required
                  icon={<FaPhone />}
                  disabled={isSubmitting}
                />
              </div>

              <Input
                id="address"
                name="address"
                label="Street Address"
                placeholder="Enter your street address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && errors.address}
                required
                icon={<FaMapMarkerAlt />}
                disabled={isSubmitting}
              />

              <div className="grid grid-cols-1 grid-cols-sm-2 gap-4">
                <Input
                  id="city"
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && errors.city}
                  required
                  disabled={isSubmitting}
                />
                
                <Input
                  id="state"
                  name="state"
                  label="State/Province"
                  placeholder="Enter your state or province"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state && errors.state}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 grid-cols-sm-2 gap-4">
                <Input
                  id="country"
                  name="country"
                  label="Country"
                  placeholder="Enter your country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country && errors.country}
                  required
                  icon={<FaGlobeAmericas />}
                  disabled={isSubmitting}
                />
                
                <Input
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Enter your postal code"
                  value={values.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.postalCode && errors.postalCode}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="idType" className="form-label">
                  ID Type <span style={{ color: 'var(--error-red)' }}>*</span>
                </label>
                <select
                  id="idType"
                  name="idType"
                  value={values.idType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.idType && errors.idType ? 'error' : ''}`}
                  required
                  disabled={isSubmitting}
                  style={touched.idType && errors.idType ? { borderColor: 'var(--error-red)' } : {}}
                >
                  {idTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {touched.idType && errors.idType && (
                  <p className="error-message">{errors.idType}</p>
                )}
              </div>

              <Input
                id="idNumber"
                name="idNumber"
                label={`${values.idType === 'nationalId' ? 'National ID' : values.idType === 'passport' ? 'Passport' : 'Driving License'} Number`}
                placeholder={`Enter your ${values.idType === 'nationalId' ? 'national ID' : values.idType === 'passport' ? 'passport' : 'driving license'} number`}
                value={values.idNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.idNumber && errors.idNumber}
                required
                icon={<FaIdCard />}
                disabled={isSubmitting}
              />

              <div className="flex justify-between mt-6">
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/onboarding')}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size="small" /> Saving...
                    </>
                  ) : 'Continue to Document Upload'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default PersonalInfoPage;
