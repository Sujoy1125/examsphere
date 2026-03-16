import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const BarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-36 mt-4">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-slate-500 font-medium">{d.value}</span>
          <div className="w-full rounded-t-md bg-primary transition-all duration-500"
            style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }} />
          <span className="text-[10px] text-slate-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ students: 0, tests: 0, attempts: 0, avgScore: 0 });
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) { navigate("/admin-login"); return; }

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("https://examsphere-backend.onrender.com/api/admin/attempts", { headers }),
      fetch("https://examsphere-backend.onrender.com/api/admin/tests", { headers }),
    ]).then(async ([attRes, testRes]) => {
      const attempts = attRes.ok ? await attRes.json() : [];
      const tests = testRes.ok ? await testRes.json() : [];

      const uniqueStudents = new Set(attempts.map(a => a.testId)).size;
      const avgScore = attempts.length > 0
        ? Math.round(attempts.reduce((s, a) => s + (a.totalQuestions > 0 ? (a.score / (a.totalQuestions * 4)) * 100 : 0), 0) / attempts.length)
        : 0;

      setStats({ students: uniqueStudents, tests: tests.length, attempts: attempts.length, avgScore });
      setRecentAttempts(attempts.slice(0, 5));

      // Build monthly chart from real data
      const monthMap = {};
      attempts.forEach(a => {
        if (a.attemptedAt) {
          const month = new Date(a.attemptedAt).toLocaleString("default", { month: "short" });
          monthMap[month] = (monthMap[month] || 0) + 1;
        }
      });
      const chartArr = Object.entries(monthMap).slice(-6).map(([label, value]) => ({ label, value }));
      setChartData(chartArr.length > 0 ? chartArr : [{ label: "No data", value: 0 }]);
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <AdminSidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-600" onClick={() => setOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Welcome back, {adminUser.fullName || "Admin"}</p>
            </div>
          </div>
          <div className="size-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
            {(adminUser.fullName?.[0] || "A")}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Tests", value: stats.tests, icon: "quiz", color: "bg-green-50 text-green-600" },
              { label: "Total Attempts", value: stats.attempts, icon: "history_edu", color: "bg-orange-50 text-orange-600" },
              { label: "Avg Score", value: `${stats.avgScore}%`, icon: "bar_chart", color: "bg-purple-50 text-purple-600" },
              { label: "Unique Students", value: stats.students, icon: "school", color: "bg-blue-50 text-blue-600" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{s.value}</p>
                  </div>
                  <div className={`size-10 rounded-xl ${s.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800">Attempts Over Time</h3>
              <p className="text-sm text-slate-400">Monthly test attempt activity</p>
              <BarChart data={chartData} />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { label: "Add New Test", icon: "add_circle", path: "/admin/tests", color: "text-blue-600 bg-blue-50" },
                  { label: "Add Question", icon: "help_outline", path: "/admin/questions", color: "text-green-600 bg-green-50" },
                  { label: "Add Subject", icon: "category", path: "/admin/subjects", color: "text-orange-600 bg-orange-50" },
                  { label: "View Analytics", icon: "bar_chart", path: "/admin/analytics", color: "text-purple-600 bg-purple-50" },
                ].map((action) => (
                  <button key={action.label} onClick={() => navigate(action.path)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                    <div className={`size-9 rounded-lg ${action.color} flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{action.label}</span>
                    <span className="material-symbols-outlined text-slate-300 ml-auto text-[18px]">arrow_forward_ios</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Attempts */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Recent Attempts</h3>
              <button onClick={() => navigate("/admin/attempts")} className="text-sm text-primary font-medium hover:underline">View all</button>
            </div>
            {recentAttempts.length === 0 ? (
              <p className="text-center text-slate-400 py-10">No attempts yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Test</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Score</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Correct</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentAttempts.map((a, i) => {
                      const pct = a.totalQuestions > 0 ? Math.round((a.score / (a.totalQuestions * 4)) * 100) : 0;
                      return (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-6 py-4 text-sm font-medium text-slate-800">{a.testTitle}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold
                              ${pct >= 80 ? "bg-green-100 text-green-700" : pct >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                              {pct}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{a.correctAnswers}/{a.totalQuestions}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{a.attemptedAt ? new Date(a.attemptedAt).toLocaleDateString() : "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
