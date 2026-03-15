import reactdom from "react-dom";


function Footer() {
  return (
    <div>
      {/* <!-- Footer --> */}
      <footer className="bg-slate-900 text-slate-400 px-4 py-12">
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white text-primary p-1 rounded-md">
                <span className="material-symbols-outlined text-[18px]">
                  child_hat
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                ExamSphere
              </h2>
            </div>
            <p className="text-sm">
              The world's most advanced MCQ practice platform for competitive
              exams.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-white font-bold">Platform</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#">Tests</a>
                </li>
                <li>
                  <a href="#">Analytics</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
                <li>
                  <a href="#">Admin Panel</a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-bold">Support</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col gap-4">
            <div className="flex gap-4">
              <a
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
                href="#"
              >
                <span className="material-symbols-outlined text-[18px]">
                  public
                </span>
              </a>
              <a
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
                href="#"
              >
                <span className="material-symbols-outlined text-[18px]">
                  share
                </span>
              </a>
              <a
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
                href="#"
              >
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
              </a>
            </div>
            <p className="text-xs">
              © 2026 ExamSphere Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;