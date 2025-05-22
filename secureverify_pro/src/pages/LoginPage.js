import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { useAuth } from '../context/AuthContext';
import * as Yup from 'yup';

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

// PUBLIC_INTERFACE
/**
 * Login Page Component
 */
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState(null);

  // Get redirect URL from location state or default to dashboard
  const redirectTo = location.state?.from || '/dashboard';

  // Handle login form submission
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setLoginError(null);
      await login(values.email, values.password);
      navigate(redirectTo);
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', paddingTop: '40px' }}>
      <Card>
        <div className="text-center mb-6">
          <h1 className="page-title">Login</h1>
          <p className="text-secondary">
            Sign in to access your SecureVerify Pro account
          </p>
        </div>

        {loginError && (
          <Alert type="error" className="mb-4">{loginError}</Alert>
        )}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
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

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                required
                icon={<FaLock />}
              />

              <div className="flex justify-between items-center mb-4">
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="remember"
                      style={{ marginRight: '8px' }}
                    />
                    <span>Remember me</span>
                  </label>
                </div>

                <Link to="/forgot-password" className="text-sm" style={{ color: 'var(--primary-blue)' }}>
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                isFullWidth
                isLoading={isSubmitting}
                className="mb-4"
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <p>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary-blue)', fontWeight: '500' }}>
              Create Account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
