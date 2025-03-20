import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./StudentDashboard.scss";
import { getUpcomingExams } from "../../services/exam/examService";
import { getStudentResults } from "../../services/exam/gradeService";
import { getNotifications } from "../../services/notification/notificationService";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../services/user/userService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const StudentDashboard = () => {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [classAverage, setClassAverage] = useState(0);
  const [goal, setGoal] = useState(85);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return; // Vérifie que l'utilisateur est bien défini

      try {
        // Récupérer les informations complètes de l'utilisateur
        const fullUserData = await getUserById(user.id);
        setUser(fullUserData);
        const examsData = await getUpcomingExams(user.id);
        const resultsData = await getStudentResults(user.id);
        const notificationsData = await getNotifications(user.id);

        setExams(examsData);
        setResults(resultsData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchData();
  }, [user?.id]); // Relance l'effet uniquement si `user.id` change

  return (
       <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
            {/* Bouton Menu / Fermer */}
            <button className="menu-button" onClick={toggleSidebar}>
              {isSidebarOpen ? "✖ Fermer" : "☰ Menu"}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                {/* Logo */}
                <div className="sidebar-logo">
                  <img
                    src="src/assets/images/logo.png" // Remplacez par le chemin de votre logo
                    alt="Logo"
                    className="logo-image"
                  />
                </div>
              <ul className="sidebar-menu">
                          <li className="sidebar-item" onClick={() => navigate("/dashboard")}>
                            <HomeIcon className="sidebar-icon" /> Accueil
                          </li>
                          <li className="sidebar-item" onClick={() => navigate("/etudiant/cours")}>
                              <CalendarDaysIcon className="sidebar-icon" /> Cours
                          </li>
                          <li className="sidebar-item" onClick={() => navigate("/Quiz")}>
                            <CalendarDaysIcon className="sidebar-icon" /> Quiz
                          </li>
                          <li className="sidebar-item" onClick={() => navigate("/exams")}>
                            <UsersIcon className="sidebar-icon" /> Examens
                          </li>
                        </ul>
            </aside>
        <div className="student-dashboard">
          <section className="dashboard-section exams-section">
            <h2>📅 Examens à venir</h2>
            {exams.length ? (
              <ul className="exam-list">
                {exams.map((exam) => (
                  <li key={exam.id} className="exam-item">
                    <strong>{exam.title}</strong> -{" "}
                    {new Date(exam.date).toLocaleDateString()} (
                    {exam.location || "En ligne"})
                    <span
                      className={`status ${
                        exam.status === "Confirmed"
                          ? "status-confirmed"
                          : "status-pending"
                      }`}
                    >
                      {exam.status === "Confirmed"
                        ? "✅ Confirmé"
                        : "⏳ En attente"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun examen prévu</p>
            )}
          </section>

          <section className="dashboard-section results-section">
            <h2>📊 Résultats</h2>
            <div className="results-container">
              {results.map((result) => (
                <div key={result.examId} className="result-item">
                  <span>{result.examTitle} :</span>
                  <strong>{result.score}%</strong>
                  <span
                    className={`trend ${
                      result.trend > 0 ? "trend-up" : "trend-down"
                    }`}
                  >
                    {result.trend > 0
                      ? `⬆️ +${result.trend}%`
                      : `⬇️ ${result.trend}%`}
                  </span>
                </div>
              ))}
            </div>
            <div className="progress">
              <p>
                Moyenne actuelle : <strong>{averageScore}%</strong>
              </p>
              <p>
                Moyenne de la classe : <strong>{classAverage}%</strong>
              </p>
              <p>
                🎯 Objectif personnel : <strong>{goal}%</strong>
              </p>
            </div>
          </section>

          <section className="dashboard-section notifications-section">
            <h2>🔔 Notifications récentes</h2>
            <ul className="notification-list">
              {notifications.map((notif) => (
                <li key={notif.id} className="notif-item">
                  {notif.message}
                </li>
              ))}
            </ul>
          </section>

          <div className="actions">
            <button onClick={() => navigate("/exams")} className="primary-button">
              📖 Voir tous les examens
            </button>
            <button
              onClick={() => navigate("/quizzes")}
              className="secondary-button"
            >
              📝 Faire un quiz
            </button>
          </div>
        </div>
      </div>
  );
};

export default StudentDashboard;
