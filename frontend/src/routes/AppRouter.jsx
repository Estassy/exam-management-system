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
            path="/exams/manage"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageExams />
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
            path="/create-course"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <CourseForm />
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
