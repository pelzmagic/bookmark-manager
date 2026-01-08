export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="bg-neutral-0 flex max-w-85.75 flex-col gap-8 rounded-xl px-5 py-8">
        <div>
          <img src="/Bookmark.png" alt="bookmark icon" className="h-8 w-8" />
          <p>Bookmark Manager</p>
        </div>

        <div>
          <h1>Log in to your account</h1>
          <p>Welcome back! Please enter your details</p>
        </div>

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="text" />
          </div>
          <button>Log in</button>
        </form>

        <div>
          <p>Forgot Password?</p> <span>Reset it</span>
          <p>
            Don't have an account? <span>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
