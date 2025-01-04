import { Outlet } from "react-router";

export default function NonAuth() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
