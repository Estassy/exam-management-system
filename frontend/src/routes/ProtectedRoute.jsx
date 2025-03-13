import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute - token:", token);
  console.log("ProtectedRoute - user:", user);

  // Si aucun token ou aucun utilisateur n'existe, redirige vers login
  if (!token || !user) {
    console.warn("Redirection vers login : pas de token ou d'utilisateur");
    return <Navigate to="/login" />;
  }

  // Vérification des rôles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.warn(
      `Redirection vers unauthorized : rôle ${user.role} non autorisé`
    );

    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
