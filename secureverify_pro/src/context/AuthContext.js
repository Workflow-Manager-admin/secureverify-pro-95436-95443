import React, { createContext, useState, useContext, useEffect } from 'react';

// AuthContext for managing user authentication state
const AuthContext = createContext();

// PUBLIC_INTERFACE
/**
 * Provider component for user authentication state
 * Manages login, logout, and user information
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('secureverify_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data', error);
        localStorage.removeItem('secureverify_user');
      }
    }
    setLoading(false);
  }, []);

  // Login function - in a real app this would make an API call
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock successful login
        if (email && password) {
          const userData = {
            id: 'user123',
            email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'admin' : 'user',
            verified: false
          };
          
          localStorage.setItem('secureverify_user', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800); // Simulate network delay
    });
  };

  // Register function - in a real app this would make an API call
  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock successful registration
        if (name && email && password) {
          const userData = {
            id: 'user' + Math.floor(Math.random() * 1000),
            email,
            name,
            role: 'user',
            verified: false,
            registrationDate: new Date().toISOString()
          };
          
          localStorage.setItem('secureverify_user', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 800); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('secureverify_user');
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => !!user;

  // Check if user is admin
  const isAdmin = () => user?.role === 'admin';

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// PUBLIC_INTERFACE
/**
 * Hook for accessing authentication context
 * @returns {Object} Authentication context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
