import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaSpinner, 
  FaUserCheck, 
  FaHourglassHalf,
  FaInfoCircle,
  FaExclamationCircle,
  FaRedo
} from 'react-icons/fa';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import ProgressBar from '../components/common/ProgressBar';
import { useVerification, VerificationSteps } from '../context/VerificationContext';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
/**
 * Verification Status Page Component
 * Shows the current status of the user's verification process
 */
const VerificationStatusPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { verificationState, resetVerification } = useVerification();
  const [timeRemaining, setTimeRemaining] = useState(null);
  
  const { 
    currentStep, 
    completedSteps, 
    submissionDate, 
    verificationId, 
    rejectionReason 
  } = verificationState;

  // For demo purposes, simulate a countdown for review time
  useEffect(() => {
    if (currentStep === VerificationSteps.UNDER_REVIEW) {
      // Set initial time to 24 hours from submission
      const submissionTime = submissionDate ? new Date(submissionDate).getTime() : Date.now();
      const reviewDeadline = submissionTime + 24 * 60 * 60 * 1000; // 24 hours
      
      const timer = setInterval(() => {
        const now = Date.now();
        const remaining = reviewDeadline - now;
        
        if (remaining <= 0) {
          clearInterval(timer);
          setTimeRemaining(null);
        } else {
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          setTimeRemaining(`${hours}h ${minutes}m`);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [currentStep, submissionDate]);

  const handleRetryVerification = () => {
    resetVerification();
    navigate('/personal-info');
  };

  // Determine status badge based on current step
  const getStatusBadge = () => {
    switch (currentStep) {
      case VerificationSteps.UNVERIFIED:
        return (
          <span className="badge badge-warning">
            <FaExclamationTriangle /> Not Started
          </span>
        );
      case VerificationSteps.UNDER_REVIEW:
        return (
          <span className="badge badge-primary">
            <FaSpinner /> Under Review
          </span>
        );
      case VerificationSteps.VERIFIED:
        return (
          <span className="badge badge-success">
            <FaCheckCircle /> Verified
          </span>
        );
      case VerificationSteps.REJECTED:
        return (
          <span className="badge badge-error">
            <FaExclamationCircle /> Rejected
          </span>
        );
      default:
        return (
          <span className="badge badge-primary">
            <FaSpinner /> In Progress
          </span>
        );
    }
  };

  const renderStatusContent = () => {
    switch (currentStep) {
      case VerificationSteps.UNVERIFIED:
        return (
          <div className="text-center">
            <FaExclamationTriangle size={48} color="var(--warning-yellow)" className="mb-4" />
            <h2 className="section-title mb-2">Verification Not Started</h2>
            <p className="mb-6">You have not started the verification process yet.</p>
            <Button
              onClick={() => navigate('/onboarding')}
            >
              Start Verification
            </Button>
          </div>
        );
        
      case VerificationSteps.UNDER_REVIEW:
        return (
          <>
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <FaHourglassHalf size={40} color="var(--primary-blue)" />
              </div>
              <div>
                <h2 className="section-title">Verification Under Review</h2>
                <p>
                  We've received your verification submission and it's currently being reviewed by our team.
                </p>
              </div>
            </div>
            
            <Alert type="info" className="mb-4">
              <div className="flex items-center gap-2">
                <FaInfoCircle />
                <span>
                  Estimated time remaining: {timeRemaining || "Less than 24 hours"}
                </span>
              </div>
            </Alert>
            
            <div className="card mb-4">
              <h3 className="mb-2">Submission Details</h3>
              <p><strong>Submission Date:</strong> {new Date(submissionDate).toLocaleString()}</p>
              <p><strong>Verification ID:</strong> {verificationId}</p>
            </div>
            
            <p>
              You'll receive a notification once the verification is complete. You can check this page
              anytime to see the status of your verification.
            </p>
          </>
        );
        
      case VerificationSteps.VERIFIED:
        return (
          <>
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <FaUserCheck size={40} color="var(--success-green)" />
              </div>
              <div>
                <h2 className="section-title">Verification Complete</h2>
                <p>
                  Your identity has been successfully verified. You now have full access to all features.
                </p>
              </div>
            </div>
            
            <Alert type="success" className="mb-4">
              <div className="flex items-center gap-2">
                <FaCheckCircle />
                <span>
                  Congratulations! Your account is verified and active.
                </span>
              </div>
            </Alert>
            
            <div className="card mb-4">
              <h3 className="mb-2">Verification Details</h3>
              <p><strong>Verification ID:</strong> {verificationId}</p>
              <p><strong>Verification Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Status:</strong> Approved</p>
            </div>
            
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </>
        );
        
      case VerificationSteps.REJECTED:
        return (
          <>
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <FaExclamationCircle size={40} color="var(--error-red)" />
              </div>
              <div>
                <h2 className="section-title">Verification Rejected</h2>
                <p>
                  Unfortunately, your verification could not be completed. Please see the details below.
                </p>
              </div>
            </div>
            
            <Alert type="error" className="mb-4">
              <strong>Reason for rejection:</strong> {rejectionReason || "Information or documents provided did not meet our verification requirements."}
            </Alert>
            
            <div className="card mb-4">
              <h3 className="mb-2">Common Issues</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Document is not clearly visible or has glare</li>
                <li>Information doesn't match the personal details provided</li>
                <li>Document is expired or invalid</li>
                <li>Selfie does not match the photo on the ID</li>
                <li>Required information is missing or incomplete</li>
              </ul>
            </div>
            
            <div className="flex justify-center">
              <Button onClick={handleRetryVerification}>
                <FaRedo /> Retry Verification Process
              </Button>
            </div>
          </>
        );
        
      default:
        // For steps in progress
        return (
          <div className="text-center">
            <FaSpinner size={48} color="var(--primary-blue)" className="mb-4" />
            <h2 className="section-title mb-2">Verification In Progress</h2>
            <p className="mb-6">You have a verification process in progress.</p>
            <Button
              onClick={() => {
                const nextRoute = completedSteps.length === 0 
                  ? '/personal-info' 
                  : completedSteps.length === 1 
                    ? '/document-upload'
                    : '/biometric-verification';
                navigate(nextRoute);
              }}
            >
              Continue Verification
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">Verification Status</h1>
        <div className="flex items-center gap-2">
          <p className="text-secondary">Status:</p>
          {getStatusBadge()}
        </div>
      </div>

      <ProgressBar 
        value={
          currentStep === VerificationSteps.VERIFIED 
            ? 100
            : currentStep === VerificationSteps.UNDER_REVIEW
              ? 90
              : completedSteps.length * 25
        }
        label="Overall Progress" 
        showPercentage 
        className="mb-6" 
      />

      <Card>
        {renderStatusContent()}
      </Card>
    </div>
  );
};

export default VerificationStatusPage;
