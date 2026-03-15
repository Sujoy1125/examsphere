import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const emptyForm = { testId: "", questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A", explanation: "" };

export default function QuestionManagement() {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingQ, setEditingQ] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) { navigate("/admin-login"); return; }
    fetch("https://content-wholeness-production-5ed0.up.railway.app/api/admin/tests", { headers })
      .then(r => r.json()).then(t => { setTests(t); if (t.length > 0) setSelectedTest(String(t[0].id)); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedTest) return;
    setLoading(true);
    fetch(`https://content-wholeness-production-5ed0.up.railway.app/api/tests/${selectedTest}/questions`, { headers })
      .then(r => r.json()).then(setQuestions).catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, [selectedTest]);

  const validate = () => {
    const e = {};
    if (!form.testId) e.testId = "Select a test";
    if (!form.questionText.trim()) e.questionText = "Question text is required";
    if (!form.optionA.trim()) e.optionA = "Option A is required";
    if (!form.optionB.trim()) e.optionB = "Option B is required";
    if (!form.optionC.trim()) e.optionC = "Option C is required";
    if (!form.optionD.trim()) e.optionD = "Option D is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditingQ(null);
    setForm({ ...emptyForm, testId: selectedTest });
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (q) => {
    setEditingQ(q);
    setForm({ testId: selectedTest, questionText: q.questionText, optionA: q.optionA, optionB: q.optionB, optionC: q.optionC, optionD: q.optionD, correctOption: q.correctOption || "A", explanation: q.explanation || "" });
    setErrors({});
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const url = editingQ ? `https://content-wholeness-production-5ed0.up.railway.app/api/admin/questions/${editingQ.id}` : "https://content-wholeness-production-5ed0.up.railway.app/api/admin/questions";
      const method = editingQ ? "PUT" : "POST";
      await fetch(url, { method, headers, body: JSON.stringify({ ...form, testId: Number(form.testId) }) });
      // Reload questions
      const res = await fetch(`https://content-wholeness-production-5ed0.up.railway.app/api/tests/${selectedTest}/questions`, { headers });
      setQuestions(await res.json());
      setShowModal(false);
    } catch { alert("Failed to save question."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    await fetch(`https://content-wholeness-production-5ed0.up.railway.app/api/admin/questions/${id}`, { method: "DELETE", headers });
    setQuestions(questions.filter(q => q.id !== id));
    setDeleteConfirm(null);
  };

  const optionColor = (opt) => ({ A: "bg-blue-100 text-blue-700", B: "bg-green-100 text-green-700", C: "bg-yellow-100 text-yellow-700", D: "bg-red-100 text-red-700" }[opt] || "");

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <AdminSidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-600" onClick={() => setOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-lg font-bold text-slate-800">Question Management</h1>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90">
            <span className="material-symbols-outlined text-[18px]">add</span>Add Question
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          {/* Test selector */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <label className="text-sm font-semibold text-slate-700 block mb-2">Select Test</label>
            {tests.length === 0 ? (
              <p className="text-sm text-slate-400">No tests found. <button onClick={() => navigate("/admin/tests")} className="text-primary underline">Create a test first</button></p>
            ) : (
              <select value={selectedTest} onChange={e => setSelectedTest(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {tests.map(t => <option key={t.id} value={t.id}>{t.title} ({t.subject})</option>)}
              </select>
            )}
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">help_outline</span>
            <div>
              <p className="font-bold text-slate-800">{questions.length} Questions</p>
              <p className="text-xs text-slate-400">in selected test</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span></div>
          ) : questions.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="material-symbols-outlined text-5xl">help_outline</span>
              <p className="mt-2 font-medium">No questions yet</p>
              <p className="text-sm">Click "Add Question" to create one</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="size-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                        <p className="font-medium text-slate-800 text-sm">{q.questionText}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {[["A", q.optionA], ["B", q.optionB], ["C", q.optionC], ["D", q.optionD]].map(([label, opt]) => (
                          <div key={label} className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5
                            ${q.correctOption === label ? "bg-green-100 text-green-800 font-semibold" : "bg-slate-50 text-slate-600"}`}>
                            <span className={`size-5 rounded-full text-[10px] font-bold flex items-center justify-center ${optionColor(label)}`}>{label}</span>
                            {opt}
                            {q.correctOption === label && <span className="material-symbols-outlined text-green-600 text-[14px] ml-auto">check_circle</span>}
                          </div>
                        ))}
                      </div>
                      {q.explanation && <p className="mt-2 text-xs text-slate-400 italic">💡 {q.explanation}</p>}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => openEdit(q)} className="size-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => setDeleteConfirm(q.id)} className="size-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-800 mb-5">{editingQ ? "Edit Question" : "Add New Question"}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Test *</label>
                <select value={form.testId} onChange={e => setForm({ ...form, testId: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {tests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Question Text *</label>
                <textarea rows={3} placeholder="Enter the question..." value={form.questionText}
                  onChange={e => setForm({ ...form, questionText: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none ${errors.questionText ? "border-red-400" : "border-slate-200"}`} />
                {errors.questionText && <p className="text-xs text-red-500 mt-1">{errors.questionText}</p>}
              </div>
              {["A", "B", "C", "D"].map(label => (
                <div key={label}>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Option {label} *</label>
                  <input type="text" placeholder={`Option ${label}`} value={form[`option${label}`]}
                    onChange={e => setForm({ ...form, [`option${label}`]: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors[`option${label}`] ? "border-red-400" : "border-slate-200"}`} />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Correct Answer *</label>
                <div className="flex gap-3">
                  {["A", "B", "C", "D"].map(label => (
                    <button key={label} onClick={() => setForm({ ...form, correctOption: label })}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors
                        ${form.correctOption === label ? "bg-green-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Explanation (optional)</label>
                <textarea rows={2} placeholder="Why is this the correct answer?" value={form.explanation}
                  onChange={e => setForm({ ...form, explanation: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? "Saving..." : editingQ ? "Save Changes" : "Add Question"}
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
            <h3 className="font-bold text-slate-800 mb-2">Delete Question?</h3>
            <p className="text-sm text-slate-500 mb-6">This cannot be undone.</p>
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
