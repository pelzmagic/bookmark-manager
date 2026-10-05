import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "@/ui/Spinner";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useSignUp } from "@/hooks/useSignUp";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const { signUp, isSigningUp } = useSignUp();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasSpecialChar;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!fullName || !isEmailValid || !isPasswordValid) return;
    signUp({ fullName, email, password });
  }

  return (
    <div className="bg-surface-muted flex min-h-dvh items-center justify-center overflow-y-auto">
      <div className="flex w-[90%] flex-col gap-8 rounded-xl bg-white px-5 py-8 md:max-w-md lg:max-w-md">
        <div className="flex items-center gap-2">
          <img src="/Bookmark.png" alt="bookmark icon" className="h-8 w-8" />
          <p className="font-roboto text-ink text-xl leading-[100%] font-bold">
            Bookmark Manager
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="font-manrope lelading-[140%] text-ink text-2xl font-bold">
            Create your account
          </h1>
          <p className="font-manrope text-ink-muted text-sm leading-[150%] font-medium">
            Join us and start saving your favorite links -- organized,
            searchable, and always within reach.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullname"
              className="font-manrope text-ink cursor-pointer text-sm leading-[140%] font-semibold"
            >
              Full name <span className="text-brand">*</span>
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border-avatar hover:bg-surface-muted focus:ring-brand cursor-pointer rounded-lg border p-3 shadow-xs outline-0 transition-all focus:ring-2 focus:ring-offset-2"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-manrope text-ink cursor-pointer text-sm leading-[140%] font-semibold"
            >
              Email address <span className="text-brand">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              onChange={(e) => setEmail(e.target.value)}
              className={`hover:bg-surface-muted cursor-pointer rounded-lg border p-3 shadow-xs outline-0 focus:ring-2 focus:ring-offset-2 ${touched.email && !isEmailValid ? "border-red-500 focus:ring-red-500" : "border-avatar focus:ring-brand"}`}
            />
            {touched.email && !isEmailValid && (
              <p className="text-xs font-medium text-red-500">
                Enter a valid email address.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              aria-describedby="password-requirements"
              className="font-manrope text-ink cursor-pointer text-sm leading-[140%] font-semibold"
            >
              Password <span className="text-brand">*</span>
            </label>
            <div
              className={`hover:bg-surface-muted relative cursor-pointer rounded-lg border focus-within:ring-2 focus-within:ring-offset-2 ${touched.password && !isPasswordValid ? "border-red-500 focus-within:ring-red-500" : "border-avatar focus-within:ring-brand"}`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full cursor-pointer rounded-lg p-3 shadow-xs outline-none"
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

            <div
              id="password-requirements"
              className="mt-1 flex flex-col gap-1"
            >
              <p className="text-tag text-[11px] font-medium">
                Password must contain:
              </p>
              <ul className="space-y-0.5 text-[11px]">
                <li
                  className={
                    hasMinLength
                      ? "text-brand"
                      : touched.password
                        ? "text-red-500"
                        : "text-avatar"
                  }
                >
                  {hasMinLength ? "✓" : "○"} Atleast 8 characters
                </li>
                <li
                  className={
                    hasUpperCase
                      ? "text-brand"
                      : touched.password
                        ? "text-red-500"
                        : "text-avatar"
                  }
                >
                  {hasUpperCase ? "✓" : "○"} An Uppercase letter
                </li>
                <li
                  className={
                    hasSpecialChar
                      ? "text-brand"
                      : touched.password
                        ? "text-red-500"
                        : "text-avatar"
                  }
                >
                  {hasSpecialChar ? "✓" : "○"} A special character (@, #, $, *,
                  etc.)
                </li>
              </ul>
            </div>
          </div>
          <button
            className="font-manrope bg-brand hover:bg-brand-hover focus:ring-brand flex cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-base leading-[140%] font-semibold text-white focus:ring-2 focus:ring-offset-2"
            disabled={isSigningUp}
          >
            {isSigningUp ? <Spinner size="sm" /> : "Create account"}
          </button>
        </form>

        <p className="font-manrope text-ink-muted text-center text-sm leading-[140%] font-semibold">
          Already have an account?{" "}
          <Link to="/" className="text-ink cursor-pointer">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
