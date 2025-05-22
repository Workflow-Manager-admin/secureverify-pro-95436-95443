import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FaUser, FaCalendarAlt, FaPhone, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';
import * as Yup from 'yup';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import ProgressBar from '../components/common/ProgressBar';
import { useVerification } from '../context/VerificationContext';

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
  dob: Yup.date()
    .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'You must be at least 18 years old')
    .required('Date of birth is required'),
  phone: Yup.string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  address: Yup.string()
    .min(10, 'Address is too short')
    .required('Address is required'),
  city: Yup.string()
    .required('City is required'),
  country: Yup.string()
    .required('Country is required'),
  postalCode: Yup.string()
    .required('Postal code is required'),
  idNumber: Yup.string()
    .required('National ID number is required')
});

// PUBLIC_INTERFACE
/**
 * Personal Information Page Component
 * First step in the verification process where users enter their personal details
 */
const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const { verificationState, updatePersonalInfo, getVerificationProgress } = useVerification();
  
  // Pre-fill the form if data already exists
  const initialValues = verificationState.personalInfo || {
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    idNumber: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      updatePersonalInfo(values);
      navigate('/document-upload');
    } catch (error) {
      console.error('Error saving personal info:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">Personal Information</h1>
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

        <Formik
          initialValues={initialValues}
          validationSchema={PersonalInfoSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
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
                />
              </div>

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
                />
              </div>

              <Input
                id="address"
                name="address"
                label="Address"
                placeholder="Enter your street address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && errors.address}
                required
                icon={<FaMapMarkerAlt />}
              />

              <div className="grid grid-cols-1 grid-cols-sm-3 gap-4">
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
                />
                
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
                />
              </div>

              <Input
                id="idNumber"
                name="idNumber"
                label="National ID Number"
                placeholder="Enter your national ID number"
                value={values.idNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.idNumber && errors.idNumber}
                required
                icon={<FaIdCard />}
              />

              <div className="flex justify-between mt-6">
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/onboarding')}
                >
                  Back
                </Button>
                
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Continue to Document Upload
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
