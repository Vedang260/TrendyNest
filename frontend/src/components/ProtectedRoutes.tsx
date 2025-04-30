import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  roles?: Array<"admin" | "vendor" | "customer">; // Adjust roles to match your user types
  redirectTo?: string;
}

export const ProtectedRoute = ({
  roles,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { user, token } = useAppSelector((state: RootState) => state.auth);

  // --- Auth Checks ---
  // 1. No token/user? Redirect to login.
  if (!token || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // 2. Role exists but user doesn't have it? Block access.
  if (roles && !roles.includes(user.role as "admin" | "vendor" | "customer")) {
    return <Navigate to="/unauthorized" replace />;
  }

  // --- Success: Render the protected content ---
  return <Outlet />;
};