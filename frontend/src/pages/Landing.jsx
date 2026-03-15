import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <NavBar />

      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Practice Smart.{" "}
              <span className="text-primary">Score Better.</span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-md mx-auto md:mx-0">
              Master your exams with our AI-driven mock test platform.
            </p>

            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <Link
                to="/tests"
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Start Mock Test
              </Link>

              <button className="border px-6 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition">
                View Demo
              </button>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative">
            <div className="w-full aspect-[4/3] bg-primary/5 rounded-2xl border border-primary/10 overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover opacity-90 mix-blend-multiply dark:mix-blend-normal"
                alt="Student studying with a digital interface for testing"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo1nNUZT3Uvw26DB2-ToN5H-_xN0YZp2ZzKmmDqMWBwOmdV7AG-JY624RO7_mND3yWvcZmoeM8sDkKZnbTvozhfb6AKiQYxsBgMvQ7F03PAEpcN1mxTEio3FQSUx6IGAQyRr36vkk4J8WUWS3I3k01LuO6V9yU_inG7x_keGJOVkCtNYforFiO895kL4NsKldZ1owIEQzsfCfr7v58Q4uo12MMz1ADajbwtRz0Mjt_N_OSElFw0SR6MsdQeKHuWFa1FPI06Uoz5Ug"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Floating Stats Card  */}
      <div className="absolute -bottom-6 -right-2 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-full text-green-600">
          <span className="material-symbols-outlined">trending_up</span>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">
            Avg. Score Improvement
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            +32%
          </p>
        </div>
      </div>
      {/* <!-- Features Section --> */}
      <section className="bg-white dark:bg-slate-900/50 py-16 px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Why ExamSphere?
          </h2>
          <p className="text-slate-500 mt-2">
            Designed for high-performance students
          </p>
        </div>
        <div className="grid gap-6">
          <div className="bg-background-light dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Timed Mock Tests
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Simulate real exam pressure with our precision timers and adaptive
              test environments.
            </p>
          </div>
          <div className="bg-background-light dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Deep Analytics
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Identify your weak subjects with AI-powered performance breakdowns
              and topic-wise insights.
            </p>
          </div>
          <div className="bg-background-light dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">article</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Detailed Solutions
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Get step-by-step explanations for every question to ensure you
              never make the same mistake twice.
            </p>
          </div>
        </div>
      </section>
      {/* <!-- How It Works --> */}
      {/* <section className="py-16 px-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">
          How It Works
        </h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 mt-2"></div>
            </div>
            <div className="pb-8">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Create Account
              </h4>
              <p className="text-slate-500">
                Sign up in seconds and choose your target exams.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 mt-2"></div>
            </div>
            <div className="pb-8">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Choose a Test
              </h4>
              <p className="text-slate-500">
                Select from over 1,000+ practice papers across various
                disciplines.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Review Results
              </h4>
              <p className="text-slate-500">
                Analyze your performance and start improving immediately.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 text-center">
            How It Works
          </h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 mt-2"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Create Account
                </h4>
                <p className="text-slate-500">
                  Sign up in seconds and choose your target exams.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 mt-2"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Choose a Test
                </h4>
                <p className="text-slate-500">
                  Select from over 1,000+ practice papers across various
                  disciplines.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Review Results
                </h4>
                <p className="text-slate-500">
                  Analyze your performance and start improving immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Popular Tests Section --> */}
      <section className="bg-primary/5 py-16 px-4 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Popular Tests
          </h2>
          <a className="text-primary font-bold text-sm" href="#">
            View all
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4">
          <div className="min-w-[280px] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                SAT Prep
              </span>
            </div>
            <h4 className="text-lg font-bold mb-1">General SAT Mock</h4>
            <p className="text-xs text-slate-500 mb-4">
              154 Questions • 3 Hours
            </p>
            <Link
              to="/register"
              className="w-full bg-primary/10 text-primary font-bold py-2 rounded-lg text-sm"
            >
              {" "}
              Enroll Now{" "}
            </Link>{" "}
          </div>
          <div className="min-w-[280px] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600">
                <span className="material-symbols-outlined">code</span>
              </div>
              <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                CS Tech
              </span>
            </div>
            <h4 className="text-lg font-bold mb-1">Java Certification</h4>
            <p className="text-xs text-slate-500 mb-4">
              60 Questions • 90 Mins
            </p>
            {/* <button className="w-full bg-primary/10 text-primary font-bold py-2 rounded-lg text-sm">
              Enroll Now
            </button> */}
            <Link
              to="/register"
              className="w-full bg-primary/10 text-primary font-bold py-2 rounded-lg text-sm"
            >
              {" "}
              Enroll Now{" "}
            </Link>{" "}
          </div>
          <div className="min-w-[280px] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600">
                <span className="material-symbols-outlined">
                  medical_services
                </span>
              </div>
              <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                Medical
              </span>
            </div>
            <h4 className="text-lg font-bold mb-1">NEET Essentials</h4>
            <p className="text-xs text-slate-500 mb-4">
              180 Questions • 3.5 Hours
            </p>
            {/* <button className="w-full bg-primary/10 text-primary font-bold py-2 rounded-lg text-sm">
              Enroll Now
            </button> */}
            <Link
              to="/register"
              className="w-full bg-primary/10 text-primary font-bold py-2 rounded-lg text-sm"
            >
              {" "}
              Enroll Now{" "}
            </Link>{" "}
          </div>
        </div>
      </section>
      {/* <!-- Testimonials --> */}
      <section className="py-16 px-4">
        <h2 className="text-2xl font-bold text-center mb-10">
          What Students Say
        </h2>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 relative">
          <div className="absolute -top-4 left-6 bg-primary text-white p-2 rounded-lg">
            <span className="material-symbols-outlined text-[16px]">
              format_quote
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 italic mb-6 pt-2">
            "ExamSphere helped me identify that I was spending too much time on
            Math. The analytics are a game changer. I improved my score by 200
            points!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                data-alt="User testimonial profile picture"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1HHyTTUdmD9RSwdZia5gefdf8lupmDbPrpeJCpQFQqBOqyYZ8Ojxj_6-Tl_CDtKPHLgYw0pVdBSeqsC518IASiDVR3iXFrRtNSTjrJ_WkCkUEGXWk2zUdQ-8T4HNmU1qNHxxzfnxJGUK-akK5ceGXjqXoy9x_Wx85vo8GiRwCT7SyPKGf_DHW75CCSDCK4WX_nIvTys-fDA5nPZnt5wY0DCs0HzYkVHufjN_bIrRAriwh8gfll4BTrFfCpcvcEY4Lv210dQeJuik"
              />
            </div>
            <div>
              <p className="font-bold text-sm">Sarah Jenkins</p>
              <p className="text-xs text-slate-500">
                Final Year Medical Student
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- CTA Section --> */}
      <section className="px-4 py-16">
        <div className="bg-primary rounded-3xl p-8 text-center text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <h2 className="text-3xl font-black mb-4 relative z-10">
            Ready to Ace Your Next Exam?
          </h2>
          <p className="text-blue-100 mb-8 relative z-10">
            Join 50,000+ students already practicing on ExamSphere.
          </p>
          {/* <button className="w-full bg-white text-primary font-black py-4 rounded-xl text-lg shadow-xl relative z-10">
            Get Started For Free
          </button> */}
          <Link
            to="/register"
            className="w-full bg-white text-primary font-black py-4 rounded-xl text-lg shadow-xl relative z-10"
          >
            {" "}
            Get Started For Free{" "}
          </Link>{" "}
          <p className="text-xs text-blue-200 mt-4 relative z-10">
            No credit card required • Instant access
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Landing;
