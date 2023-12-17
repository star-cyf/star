import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProtectedRouteProps } from "../types/props";

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { authenticatedUser } = useContext(AuthContext)!; // non null assertion operator

  if (authenticatedUser && allowedRoles.includes(authenticatedUser.roleId)) {
    return children;
  }

  if (authenticatedUser && authenticatedUser.roleId === 1) {
    return <Navigate to="/verify" />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
