import "./App.css";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ExamInstructions from "./pages/ExamInstructions";
import MockTests from "./pages/MockTests";
import AttemptTest from "./pages/AttemptTest";
import ResultSummary from "./pages/ResultSummary";
import QuestionManagement from "./pages/QuestionManagement";
import AnswerAnalysis from "./pages/AnswerAnalysis";
import Leaderboard from "./pages/Leaderboard";
import MyAttempts from "./pages/MyAttempts";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageSubjects from "./pages/admin/ManageSubjects";
import ManageTests from "./pages/admin/ManageTests";
import AttemptHistory from "./pages/admin/AttemptHistory";
import ResultAnalytics from "./pages/admin/ResultAnalytics";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/instructions" element={<ExamInstructions />} />
      <Route path="/tests" element={<MockTests />} />
      <Route path="/attempt-test" element={<AttemptTest />} />
      <Route path="/result" element={<ResultSummary />} />
      <Route path="/analysis" element={<AnswerAnalysis />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/my-attempts" element={<MyAttempts />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/questions" element={<QuestionManagement />} />
      <Route path="/admin/subjects" element={<ManageSubjects />} />
      <Route path="/admin/tests" element={<ManageTests />} />
      <Route path="/admin/attempts" element={<AttemptHistory />} />
      <Route path="/admin/analytics" element={<ResultAnalytics />} />
    </Routes>
  );
}

export default App;
