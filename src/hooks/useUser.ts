import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth";

export default function useUser() {
  const {
    isPending,
    data: user,
    fetchStatus,
  } = useQuery({ queryKey: ["user"], queryFn: getCurrentUser });

  return {
    isPending,
    user,
    fetchStatus,
    isAuthenticated: user?.role === "authenticated",
  };
}
