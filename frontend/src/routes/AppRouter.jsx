// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Redirection de la racine vers /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
