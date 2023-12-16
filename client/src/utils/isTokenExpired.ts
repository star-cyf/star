import { AuthenticatedUser } from "../types/auth";

const isTokenExpired = (authenticatedUserLocalStorage: AuthenticatedUser) => {
  const now = Date.now();
  const expiresAt = authenticatedUserLocalStorage.expirationTime * 1000;
  return now >= expiresAt;
};

export default isTokenExpired;
