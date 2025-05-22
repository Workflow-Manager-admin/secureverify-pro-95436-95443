import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

// PUBLIC_INTERFACE
/**
 * 404 Not Found Page Component
 */
const NotFoundPage = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
      <FaExclamationTriangle size={60} color="var(--warning-yellow)" className="mb-4" />
      <h1 className="page-title">Page Not Found</h1>
      <p className="mb-6">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link to="/" className="btn">
        <FaHome /> Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
