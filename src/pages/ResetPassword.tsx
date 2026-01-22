export default function ResetPassword() {
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
            Reset Your Password?
          </h1>
          <p className="font-manrope text-sm leading-[150%] font-medium text-neutral-800">
            Enter your new password below. Make sure it's strong and secure.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="new password"
              className="font-manrope cursor-pointer text-sm leading-[140%] font-semibold text-neutral-900"
            >
              New Password <span className="text-neutral-900">*</span>
            </label>
            <input
              type="password"
              id="new password"
              name="new password"
              className="rounded-lg border border-neutral-500 p-3 shadow-xs outline-0"
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
              className="rounded-lg border border-neutral-500 p-3 shadow-xs outline-0"
            />
          </div>

          <button className="font-manrope cursor-pointer rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white">
            Reset password
          </button>
        </form>

        <p className="font-manrope cursor-pointer text-center text-sm leading-[140%] font-semibold text-neutral-900">
          Back to login
        </p>
      </div>
    </div>
  );
}
