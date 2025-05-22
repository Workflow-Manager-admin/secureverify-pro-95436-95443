import React from 'react';
import { FaCog, FaBell, FaShieldAlt, FaUserLock } from 'react-icons/fa';
import Card from '../components/common/Card';

// PUBLIC_INTERFACE
/**
 * Settings Page Component
 * Allows users to configure account settings and preferences
 */
const SettingsPage = () => {
  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">Settings</h1>
        <p className="text-secondary">
          Manage your account settings and preferences
        </p>
      </div>

      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <FaCog size={24} color="var(--primary-blue)" className="mr-2" />
          <h2 className="section-title">Account Settings</h2>
        </div>
        
        <p className="mb-4 alert alert-info">
          Account settings management will be implemented in a future update.
        </p>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <FaBell size={24} color="var(--primary-blue)" className="mr-2" />
          <h2 className="section-title">Notification Preferences</h2>
        </div>
        
        <p className="mb-4 alert alert-info">
          Notification preferences will be implemented in a future update.
        </p>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <FaShieldAlt size={24} color="var(--primary-blue)" className="mr-2" />
          <h2 className="section-title">Privacy Settings</h2>
        </div>
        
        <p className="mb-4 alert alert-info">
          Privacy settings will be implemented in a future update.
        </p>
      </Card>

      <Card>
        <div className="flex items-center mb-4">
          <FaUserLock size={24} color="var(--primary-blue)" className="mr-2" />
          <h2 className="section-title">Security</h2>
        </div>
        
        <p className="mb-4 alert alert-info">
          Security settings will be implemented in a future update.
        </p>
      </Card>
    </div>
  );
};

export default SettingsPage;
