import { useEffect, useState } from "react";
import "./TeacherDashboard.scss";
import Button from "../../components/UI/Button";
import Notification from "../../components/UI/Notification";

const Dashboard = () => {
  const [user, setUser] = useState({ name: "Prof. Dupont" });
  const [stats, setStats] = useState({ exams: 3, students: 45 });
  const [nextExam, setNextExam] = useState({ subject: "Math", date: "10 Mars 2025" });
  const [notifications, setNotifications] = useState(["Nouvelle inscription", "Mise à jour examen"]);

  useEffect(() => {
    // Simuler un appel API pour récupérer les données
    // fetch("/api/dashboard") -> setUser, setStats, setNextExam, setNotifications
  }, []);

  return (
    <div className="dashboard">
      <h1>🎓 Bienvenue, {user.name}</h1>

      <div className="stats">
        <div className="statBox">📌 Examens à venir : {stats.exams}</div>
        <div className="statBox">👥 Étudiants : {stats.students}</div>
      </div>

      <div className="nextExam">
        <h2>📅 Prochain Examen</h2>
        <p>{nextExam.subject} - {nextExam.date}</p>
      </div>

      <div className="notifications">
        <h2>🔔 Notifications récentes</h2>
        {notifications.map((notif, index) => <Notification key={index} message={notif} />)}
      </div>

      <div className="actions">
        <Button text="Créer un examen" variant="primary" onClick={() => alert("Créer examen")} />
        <Button text="Gérer les étudiants" variant="secondary" onClick={() => alert("Voir étudiants")} />
      </div>
    </div>
  );
};

export default Dashboard;