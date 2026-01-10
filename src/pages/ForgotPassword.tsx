export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="flex max-w-85.75 flex-col gap-8 rounded-xl bg-white px-5 py-8">
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
            Enter your
          </p>
        </div>
      </div>
    </div>
  );
}
