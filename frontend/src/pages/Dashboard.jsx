import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import API from "../services/api";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!token) { navigate("/login"); return; }
    if (storedUser) setUser(JSON.parse(storedUser));

    // Fetch real data in parallel
    Promise.all([
      API.get("/attempts/my").catch(() => ({ data: [] })),
      API.get("/tests").catch(() => ({ data: [] })),
    ]).then(([attemptsRes, testsRes]) => {
      const attempts = attemptsRes.data;
      const testList = testsRes.data;
      setTests(testList.slice(0, 3));
      setRecentAttempts(attempts.slice(0, 3));

      if (attempts.length > 0) {
        const scores = attempts.map(a => a.totalQuestions > 0 ? (a.score / (a.totalQuestions * 4)) * 100 : 0);
        const highest = Math.max(...scores);
        const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
        setStats({
          total: attempts.length,
          highest: Math.round(highest),
          avg: Math.round(avg),
        });
      }
    });
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-background-light font-display">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setOpen={setOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">

          {/* Welcome */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-6">
            <h2 className="text-xl font-bold">Welcome back, {user?.fullName?.split(" ")[0] || "Student"}! 👋</h2>
            <p className="text-white/80 text-sm mt-1">Ready for your next challenge?</p>
            <button onClick={() => navigate("/tests")}
              className="mt-4 px-5 py-2 bg-white text-primary font-semibold rounded-xl text-sm hover:bg-white/90 transition-colors">
              Browse Tests →
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Tests Attempted", value: stats?.total ?? "—", icon: "quiz", color: "bg-blue-50 text-blue-600" },
              { label: "Highest Score", value: stats ? `${stats.highest}%` : "—", icon: "emoji_events", color: "bg-yellow-50 text-yellow-600" },
              { label: "Average Score", value: stats ? `${stats.avg}%` : "—", icon: "bar_chart", color: "bg-green-50 text-green-600" },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className={`size-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Attempts */}
          {recentAttempts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-800">Recent Attempts</h3>
                <button onClick={() => navigate("/my-attempts")} className="text-primary text-sm font-medium">View all</button>
              </div>
              <div className="space-y-3">
                {recentAttempts.map((a, i) => {
                  const pct = a.totalQuestions > 0 ? Math.round((a.score / (a.totalQuestions * 4)) * 100) : 0;
                  return (
                    <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{a.testTitle}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{new Date(a.attemptedAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-lg font-bold ${pct >= 60 ? "text-green-600" : "text-red-500"}`}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Available Tests */}
          {tests.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-800">Available Tests</h3>
                <button onClick={() => navigate("/tests")} className="text-primary text-sm font-medium">View all</button>
              </div>
              <div className="space-y-3">
                {tests.map((t, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{t.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{t.durationMinutes} min • {t.difficulty}</p>
                    </div>
                    <button onClick={() => { localStorage.setItem("currentTest", JSON.stringify(t)); navigate("/instructions"); }}
                      className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
