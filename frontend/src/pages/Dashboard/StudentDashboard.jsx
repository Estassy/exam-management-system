import { useEffect, useState } from "react";
import "./StudentDashboard.scss";
import Button from "../../components/UI/Button";
import Notification from "../../components/UI/Notification";

const StudentDashboard = () => {
  const [user, setUser] = useState({ name: "Jean Dupont" });
  const [exams, setExams] = useState([
    { subject: "Math", date: "10 Mars 2025" },
    { subject: "Physique", date: "15 Mars 2025" }
  ]);
  const [results, setResults] = useState([
    { subject: "Histoire", score: 85 },
    { subject: "Anglais", score: 90 }
  ]);
  const [notifications, setNotifications] = useState(["Nouvel examen ajouté", "Résultat disponible"]);

  useEffect(() => {
    // Simuler un appel API pour récupérer les données de l'étudiant
  }, []);

  return (
    <div className="dashboard">
      <h1>🎓 Bienvenue, {user.name}</h1>

      <div className="exams">
        <h2>📅 Examens à venir</h2>
        <ul>
          {exams.map((exam, index) => (
            <li key={index}>{exam.subject} - {exam.date}</li>
          ))}
        </ul>
      </div>

      <div className="results">
        <h2>📊 Résultats</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result.subject} : {result.score}%</li>
          ))}
        </ul>
      </div>

      <div className="notifications">
        <h2>🔔 Notifications récentes</h2>
        {notifications.map((notif, index) => <Notification key={index} message={notif} />)}
      </div>

      <div className="actions">
        <Button text="Voir tous les examens" variant="primary" onClick={() => alert("Liste des examens")} />
      </div>
    </div>
  );
};

export default StudentDashboard;