import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

export default function AttemptHistory() {
  const [open, setOpen] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) { navigate("/admin-login"); return; }
    fetch("https://examsphere-backend.onrender.com/api/admin/attempts", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json()).then(setAttempts).catch(() => setAttempts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = attempts.filter(a =>
    a.testTitle?.toLowerCase().includes(search.toLowerCase())
  );

  const avgScore = attempts.length > 0
    ? Math.round(attempts.reduce((s, a) => s + (a.totalQuestions > 0 ? (a.score / (a.totalQuestions * 4)) * 100 : 0), 0) / attempts.length)
    : 0;

  const passRate = attempts.length > 0
    ? Math.round((attempts.filter(a => (a.totalQuestions > 0 ? (a.score / (a.totalQuestions * 4)) * 100 : 0) >= 50).length / attempts.length) * 100)
    : 0;

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <AdminSidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
          <button className="md:hidden text-slate-600" onClick={() => setOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Attempt History</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Attempts", value: attempts.length, color: "text-primary" },
              { label: "Avg Score", value: `${avgScore}%`, color: "text-blue-600" },
              { label: "Pass Rate", value: `${passRate}%`, color: "text-green-600" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="Search by test name..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex justify-center py-16"><span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="material-symbols-outlined text-5xl">history_edu</span>
              <p className="mt-2 font-medium">No attempts yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Test</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Subject</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Score</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Correct/Wrong/Skip</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((a, i) => {
                      const pct = a.totalQuestions > 0 ? Math.round((a.score / (a.totalQuestions * 4)) * 100) : 0;
                      return (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-semibold text-sm text-slate-800">{a.testTitle}</td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{a.subject}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold
                              ${pct >= 80 ? "bg-green-100 text-green-700" : pct >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                              {pct}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 hidden md:table-cell">
                            <span className="text-green-600 font-medium">{a.correctAnswers}✓</span>
                            {" / "}
                            <span className="text-red-500">{a.wrongAnswers}✗</span>
                            {" / "}
                            <span className="text-slate-400">{a.skippedAnswers}–</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-400">
                            {a.attemptedAt ? new Date(a.attemptedAt).toLocaleDateString() : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
