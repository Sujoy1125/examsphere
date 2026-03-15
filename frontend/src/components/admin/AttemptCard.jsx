function AttemptCard({ attempt }) {
  const statusStyle = {
    Passed: "bg-emerald-100 text-emerald-700",
    Failed: "bg-rose-100 text-rose-700",
    "Top Score": "bg-emerald-100 text-emerald-700",
    Borderline: "bg-amber-100 text-amber-700",
  };

  const avatarColor = {
    primary: "bg-primary/10 text-primary",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 border border-primary/5 shadow-sm">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div
            className={`flex size-12 items-center justify-center rounded-full ${avatarColor[attempt.color]}`}
          >
            <span className="material-symbols-outlined">person</span>
          </div>

          <div>
            <p className="text-slate-900 text-base font-bold">{attempt.name}</p>
            <p className="text-slate-500 text-sm font-medium">{attempt.test}</p>
          </div>
        </div>

        {/* Score */}
        <div className="flex flex-col items-end">
          <div
            className={`rounded-full px-3 py-1 text-sm font-bold ${statusStyle[attempt.status]}`}
          >
            {attempt.score}%
          </div>
          <p className="text-slate-400 text-[10px] uppercase font-semibold mt-1">
            {attempt.status}
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between border-t pt-3">
        <div className="flex items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-[16px]">
            schedule
          </span>
          <span className="text-xs">{attempt.date}</span>
        </div>

        <button className="flex items-center gap-1 text-primary text-sm font-semibold">
          View Details
          <span className="material-symbols-outlined text-[18px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}

export default AttemptCard;
