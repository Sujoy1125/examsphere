import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import API from "../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ fullName: "", email: "", phone: "", exam: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    API.get("/user/profile").then(res => {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await API.put("/user/profile", { fullName: user.fullName, phone: user.phone, exam: user.exam });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile updated!");
    } catch { alert("Failed to update profile."); }
    finally { setSaving(false); }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) { alert("Passwords don't match"); return; }
    if (passwords.newPassword.length < 6) { alert("Password must be at least 6 characters"); return; }
    setChangingPw(true);
    try {
      await API.put("/user/change-password", { currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
      alert("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch { alert("Failed to change password. Check your current password."); }
    finally { setChangingPw(false); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Profile</h1>
        </header>

        <main className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full space-y-6">
          {/* Profile Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{user.fullName?.[0] || "U"}</span>
              </div>
              <div>
                <h2 className="font-bold text-slate-800">{user.fullName}</h2>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Full Name", key: "fullName", editable: true },
                { label: "Email", key: "email", editable: false },
                { label: "Phone", key: "phone", editable: true },
                { label: "Exam / Course", key: "exam", editable: true },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{field.label}</label>
                  <input
                    value={user[field.key] || ""}
                    onChange={e => field.editable && setUser({ ...user, [field.key]: e.target.value })}
                    disabled={!field.editable}
                    className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              ))}
              <button onClick={handleSave} disabled={saving}
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60">
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Change Password</h3>
            <div className="space-y-4">
              {[
                { label: "Current Password", key: "currentPassword" },
                { label: "New Password", key: "newPassword" },
                { label: "Confirm New Password", key: "confirmPassword" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f.label}</label>
                  <input type="password" value={passwords[f.key]}
                    onChange={e => setPasswords({ ...passwords, [f.key]: e.target.value })}
                    className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              ))}
              <button onClick={handleChangePassword} disabled={changingPw}
                className="w-full py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-60">
                {changingPw ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>

          {/* Logout */}
          <button onClick={handleLogout}
            className="w-full py-3 border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors">
            Logout
          </button>
        </main>
      </div>
    </div>
  );
}
