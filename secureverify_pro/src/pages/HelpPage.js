import React from 'react';
import { FaQuestionCircle, FaPhone, FaEnvelope, FaComments } from 'react-icons/fa';
import Card from '../components/common/Card';

// PUBLIC_INTERFACE
/**
 * Help & Support Page Component
 * Provides help resources and support contact information
 */
const HelpPage = () => {
  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">Help & Support</h1>
        <p className="text-secondary">
          Find answers to common questions and get support
        </p>
      </div>

      <div className="grid grid-cols-1 grid-cols-sm-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center mb-4">
            <FaQuestionCircle size={24} color="var(--primary-blue)" className="mr-2" />
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="mb-4">
            <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>How long does verification take?</h3>
            <p>The verification process typically takes 5-10 minutes to complete from your side, and our team reviews submissions within 24 hours.</p>
          </div>
          
          <div className="mb-4">
            <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>What documents can I use for verification?</h3>
            <p>We accept government-issued photo IDs such as passports, driver's licenses, and national ID cards.</p>
          </div>
          
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Is my data secure?</h3>
            <p>Yes, we use industry-standard encryption and security practices to protect your personal information and documentation.</p>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center mb-4">
            <FaPhone size={24} color="var(--primary-blue)" className="mr-2" />
            <h2 className="section-title">Contact Support</h2>
          </div>
          
          <div className="mb-4 flex items-center gap-2">
            <FaPhone />
            <span>+1 (555) 123-4567</span>
          </div>
          
          <div className="mb-4 flex items-center gap-2">
            <FaEnvelope />
            <span>support@secureverifypro.com</span>
          </div>
          
          <div className="mb-4 flex items-center gap-2">
            <FaComments />
            <span>Live chat available: Mon-Fri, 9am-6pm EST</span>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="section-title mb-4">Resources</h2>
        <p className="mb-4">
          Additional help resources and documentation will be available here in future updates.
        </p>
      </Card>
    </div>
  );
};

export default HelpPage;
