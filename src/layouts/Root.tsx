import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { self } from "../http/api";
import { useAuthStore } from "../store";
import { useEffect } from "react";

const getSelf = async () => {
  // server call logic
  const { data } = await self();
  return data;
};

export default function Root() {
  const { setUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}
