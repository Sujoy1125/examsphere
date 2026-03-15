import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await API.post("/auth/login", formData);

  //     // backend returns JWT
  //     const token = res.data;

  //     localStorage.setItem("token", token);
  //     localStorage.setItem("isLoggedIn", "true");

  //     navigate("/dashboard");
  //   } catch (error) {
  //     alert(error.response?.data?.error || "Login Failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);
      const data = res.data;

      // backend returns AuthResponse object with token, role, user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        exam: data.exam,
        role: data.role,
      }));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-4 font-display">
      {/* Branding */}
      <div className="w-full max-w-[440px] text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4 shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-white text-4xl">
            auto_stories
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ExamSphere
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Online MCQ Mock Test Platform
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-[440px] bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Enter your credentials to access your dashboard.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <span className="material-symbols-outlined text-xl">mail</span>
              </span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="student@university.edu"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <span className="material-symbols-outlined text-xl">lock</span>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Register */}
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
