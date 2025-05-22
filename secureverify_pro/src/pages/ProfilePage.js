import React from 'react';
import { FaUser } from 'react-icons/fa';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
/**
 * Profile Page Component
 * Displays and allows editing of user profile information
 */
const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">My Profile</h1>
        <p className="text-secondary">
          View and manage your account information
        </p>
      </div>

      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <FaUser size={24} color="var(--primary-blue)" className="mr-2" />
          <h2 className="section-title">User Information</h2>
        </div>

        <div className="grid grid-cols-1 grid-cols-sm-2 gap-4">
          <div>
            <p className="mb-1"><strong>Name:</strong></p>
            <p className="mb-4">{user?.name || 'Not provided'}</p>
            
            <p className="mb-1"><strong>Email:</strong></p>
            <p className="mb-4">{user?.email || 'Not provided'}</p>
          </div>
          
          <div>
            <p className="mb-1"><strong>Role:</strong></p>
            <p className="mb-4">{user?.role || 'User'}</p>
            
            <p className="mb-1"><strong>Member Since:</strong></p>
            <p className="mb-4">{user?.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : 'Not available'}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="section-title mb-4">Profile Settings</h2>
        <p className="mb-4 alert alert-info">
          Profile editing functionality will be implemented in a future update.
        </p>
      </Card>
    </div>
  );
};

export default ProfilePage;
