import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const ICONS = ["science", "biotech", "calculate", "eco", "menu_book", "public", "history_edu", "language", "psychology", "computer"];
const COLORS = ["bg-blue-100 text-blue-600", "bg-green-100 text-green-600", "bg-purple-100 text-purple-600",
  "bg-emerald-100 text-emerald-600", "bg-orange-100 text-orange-600", "bg-cyan-100 text-cyan-600",
  "bg-pink-100 text-pink-600", "bg-yellow-100 text-yellow-600"];

export default function ManageSubjects() {
  const [open, setOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [form, setForm] = useState({ name: "", icon: "school" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) { navigate("/admin-login"); return; }
    fetchSubjects();
  }, []);

  const fetchSubjects = () => {
    fetch("http://localhost:8080/api/admin/subjects", { headers })
      .then(r => r.json()).then(setSubjects).catch(() => setSubjects([]))
      .finally(() => setLoading(false));
  };

  const openAdd = () => { setEditingSubject(null); setForm({ name: "", icon: "school" }); setShowModal(true); };
  const openEdit = (s) => { setEditingSubject(s); setForm({ name: s.name, icon: s.icon || "school" }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const url = editingSubject
        ? `http://localhost:8080/api/admin/subjects/${editingSubject.id}`
        : "http://localhost:8080/api/admin/subjects";
      const method = editingSubject ? "PUT" : "POST";
      await fetch(url, { method, headers, body: JSON.stringify({ name: form.name, icon: form.icon }) });
      fetchSubjects();
      setShowModal(false);
    } catch { alert("Failed to save subject."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/admin/subjects/${id}`, { method: "DELETE", headers });
      fetchSubjects();
      setDeleteConfirm(null);
    } catch { alert("Failed to delete subject."); }
  };

  const filtered = subjects.filter(s => s.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <AdminSidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-600" onClick={() => setOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-lg font-bold text-slate-800">Manage Subjects</h1>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90">
            <span className="material-symbols-outlined text-[18px]">add</span>Add Subject
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-xs text-slate-500">Total Subjects</p>
              <p className="text-2xl font-bold text-primary">{subjects.length}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-xs text-slate-500">Status</p>
              <p className="text-2xl font-bold text-green-600">Active</p>
            </div>
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input type="text" placeholder="Search subjects..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="material-symbols-outlined text-5xl">category</span>
              <p className="mt-2 font-medium">No subjects yet</p>
              <p className="text-sm">Click "Add Subject" to create one</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((subject, idx) => (
                <div key={subject.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className={`size-12 rounded-2xl ${COLORS[idx % COLORS.length]} flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-[24px]">{subject.icon || "category"}</span>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(subject)} className="size-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => setDeleteConfirm(subject.id)} className="size-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 mt-3">{subject.name}</h3>
                  <button onClick={() => navigate("/admin/tests")} className="mt-2 text-xs text-primary font-medium hover:underline">View Tests →</button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{editingSubject ? "Edit Subject" : "Add New Subject"}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Subject Name *</label>
                <input type="text" placeholder="e.g. Physics" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {ICONS.map(icon => (
                    <button key={icon} onClick={() => setForm({ ...form, icon })}
                      className={`size-10 rounded-lg flex items-center justify-center transition-colors
                        ${form.icon === icon ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                      <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? "Saving..." : editingSubject ? "Save Changes" : "Add Subject"}
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
            <h3 className="font-bold text-slate-800 mb-2">Delete Subject?</h3>
            <p className="text-sm text-slate-500 mb-6">All tests under this subject will also be removed.</p>
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
