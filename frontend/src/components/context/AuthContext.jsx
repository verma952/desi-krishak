import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

// ✅ A safe function to get initial state and prevent crashes
const getInitialAuthState = () => {
  try {
    const token = localStorage.getItem('desiKrishak_token');
    const userString = localStorage.getItem('desiKrishak_user');
    
    // If token or user data doesn't exist, they are not logged in
    if (!token || !userString) {
      return { user: null, token: null };
    }

    const user = JSON.parse(userString);
    return { user, token };

  } catch (error) {
    console.error("Failed to parse auth data from localStorage", error);
    // Clean up corrupted data if parsing fails
    localStorage.removeItem('desiKrishak_user');
    localStorage.removeItem('desiKrishak_token');
    return { user: null, token: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(getInitialAuthState());

  // ✅ Standardized login function to accept user and token separately
  const login = (user, token) => {
    // Set state
    setAuthState({ user, token });
    // Persist to localStorage
    localStorage.setItem('desiKrishak_user', JSON.stringify(user));
    localStorage.setItem('desiKrishak_token', token);
  };

  const logout = () => {
    // Clear state
    setAuthState({ user: null, token: null });
    // Clear from localStorage
    localStorage.removeItem('desiKrishak_user');
    localStorage.removeItem('desiKrishak_token');
  };

  // ✅ This is useful for updating user info without needing a new token
  const updateUser = (newUserData) => {
    setAuthState(prevState => {
      // Merge new data with the existing user object
      const updatedUser = { ...prevState.user, ...newUserData };
      // Persist the updated user object to localStorage
      localStorage.setItem('desiKrishak_user', JSON.stringify(updatedUser));
      // Return the new state
      return { ...prevState, user: updatedUser };
    });
  };

  // The value provided to the context consumers
  const contextValue = {
    ...authState, // Provides `user` and `token` directly
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