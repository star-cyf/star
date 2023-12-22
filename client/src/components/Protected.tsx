import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProtectedProps } from "../types/components";

const Protected = ({ children }: ProtectedProps) => {
  const { authenticatedUser } = useContext(AuthContext)!; // non null assertion operator

  if (authenticatedUser) {
    return children;
  }

  return <Navigate to="/" />;
};

export default Protected;
