import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(
    localStorage.getItem("isEmployeeLoggedIn")
  );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn")
  );

  return (
    <AuthContext.Provider
      value={{
        isEmployeeLoggedIn,
        setIsEmployeeLoggedIn,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
