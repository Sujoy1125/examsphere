function SubjectItem({ subject }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-primary/5 shadow-sm flex items-center justify-between transition-all active:scale-[0.98]">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">{subject.icon}</span>
        </div>

        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {subject.name}
          </h3>

          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">quiz</span>
            {subject.tests} Tests available
          </p>
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>

        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    </div>
  );
}

export default SubjectItem;
