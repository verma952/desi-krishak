// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

// The context object that components will use
export const AuthContext = createContext(null);

// A safe function to get the initial state from localStorage
// This runs only once when the app loads.
const getInitialAuthState = () => {
  try {
    const token = localStorage.getItem('desiKrishak_token');
    const userString = localStorage.getItem('desiKrishak_user');
    
    // If token or user data doesn't exist, they are not logged in
    if (!token || !userString) {
      return { user: null, token: null };
    }

    // If data exists, parse the user object and return the state
    const user = JSON.parse(userString);
    return { user, token };

  } catch (error) {
    console.error("Failed to parse auth data from localStorage", error);
    // If parsing fails (e.g., corrupted data), clear it out
    localStorage.removeItem('desiKrishak_user');
    localStorage.removeItem('desiKrishak_token');
    return { user: null, token: null };
  }
};

// The provider component that will wrap your app
export const AuthProvider = ({ children }) => {
  // Initialize state directly from localStorage. This is a great pattern!
  const [authState, setAuthState] = useState(getInitialAuthState());

  // Function to handle user login
  const login = (user, token) => {
    // Update the state in React
    setAuthState({ user, token });
    // Persist the state to localStorage
    localStorage.setItem('desiKrishak_user', JSON.stringify(user));
    localStorage.setItem('desiKrishak_token', token);
  };

  // Function to handle user logout
  const logout = () => {
    // Clear the state in React
    setAuthState({ user: null, token: null });
    // Clear the data from localStorage
    localStorage.removeItem('desiKrishak_user');
    localStorage.removeItem('desiKrishak_token');
  };

  // Function to update user info (e.g., after editing a profile)
  const updateUser = (newUserData) => {
    setAuthState(prevState => {
      // Ensure we don't proceed if there's no previous user
      if (!prevState.user) return prevState;

      const updatedUser = { ...prevState.user, ...newUserData };
      // Persist the updated user object to localStorage
      localStorage.setItem('desiKrishak_user', JSON.stringify(updatedUser));
      // Return the new state
      return { ...prevState, user: updatedUser };
    });
  };

  // The value provided to all components consuming this context
  const contextValue = {
    ...authState, // Provides `user` and `token` directly
    // ✅ NEW: A convenient boolean flag for checking auth status
    isAuthenticated: !!authState.token, 
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};