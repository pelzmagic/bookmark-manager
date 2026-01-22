export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="flex max-w-85.75 flex-col gap-8 rounded-xl bg-white px-5 py-8 md:min-w-md lg:min-w-md">
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

        <form className="flex flex-col gap-4">
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
              className="rounded-lg border border-neutral-500 p-3 shadow-xs outline-0"
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
              className="rounded-lg border border-neutral-500 p-3 shadow-xs outline-0"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              Password <span className="text-teal-700">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="rounded-lg border border-neutral-500 p-3 shadow-xs outline-0"
            />
          </div>
          <button className="font-manrope cursor-pointer rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white">
            Create account
          </button>
        </form>

        <p className="font-manrope text-center text-sm leading-[140%] font-semibold text-neutral-800">
          Already have an account?{" "}
          <span className="cursor-pointer text-neutral-900">Log in</span>
        </p>
      </div>
    </div>
  );
}
