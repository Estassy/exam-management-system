import React, { createContext, useState, useEffect } from "react";
import { login } from "../services/authService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⏳ Ajout d'un état pour éviter la suppression trop rapide

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const expirationDate = new Date(decodedToken.exp * 1000);
        console.log("📅 Expiration du token :", expirationDate);
        console.log("⏳ Date actuelle :", new Date());

        const isExpired = expirationDate < new Date();

        if (isExpired) {
          console.warn("⚠️ Token expiré au démarrage, mais on attend la connexion.");
          logout();
        } else {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          setUser(storedUser);
        }
      } catch (error) {
        console.error("❌ Erreur lors de la vérification du token :", error);
        logout();
      }
    }
    setLoading(false); // 🔄 Charge terminé
  }, []);

  const loginUser = async (username, password) => {
    try {
      const { user, token } = await login(username, password);
      console.log("✅ Token reçu après connexion :", token);

      const decodedToken = jwtDecode(token);
      const expirationDate = new Date(decodedToken.exp * 1000);
      console.log("📅 Expiration du nouveau token :", expirationDate);

      if (expirationDate < new Date()) {
        console.warn("⚠️ Le token est déjà expiré. Connexion refusée.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      console.error("❌ Erreur de connexion :", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // Redirection vers login
  };

  if (loading) {
    return <div>Chargement...</div>; // 🔄 Empêche d'afficher un message d'erreur trop tôt
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
