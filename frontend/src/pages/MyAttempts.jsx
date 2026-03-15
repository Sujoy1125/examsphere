import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SideBar from "../components/SideBar";

export default function MyAttempts() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    API.get("/attempts/my")
      .then(res => setAttempts(res.data))
      .catch(() => setAttempts([]))
      .finally(() => setLoading(false));
  }, []);

  const viewAnalysis = (attempt) => {
    localStorage.setItem("lastResult", JSON.stringify(attempt));
    navigate("/analysis");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-lg font-bold text-slate-800">My Attempts</h1>
        </header>
        <main className="flex-1 p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center py-16">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            </div>
          ) : attempts.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="material-symbols-outlined text-5xl">history_edu</span>
              <p className="mt-2 font-medium">No attempts yet</p>
              <button onClick={() => navigate("/tests")} className="mt-4 px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold">
                Take a Test
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {attempts.map((a, i) => {
                const pct = a.totalQuestions > 0 ? Math.round((a.score / (a.totalQuestions * 4)) * 100) : 0;
                return (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{a.testTitle}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.subject} • {new Date(a.attemptedAt).toLocaleDateString()}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-green-600 font-medium">{a.correctAnswers} correct</span>
                        <span className="text-red-500">{a.wrongAnswers} wrong</span>
                        <span className="text-slate-400">{a.skippedAnswers} skipped</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${pct >= 60 ? "text-green-600" : "text-red-500"}`}>{pct}%</p>
                        <p className="text-xs text-slate-400">Score</p>
                      </div>
                      <button onClick={() => viewAnalysis(a)}
                        className="px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-xl hover:bg-primary/20 transition-colors">
                        Analysis
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
