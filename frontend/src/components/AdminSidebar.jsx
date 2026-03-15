import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar({ open, setOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: "dashboard" },
    { name: "Manage Subjects", path: "/admin/subjects", icon: "category" },
    { name: "Manage Tests", path: "/admin/tests", icon: "quiz" },
    { name: "Questions", path: "/admin/questions", icon: "help_outline" },
    { name: "Student Attempts", path: "/admin/attempts", icon: "history_edu" },
    { name: "Analytics", path: "/admin/analytics", icon: "bar_chart" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-20 lg:w-64 flex flex-col shadow-2xl`}
      >
        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
              ES
            </div>
            <span className="hidden lg:block text-white font-bold text-lg">ExamSphere</span>
          </div>
          <p className="hidden lg:block text-white/40 text-xs mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 h-11 px-3 rounded-xl transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-primary text-white font-semibold shadow-lg"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="hidden lg:block text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/admin-login";
            }}
            className="w-full flex items-center gap-3 h-11 px-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="hidden lg:block text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
