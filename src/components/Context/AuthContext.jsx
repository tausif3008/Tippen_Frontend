import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loginCredentials, setLoginCredentials] = useState(null);

  const login = (newToken) => {
    setLoginCredentials(newToken);
  };

  const logoutUser = () => {
    setLoginCredentials(null);
  };

  return (
    <AuthContext.Provider value={{ loginCredentials, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
