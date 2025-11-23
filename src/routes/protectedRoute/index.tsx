import { Navigate } from "react-router-dom";
import { useAuth } from "../../componetns/context/authContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('admin' | 'manager' | 'employee' | 'customer')[]; // Roles that can access this route
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { token, user } = useAuth(); // Assuming user object has {role: string}

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Logged in but role not allowed
    return <Navigate to="/dashboard" replace />; // Or redirect to a "Not Authorized" page
  }

  return <>{children}</>;
}
