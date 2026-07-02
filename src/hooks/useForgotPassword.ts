import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendResetPasswordLink } from "@/services/auth";

export function useForgotPassword() {
  const { mutate: forgetPassword, isPending: isForgettingPassword } =
    useMutation({
      mutationFn: sendResetPasswordLink,
      onSuccess: () => {
        toast.success("Reset link sent! Please check your email.");
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });
  return { forgetPassword, isForgettingPassword };
}
