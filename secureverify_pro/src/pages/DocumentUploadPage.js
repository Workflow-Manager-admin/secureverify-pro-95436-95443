import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaIdCard, FaPassport, FaAddressCard, FaUpload, FaExclamationTriangle } from 'react-icons/fa';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import ProgressBar from '../components/common/ProgressBar';
import { useVerification } from '../context/VerificationContext';
import { getDocumentFileError } from '../utils/validation';
import DocumentUpload from '../components/ekyc/DocumentUpload';

// PUBLIC_INTERFACE
/**
 * Document Upload Page Component
 * Second step in the verification process where users upload identity documents
 */
const DocumentUploadPage = () => {
  const navigate = useNavigate();
  const { verificationState, updateDocuments, getVerificationProgress } = useVerification();
  const [selectedDocType, setSelectedDocType] = useState(verificationState.documents?.selectedType || null);
  const [documentFile, setDocumentFile] = useState(null);
  const [error, setError] = useState(null);

  const documentTypes = [
    {
      id: 'idCard',
      name: 'National ID Card',
      icon: <FaIdCard size={24} />,
      description: 'Government issued national identity card (both sides)'
    },
    {
      id: 'passport',
      name: 'Passport',
      icon: <FaPassport size={24} />,
      description: 'Valid international passport information page'
    },
    {
      id: 'drivingLicense',
      name: 'Driving License',
      icon: <FaAddressCard size={24} />,
      description: 'Government issued driving license (both sides)'
    }
  ];

  const handleDocTypeSelect = (docType) => {
    setSelectedDocType(docType);
    setDocumentFile(null);
    setError(null);
  };

  const handleFileChange = (file) => {
    const fileError = getDocumentFileError(file);
    
    if (fileError) {
      setError(fileError);
      setDocumentFile(null);
      return;
    }
    
    setDocumentFile(file);
    setError(null);
  };

  const handleSubmit = () => {
    if (!selectedDocType || !documentFile) {
      setError('Please select a document type and upload a valid document');
      return;
    }

    try {
      // Use FileReader to get base64 data (in real app, this would be sent to server)
      const reader = new FileReader();
      reader.onload = (e) => {
        const documentData = {
          file: e.target.result,
          name: documentFile.name,
          type: documentFile.type,
          size: documentFile.size,
          uploadDate: new Date().toISOString()
        };

        updateDocuments(selectedDocType, documentData);
        navigate('/biometric-verification');
      };
      reader.readAsDataURL(documentFile);
    } catch (error) {
      console.error('Error processing document:', error);
      setError('Failed to process document. Please try again.');
    }
  };

  const canContinue = selectedDocType && documentFile && !error;

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">Document Upload</h1>
        <p className="text-secondary">
          Please upload a valid identification document
        </p>
      </div>

      <ProgressBar 
        value={getVerificationProgress()}
        label="Verification Progress" 
        showPercentage 
        className="mb-6" 
      />

      <Card className="mb-6">
        <h2 className="section-title mb-4">Select Document Type</h2>
        
        <div className="grid grid-cols-1 grid-cols-sm-3 gap-4">
          {documentTypes.map((docType) => (
            <div
              key={docType.id}
              className={`card ${selectedDocType === docType.id ? 'selected' : ''}`}
              style={{
                cursor: 'pointer',
                border: selectedDocType === docType.id ? '2px solid var(--primary-blue)' : '1px solid var(--medium-gray)',
                backgroundColor: selectedDocType === docType.id ? 'var(--light-blue)' : 'var(--white)'
              }}
              onClick={() => handleDocTypeSelect(docType.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>
                  {docType.icon}
                </div>
                <h3 className="mb-2">{docType.name}</h3>
                <p style={{ fontSize: '0.875rem' }}>{docType.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {selectedDocType && (
        <Card className="mb-6">
          <h2 className="section-title mb-4">Upload Document</h2>
          
          <Alert type="info" className="mb-4">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle />
              <span>
                Make sure your document is clearly visible, all details are legible, and there's no glare. 
                Supported formats: JPG, PNG, PDF. Maximum size: 10MB.
              </span>
            </div>
          </Alert>
          
          <DocumentUpload
            onFileChange={handleFileChange}
            error={error}
            acceptedFileTypes={['image/jpeg', 'image/png', 'application/pdf']}
            maxFileSizeMB={10}
          />
        </Card>
      )}

      <div className="flex justify-between">
        <Button 
          variant="secondary" 
          onClick={() => navigate('/personal-info')}
        >
          Back
        </Button>
        
        <Button
          isDisabled={!canContinue}
          onClick={handleSubmit}
        >
          Continue to Biometric Verification
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadPage;
