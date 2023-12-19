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
  authenticatedUser: AuthenticatedUser | null;
  setAuthenticatedUser: Dispatch<SetStateAction>;
  login: () => Promise<void>;
  logout: () => void;
  statusLogs: string[];
  setStatusLogs: Dispatch<SetStateAction>;
}
