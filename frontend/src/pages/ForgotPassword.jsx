import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    ```
// later you will call Spring Boot API here
// fetch("https://content-wholeness-production-5ed0.up.railway.app/auth/forgot-password", { method:"POST", body: JSON.stringify({email}) })

console.log("Reset link sent to:", email);

setSent(true);
```;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark font-display p-6">
      ```
      <div className="w-full max-w-md bg-white dark:bg-background-dark/80 shadow-xl rounded-2xl p-8">
        {/* BACK BUTTON */}
        <Link to="/login" className="text-primary hover:underline">
          ← Back to Login
        </Link>

        {/* ---------- REQUEST FORM ---------- */}
        {!sent && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-gray-500">
                Enter your registered email and we’ll send you a reset link.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                required
                placeholder="student@university.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border rounded-xl px-4 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition"
            >
              Send Reset Link
            </button>

            <p className="text-center text-sm text-gray-500">
              Remember your password?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Log in
              </Link>
            </p>
          </form>
        )}

        {/* ---------- SUCCESS STATE ---------- */}
        {sent && (
          <div className="text-center space-y-6 mt-6">
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-5xl">
                mark_email_read
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Check your email</h2>
              <p className="text-gray-500">
                We have sent a password recovery link to your registered email.
              </p>
            </div>

            <button
              onClick={() => setSent(false)}
              className="w-full h-12 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20"
            >
              Resend Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
