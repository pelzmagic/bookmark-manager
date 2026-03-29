import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "@/services/auth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "@/ui/Spinner";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasSpecialChar;

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Account created successfully!");
      navigate("/");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!fullName || !isEmailValid || !isPasswordValid) return;
    mutate({ fullName, email, password });
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
            Create your account
          </h1>
          <p className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
            Join us and start saving your favorite links -- organized,
            searchable, and always within reach.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullname"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Full name <span className="text-teal-700">*</span>
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="cursor-pointer rounded-lg border border-neutral-500 p-3 shadow-xs outline-0 transition-all hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Email address <span className="text-teal-700">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              onChange={(e) => setEmail(e.target.value)}
              className={`cursor-pointer rounded-lg border p-3 shadow-xs outline-0 hover:bg-neutral-100 focus:ring-2 focus:ring-offset-2 ${touched.email && !isEmailValid ? "border-red-500 focus:ring-red-500" : "border-neutral-500 focus:ring-neutral-700"}`}
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
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Password <span className="text-teal-700">*</span>
            </label>
            <div
              className={`relative cursor-pointer rounded-lg border focus-within:ring-2 focus-within:ring-offset-2 hover:bg-neutral-100 ${touched.password && !isPasswordValid ? "border-red-500 focus-within:ring-red-500" : "border-neutral-500 focus-within:ring-neutral-700"}`}
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
              <p className="text-[11px] font-medium text-neutral-600">
                Password must contain:
              </p>
              <ul className="space-y-0.5 text-[11px]">
                <li
                  className={
                    hasMinLength
                      ? "text-teal-700"
                      : touched.password
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
                      : touched.password
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
                      : touched.password
                        ? "text-red-500"
                        : "text-neutral-500"
                  }
                >
                  {hasSpecialChar ? "✓" : "○"} A special character (@, #, $, *,
                  etc.)
                </li>
              </ul>
            </div>
          </div>
          <button
            className="font-manrope cursor-pointer rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white hover:bg-teal-800 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="font-manrope text-center text-sm leading-[140%] font-semibold text-neutral-800">
          Already have an account?{" "}
          <Link to="/" className="cursor-pointer text-neutral-900">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
