import { ReactNode } from "react";

export interface AuthenticatedUser {
  id: number;
  googleId: string;
  roleId: number;
  firstName: string;
  lastName?: string;
  email: string;
  picture?: string;
  createdAt: string;
  updatedAt: string;
  issuedAtTime: number;
  expirationTime: number;
}

export interface AuthContextType {
  login: () => Promise<void>;
  logout: () => void;
  authenticatedUser: AuthenticatedUser | null;
}

export interface AuthProviderProps {
  children: ReactNode;
}
