import { useState } from "react";
import { toast } from "sonner";
import Spinner from "@/ui/Spinner";
import { Link } from "react-router-dom";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { isForgettingPassword, forgetPassword } = useForgotPassword();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmailValid) return toast.error("Please enter a valid email address");
    forgetPassword(email, {
      onSuccess: () => {
        setEmail("");
      },
    });
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
            Forgot your password?
          </h1>
          <p className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Email <span className="text-neutral-900">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="cursor-pointer rounded-lg border border-neutral-500 p-3 shadow-xs outline-0 transition-all hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
            />
          </div>
          <button
            className="font-manrope flex cursor-pointer items-center justify-center rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white hover:bg-teal-800 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 disabled:bg-neutral-400"
            disabled={isForgettingPassword}
          >
            {isForgettingPassword ? <Spinner /> : "Send reset Link"}
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
