import { useState } from "react";

function CreateTestForm() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState("Easy");
  const [live, setLive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTest = {
      title,
      subject,
      duration,
      difficulty,
      live,
    };

    console.log("New Test Created:", newTest);
    alert("Test Created (check console)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-4 mt-2 mb-6 bg-white rounded-2xl p-5 shadow-sm border border-primary/10"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">note_add</span>
        <h2 className="text-base font-bold">Create New Test</h2>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-slate-500 block mb-1">
          Test Title
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-11 px-4 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="e.g. Advanced Calculus Mock 1"
        />
      </div>

      {/* Subject + Duration */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full h-11 px-3 bg-slate-100 rounded-lg text-sm"
          >
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Biology</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Duration (Min)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full h-11 px-4 bg-slate-100 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-slate-500 block mb-1">
          Difficulty
        </label>

        <div className="flex bg-slate-100 p-1 rounded-lg">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => setDifficulty(level)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md ${
                difficulty === level
                  ? "bg-white shadow-sm text-primary"
                  : "text-slate-500"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Live Toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">Live Status</span>

        <input type="checkbox" checked={live} onChange={() => setLive(!live)} />
      </div>

      <button className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20">
        Create Test
      </button>
    </form>
  );
}

export default CreateTestForm;
