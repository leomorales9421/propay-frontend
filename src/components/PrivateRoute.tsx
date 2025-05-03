import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
