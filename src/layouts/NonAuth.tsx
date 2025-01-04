import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";

export default function NonAuth() {
  const { user } = useAuthStore();
  if (user !== null) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
