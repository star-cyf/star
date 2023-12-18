import { createContext, useMemo, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { authenticatedUser, setAuthenticatedUser, login, logout } = useAuth();

  const providerValue = useMemo(
    () => ({
      authenticatedUser,
      setAuthenticatedUser,
      login,
      logout,
    }),
    [authenticatedUser, setAuthenticatedUser, login, logout]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
