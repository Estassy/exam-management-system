import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Header.scss";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Déconnexion
    navigate("/login"); // Redirection
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🚀 MyApp</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>{user?.role}</li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
