import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SideBar from "../components/SideBar";

export default function Leaderboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    API.get("/attempts/leaderboard")
      .then(res => setEntries(res.data))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Leaderboard</h1>
        </header>
        <main className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full">
          {loading ? (
            <div className="flex justify-center py-16">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="material-symbols-outlined text-5xl">leaderboard</span>
              <p className="mt-2">No data yet. Be the first to take a test!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((e, i) => (
                <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm border flex items-center gap-4
                  ${e.email === currentUser.email ? "border-primary/40 bg-primary/5" : "border-slate-100"}`}>
                  <span className="text-2xl w-8 text-center">{medals[i] || `#${i + 1}`}</span>
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                    {e.fullName?.[0] || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">
                      {e.fullName}
                      {e.email === currentUser.email && <span className="ml-2 text-xs text-primary font-medium">(You)</span>}
                    </p>
                    <p className="text-xs text-slate-400">{e.testsAttempted} tests taken</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">{e.averageScore}%</p>
                    <p className="text-xs text-slate-400">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
