import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "@/services/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useUpdatePassword() {
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationFn: updatePasswordApi,
      onSuccess: () => {
        toast.success("Password updated successfully!");
        navigate("/");
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    },
  );

  return { updatePassword, isUpdatingPassword };
}
