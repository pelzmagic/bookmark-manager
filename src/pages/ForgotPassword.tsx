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
    <div className="bg-surface-muted flex min-h-screen items-center justify-center">
      <div className="flex w-[90%] flex-col gap-8 rounded-xl bg-white px-5 py-8 md:max-w-md lg:max-w-md">
        <div className="flex items-center gap-2">
          <img src="/Bookmark.png" alt="bookmark icon" className="h-8 w-8" />
          <p className="font-roboto text-ink text-xl leading-[100%] font-bold">
            Bookmark Manager
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="font-manrope lelading-[140%] text-ink text-2xl font-bold">
            Forgot your password?
          </h1>
          <p className="font-manrope text-ink-muted text-sm leading-[150%] font-medium">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-manrope text-ink cursor-pointer text-sm leading-[140%] font-semibold"
            >
              Email <span className="text-ink">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="border-avatar hover:bg-surface-muted focus:ring-brand cursor-pointer rounded-lg border p-3 shadow-xs outline-0 transition-all focus:ring-2 focus:ring-offset-2"
            />
          </div>
          <button
            className="font-manrope bg-brand hover:bg-brand-hover focus:ring-brand disabled:bg-line-strong flex cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-base leading-[140%] font-semibold text-white focus:ring-2 focus:ring-offset-2"
            disabled={isForgettingPassword}
          >
            {isForgettingPassword ? <Spinner /> : "Send reset Link"}
          </button>
        </form>

        <Link
          to="/"
          className="font-manrope text-ink cursor-pointer text-center text-sm leading-[140%] font-semibold"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
