import { useNavigate } from "react-router-dom";

function TestCard({ test }) {
  const navigate = useNavigate();

  const startTest = () => {
    // store selected test
    localStorage.setItem("selectedTest", JSON.stringify(test));

    // go to instructions page
    navigate("/instructions");
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-primary/5 shadow-sm">
      {/* Image */}
      <div
        className="relative h-40 w-full bg-primary/20 bg-cover bg-center"
        style={{ backgroundImage: `url(${test.image})` }}
      >
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-[10px] font-bold text-primary uppercase border">
          {test.subject}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-primary text-lg font-bold mb-2">
          {test.title}
        </h3>

        <div className="flex items-center gap-4 mb-4 text-primary/70">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">
              assignment
            </span>
            <span className="text-xs font-medium">
              {test.questions} Questions
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">
              schedule
            </span>
            <span className="text-xs font-medium">
              {test.duration} Mins
            </span>
          </div>
        </div>

        <button
          onClick={startTest}
          className="w-full bg-primary text-white rounded-lg h-10 text-sm font-bold flex items-center justify-center gap-2"
        >
          Start Test
          <span className="material-symbols-outlined text-sm">
            play_arrow
          </span>
        </button>
      </div>
    </div>
  );
}

export default TestCard;
