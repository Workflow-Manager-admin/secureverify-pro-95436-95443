import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// VerificationContext for managing eKYC verification state
const VerificationContext = createContext();

// Verification steps enum
export const VerificationSteps = {
  UNVERIFIED: 'unverified',
  PERSONAL_INFO: 'personal_info',
  DOCUMENT_UPLOAD: 'document_upload',
  BIOMETRIC_VERIFICATION: 'biometric_verification',
  UNDER_REVIEW: 'under_review',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};

// PUBLIC_INTERFACE
/**
 * Provider component for verification state
 * Manages the eKYC verification process state
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const VerificationProvider = ({ children }) => {
  const { user } = useAuth();
  
  // State for verification process
  const [verificationState, setVerificationState] = useState({
    currentStep: VerificationSteps.UNVERIFIED,
    personalInfo: null,
    documents: {
      idCard: null,
      passport: null,
      drivingLicense: null,
      selectedType: null
    },
    biometric: {
      selfie: null,
      livenessVerified: false
    },
    reviewStatus: null,
    verificationId: null,
    completedSteps: [],
    submissionDate: null,
    rejectionReason: null,
    lastUpdated: null
  });

  // Load verification state from localStorage if available
  useEffect(() => {
    if (user) {
      const savedState = localStorage.getItem(`verification_state_${user.id}`);
      if (savedState) {
        try {
          setVerificationState(JSON.parse(savedState));
        } catch (error) {
          console.error('Error parsing saved verification state', error);
        }
      }
    }
  }, [user]);

  // Save verification state to localStorage on change
  useEffect(() => {
    if (user && verificationState.currentStep !== VerificationSteps.UNVERIFIED) {
      localStorage.setItem(
        `verification_state_${user.id}`, 
        JSON.stringify(verificationState)
      );
    }
  }, [user, verificationState]);

  // Update personal information
  const updatePersonalInfo = (info) => {
    setVerificationState(prevState => {
      const completedSteps = prevState.completedSteps.includes(VerificationSteps.PERSONAL_INFO) 
        ? prevState.completedSteps 
        : [...prevState.completedSteps, VerificationSteps.PERSONAL_INFO];
      
      // Create a clean copy of the information to store
      const personalInfo = {
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        dob: info.dob,
        phone: info.phone,
        address: info.address,
        city: info.city,
        state: info.state,
        country: info.country,
        postalCode: info.postalCode,
        idType: info.idType,
        idNumber: info.idNumber,
        submittedAt: new Date().toISOString()
      };
      
      return {
        ...prevState,
        personalInfo,
        completedSteps,
        currentStep: VerificationSteps.DOCUMENT_UPLOAD,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  // Update document information
  const updateDocuments = (docType, document) => {
    setVerificationState(prevState => {
      const completedSteps = prevState.completedSteps.includes(VerificationSteps.DOCUMENT_UPLOAD) 
        ? prevState.completedSteps 
        : [...prevState.completedSteps, VerificationSteps.DOCUMENT_UPLOAD];
      
      // Extract only metadata to store in localStorage, not the actual file data
      const documentMetadata = {
        name: document.name,
        type: document.type,
        size: document.size,
        uploadDate: document.uploadDate,
        // Add a unique identifier if we need to reference this later
        documentId: `doc_${Date.now()}`
      };
      
      return {
        ...prevState,
        documents: {
          ...prevState.documents,
          [docType]: documentMetadata,
          selectedType: docType
        },
        completedSteps,
        currentStep: VerificationSteps.BIOMETRIC_VERIFICATION,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  // Update biometric information
  const updateBiometric = (biometricData, livenessVerified = true) => {
    setVerificationState(prevState => {
      const completedSteps = prevState.completedSteps.includes(VerificationSteps.BIOMETRIC_VERIFICATION) 
        ? prevState.completedSteps 
        : [...prevState.completedSteps, VerificationSteps.BIOMETRIC_VERIFICATION];
      
      // Extract only metadata to store in localStorage, not the actual selfie image
      const biometricMetadata = {
        captureDate: biometricData.captureDate,
        // Add a unique identifier if we need to reference this later
        selfieId: `selfie_${Date.now()}`
      };
      
      return {
        ...prevState,
        biometric: {
          selfieMetadata: biometricMetadata,
          livenessVerified
        },
        completedSteps,
        currentStep: VerificationSteps.UNDER_REVIEW,
        submissionDate: new Date().toISOString(),
        verificationId: `VID${Date.now()}`,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  // Reset verification state
  const resetVerification = () => {
    setVerificationState({
      currentStep: VerificationSteps.UNVERIFIED,
      personalInfo: null,
      documents: {
        idCard: null,
        passport: null,
        drivingLicense: null,
        selectedType: null
      },
      biometric: {
        selfie: null,
        livenessVerified: false
      },
      reviewStatus: null,
      verificationId: null,
      completedSteps: [],
      submissionDate: null,
      rejectionReason: null,
      lastUpdated: null
    });
    
    if (user) {
      localStorage.removeItem(`verification_state_${user.id}`);
    }
  };

  // For admin to approve verification
  const approveVerification = (userId) => {
    if (user?.role === 'admin') {
      setVerificationState(prevState => ({
        ...prevState,
        currentStep: VerificationSteps.VERIFIED,
        reviewStatus: 'approved',
        lastUpdated: new Date().toISOString()
      }));
    }
  };

  // For admin to reject verification
  const rejectVerification = (userId, reason) => {
    if (user?.role === 'admin') {
      setVerificationState(prevState => ({
        ...prevState,
        currentStep: VerificationSteps.REJECTED,
        reviewStatus: 'rejected',
        rejectionReason: reason,
        lastUpdated: new Date().toISOString()
      }));
    }
  };

  // Check if a step is completed
  const isStepCompleted = (step) => {
    return verificationState.completedSteps.includes(step);
  };

  // Get next step in the verification process
  const getNextStep = () => {
    const { currentStep } = verificationState;
    
    switch (currentStep) {
      case VerificationSteps.UNVERIFIED:
        return VerificationSteps.PERSONAL_INFO;
      case VerificationSteps.PERSONAL_INFO:
        return VerificationSteps.DOCUMENT_UPLOAD;
      case VerificationSteps.DOCUMENT_UPLOAD:
        return VerificationSteps.BIOMETRIC_VERIFICATION;
      case VerificationSteps.BIOMETRIC_VERIFICATION:
        return VerificationSteps.UNDER_REVIEW;
      case VerificationSteps.UNDER_REVIEW:
        return null; // Waiting for review
      case VerificationSteps.VERIFIED:
        return null; // Verification complete
      case VerificationSteps.REJECTED:
        return VerificationSteps.PERSONAL_INFO; // Start over
      default:
        return VerificationSteps.UNVERIFIED;
    }
  };

  // Calculate verification progress percentage
  const getVerificationProgress = () => {
    const { completedSteps } = verificationState;
    const totalSteps = 3; // Personal info, document upload, biometric verification
    
    if (verificationState.currentStep === VerificationSteps.VERIFIED) {
      return 100;
    }
    
    return Math.round((completedSteps.length / totalSteps) * 100);
  };

  const value = {
    verificationState,
    updatePersonalInfo,
    updateDocuments,
    updateBiometric,
    resetVerification,
    approveVerification,
    rejectVerification,
    isStepCompleted,
    getNextStep,
    getVerificationProgress,
    VerificationSteps
  };

  return (
    <VerificationContext.Provider value={value}>
      {children}
    </VerificationContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Hook for accessing verification context
 * @returns {Object} Verification context value
 */
export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};
