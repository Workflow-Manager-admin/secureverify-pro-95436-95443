import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaIdCard, 
  FaFingerprint, 
  FaCheckCircle,
  FaExclamationTriangle, 
  FaSpinner,
  FaCheck,
  FaHourglassHalf,
  FaLock,
  FaExclamationCircle
} from 'react-icons/fa';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import ProgressBar from '../components/common/ProgressBar';
import { useVerification, VerificationSteps } from '../context/VerificationContext';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
/**
 * Dashboard Page Component
 * Main user dashboard showing verification status and options
 */
const DashboardPage = () => {
  const { user } = useAuth();
  const { verificationState, getVerificationProgress } = useVerification();

  const { currentStep, completedSteps } = verificationState;

  // Helper function to check if a step is completed
  const isStepCompleted = (step) => completedSteps.includes(step);

  // Helper function to get status icon for each verification step
  const getStepStatusIcon = (step) => {
    if (isStepCompleted(step)) {
      return <FaCheck color="var(--success-green)" />;
    } else if (currentStep === step) {
      return <FaSpinner color="var(--primary-blue)" />;
    } else {
      return <FaLock color="var(--dark-gray)" />;
    }
  };

  // Helper function to get the verification status badge
  const getStatusBadge = () => {
    switch (currentStep) {
      case VerificationSteps.UNVERIFIED:
        return (
          <span className="badge badge-warning">
            <FaExclamationTriangle /> Not Started
          </span>
        );
      case VerificationSteps.PERSONAL_INFO:
      case VerificationSteps.DOCUMENT_UPLOAD:
      case VerificationSteps.BIOMETRIC_VERIFICATION:
        return (
          <span className="badge badge-primary">
            <FaSpinner /> In Progress
          </span>
        );
      case VerificationSteps.UNDER_REVIEW:
        return (
          <span className="badge badge-primary">
            <FaHourglassHalf /> Under Review
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
        return null;
    }
  };

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">Dashboard</h1>
        <p className="text-secondary">
          Welcome back, {user?.name || 'User'}
        </p>
      </div>

      {/* Verification Status Summary Card */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Verification Status</h2>
          {getStatusBadge()}
        </div>

        <ProgressBar 
          value={getVerificationProgress()}
          label="Verification Progress" 
          showPercentage 
          className="mb-4" 
        />

        {currentStep === VerificationSteps.UNVERIFIED && (
          <Alert type="info" className="mb-4">
            You haven't started the verification process. Complete verification to unlock all features.
          </Alert>
        )}

        {currentStep === VerificationSteps.UNDER_REVIEW && (
          <Alert type="info" className="mb-4">
            Your verification is being reviewed by our team. This typically takes 24 hours.
          </Alert>
        )}

        {currentStep === VerificationSteps.VERIFIED && (
          <Alert type="success" className="mb-4">
            Your identity has been successfully verified. You have access to all features.
          </Alert>
        )}

        {currentStep === VerificationSteps.REJECTED && (
          <Alert type="error" className="mb-4">
            Your verification was rejected. Please check the verification status page for details.
          </Alert>
        )}

        {(currentStep === VerificationSteps.PERSONAL_INFO || 
          currentStep === VerificationSteps.DOCUMENT_UPLOAD || 
          currentStep === VerificationSteps.BIOMETRIC_VERIFICATION) && (
          <Alert type="warning" className="mb-4">
            Your verification is incomplete. Please continue the process to get verified.
          </Alert>
        )}

        <div className="grid grid-cols-1 grid-cols-sm-3 gap-4">
          {/* Personal Information Status */}
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getStepStatusIcon(VerificationSteps.PERSONAL_INFO)}
              </div>
              <h3>Personal Information</h3>
            </div>
            <p className="mb-4" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Basic details for identity verification
            </p>
            <Link to="/personal-info">
              <Button 
                variant="secondary" 
                isFullWidth
                isDisabled={currentStep === VerificationSteps.VERIFIED || currentStep === VerificationSteps.UNDER_REVIEW}
              >
                <FaUser /> {isStepCompleted(VerificationSteps.PERSONAL_INFO) ? 'View Details' : 'Complete'}
              </Button>
            </Link>
          </Card>

          {/* Document Upload Status */}
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getStepStatusIcon(VerificationSteps.DOCUMENT_UPLOAD)}
              </div>
              <h3>Document Verification</h3>
            </div>
            <p className="mb-4" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Government ID or passport verification
            </p>
            <Link to="/document-upload">
              <Button 
                variant="secondary" 
                isFullWidth 
                isDisabled={
                  !isStepCompleted(VerificationSteps.PERSONAL_INFO) || 
                  currentStep === VerificationSteps.VERIFIED || 
                  currentStep === VerificationSteps.UNDER_REVIEW
                }
              >
                <FaIdCard /> {isStepCompleted(VerificationSteps.DOCUMENT_UPLOAD) ? 'View Details' : 'Complete'}
              </Button>
            </Link>
          </Card>

          {/* Biometric Verification Status */}
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getStepStatusIcon(VerificationSteps.BIOMETRIC_VERIFICATION)}
              </div>
              <h3>Biometric Verification</h3>
            </div>
            <p className="mb-4" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Selfie check to match your document
            </p>
            <Link to="/biometric-verification">
              <Button 
                variant="secondary" 
                isFullWidth
                isDisabled={
                  !isStepCompleted(VerificationSteps.DOCUMENT_UPLOAD) || 
                  currentStep === VerificationSteps.VERIFIED || 
                  currentStep === VerificationSteps.UNDER_REVIEW
                }
              >
                <FaFingerprint /> {isStepCompleted(VerificationSteps.BIOMETRIC_VERIFICATION) ? 'View Details' : 'Complete'}
              </Button>
            </Link>
          </Card>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/verification-status">
            <Button>
              View Full Verification Status
            </Button>
          </Link>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="mb-6">
        <h2 className="section-title mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 grid-cols-sm-3 gap-4">
          <Link to="/profile">
            <Button variant="secondary" isFullWidth>
              <FaUser /> Edit Profile
            </Button>
          </Link>
          
          <Link to="/help">
            <Button variant="secondary" isFullWidth>
              Help & Support
            </Button>
          </Link>
          
          <Link to="/settings">
            <Button variant="secondary" isFullWidth>
              Account Settings
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
