import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  // Providing a default value for 'user' if it's undefined
  const defaultValue = { user: null }; // or any other default value you want
  
  return (
    <AuthContext.Provider value={{ ...defaultValue, ...value }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}