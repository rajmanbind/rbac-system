import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, roles, userRole, children }) => {
  console.log("Authenticated: ", isAuthenticated);
  // Check if the user's role is allowed to access the route
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
