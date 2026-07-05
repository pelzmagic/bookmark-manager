import { useMutation } from "@tanstack/react-query";
import { logOut as logOutApi } from "@/services/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logOut, isPending: isLoggingOut } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logOut, isLoggingOut };
}
