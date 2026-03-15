import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
function NavBar() {
  return (
    <div>
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-white/80 px-4 py-3 border-b">
        <h1 className="text-xl font-bold text-primary">ExamSphere</h1>
        <div className="flex gap-4">
          {" "}
          <Link
            to="/admin-login"
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            {" "}
            Admin{" "}
          </Link>{" "}
          <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-lg">
            {" "}
            Login{" "}
          </Link>{" "}
          <Link
            to="/register"
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            {" "}
            Sign Up{" "}
          </Link>{" "}
        </div>{" "}
      </nav>
    </div>
  );
}

export default NavBar;
