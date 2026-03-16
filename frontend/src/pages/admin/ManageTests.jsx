import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

const difficulties = ["Easy", "Medium", "Hard"];
const emptyForm = { title: "", subjectId: "", durationMinutes: 60, difficulty: "Medium", active: true };

export default function ManageTests() {
  const [open, setOpen] = useState(false);
  const [tests, setTests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) { navigate("/admin-login"); return; }
    fetchAll();
  }, []);

  const fetchAll = () => {
    Promise.all([
      fetch("https://examsphere-backend.onrender.com/api/admin/tests", { headers }).then(r => r.json()),
      fetch("https://examsphere-backend.onrender.com/api/admin/subjects", { headers }).then(r => r.json()),
    ]).then(([t, s]) => { setTests(t); setSubjects(s); }).catch(() => {})
      .finally(() => setLoading(false));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.subjectId) e.subjectId = "Select a subject";
    if (!form.durationMinutes || form.durationMinutes < 1) e.durationMinutes = "Enter valid duration";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditingTest(null);
    setForm({ ...emptyForm, subjectId: subjects[0]?.id || "" });
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (test) => {
    setEditingTest(test);
    const subj = subjects.find(s => s.name === test.subject);
    setForm({
      title: test.title,
      subjectId: subj?.id || "",
      durationMinutes: test.durationMinutes,
      difficulty: test.difficulty,
      active: test.active,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const url = editingTest ? `https://examsphere-backend.onrender.com/api/admin/tests/${editingTest.id}` : "https://examsphere-backend.onrender.com/api/admin/tests";
      const method = editingTest ? "PUT" : "POST";
      await fetch(url, { method, headers, body: JSON.stringify(form) });
      fetchAll();
      setShowModal(false);
    } catch { alert("Failed to save test."); }
    finally { setSaving(false); }
  };

  const toggleActive = async (id) => {
    await fetch(`https://examsphere-backend.onrender.com/api/admin/tests/${id}/toggle`, { method: "PUT", headers });
    fetchAll();
  };

  const handleDelete = async (id) => {
    await fetch(`https://examsphere-backend.onrender.com/api/admin/tests/${id}`, { method: "DELETE", headers });
    fetchAll();
    setDeleteConfirm(null);
  };

  const filtered = tests.filter(t =>
    t.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const diffColor = (d) => d === "Easy" ? "bg-green-100 text-green-700" : d === "Hard" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <AdminSidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-600" onClick={() => setOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-lg font-bold text-slate-800">Manage Tests</h1>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90">
            <span className="material-symbols-outlined text-[18px]">add</span>Create Test
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          <div className="flex gap-4 overflow-x-auto pb-1">
            {[
              { label: "Total Tests", value: tests.length, color: "text-primary" },
              { label: "Active", value: tests.filter(t => t.active).length, color: "text-green-600" },
              { label: "Inactive", value: tests.filter(t => !t.active).length, color: "text-red-500" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 min-w-[120px]">
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="Search tests..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="material-symbols-outlined text-5xl">quiz</span>
              <p className="mt-2 font-medium">No tests yet</p>
              <p className="text-sm">Click "Create Test" to add one</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Test</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Subject</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Duration</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Difficulty</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Active</th>
                      <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map(test => (
                      <tr key={test.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-semibold text-sm text-slate-800">{test.title}</td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{test.subject}</span>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell text-xs text-slate-500">{test.durationMinutes} min</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${diffColor(test.difficulty)}`}>{test.difficulty}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleActive(test.id)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${test.active ? "bg-green-500" : "bg-slate-300"}`}>
                            <span className={`inline-block size-3.5 rounded-full bg-white shadow transition-transform ${test.active ? "translate-x-4" : "translate-x-0.5"}`} />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button onClick={() => openEdit(test)} className="size-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700">
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button onClick={() => setDeleteConfirm(test.id)} className="size-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500">
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-800 mb-5">{editingTest ? "Edit Test" : "Create New Test"}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Test Title *</label>
                <input type="text" placeholder="e.g. Physics Mock #1" value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.title ? "border-red-400" : "border-slate-200"}`} />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Subject *</label>
                {subjects.length === 0 ? (
                  <p className="text-xs text-red-500">No subjects found. <button onClick={() => { setShowModal(false); navigate("/admin/subjects"); }} className="underline">Add a subject first</button></p>
                ) : (
                  <select value={form.subjectId} onChange={e => setForm({ ...form, subjectId: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.subjectId ? "border-red-400" : "border-slate-200"}`}>
                    <option value="">Select subject</option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                )}
                {errors.subjectId && <p className="text-xs text-red-500 mt-1">{errors.subjectId}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Duration (min) *</label>
                  <input type="number" min={1} value={form.durationMinutes}
                    onChange={e => setForm({ ...form, durationMinutes: +e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.durationMinutes ? "border-red-400" : "border-slate-200"}`} />
                  {errors.durationMinutes && <p className="text-xs text-red-500 mt-1">{errors.durationMinutes}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Difficulty *</label>
                  <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {difficulties.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setForm({ ...form, active: !form.active })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? "bg-green-500" : "bg-slate-300"}`}>
                  <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${form.active ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <span className="text-sm text-slate-700">Active (visible to students)</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? "Saving..." : editingTest ? "Save Changes" : "Create Test"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center">
            <div className="size-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">delete_forever</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Delete Test?</h3>
            <p className="text-sm text-slate-500 mb-6">All questions in this test will also be removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
