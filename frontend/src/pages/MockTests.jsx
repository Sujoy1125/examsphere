import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SideBar from "../components/SideBar";

export default function MockTests() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    API.get("/tests")
      .then(res => setTests(res.data))
      .catch(() => setTests([]))
      .finally(() => setLoading(false));
  }, []);

  const subjects = ["All", ...new Set(tests.map(t => t.subject || "General"))];
  const filtered = tests.filter(t => {
    const subjectMatch = filterSubject === "All" || (t.subject || "General") === filterSubject;
    const diffMatch = filterDifficulty === "All" || t.difficulty === filterDifficulty;
    const searchMatch = !search || t.title?.toLowerCase().includes(search.toLowerCase());
    return subjectMatch && diffMatch && searchMatch;
  });

  const handleStart = (test) => {
    localStorage.setItem("currentTest", JSON.stringify(test));
    navigate("/instructions");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
          <button className="md:hidden text-slate-600" onClick={() => setSidebarOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Mock Tests</h1>
        </header>
        <main className="flex-1 p-4 md:p-6">
          {/* Search & Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <input
              type="text" placeholder="Search tests..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none">
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none">
              {["All","Easy","Medium","Hard"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-48">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="material-symbols-outlined text-5xl">quiz</span>
              <p className="mt-2 font-medium">No tests found</p>
              <p className="text-sm">Ask your admin to add tests</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(test => (
                <div key={test.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-slate-800 text-sm leading-tight">{test.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                      ${test.difficulty === "Easy" ? "bg-green-100 text-green-700"
                        : test.difficulty === "Hard" ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"}`}>
                      {test.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">quiz</span>
                      {test.questionCount ?? "?"} Qs
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {test.durationMinutes} min
                    </span>
                    {test.subject && (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">category</span>
                        {test.subject}
                      </span>
                    )}
                  </div>
                  <button onClick={() => handleStart(test)}
                    className="mt-auto w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
