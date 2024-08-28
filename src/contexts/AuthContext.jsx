import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("token")?? "");

  
  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}
