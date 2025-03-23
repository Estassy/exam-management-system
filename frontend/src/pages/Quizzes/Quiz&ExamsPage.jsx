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
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";

const QuizExamsPage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture

  const teacherMenuItems = [
    { label: "Accueil", icon: HomeIcon, onClick: () => navigate("/dashboard") },
    {
      label: "Cours",
      icon: CalendarDaysIcon,
      onClick: () => navigate("/courses"),
    },
    {
      label: "Examens",
      icon: CalendarDaysIcon,
      onClick: () => navigate("/QuizExamsPage"),
    },
    {
      label: "Étudiants",
      icon: UsersIcon,
      onClick: () => navigate("/students"),
    },
    { label: "Notes", icon: UsersIcon, onClick: () => navigate("/grades") },
  ];
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
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={teacherMenuItems}
      />
      <div className="quiz-exams-page">
        <div className="header-exams">
          <h2>Gestion des Examens & Quiz</h2>
          <div className="actions">
            <Button
              text="Créer un Examen"
              variant="primary"
              onClick={() => navigate("/create-exam")}
            />
            <Button
              text="Créer un Quiz"
              variant="secondary"
              onClick={() => navigate("/create-quiz")}
            />
          </div>
        </div>

        <div className="content">
          <div className="exam-list">
            <h3>Examens disponibles</h3>
            {exams.length > 0 ? (
              <ul>
                {exams.map((exam) => (
                  <li key={exam.id} className="exam-item">
                    <span>
                      {exam.title} - {new Date(exam.date).toLocaleDateString()}
                    </span>
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
                    <Button
                      text="Voir"
                      variant="outline"
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                    />
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
