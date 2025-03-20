import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../services/user/userService";
import { FaUserCircle } from "react-icons/fa";
import "./Header.scss";

const Header = () => {
  const { user, logout, setUser } = useContext(AuthContext); // Ajout de setUser pour mettre à jour les données utilisateur
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    async function fetchData() {
      // if (!user?.id) return;
      console.log("👤 ID utilisateur :", user.id);
      try {
        const fullUserData = await getUserById(user.id);
        console.log("👤 Données utilisateur complètes :", fullUserData);
        setUser(fullUserData); // Met à jour le contexte avec les données complètes
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
      }
    }
    fetchData();
  }, []);

  return (
    <header className="header">
      {/* Texte de la bannière */}
      <div className="logo">
        <Link to="/" className="logo-text">
          ExamEase
        </Link>
        <div className="role-title">
          {user?.role === "STUDENT" && "Espace Étudiant"}
          {user?.role === "TEACHER" && "Espace Enseignant"}
          {user?.role === "ADMIN" && "Espace Admin"}
        </div>
      </div>

      {/* Message de bienvenue */}
      <div className="welcome-message">
        Bienvenue, {user?.firstName} {user?.lastName}
      </div>

      {/* Menu utilisateur */}
      <div className="user-menu" ref={menuRef}>
        <div className="profile-link" onClick={() => setMenuOpen(!menuOpen)}>
          {user?.photo ? (
            <img src={user.photo} alt="User" className="user-photo" />
          ) : (
            <FaUserCircle className="default-user-icon" />
          )}
        </div>

        {menuOpen && (
          <div className="dropdown-menu">
            <div className="user-name">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : "Utilisateur"}
            </div>
            <button onClick={handleLogout} className="dropdown-item logout">
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
