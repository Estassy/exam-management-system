import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.scss";
import Button from "../../components/UI/Button";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    exams: 12,
    students: 250,
    teachers: 20,
  });
  const [recentActions, setRecentActions] = useState([
    "Ajout d'un nouvel utilisateur",
    "Mise à jour des résultats d'examen",
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar
  const navigate = useNavigate();

  useEffect(() => {
    // Simuler un appel API pour récupérer les stats et les actions
  }, []);

  return (
      <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
            {/* Bouton Menu / Fermer */}
            <button className="menu-button" onClick={toggleSidebar}>
              {isSidebarOpen ? "✖ Fermer" : "☰ Menu"}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
              <h2 className="sidebar-title">Tableau de Bord</h2>
              <ul className="sidebar-menu">
                <li className="sidebar-item" onClick={() => navigate("/dashboard")}>
                  <HomeIcon className="sidebar-icon" /> Accueil
                </li>
                <li className="sidebar-item" onClick={() => navigate("/admin/cours")}>
                    <CalendarDaysIcon className="sidebar-icon" /> Cours
                </li>
                <li className="sidebar-item" onClick={() => navigate("/exams/manage")}>
                  <CalendarDaysIcon className="sidebar-icon" /> Examens
                </li>
                <li className="sidebar-item" onClick={() => navigate("/users/manage")}>
                  <UsersIcon className="sidebar-icon" /> Utilisateurs
                </li>
              </ul>
            </aside>

        <div className="dashboard">
          <h1>⚙️ Panneau d'administration</h1>

          <div className="stats">
            <div className="statBox">📌 Examens : {stats.exams}</div>
            <div className="statBox">👥 Étudiants : {stats.students}</div>
            <div className="statBox">🧑‍🏫 Enseignants : {stats.teachers}</div>
          </div>

          <div className="recentActions">
            <h2>📝 Actions récentes</h2>
            <ul>
              {recentActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>

          <div className="actions">
            <Button
              text="Gérer Utilisateurs"
              variant="primary"
              onClick={() => navigate("/users/manage")}
            />
            <Button
              text="Gérer Examens"
              variant="secondary"
              onClick={() => navigate("/exams/manage")}
            />
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;
