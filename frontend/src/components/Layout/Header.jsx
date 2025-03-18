import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Header.scss";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
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

  // Routes dynamiques selon le rôle
  let routes = [];
  if (user?.role === "ADMIN") {
    routes = [
      { path: "/admin/dashboard", label: "Dashboard" },
      { path: "/admin/cours", label: "Cours" },
      { path: "/admin/exams-quiz", label: "Exams & Quiz" },
      { path: "/admin/users", label: "Gérer les utilisateurs" },
    ];
  } else if (user?.role === "TEACHER") {
    routes = [
      { path: "/", label: "Dashboard" },
      { path: "/create-course", label: "Cours" },
      { path: "/Quizzes&Exams", label: "Exams & Quiz" },
      { path: "/students", label: "Gérer les étudiants" },
    ];
  } else {
    routes = [
      { path: "/etudiant/dashboard", label: "Dashboard" },
      { path: "/etudiant/cours", label: "Cours" },
      { path: "/etudiant/exams-quiz", label: "Exams & Quiz" },
    ];
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="src/assets/images/logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>

      {/* Menu dynamique selon le rôle */}
      <nav>
        <ul>
          {routes.map((route, index) => (
            <li key={index}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

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
            <div className="user-role">{user?.role || "Utilisateur"}</div>
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
