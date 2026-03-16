import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

const BarChart = ({ data, valueKey, labelKey, color = "bg-primary" }) => {
  const max = Math.max(...data.map(d => d[valueKey]), 1);
  return (
    <div className="flex items-end gap-2 h-40 mt-4">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-slate-500">{d[valueKey]}</span>
          <div className={`w-full rounded-t-lg ${color} transition-all duration-700`}
            style={{ height: `${(d[valueKey] / max) * 100}%`, minHeight: 6 }} />
          <span className="text-[10px] text-slate-400 text-center leading-tight">{d[labelKey]}</span>
        </div>
      ))}
    </div>
  );
};

export default function ResultAnalytics() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("overview");
  const [attempts, setAttempts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) { navigate("/admin-login"); return; }
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch("https://examsphere-backend.onrender.com/api/admin/attempts", { headers }).then(r => r.json()),
      fetch("https://examsphere-backend.onrender.com/api/attempts/leaderboard", { headers }).then(r => r.json()),
    ]).then(([a, l]) => { setAttempts(a); setLeaderboard(l); })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Compute stats from real data
  const totalAttempts = attempts.length;
  const overallAvg = totalAttempts > 0
    ? Math.round(attempts.reduce((s, a) => s + (a.totalQuestions > 0 ? (a.score / (a.totalQuestions * 4)) * 100 : 0), 0) / totalAttempts)
    : 0;
  const passRate = totalAttempts > 0
    ? Math.round((attempts.filter(a => (a.totalQuestions > 0 ? (a.score / (a.totalQuestions * 4)) * 100 : 0) >= 50).length / totalAttempts) * 100)
    : 0;

  // Monthly chart
  const monthMap = {};
  attempts.forEach(a => {
    if (a.attemptedAt) {
      const month = new Date(a.attemptedAt).toLocaleString("default", { month: "short" });
      monthMap[month] = (monthMap[month] || 0) + 1;
    }
  });
  const monthlyData = Object.entries(monthMap).slice(-6).map(([month, attempts]) => ({ month, attempts }));

  // Per-test breakdown
  const testMap = {};
  attempts.forEach(a => {
    if (!testMap[a.testTitle]) testMap[a.testTitle] = { total: 0, scoreSum: 0, pass: 0 };
    const pct = a.totalQuestions > 0 ? (a.score / (a.totalQuestions * 4)) * 100 : 0;
    testMap[a.testTitle].total++;
    testMap[a.testTitle].scoreSum += pct;
    if (pct >= 50) testMap[a.testTitle].pass++;
  });
  const testScores = Object.entries(testMap).map(([test, d]) => ({
    test: test.length > 12 ? test.slice(0, 12) + "…" : test,
    fullTitle: test,
    avg: Math.round(d.scoreSum / d.total),
    attempts: d.total,
    pass: Math.round((d.pass / d.total) * 100),
  }));

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <AdminSidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-600" onClick={() => setOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-lg font-bold text-slate-800">Result Analytics</h1>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Live Data</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {loading ? (
            <div className="flex justify-center py-16"><span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span></div>
          ) : (
            <>
              {/* Summary */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Attempts", value: totalAttempts, icon: "history_edu", color: "bg-blue-50 text-blue-600" },
                  { label: "Overall Avg Score", value: `${overallAvg}%`, icon: "bar_chart", color: "bg-purple-50 text-purple-600" },
                  { label: "Pass Rate", value: `${passRate}%`, icon: "check_circle", color: "bg-green-50 text-green-600" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className={`size-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                      <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                {["overview", "tests", "students"].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
                      ${tab === t ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                    {t}
                  </button>
                ))}
              </div>

              {tab === "overview" && (
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800">Monthly Attempts</h3>
                    <p className="text-sm text-slate-400">Test attempts over time</p>
                    {monthlyData.length > 0
                      ? <BarChart data={monthlyData} valueKey="attempts" labelKey="month" color="bg-blue-500" />
                      : <p className="text-center text-slate-400 py-10 text-sm">No data yet</p>}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800">Avg Score per Test</h3>
                    <p className="text-sm text-slate-400">How students perform per test</p>
                    {testScores.length > 0
                      ? <BarChart data={testScores} valueKey="avg" labelKey="test" color="bg-primary" />
                      : <p className="text-center text-slate-400 py-10 text-sm">No data yet</p>}
                  </div>
                </div>
              )}

              {tab === "tests" && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-5 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Test Performance Breakdown</h3>
                  </div>
                  {testScores.length === 0 ? (
                    <p className="text-center text-slate-400 py-10">No attempt data yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Test</th>
                            <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Attempts</th>
                            <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Avg Score</th>
                            <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Pass Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {testScores.map((t, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="px-6 py-4 font-semibold text-sm text-slate-800">{t.fullTitle}</td>
                              <td className="px-6 py-4 text-sm text-slate-600">{t.attempts}</td>
                              <td className="px-6 py-4">
                                <span className={`font-bold text-sm ${t.avg >= 75 ? "text-green-600" : t.avg >= 50 ? "text-yellow-600" : "text-red-500"}`}>{t.avg}%</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[80px]">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${t.pass}%` }} />
                                  </div>
                                  <span className="text-xs text-slate-500">{t.pass}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {tab === "students" && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-5 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Top Performing Students</h3>
                  </div>
                  {leaderboard.length === 0 ? (
                    <p className="text-center text-slate-400 py-10">No student data yet</p>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {leaderboard.slice(0, 10).map((s, i) => (
                        <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                          <div className="text-lg font-bold text-slate-400 w-8 text-center">
                            {medals[i] || `#${i + 1}`}
                          </div>
                          <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                            {s.fullName?.[0] || "?"}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800 text-sm">{s.fullName}</p>
                            <p className="text-xs text-slate-400">{s.testsAttempted} tests attempted</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-800">{Math.round(s.averageScore)}%</p>
                            <p className="text-xs text-slate-400">avg score</p>
                          </div>
                          <div className="w-24 hidden sm:block">
                            <div className="bg-slate-100 rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${Math.min(s.averageScore, 100)}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
