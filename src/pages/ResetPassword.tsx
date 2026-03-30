import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/services/auth";
import { toast } from "sonner";
import Spinner from "@/ui/Spinner";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const navigate = useNavigate();

  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isPasswordValid = hasMinLength && hasSpecialChar && hasUpperCase;
  const passwordsMatch =
    newPassword === confirmPassword && confirmPassword !== "";

  const { mutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated successfully!");
      navigate("/");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (!isPasswordValid) {
      return toast.error("Please meet all password requirements");
    }
    if (!confirmPassword && !newPassword) {
      return toast.error("Please reset your password");
    }
    if (!passwordsMatch) {
      return toast.error("Passwords do not match");
    }

    mutate(newPassword);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="flex w-[90%] flex-col gap-8 rounded-xl bg-white px-5 py-8 md:max-w-md lg:max-w-md">
        <div className="flex items-center gap-2">
          <img src="/Bookmark.png" alt="bookmark icon" className="h-8 w-8" />
          <p className="font-roboto text-xl leading-[100%] font-bold text-neutral-900">
            Bookmark Manager
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="font-manrope lelading-[140%] text-2xl font-bold text-neutral-900">
            Reset Your Password?
          </h1>
          <p className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
            Enter your new password below. Make sure it's strong and secure.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="new-password"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              New Password <span className="text-neutral-900">*</span>
            </label>
            <div
              className={`relative flex items-center rounded-lg border transition-all focus-within:ring-2 focus-within:ring-offset-2 hover:bg-neutral-50 ${touched && !isPasswordValid ? "border-red-500 focus-within:ring-red-500" : "border-neutral-500 focus-within:ring-neutral-700"}`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="new-password"
                name="new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => setTouched(true)}
                className="w-full rounded-lg bg-transparent p-3 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <HiEyeSlash className="h-5 w-5" />
                ) : (
                  <HiEye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="mt-1 flex flex-col gap-1">
              <ul className="space-y-0.5 text-xs">
                <li
                  className={
                    hasMinLength
                      ? "text-teal-700"
                      : touched
                        ? "text-red-500"
                        : "text-neutral-500"
                  }
                >
                  {hasMinLength ? "✓" : "○"} Atleast 8 characters
                </li>
                <li
                  className={
                    hasUpperCase
                      ? "text-teal-700"
                      : touched
                        ? "text-red-500"
                        : "text-neutral-500"
                  }
                >
                  {hasUpperCase ? "✓" : "○"} An Uppercase letter
                </li>
                <li
                  className={
                    hasSpecialChar
                      ? "text-teal-700"
                      : touched
                        ? "text-red-500"
                        : "text-neutral-500"
                  }
                >
                  {hasSpecialChar ? "✓" : "○"} A special character
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirm password"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Confirm Password <span className="text-neutral-900">*</span>
            </label>
            <input
              type="password"
              id="confirm password"
              name="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`rounded-lg border p-3 transition-all outline-none focus:ring-2 focus:ring-offset-2 ${touched && !passwordsMatch ? "border-red-500 focus:ring-red-500" : "border-neutral-500 focus:ring-neutral-700"}`}
            />
            {touched && !passwordsMatch && confirmPassword !== "" && (
              <p className="text-xs font-medium text-red-500">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            className="font-manrope flex cursor-pointer items-center justify-center rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white hover:bg-teal-800 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 disabled:bg-neutral-400"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Reset password"}
          </button>
        </form>

        <Link
          to="/"
          className="font-manrope cursor-pointer text-center text-sm leading-[140%] font-semibold text-neutral-900"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
