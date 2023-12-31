import { createContext, useMemo } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContextType, AuthProviderProps } from "../types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { authenticatedUser, login, logout } = useAuth();

  const providerValue = useMemo(
    () => ({
      authenticatedUser,
      login,
      logout,
    }),
    [authenticatedUser, login, logout]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
