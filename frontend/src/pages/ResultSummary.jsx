import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultSummary() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const r = localStorage.getItem("lastResult");
    if (!r) { navigate("/tests"); return; }
    setResult(JSON.parse(r));
  }, []);

  if (!result) return null;

  const pct = result.totalQuestions > 0 ? Math.round((result.score / (result.totalQuestions * 4)) * 100) : 0;
  const grade = pct >= 80 ? "Excellent" : pct >= 60 ? "Good" : pct >= 40 ? "Average" : "Needs Improvement";
  const gradeColor = pct >= 80 ? "text-green-600" : pct >= 60 ? "text-blue-600" : pct >= 40 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="min-h-screen bg-slate-50 font-display flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-md w-full text-center">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-primary text-4xl">emoji_events</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Test Completed!</h1>
        <p className="text-slate-500 text-sm mb-6">{result.testTitle}</p>

        <div className={`text-5xl font-bold mb-1 ${gradeColor}`}>{result.score}</div>
        <p className="text-slate-400 text-sm mb-1">Total Score</p>
        <p className={`font-semibold mb-6 ${gradeColor}`}>{grade}</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-green-600">{result.correctAnswers}</p>
            <p className="text-xs text-green-700 mt-1">Correct</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-red-600">{result.wrongAnswers}</p>
            <p className="text-xs text-red-700 mt-1">Wrong</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-slate-500">{result.skippedAnswers}</p>
            <p className="text-xs text-slate-500 mt-1">Skipped</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={() => navigate(`/analysis`)}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors">
            View Answer Analysis
          </button>
          <button onClick={() => navigate("/tests")}
            className="w-full py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
            Back to Tests
          </button>
        </div>
      </div>
    </div>
  );
}
