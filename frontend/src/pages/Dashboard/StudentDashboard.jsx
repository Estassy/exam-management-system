import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPromotionAverage,
  getStudentAverage,
  getStudentResults,
} from "../../services/grade/gradeService";
import {
  deleteNotification,
  getNotifications,
  getNotificationsByUser,
  markNotificationAsRead,
} from "../../services/notification/notificationService";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../services/user/userService";
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./StudentDashboard.scss";
import { getUpcomingExams } from "../../services/exam/examService";

const StudentDashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [classAverage, setClassAverage] = useState(0);
  const [goal, setGoal] = useState(85);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const studentMenuItems = [
    {
      label: "Accueil",
      icon: HomeIcon,
      onClick: () => navigate("/dashboard"),
    },
    {
      label: "Cours",
      icon: BookOpenIcon,
      onClick: () => navigate("/etudiant/cours"),
    },
    {
      label: "Quiz",
      icon: ClipboardDocumentListIcon,
      onClick: () => navigate("/quizzes"),
    },
    {
      label: "Examens",
      icon: CalendarIcon,
      onClick: () => navigate("/exams"),
    },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return;

      try {
        const fullUserData = await getUserById(user.id);
        setUser(fullUserData);

        const [examsData, resultsData, notificationsData, avg, promoAvg] =
          await Promise.all([
            getUpcomingExams(user.id),
            getStudentResults(user.id),
            getNotificationsByUser(user.id),
            getStudentAverage(user.id),
            getPromotionAverage(user.id),
          ]);

        setExams(examsData);
        setResults(resultsData);
        setNotifications(notificationsData);
        setAverageScore(avg);
        setClassAverage(promoAvg);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchData();
  }, [user?.id]);

  return (
    <div
      className={`student-dashboard-container ${
        isSidebarOpen ? "shifted" : ""
      }`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={studentMenuItems}
      />

      <div className="student-dashboard-wrapper">
        {/* Examens à venir */}
        <section className="student-section upcoming-exams">
          <h2>📅 Examens à venir</h2>
          {exams.length ? (
            <ul className="student-exam-list">
              {exams.map((exam) => (
                <li key={exam.id} className="student-exam-item">
                  <strong>{exam.title}</strong> –{" "}
                  {new Date(exam.date).toLocaleDateString()}
                  <span
                    className={`status ${
                      exam.status === "Confirmed" ? "confirmed" : "pending"
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

        {/* Grille principale */}
        <div className="student-main-grid">
          {/* Résultats & graphique */}
          <section className="student-section results">
            <h2>📊 Mes résultats</h2>
            <div className="student-results-list">
              {results.map((result) => (
                <div key={result.examId} className="result-card">
                  <span>{result.examTitle}</span>
                  <strong>{result.score}/20</strong>
                  <span
                    className={result.trend >= 0 ? "trend-up" : "trend-down"}
                  >
                    {result.trend >= 0
                      ? `⬆️ ${result.trend}%`
                      : `⬇️ ${Math.abs(result.trend)}%`}
                  </span>
                </div>
              ))}
            </div>

            <div className="student-results-chart">
              <LineChart width={400} height={200} data={results}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="examTitle" />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" />
                <Line
                  type="monotone"
                  dataKey="promotionAverage"
                  stroke="#f97316"
                />
              </LineChart>
            </div>

            <div className="student-progress">
              <p>
                Moyenne actuelle : <strong>{averageScore}/20</strong>
              </p>

              <p>
                🎯 Objectif personnel : <strong>{goal}%</strong>
              </p>
            </div>
          </section>

          {/* Notifications */}
          <section className="student-section notifications">
            <h2>🔔 Notifications récentes</h2>
            {notifications.length > 0 ? (
              <ul className="student-notification-list">
                {notifications.map((notif) => (
                  <li key={notif.id} className={`student-notif ${notif.type}`}>
                    <span className="notif-message">📢 {notif.message}</span>
                    <div className="notif-buttons">
                      <button
                        className="notif-btn read"
                        onClick={async () => {
                          await markNotificationAsRead(notif.id);
                          setNotifications((prev) =>
                            prev.map((n) =>
                              n.id === notif.id ? { ...n, read: true } : n
                            )
                          );
                        }}
                      >
                        Lu
                      </button>
                      <button
                        className="notif-btn delete"
                        onClick={async () => {
                          await deleteNotification(notif.id);
                          setNotifications((prev) =>
                            prev.filter((n) => n.id !== notif.id)
                          );
                        }}
                      >
                        ❌ Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune notification pour le moment.</p>
            )}
          </section>
        </div>

        <div className="student-actions">
          <button
            onClick={() => navigate("/exams")}
            className="student-btn primary"
          >
            📖 Voir tous les examens
          </button>
          <button
            onClick={() => navigate("/quizzes")}
            className="student-btn secondary"
          >
            📝 Faire un quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
