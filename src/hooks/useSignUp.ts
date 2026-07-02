import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signUp as signUpApi } from "@/services/auth";

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("Account created successfully!");
      navigate("/");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { signUp, isSigningUp };
}
