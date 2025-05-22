import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaSearch, FaUserCheck, FaUserClock, FaUserTimes } from 'react-icons/fa';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
/**
 * Admin Dashboard Page Component
 * Displays overview of verification requests for administrative users
 */
const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  
  // Mock verification requests data
  const verificationRequests = [
    {
      id: 'req-001',
      userId: 'user456',
      userName: 'John Smith',
      submissionDate: '2023-05-15T10:30:00Z',
      status: 'pending',
      documentType: 'passport'
    },
    {
      id: 'req-002',
      userId: 'user789',
      userName: 'Emma Johnson',
      submissionDate: '2023-05-14T14:15:00Z',
      status: 'verified',
      documentType: 'idCard'
    },
    {
      id: 'req-003',
      userId: 'user234',
      userName: 'Michael Brown',
      submissionDate: '2023-05-13T09:45:00Z',
      status: 'rejected',
      documentType: 'drivingLicense',
      rejectionReason: 'Document expired'
    }
  ];

  // Filter requests based on current filter
  const filteredRequests = filter === 'all' 
    ? verificationRequests 
    : verificationRequests.filter(req => req.status === filter);

  if (!user?.role === 'admin') {
    return (
      <div className="container">
        <Card>
          <h2 className="section-title">Unauthorized Access</h2>
          <p>You don't have permission to access the admin dashboard.</p>
        </Card>
      </div>
    );
  }

  // Helper function to get status badge for each request
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-primary"><FaUserClock /> Pending</span>;
      case 'verified':
        return <span className="badge badge-success"><FaUserCheck /> Verified</span>;
      case 'rejected':
        return <span className="badge badge-error"><FaUserTimes /> Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="text-secondary">
          Manage verification requests and user accounts
        </p>
      </div>

      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FaClipboardList size={24} color="var(--primary-blue)" className="mr-2" />
            <h2 className="section-title">Verification Requests</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter">Filter:</label>
            <select
              id="status-filter"
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: '6px 12px', minWidth: '150px' }}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <div className="form-group">
            <div className="flex">
              <input
                type="search"
                placeholder="Search requests..."
                className="form-input"
                style={{ borderRadius: 'var(--border-radius) 0 0 var(--border-radius)' }}
              />
              <button
                className="btn"
                style={{ 
                  borderRadius: '0 var(--border-radius) var(--border-radius) 0',
                  padding: '0 15px'
                }}
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--medium-gray)' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>User</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Submission Date</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Document Type</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <tr key={request.id} style={{ borderBottom: '1px solid var(--medium-gray)' }}>
                    <td style={{ padding: '10px' }}>{request.id}</td>
                    <td style={{ padding: '10px' }}>{request.userName}</td>
                    <td style={{ padding: '10px' }}>
                      {new Date(request.submissionDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '10px' }}>
                      {request.documentType === 'idCard' ? 'ID Card' :
                       request.documentType === 'passport' ? 'Passport' : 'Driving License'}
                    </td>
                    <td style={{ padding: '10px' }}>
                      {getStatusBadge(request.status)}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <Link 
                        to={`/admin/review/${request.userId}`}
                        className="btn btn-secondary"
                        style={{ 
                          padding: '6px 12px', 
                          fontSize: '0.875rem',
                        }}
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '20px', textAlign: 'center' }}>
                    No verification requests found matching the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="section-title mb-4">Admin Statistics</h2>
        <p className="mb-4 alert alert-info">
          Additional administrative features and statistics will be implemented in a future update.
        </p>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
