import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { useAuth } from '../context/AuthContext';
import * as Yup from 'yup';

// Validation schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  termsAgreed: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions')
});

// PUBLIC_INTERFACE
/**
 * Register Page Component
 */
const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null);

  // Handle registration form submission
  const handleRegister = async (values, { setSubmitting }) => {
    try {
      setRegistrationError(null);
      await register(values.name, values.email, values.password);
      navigate('/onboarding');
    } catch (error) {
      setRegistrationError('Registration failed. Please try again or use a different email.');
      console.error('Registration failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', paddingTop: '40px' }}>
      <Card>
        <div className="text-center mb-6">
          <h1 className="page-title">Create Account</h1>
          <p className="text-secondary">
            Complete the form below to start your verification journey
          </p>
        </div>

        {registrationError && (
          <Alert type="error" className="mb-4">{registrationError}</Alert>
        )}

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsAgreed: false
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Input
                id="name"
                name="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                required
                icon={<FaUser />}
              />

              <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                required
                icon={<FaEnvelope />}
              />

              <div className="grid grid-cols-1 grid-cols-sm-2 gap-4">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Create password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  required
                  icon={<FaLock />}
                />

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && errors.confirmPassword}
                  required
                  icon={<FaLock />}
                />
              </div>

              <div className="form-group">
                <div className="flex items-start gap-2">
                  <input
                    id="termsAgreed"
                    name="termsAgreed"
                    type="checkbox"
                    checked={values.termsAgreed}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ marginTop: '4px' }}
                  />
                  <label htmlFor="termsAgreed" style={{ lineHeight: '1.5' }}>
                    I agree to the <Link to="/terms" style={{ color: 'var(--primary-blue)' }}>Terms of Service</Link> and{' '}
                    <Link to="/privacy" style={{ color: 'var(--primary-blue)' }}>Privacy Policy</Link>
                  </label>
                </div>
                {touched.termsAgreed && errors.termsAgreed && (
                  <p className="error-message">{errors.termsAgreed}</p>
                )}
              </div>

              <Button
                type="submit"
                isFullWidth
                isLoading={isSubmitting}
                className="mb-4"
                disabled={isSubmitting}
              >
                Create Account <FaCheckCircle />
              </Button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <p>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: '500' }}>
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
