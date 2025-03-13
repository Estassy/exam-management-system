import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.scss";
import Button from "../../components/UI/Button";


const AdminDashboard = () => {
  const [stats, setStats] = useState({ exams: 12, students: 250, teachers: 20 });
  const [recentActions, setRecentActions] = useState([
    "Ajout d'un nouvel utilisateur",
    "Mise à jour des résultats d'examen"
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    // Simuler un appel API pour récupérer les stats et les actions
  }, []);

  return (
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
        <Button text="Gérer Utilisateurs" variant="primary" onClick={() => alert("Gérer utilisateurs")} />
        <Button text="Gérer Examens" variant="secondary" onClick={() => navigate("/exams/manage")} />
      </div>
    </div>
  );
};

export default AdminDashboard;