import { Dispatch, SetStateAction } from "react";

export type AuthenticatedUser = {
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
};

export interface AuthContextType {
  login: () => Promise<void>;
  logout: () => void;
  authenticatedUser: AuthenticatedUser | null;
  setAuthenticatedUser: Dispatch<SetStateAction<AuthenticatedUser | null>>;
}
