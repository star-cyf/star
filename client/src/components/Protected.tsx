import { ReactNode } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Protected = ({ children }: { children: ReactNode }) => {
  const { authenticatedUser } = useContext(AuthContext)!; // ! non null assertion

  if (authenticatedUser) {
    return children;
  }

  return <Navigate to="/" />;
};

export default Protected;
