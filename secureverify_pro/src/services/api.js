// Mock delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API class for SecureVerify Pro
class ApiService {
  constructor() {
    // Mock database to store verification requests
    this._verifications = new Map();
    this._users = new Map();
  }

  // PUBLIC_INTERFACE
  /**
   * Submit personal information
   * @param {string} userId - User ID
   * @param {Object} personalInfo - Personal information data
   * @returns {Promise} Promise resolving to result
   */
  async submitPersonalInfo(userId, personalInfo) {
    await delay(1000); // Simulate network delay
    
    let verification = this._verifications.get(userId) || {
      userId,
      status: 'in_progress',
      submittedAt: new Date().toISOString(),
      steps: []
    };
    
    verification.personalInfo = personalInfo;
    verification.steps.push('personal_info');
    verification.lastUpdated = new Date().toISOString();
    
    this._verifications.set(userId, verification);
    return { success: true, verification };
  }

  // PUBLIC_INTERFACE
  /**
   * Submit document for verification
   * @param {string} userId - User ID
   * @param {string} documentType - Type of document (idCard, passport, drivingLicense)
   * @param {Object} documentData - Document data (including file info)
   * @returns {Promise} Promise resolving to result
   */
  async submitDocument(userId, documentType, documentData) {
    await delay(1500); // Simulate network delay
    
    let verification = this._verifications.get(userId);
    if (!verification) {
      throw new Error('No verification process started');
    }
    
    // In a real app, this would handle file upload
    verification.documents = verification.documents || {};
    verification.documents[documentType] = {
      ...documentData,
      uploadedAt: new Date().toISOString()
    };
    
    if (!verification.steps.includes('document_upload')) {
      verification.steps.push('document_upload');
    }
    
    verification.lastUpdated = new Date().toISOString();
    this._verifications.set(userId, verification);
    
    return { success: true, verification };
  }

  // PUBLIC_INTERFACE
  /**
   * Submit biometric data
   * @param {string} userId - User ID
   * @param {Object} biometricData - Biometric data
   * @returns {Promise} Promise resolving to result
   */
  async submitBiometric(userId, biometricData) {
    await delay(2000); // Simulate network delay
    
    let verification = this._verifications.get(userId);
    if (!verification) {
      throw new Error('No verification process started');
    }
    
    verification.biometric = {
      ...biometricData,
      uploadedAt: new Date().toISOString()
    };
    
    if (!verification.steps.includes('biometric_verification')) {
      verification.steps.push('biometric_verification');
    }
    
    verification.status = 'under_review';
    verification.reviewStartDate = new Date().toISOString();
    verification.verificationId = `VID-${Date.now()}`;
    verification.lastUpdated = new Date().toISOString();
    
    this._verifications.set(userId, verification);
    
    return { success: true, verification };
  }

  // PUBLIC_INTERFACE
  /**
   * Get verification status
   * @param {string} userId - User ID
   * @returns {Promise} Promise resolving to verification status
   */
  async getVerificationStatus(userId) {
    await delay(500);
    return this._verifications.get(userId) || { status: 'not_started', userId };
  }

  // PUBLIC_INTERFACE
  /**
   * Admin: Get all verification requests
   * @param {Object} filters - Optional filters
   * @returns {Promise} Promise resolving to array of verifications
   */
  async getAllVerifications(filters = {}) {
    await delay(1000);
    
    let verifications = Array.from(this._verifications.values());
    
    // Apply filters if any
    if (filters.status) {
      verifications = verifications.filter(v => v.status === filters.status);
    }
    
    // Sort by date (newest first)
    verifications.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    
    return verifications;
  }

  // PUBLIC_INTERFACE
  /**
   * Admin: Approve verification
   * @param {string} userId - User ID
   * @returns {Promise} Promise resolving to updated verification
   */
  async approveVerification(userId) {
    await delay(1000);
    
    const verification = this._verifications.get(userId);
    if (!verification) {
      throw new Error('Verification not found');
    }
    
    verification.status = 'verified';
    verification.reviewedAt = new Date().toISOString();
    verification.lastUpdated = new Date().toISOString();
    
    this._verifications.set(userId, verification);
    
    return { success: true, verification };
  }

  // PUBLIC_INTERFACE
  /**
   * Admin: Reject verification
   * @param {string} userId - User ID
   * @param {string} reason - Rejection reason
   * @returns {Promise} Promise resolving to updated verification
   */
  async rejectVerification(userId, reason) {
    await delay(1000);
    
    const verification = this._verifications.get(userId);
    if (!verification) {
      throw new Error('Verification not found');
    }
    
    verification.status = 'rejected';
    verification.rejectionReason = reason;
    verification.reviewedAt = new Date().toISOString();
    verification.lastUpdated = new Date().toISOString();
    
    this._verifications.set(userId, verification);
    
    return { success: true, verification };
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
