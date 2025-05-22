import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaCheck, 
  FaTimes, 
  FaUser, 
  FaIdCard, 
  FaCamera,
  FaInfoCircle,
  FaArrowLeft 
} from 'react-icons/fa';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Input from '../components/common/Input';
import { useVerification } from '../context/VerificationContext';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
/**
 * Admin Review Page Component
 * For administrative review of user verification submissions
 */
const AdminReviewPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useAuth();
  const { verificationState, approveVerification, rejectVerification } = useVerification();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // In a real app, we would fetch the verification data for the specific userId
  // For this demo, we're using the context data

  if (!user?.role === 'admin') {
    return (
      <div className="container">
        <Alert type="error">
          You don't have permission to access this page.
        </Alert>
      </div>
    );
  }

  const handleApprove = () => {
    setProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      approveVerification(userId);
      setProcessing(false);
      navigate('/admin');
    }, 1000);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      return;
    }
    
    setProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      rejectVerification(userId, rejectionReason);
      setProcessing(false);
      navigate('/admin');
    }, 1000);
  };

  const toggleRejectionForm = () => {
    setShowRejectionForm(!showRejectionForm);
    if (!showRejectionForm) {
      setRejectionReason('');
    }
  };

  return (
    <div className="container">
      <Button 
        variant="secondary" 
        className="mb-4"
        onClick={() => navigate('/admin')}
      >
        <FaArrowLeft /> Back to Admin Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="page-title">Verification Review</h1>
        <p className="text-secondary">
          Reviewing verification submission for {userId}
        </p>
      </div>

      {/* Personal Information */}
      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <FaUser size={24} color="var(--primary-blue)" className="mr-2" />
          <h2 className="section-title">Personal Information</h2>
        </div>

        {verificationState.personalInfo ? (
          <div className="grid grid-cols-1 grid-cols-sm-2 gap-4">
            <div>
              <p className="mb-1"><strong>Full Name:</strong></p>
              <p className="mb-4">{verificationState.personalInfo.firstName} {verificationState.personalInfo.lastName}</p>
              
              <p className="mb-1"><strong>Date of Birth:</strong></p>
              <p className="mb-4">{verificationState.personalInfo.dob}</p>
              
              <p className="mb-1"><strong>Phone:</strong></p>
              <p className="mb-4">{verificationState.personalInfo.phone}</p>
            </div>
            
            <div>
              <p className="mb-1"><strong>Address:</strong></p>
              <p className="mb-4">
                {verificationState.personalInfo.address}, {verificationState.personalInfo.city}, {verificationState.personalInfo.country} {verificationState.personalInfo.postalCode}
              </p>
              
              <p className="mb-1"><strong>ID Number:</strong></p>
              <p className="mb-4">{verificationState.personalInfo.idNumber}</p>
            </div>
          </div>
        ) : (
          <Alert type="warning">No personal information provided.</Alert>
        )}
      </Card>

      {/* Document Information */}
      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <FaIdCard size={24} color="var(--primary-blue)" className="mr-2" />
          <h2 className="section-title">Identity Document</h2>
        </div>

        {verificationState.documents?.selectedType ? (
          <div>
            <p className="mb-1"><strong>Document Type:</strong></p>
            <p className="mb-4">
              {verificationState.documents.selectedType === 'idCard' ? 'National ID Card' :
               verificationState.documents.selectedType === 'passport' ? 'Passport' : 'Driving License'}
            </p>
            
            {verificationState.documents[verificationState.documents.selectedType] && (
              <div>
                {/* In a real app, this would display the document image */}
                <div className="mb-4 p-4 bg-gray-100" style={{ backgroundColor: 'var(--light-gray)', borderRadius: 'var(--border-radius)' }}>
                  <p className="text-center">[Document Image Preview Would Be Shown Here]</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Alert type="warning">No document uploaded.</Alert>
        )}
      </Card>

      {/* Biometric Verification */}
      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <FaCamera size={24} color="var(--primary-blue)" className="mr-2" />
          <h2 className="section-title">Biometric Verification</h2>
        </div>

        {verificationState.biometric?.selfie ? (
          <div>
            {/* In a real app, this would display the selfie image */}
            <div className="mb-4 p-4 bg-gray-100" style={{ backgroundColor: 'var(--light-gray)', borderRadius: 'var(--border-radius)' }}>
              <p className="text-center">[Selfie Image Preview Would Be Shown Here]</p>
            </div>
            
            <div className="flex items-center mb-4">
              <FaInfoCircle className="mr-2" />
              <p>Liveness check: {verificationState.biometric.livenessVerified ? 'Passed' : 'Failed'}</p>
            </div>
          </div>
        ) : (
          <Alert type="warning">No biometric data provided.</Alert>
        )}
      </Card>

      {/* Review Actions */}
      <Card>
        <h2 className="section-title mb-4">Review Decision</h2>
        
        {!showRejectionForm ? (
          <div className="flex gap-4">
            <Button 
              onClick={handleApprove}
              isLoading={processing}
              disabled={processing}
            >
              <FaCheck /> Approve Verification
            </Button>
            <Button 
              variant="secondary" 
              onClick={toggleRejectionForm}
              disabled={processing}
              style={{ color: 'var(--error-red)', borderColor: 'var(--error-red)' }}
            >
              <FaTimes /> Reject Verification
            </Button>
          </div>
        ) : (
          <div>
            <Input
              id="rejectionReason"
              name="rejectionReason"
              label="Reason for Rejection"
              placeholder="Provide a detailed reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
            />
            
            <div className="flex gap-4 mt-4">
              <Button 
                onClick={handleReject}
                isDisabled={!rejectionReason.trim()}
                isLoading={processing}
                style={{ backgroundColor: 'var(--error-red)' }}
              >
                <FaTimes /> Confirm Rejection
              </Button>
              <Button 
                variant="secondary" 
                onClick={toggleRejectionForm}
                disabled={processing}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminReviewPage;
