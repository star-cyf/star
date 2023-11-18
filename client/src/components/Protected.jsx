import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Protected = ({ children }) => {
  const { token, user } = useContext(AuthContext);

  if (token && user) {
    return children;
  }

  return <Navigate to="/" />;
};

export default Protected;
