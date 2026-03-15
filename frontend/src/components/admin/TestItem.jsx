function TestItem({ test }) {
  const difficultyColor = {
    Easy: "text-green-600",
    Medium: "text-blue-600",
    Hard: "text-orange-500",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">{test.icon}</span>
        </div>

        <div>
          <h4 className="text-sm font-bold">{test.title}</h4>

          <p className="text-xs text-slate-500">
            {test.subject} • {test.duration}m •{" "}
            <span className={`${difficultyColor[test.difficulty]} font-medium`}>
              {test.difficulty}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`size-2 rounded-full ${
            test.active ? "bg-green-500" : "bg-slate-400"
          }`}
        ></div>

        <button className="text-slate-400">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </div>
  );
}

export default TestItem;
