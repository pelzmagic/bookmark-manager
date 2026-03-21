import { useState } from "react";
import TypewriterComponent from "typewriter-effect";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Sign in successful");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ email, password });
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
          <p className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
            <TypewriterComponent
              options={{
                strings: ["Welcome back! Please enter your details"],
                autoStart: true,
                loop: false,
                delay: 50,
                deleteSpeed: Infinity,
              }}
            />
          </p>
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
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-neutral-500 p-3 shadow-xs outline-0 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
            />
          </div>
          <button
            className="font-manrope cursor-pointer rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white hover:bg-teal-800 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
            disabled={isPending}
          >
            Log in
          </button>
        </form>

        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-1">
            <p className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
              Forgot Password?
            </p>
            <span className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900">
              Reset it
            </span>
          </div>
          <div className="flex justify-center gap-1">
            <p className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
              Don't have an account?
            </p>
            <span className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
