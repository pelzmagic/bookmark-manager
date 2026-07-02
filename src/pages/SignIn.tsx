import { useState } from "react";
import { Link } from "react-router-dom";
import TypewriterComponent from "typewriter-effect";
import Spinner from "@/ui/Spinner";
import { HiEyeSlash } from "react-icons/hi2";
import { HiEye } from "react-icons/hi2";
import { useLogin } from "@/hooks/useLogin";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isLoggingIn, login } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    login({ email, password });
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
            Log in to your account
          </h1>
          <div className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
            <TypewriterComponent
              options={{
                strings: ["Welcome back! Please enter your details"],
                autoStart: true,
                loop: false,
                delay: 50,
                deleteSpeed: Infinity,
              }}
            />
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cursor-pointer rounded-lg border border-neutral-500 p-3 shadow-xs outline-0 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Password
            </label>
            <div className="relative cursor-pointer">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-500 p-3 shadow-xs outline-0 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
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
          </div>
          <button
            className="font-manrope flex cursor-pointer items-center justify-center rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white hover:bg-teal-800 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 disabled:bg-neutral-400"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <Spinner /> : "Log in"}
          </button>
        </form>

        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-1">
            <p className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
              Forgot Password?
            </p>
            <Link
              to="/forgot-password"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Reset it
            </Link>
          </div>
          <div className="flex justify-center gap-1">
            <p className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
              Don't have an account?
            </p>
            <Link
              to="/sign-up"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
