function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left - Login Form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>

          <p className="mt-2 text-gray-600">Login to continue to TaskFlow</p>

          <form className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <span className="cursor-pointer font-medium text-blue-600">
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden bg-gray-100 md:flex items-center justify-center p-10">
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80"
            alt="People working together"
            className="h-full max-h-150 w-full rounded-2xl object-cover"
          />

          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Stay organized with TaskFlow
          </h2>

          <p className="mt-2 text-gray-600">
            Manage your tasks and stay productive.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

// grid-cols-1 - means vertaiclly , but we have hidden so image will hidden
//  Form
//  Image

// md:grid-cols-2 - means from the md breakpoint:
// form   Image

// Why min-h-screen?
// Make the container at least as tall as the browser screen.
// So our authentication page can occupy the whole screen.

// w-full means:
// Use the available width.

// max-w-md means:
// But don't allow the form to become too wide.
