import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExams } from "../../services/exam/examService";
import { getAllQuizzes } from "../../services/quiz/quizService";
import Button from "../../components/UI/Button";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import "./Quiz&ExamsPage.scss";

const QuizExamsPage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture

  useEffect(() => {
    async function fetchData() {
      try {
        const examData = await getAllExams();
        const quizData = await getAllQuizzes();
        setExams(examData);
        setQuizzes(quizData);
      } catch (error) {
        console.error("Erreur lors du chargement des examens et quiz :", error);
      }
    }
    fetchData();
  }, []);

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
                src="src/assets/images/logo.png"
                alt="Logo"
                className="logo-image"
              />
            </div>
          <ul className="sidebar-menu">
            <li className="sidebar-item" onClick={() => navigate("/dashboard")}>
              <HomeIcon className="sidebar-icon" /> Accueil
            </li>
            <li className="sidebar-item" onClick={() => navigate("/courses")}>
                <CalendarDaysIcon className="sidebar-icon" /> Cours
            </li>
            <li className="sidebar-item" onClick={() => navigate("/QuizExamsPage")}>
              <CalendarDaysIcon className="sidebar-icon" /> Examens
            </li>
            <li className="sidebar-item" onClick={() => navigate("/students")}>
              <UsersIcon className="sidebar-icon" /> Étudiants
            </li>
            <li className="sidebar-item" onClick={() => navigate("/grades")}>
                <UsersIcon className="sidebar-icon" /> Notes
            </li>
          </ul>
        </aside>
        <div className="quiz-exams-page">
          <div className="header">
            <h2>Gestion des Examens & Quiz</h2>
            <div className="actions">
              <Button text="Créer un Examen" variant="primary" onClick={() => navigate("/create-exam")} />
              <Button text="Créer un Quiz" variant="secondary" onClick={() => navigate("/create-quiz")} />
            </div>
          </div>

          <div className="content">
            <div className="exam-list">
              <h3>Examens disponibles</h3>
              {exams.length > 0 ? (
                <ul>
                  {exams.map((exam) => (
                    <li key={exam.id} className="exam-item">
                      <span>{exam.title} - {new Date(exam.date).toLocaleDateString()}</span>
                      <Button text="Voir" variant="outline" onClick={() => navigate(`/exam/${exam.id}`)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucun examen disponible.</p>
              )}
            </div>

            <div className="quiz-list">
              <h3>Quiz disponibles</h3>
              {quizzes.length > 0 ? (
                <ul>
                  {quizzes.map((quiz) => (
                    <li key={quiz.id} className="quiz-item">
                      <span>{quiz.title}</span>
                      <Button text="Voir" variant="outline" onClick={() => navigate(`/quiz/${quiz.id}`)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucun quiz disponible.</p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default QuizExamsPage;
