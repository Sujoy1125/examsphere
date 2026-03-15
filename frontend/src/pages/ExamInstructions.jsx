import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ExamInstructions() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [test, setTest] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentTest");
    if (!stored) { navigate("/tests"); return; }
    setTest(JSON.parse(stored));
  }, []);

  const startExam = () => {
    if (!agreed) return;
    navigate("/attempt-test");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-display flex flex-col">
      {/* HEADER */}
      <div className="flex items-center p-4 border-b bg-white">
        <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-800">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg pr-8">Exam Instructions</h1>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 pb-40 max-w-2xl mx-auto w-full">

        {/* Test Info Card */}
        {test && (
          <div className="mt-6 p-5 bg-primary/5 rounded-2xl border border-primary/20">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3
              ${test.difficulty === "Easy" ? "bg-green-100 text-green-700"
                : test.difficulty === "Hard" ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"}`}>
              {test.difficulty}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mb-4">{test.title}</h2>
            <div className="grid grid-cols-3 gap-4 border-t border-primary/20 pt-4">
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Duration</p>
                <p className="font-bold text-slate-800">{test.durationMinutes} mins</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Questions</p>
                <p className="font-bold text-slate-800">{test.questionCount ?? "—"} MCQs</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Subject</p>
                <p className="font-bold text-slate-800">{test.subject ?? "—"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <h3 className="mt-8 mb-4 text-lg font-bold text-slate-800">General Instructions</h3>
        <div className="space-y-3">
          <Instruction icon="timer" title="Countdown Timer"
            desc="The test will automatically submit when the timer reaches zero. Keep an eye on the time." />
          <Instruction icon="quiz" title="Navigation"
            desc="You can move between questions using the navigator panel. You can go back and change answers." />
          <Instruction icon="upload" title="Auto Submit"
            desc="When time runs out, your answers will be submitted automatically." />
          <Instruction icon="calculate" title="Marking Scheme"
            desc="+4 marks for every correct answer. -1 mark for every wrong answer. 0 for unattempted." danger />
          <Instruction icon="block" title="Fair Play"
            desc="Using unfair means or external resources is strictly prohibited." danger />
        </div>

        <div className="mt-6 text-center text-sm text-slate-400 border-y border-slate-200 py-3">
          📋 Read all instructions carefully before starting
        </div>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-5 max-w-2xl mx-auto w-full">
        <label className="flex items-start gap-3 mb-4 cursor-pointer">
          <input type="checkbox" className="mt-1 h-5 w-5 accent-primary"
            checked={agreed} onChange={() => setAgreed(!agreed)} />
          <span className="text-sm text-slate-600">
            I have read and understood all instructions and I am ready to begin the test.
          </span>
        </label>
        <button onClick={startExam} disabled={!agreed}
          className={`w-full py-4 rounded-xl font-bold text-white transition-colors
            ${agreed ? "bg-primary hover:bg-primary/90" : "bg-slate-300 cursor-not-allowed"}`}>
          Start Test ▶
        </button>
      </div>
    </div>
  );
}

function Instruction({ icon, title, desc, danger }) {
  return (
    <div className={`flex gap-4 p-4 rounded-xl border
      ${danger ? "bg-red-50 border-red-200" : "bg-white border-slate-100"}`}>
      <div className={`size-10 rounded-lg flex items-center justify-center shrink-0
        ${danger ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"}`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <div>
        <p className="font-bold text-slate-800 text-sm">{title}</p>
        <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
