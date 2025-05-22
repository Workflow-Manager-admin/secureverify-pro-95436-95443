import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaCheck, FaRedo, FaSyncAlt } from 'react-icons/fa';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import ProgressBar from '../components/common/ProgressBar';
import Loader from '../components/common/Loader';
import { useVerification } from '../context/VerificationContext';
import SelfieCapture from '../components/ekyc/SelfieCapture';

// PUBLIC_INTERFACE
/**
 * Biometric Verification Page Component
 * Third step in the verification process where users take a selfie
 */
const BiometricVerificationPage = () => {
  const navigate = useNavigate();
  const { verificationState, updateBiometric, getVerificationProgress } = useVerification();
  const [selfieImage, setSelfieImage] = useState(null);
  const [isCaptureMode, setIsCaptureMode] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleCapture = (imageSrc) => {
    setSelfieImage(imageSrc);
    setIsCaptureMode(false);
    setError(null);
  };

  const retakePhoto = () => {
    setSelfieImage(null);
    setIsCaptureMode(true);
    setError(null);
  };

  const handleSubmit = () => {
    if (!selfieImage) {
      setError('Please take a selfie photo first');
      return;
    }

    setProcessing(true);

    // Simulating biometric verification process
    setTimeout(() => {
      try {
        // In a real app, the image would be sent to the server and we'd get back a reference
        // Create biometric metadata (excluding the actual image data)
        const biometricData = {
          captureDate: new Date().toISOString()
          // In a real app, this might include face detection confidence score, etc.
        };
        
        // Pass only metadata to context - image is displayed locally only
        updateBiometric(biometricData, true);
        
        navigate('/verification-status');
      } catch (error) {
        console.error('Error processing biometric verification:', error);
        setError('Failed to process verification. Please try again.');
      } finally {
        setProcessing(false);
      }
    }, 2500);
  };

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">Biometric Verification</h1>
        <p className="text-secondary">
          Please take a selfie for identity verification
        </p>
      </div>

      <ProgressBar 
        value={getVerificationProgress()}
        label="Verification Progress" 
        showPercentage 
        className="mb-6" 
      />

      <Card className="mb-6">
        <h2 className="section-title mb-4">Capture Selfie</h2>
        
        <Alert type="info" className="mb-4">
          <div className="flex items-center gap-2">
            <FaCamera />
            <span>
              Position your face in the center of the frame with good lighting. 
              Remove glasses, hats, or anything covering your face.
            </span>
          </div>
        </Alert>

        <div className="flex justify-center mb-4">
          {isCaptureMode ? (
            <SelfieCapture onCapture={handleCapture} />
          ) : (
            <div>
              {selfieImage && (
                <div className="text-center">
                  <div 
                    style={{ 
                      border: '1px solid var(--medium-gray)',
                      borderRadius: 'var(--border-radius)',
                      padding: '8px',
                      marginBottom: '16px',
                      maxWidth: '400px'
                    }}
                  >
                    <img 
                      src={selfieImage} 
                      alt="Captured selfie" 
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 'var(--border-radius)'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {error && <Alert type="error" className="mb-4">{error}</Alert>}

        <div className="flex justify-center gap-4">
          {isCaptureMode ? (
            <div className="text-center">
              <p className="mb-2">Please center your face in the frame and take a photo.</p>
            </div>
          ) : (
            <>
              <Button 
                onClick={retakePhoto} 
                variant="secondary"
                icon={<FaRedo />}
              >
                Retake Photo
              </Button>
              <Button 
                onClick={handleSubmit} 
                isLoading={processing}
                disabled={processing}
                icon={<FaCheck />}
              >
                Use This Photo
              </Button>
            </>
          )}
        </div>
      </Card>

      {processing && (
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            <Loader size="large" />
            <div>
              <h3 className="mb-1">Processing Verification</h3>
              <p>Comparing your selfie with your uploaded document...</p>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <Button 
          variant="secondary" 
          onClick={() => navigate('/document-upload')}
          disabled={processing}
        >
          Back
        </Button>
        
        <Button
          isDisabled={!selfieImage || isCaptureMode || processing}
          onClick={handleSubmit}
          isLoading={processing}
        >
          Complete Verification
        </Button>
      </div>
    </div>
  );
};

export default BiometricVerificationPage;
