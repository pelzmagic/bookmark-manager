import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/services/auth";
import { toast } from "sonner";
import Spinner from "@/ui/Spinner";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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
    if (newPassword.length < 8) {
      return toast.error("Password must be atleast 8 characters long");
    }
    if (newPassword !== confirmPassword) {
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
              htmlFor="new password"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              New Password <span className="text-neutral-900">*</span>
            </label>
            <input
              type="password"
              id="new-password"
              name="new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="cursor-pointer rounded-lg border border-neutral-500 p-3 shadow-xs outline-0 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
            />
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
              className="cursor-pointer rounded-lg border border-neutral-500 p-3 shadow-xs outline-0 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
            />
          </div>

          <button className="font-manrope cursor-pointer rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white hover:bg-teal-800 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2">
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
