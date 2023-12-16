import { ReactNode } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Protected = ({ children }: { children: ReactNode }) => {
  const { authenticatedUser } = useContext(AuthContext)!; // non null assertion operator

  if (authenticatedUser && authenticatedUser.roleId !== 1) {
    return children;
  }

  if (authenticatedUser && authenticatedUser.roleId === 1) {
    return <Navigate to="/verify" />;
  }

  return <Navigate to="/" />;
};

export default Protected;
