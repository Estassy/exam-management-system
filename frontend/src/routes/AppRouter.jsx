import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginPage from "../pages/Login/LoginPage";
import StudentDashboard from "../pages/Dashboard/StudentDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ManageExams from "../pages/Exams/ManageExams";
import ExamForm from "../pages/Exams/ExamForm";
import CourseForm from "../pages/Courses/CourseForm";
import TeacherDashboard from "../pages/Dashboard/TeacherDashboard";
import StudentListPage from "../pages/Students/StudentListPage";
import QuizForm from "../pages/Quizzes/QuizForm";
import QuizList from "../pages/Quizzes/QuizList";
import QuizExamsPage from "../pages/Quizzes/Quiz&ExamsPage";
import ExamList from "../pages/Exams/ExamList";
import UserManagement from "../pages/Admin/UserManagement";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Header />}
      <main className="main-content">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
};

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  console.log("👤 Utilisateur connecté :", user);

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["STUDENT", "TEACHER", "ADMIN"]}>
                {user?.role === "TEACHER" && <TeacherDashboard />}
                {user?.role === "STUDENT" && <StudentDashboard />}
                {user?.role === "ADMIN" && <AdminDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizzes"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <QuizList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exams"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <ExamList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <StudentListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exams/manage"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageExams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/manage"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-exam"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <ExamForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-quiz"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <QuizForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-course"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <CourseForm />
              </ProtectedRoute>
            }
          />

          <Route
              path="/Quizzes&Exams"
              element={
                <ProtectedRoute allowedRoles={["TEACHER"]}>
                  <QuizExamsPage />
                </ProtectedRoute>
              }
          />

          <Route
            path="/edit-exam/:id"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <ExamForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default AppRouter;
