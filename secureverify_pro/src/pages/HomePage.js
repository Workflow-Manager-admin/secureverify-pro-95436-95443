import React from 'react';
import { Link } from 'react-router-dom';
import { FaIdCard, FaFingerprint, FaShieldAlt, FaUserCheck } from 'react-icons/fa';
import Card from '../components/common/Card';

// PUBLIC_INTERFACE
/**
 * Home Page Component - Landing page for SecureVerify Pro
 */
const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundColor: 'var(--primary-blue)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
            SecureVerify Pro
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 30px' }}>
            A comprehensive electronic Know Your Customer (eKYC) solution designed for 
            professional-grade identity verification and onboarding processes.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn btn-large" style={{
              backgroundColor: 'white',
              color: 'var(--primary-blue)'
            }}>
              Get Started
            </Link>
            <Link to="/login" className="btn btn-large btn-secondary" style={{
              backgroundColor: 'transparent',
              color: 'white',
              borderColor: 'white'
            }}>
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
            Key Verification Features
          </h2>
          <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-3 gap-6">
            <Card hoverable className="text-center">
              <div className="mb-4" style={{ color: 'var(--primary-blue)' }}>
                <FaIdCard size={48} style={{ margin: '0 auto' }} />
              </div>
              <h3 className="mb-2">Document Verification</h3>
              <p>
                Easily upload and verify government-issued IDs, passports, and driver's licenses
                with advanced fraud detection.
              </p>
            </Card>

            <Card hoverable className="text-center">
              <div className="mb-4" style={{ color: 'var(--primary-blue)' }}>
                <FaFingerprint size={48} style={{ margin: '0 auto' }} />
              </div>
              <h3 className="mb-2">Biometric Authentication</h3>
              <p>
                Secure facial recognition and liveness detection to verify that documents
                match the actual user.
              </p>
            </Card>

            <Card hoverable className="text-center">
              <div className="mb-4" style={{ color: 'var(--primary-blue)' }}>
                <FaShieldAlt size={48} style={{ margin: '0 auto' }} />
              </div>
              <h3 className="mb-2">Secure Workflow</h3>
              <p>
                End-to-end encrypted verification process with comprehensive
                audit trails and compliance features.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ backgroundColor: 'var(--light-blue)', padding: '40px 0' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
            How It Works
          </h2>
          
          <div className="flex flex-col gap-6">
            <div className="card">
              <div className="flex items-center gap-4">
                <div style={{ 
                  backgroundColor: 'var(--primary-blue)', 
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}>
                  1
                </div>
                <div>
                  <h3 className="mb-1">Register & Create Profile</h3>
                  <p>Create your account and complete your personal information</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div style={{ 
                  backgroundColor: 'var(--primary-blue)', 
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}>
                  2
                </div>
                <div>
                  <h3 className="mb-1">Upload Identity Documents</h3>
                  <p>Securely upload government-issued ID documents for verification</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div style={{ 
                  backgroundColor: 'var(--primary-blue)', 
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}>
                  3
                </div>
                <div>
                  <h3 className="mb-1">Complete Biometric Verification</h3>
                  <p>Take a selfie for facial matching and liveness detection</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div style={{ 
                  backgroundColor: 'var(--success-green)', 
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}>
                  <FaUserCheck />
                </div>
                <div>
                  <h3 className="mb-1">Get Verified</h3>
                  <p>Once approved, your identity is verified and you're ready to go</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/register" className="btn btn-large">Start Verification Process</Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title mb-4">Ready to get verified?</h2>
            <p className="mb-4">
              Join thousands of individuals and businesses who trust SecureVerify Pro
              for their identity verification needs.
            </p>
            <Link to="/register" className="btn btn-large">Create Account</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
