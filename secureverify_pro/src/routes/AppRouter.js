import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout
import AppLayout from '../components/Layout/AppLayout';

// Public pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

// Auth protected pages
import DashboardPage from '../pages/DashboardPage';
import OnboardingPage from '../pages/OnboardingPage';
import PersonalInfoPage from '../pages/PersonalInfoPage';
import DocumentUploadPage from '../pages/DocumentUploadPage';
import BiometricVerificationPage from '../pages/BiometricVerificationPage';
import VerificationStatusPage from '../pages/VerificationStatusPage';
import ProfilePage from '../pages/ProfilePage';
import HelpPage from '../pages/HelpPage';
import SettingsPage from '../pages/SettingsPage';

// Admin pages
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminReviewPage from '../pages/AdminReviewPage';

// Context for authentication
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
/**
 * Router Provider Component for SecureVerify Pro application
 */
const AppRouter = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <NotFoundPage />,
      children: [
        // Public routes
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        
        // Protected routes (require authentication)
        {
          path: 'dashboard',
          element: isAuthenticated() ? <DashboardPage /> : <LoginPage />,
        },
        {
          path: 'onboarding',
          element: isAuthenticated() ? <OnboardingPage /> : <LoginPage />,
        },
        {
          path: 'personal-info',
          element: isAuthenticated() ? <PersonalInfoPage /> : <LoginPage />,
        },
        {
          path: 'document-upload',
          element: isAuthenticated() ? <DocumentUploadPage /> : <LoginPage />,
        },
        {
          path: 'biometric-verification',
          element: isAuthenticated() ? <BiometricVerificationPage /> : <LoginPage />,
        },
        {
          path: 'verification-status',
          element: isAuthenticated() ? <VerificationStatusPage /> : <LoginPage />,
        },
        {
          path: 'profile',
          element: isAuthenticated() ? <ProfilePage /> : <LoginPage />,
        },
        {
          path: 'help',
          element: isAuthenticated() ? <HelpPage /> : <LoginPage />,
        },
        {
          path: 'settings',
          element: isAuthenticated() ? <SettingsPage /> : <LoginPage />,
        },
        
        // Admin routes
        {
          path: 'admin',
          element: isAdmin() ? <AdminDashboardPage /> : <NotFoundPage />,
        },
        {
          path: 'admin/review/:userId',
          element: isAdmin() ? <AdminReviewPage /> : <NotFoundPage />,
        },
        
        // 404 route
        {
          path: '*',
          element: <NotFoundPage />
        }
      ]
    }
  ]);

  if (loading) {
    return <div className="flex justify-center items-center" style={{ height: '100vh' }}>Loading...</div>;
  }

  return <RouterProvider router={router} />;
};

export default AppRouter;
