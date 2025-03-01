import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // On vérifie la présence d'un token dans le localStorage
  const token = localStorage.getItem('token');

  // Si le token n'est pas présent, on redirige l'utilisateur vers "/login"
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Sinon, on rend le composant enfant
  return children;
};

export default ProtectedRoute;
