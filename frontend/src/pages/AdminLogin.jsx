import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("https://content-wholeness-production-5ed0.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.role !== "ADMIN") {
          setError("Access denied. Admin credentials required.");
          return;
        }

        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data));
        navigate("/admin-dashboard");
      } else {
        setError("Invalid Admin Credentials");
      }
    } catch (err) {
      setError("Server not running. Please start the backend.");
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col">
      {/* HEADER */}
      <div className="flex items-center p-4 justify-between">
        <Link to="/">
          <span className="material-symbols-outlined cursor-pointer text-xl">
            arrow_back_ios
          </span>
        </Link>
        <h2 className="text-lg font-bold flex-1 text-center pr-12">
          Admin Access
        </h2>
      </div>
      {/* HERO */}
      <div className="flex flex-col items-center px-6 pt-8 pb-4">
        <div className="w-full max-w-[340px] aspect-video mb-8 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <span className="material-symbols-outlined text-6xl text-primary">
            lock_person
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 border border-primary/30">
          <span className="material-symbols-outlined text-primary">
            verified_user
          </span>
          <span className="text-primary text-xs font-bold uppercase">
            Secure Admin Portal
          </span>
        </div>

        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>

        <p className="text-gray-500 text-center mt-2 max-w-[300px]">
          Please enter your credentials to access the management dashboard.
        </p>
      </div>
      {/* LOGIN FORM */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 px-6 py-4">
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium pl-1">Email Address</label>
          <div className="relative mt-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              mail
            </span>
            <input
              type="email"
              placeholder="admin@platform.com"
              className="w-full h-14 rounded-lg border pl-12 pr-4 bg-white dark:bg-[#1b2132]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm font-medium pl-1">Password</label>
          <div className="relative mt-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              lock
            </span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-14 rounded-lg border pl-12 pr-12 bg-white dark:bg-[#1b2132]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 h-14 w-full rounded-xl bg-primary text-white text-lg font-bold shadow-lg"
        >
          Log In Securely
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-4">
          <div className="h-[1px] flex-1 bg-gray-300"></div>
          <span className="text-gray-400 text-xs uppercase">or</span>
          <div className="h-[1px] flex-1 bg-gray-300"></div>
        </div>

        <Link to="/login">
          <button
            type="button"
            className="h-12 w-full rounded-xl border text-sm font-medium"
          >
            Return to Student Portal
          </button>
        </Link>
      </form>
      {/* FOOTER */}
      <div className="mt-auto p-6 text-center text-xs text-gray-500">
        Authorized Personnel Only. All actions are logged and monitored.
      </div>
    </div>
  );
}

export default AdminLogin;
