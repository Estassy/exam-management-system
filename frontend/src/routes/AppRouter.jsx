import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginPage from "../pages/Login/LoginPage";
import TeacherDashboard from "../pages/Dashboard/TeacherDashboard";
import StudentDashboard from "../pages/Dashboard/StudentDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  console.log("👤 Utilisateur connecté :", user);

  return (
    <Router>
      <Routes>
        {/* Redirection de la racine vers /login si non connecté */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />

        {/* Gestion des dashboards selon le rôle utilisateur */}
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
      </Routes>
    </Router>
  );
};

export default AppRouter;
