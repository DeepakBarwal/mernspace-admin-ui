import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../store";

export default function NonAuth() {
  const location = useLocation();
  const { user } = useAuthStore();
  if (user !== null) {
    const returnTo =
      new URLSearchParams(location.search).get("returnTo") || "/";
    return <Navigate to={returnTo} replace={true} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
