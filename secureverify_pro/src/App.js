import React from 'react';
import './App.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { VerificationProvider } from './context/VerificationContext';

// Router
import AppRouter from './routes/AppRouter';

// PUBLIC_INTERFACE
/**
 * Main application component for SecureVerify Pro
 * Acts as the entry point and wraps the app with necessary providers
 * for authentication, verification state, and routing
 */
function App() {
  return (
    // Wrap the entire application with AuthProvider (outer)
    // and VerificationProvider (inner) for global state management
    <AuthProvider>
      <VerificationProvider>
        {/* AppRouter handles all route definitions and navigation */}
        <AppRouter />
      </VerificationProvider>
    </AuthProvider>
  );
}

export default App;
