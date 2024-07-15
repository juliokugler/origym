import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }) {

  const defaultValue = { user: null };
  
  return (
    <AuthContext.Provider value={{ ...defaultValue, ...value }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}