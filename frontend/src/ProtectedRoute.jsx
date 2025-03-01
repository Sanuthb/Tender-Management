import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Define role-based home routes
  const roleRoutes = {
    admin: "/admin-dashboard",
    buyer: "/buyer-dashboard",
    supplier: "/dashboard",
  };

  // Redirect if the user is on an unauthorized route
  if (user?.role && location.pathname !== roleRoutes[user.role]) {
    return <Navigate to={roleRoutes[user.role]} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
