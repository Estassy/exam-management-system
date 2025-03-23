import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./StudentDashboard.scss";
import { getUpcomingExams } from "../../services/exam/examService";
import { getStudentResults } from "../../services/grade/gradeService";
import { getNotifications } from "../../services/notification/notificationService";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../services/user/userService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";

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

  const studentMenuItems = [
    { label: "Accueil", icon: HomeIcon, onClick: () => navigate("/dashboard") },
    {
      label: "Cours",
      icon: CalendarDaysIcon,
      onClick: () => navigate("/etudiant/cours"),
    },
    {
      label: "Quiz",
      icon: CalendarDaysIcon,
      onClick: () => navigate("/quizzes"),
    },
    { label: "Examens", icon: UsersIcon, onClick: () => navigate("/exams") },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
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
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={studentMenuItems}
      />

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
          {notifications.length > 0 ? (
            <ul className="notification-list">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`notif-item ${
                    notif.type === "success"
                      ? "notif-success"
                      : notif.type === "warning"
                      ? "notif-warning"
                      : "notif-error"
                  }`}
                >
                  {notif.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune notification pour le moment.</p>
          )}
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
