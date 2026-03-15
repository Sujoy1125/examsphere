import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AttemptTest() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [test, setTest] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    const storedTest = JSON.parse(localStorage.getItem("currentTest") || "null");
    if (!storedTest) { navigate("/tests"); return; }

    setTest(storedTest);
    setTime(storedTest.durationMinutes * 60);

    API.get(`/tests/${storedTest.id}/questions`)
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load questions.");
        navigate("/tests");
      });
  }, []);

  // Timer
  useEffect(() => {
    if (loading || time <= 0) return;
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) { clearInterval(timer); handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, time > 0]);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const selectOption = (option) => {
    setAnswers({ ...answers, [questions[currentQ].id]: option });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    const timeTaken = test ? test.durationMinutes * 60 - time : 0;
    // Build answers map: questionId -> selectedOption
    const answersMap = {};
    Object.entries(answers).forEach(([qId, opt]) => { answersMap[qId] = opt; });
    try {
      const res = await API.post("/attempts/submit", {
        testId: test.id,
        answers: answersMap,
        timeTakenSeconds: timeTaken,
      });
      localStorage.setItem("lastResult", JSON.stringify(res.data));
      navigate("/result");
    } catch (err) {
      alert("Failed to submit. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <span className="material-symbols-outlined animate-spin text-primary text-5xl">progress_activity</span>
    </div>
  );

  const q = questions[currentQ];
  const options = q ? [q.optionA, q.optionB, q.optionC, q.optionD] : [];
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen bg-slate-50 font-display flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between sticky top-0 z-20">
        <span className="font-bold text-slate-800 text-sm truncate max-w-[200px]">{test?.title}</span>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${time < 60 ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"}`}>
          <span className="material-symbols-outlined text-[16px]">timer</span>
          {formatTime()}
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white px-4 py-2 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Question {currentQ + 1} of {questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full">
        {/* Question */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
          <p className="text-slate-800 font-medium leading-relaxed">{q?.questionText}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {options.map((opt, i) => (
            <button key={i} onClick={() => selectOption(optionLabels[i])}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all
                ${answers[q?.id] === optionLabels[i]
                  ? "border-primary bg-primary/5 text-primary font-semibold"
                  : "border-slate-200 bg-white text-slate-700 hover:border-primary/40"}`}>
              <span className={`size-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                ${answers[q?.id] === optionLabels[i] ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}>
                {optionLabels[i]}
              </span>
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
            disabled={currentQ === 0}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors">
            ← Previous
          </button>

          {currentQ < questions.length - 1 ? (
            <button onClick={() => setCurrentQ(q => q + 1)}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
              Next →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-60">
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          )}
        </div>

        {/* Question Grid */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-3">Question Navigator</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((qItem, i) => (
              <button key={i} onClick={() => setCurrentQ(i)}
                className={`size-8 rounded-lg text-xs font-bold transition-colors
                  ${i === currentQ ? "bg-primary text-white"
                    : answers[qItem.id] ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
