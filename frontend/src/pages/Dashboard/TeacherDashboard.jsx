import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamService from "../../services/examService";
import "./TeacherDashboard.scss";
import Button from "../../components/UI/Button";
import Notification from "../../components/UI/Notification";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Prof. Dupont" });
  const [stats, setStats] = useState({ exams: 0, students: 0 });
  const [nextExam, setNextExam] = useState(null);
  const [notifications, setNotifications] = useState(["Nouvelle inscription", "Mise à jour examen"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les examens depuis le backend
    const fetchExams = async () => {
      try {
        const exams = await ExamService.getAllExams();
        if (exams.length > 0) {
          setStats({ exams: exams.length, students: 45 }); // Nombre d'étudiants à récupérer dynamiquement

          // Trouver l'examen le plus proche
          const upcomingExam = exams
            .filter(exam => new Date(exam.date) > new Date()) // Exclure les examens passés
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

          setNextExam(upcomingExam || null);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des examens :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="dashboard">
      <h1>🎓 Bienvenue, {user.name}</h1>

      <div className="stats">
        <div className="statBox">📌 Examens à venir : {stats.exams}</div>
        <div className="statBox">👥 Étudiants : {stats.students}</div>
      </div>

      {loading ? (
        <p>Chargement des examens...</p>
      ) : nextExam ? (
        <div className="nextExam">
          <h2>📅 Prochain Examen</h2>
          <p>{nextExam.title} - {new Date(nextExam.date).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Aucun examen à venir.</p>
      )}

      <div className="notifications">
        <h2>🔔 Notifications récentes</h2>
        {notifications.map((notif, index) => <Notification key={index} message={notif} />)}
      </div>

      <div className="actions">
        <Button
          text="Créer un examen"
          variant="primary"
          onClick={() => navigate("/create-exam")}
        />
        <Button
            text="Créer un cours"
            variant="primary"
            onClick={() => navigate("/create-course")} />
        <Button
          text="Gérer les étudiants"
          variant="secondary"
          onClick={() => alert("Voir étudiants")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
