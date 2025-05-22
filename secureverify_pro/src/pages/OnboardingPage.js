import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaIdCard, FaCamera, FaUserShield } from 'react-icons/fa';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
/**
 * Onboarding Page Component
 * Introduces new users to the verification process
 */
const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleStartVerification = () => {
    navigate('/personal-info');
  };

  return (
    <div className="container">
      <div className="text-center mb-6">
        <h1 className="page-title">Welcome to SecureVerify Pro</h1>
        <p className="text-secondary">
          {user?.name ? `Hello ${user.name}, let's` : "Let's"} get you verified in just a few steps
        </p>
      </div>

      <Card className="mb-6">
        <h2 className="section-title">Verification Process Overview</h2>
        <p className="mb-6">
          Our secure verification process helps establish your identity and protect your 
          account. Here's what you'll need to complete:
        </p>

        <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-3 gap-6">
          <div className="text-center">
            <div className="mb-4" style={{ color: 'var(--primary-blue)' }}>
              <FaUserShield size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3 className="mb-2">Personal Information</h3>
            <p>
              Basic details for identity verification
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4" style={{ color: 'var(--primary-blue)' }}>
              <FaIdCard size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3 className="mb-2">Document Upload</h3>
            <p>
              Government ID or passport verification
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4" style={{ color: 'var(--primary-blue)' }}>
              <FaCamera size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3 className="mb-2">Biometric Verification</h3>
            <p>
              Selfie check to match your document
            </p>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="section-title mb-4">What You'll Need</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
          <li className="mb-2">A valid government-issued photo ID (passport, driver's license, or national ID)</li>
          <li className="mb-2">Access to a camera for taking a selfie photo</li>
          <li className="mb-2">Approximately 5-10 minutes to complete the process</li>
          <li className="mb-2">An internet connection throughout the verification process</li>
        </ul>

        <div className="alert alert-info">
          <strong>Privacy Note:</strong> All your information is encrypted and securely stored. 
          We follow strict data protection guidelines to protect your privacy.
        </div>
      </Card>

      <div className="flex justify-center mb-6">
        <Button isLarge onClick={handleStartVerification}>
          Start Verification Process <FaArrowRight />
        </Button>
      </div>

      <Card className="mb-6">
        <h3 className="section-title mb-4">Frequently Asked Questions</h3>
        
        <div className="mb-4">
          <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>How long does verification take?</h4>
          <p>The verification process typically takes 5-10 minutes to complete, and review is usually completed within 24 hours.</p>
        </div>
        
        <div className="mb-4">
          <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Is my data secure?</h4>
          <p>Yes, all data is encrypted and securely stored. We comply with GDPR, CCPA, and other data protection regulations.</p>
        </div>
        
        <div className="mb-4">
          <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>What happens after verification?</h4>
          <p>Once verified, you'll have full access to all platform features and can manage your verification status from your dashboard.</p>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingPage;
