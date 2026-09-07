import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Dummy state

  const login = (userData) => {
    // Stub login
    setUser(userData || { name: 'Demo User', role: 'student' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn("useAuth used outside of AuthProvider. Returning fallback.");
    return { user: null, login: () => {}, logout: () => {} };
  }
  return context;
};
