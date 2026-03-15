import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SideBar from "../components/SideBar";

export default function AnswerAnalysis() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    const result = JSON.parse(localStorage.getItem("lastResult") || "null");
    if (!result?.attemptId) { navigate("/tests"); return; }

    API.get(`/attempts/${result.attemptId}/answers`)
      .then(res => setAnswers(res.data))
      .catch(() => setAnswers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-800">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Answer Analysis</h1>
        </header>
        <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full">
          {loading ? (
            <div className="flex justify-center py-16">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            </div>
          ) : answers.length === 0 ? (
            <p className="text-center text-slate-400 py-16">No answer data available.</p>
          ) : (
            <div className="space-y-4">
              {answers.map((a, i) => (
                <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border ${a.correct ? "border-green-200" : "border-red-200"}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${a.correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {i + 1}
                    </span>
                    <p className="text-slate-800 font-medium text-sm">{a.questionText}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {["A","B","C","D"].map((label, j) => {
                      const opt = [a.optionA, a.optionB, a.optionC, a.optionD][j];
                      const isCorrect = a.correctOption === label;
                      const isSelected = a.selectedOption === label;
                      return (
                        <div key={label} className={`px-3 py-2 rounded-lg flex items-center gap-2
                          ${isCorrect ? "bg-green-100 text-green-800 font-semibold"
                            : isSelected && !isCorrect ? "bg-red-100 text-red-800"
                            : "bg-slate-50 text-slate-600"}`}>
                          <span className="font-bold">{label}.</span> {opt}
                          {isCorrect && <span className="material-symbols-outlined text-green-600 text-[16px] ml-auto">check_circle</span>}
                          {isSelected && !isCorrect && <span className="material-symbols-outlined text-red-500 text-[16px] ml-auto">cancel</span>}
                        </div>
                      );
                    })}
                  </div>
                  {a.explanation && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                      <span className="font-semibold">Explanation: </span>{a.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
