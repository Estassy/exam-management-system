import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuizzes } from "../../services/quiz/quizService";
import "./QuizList.scss";
import Sidebar from "../../components/UI/Sidebar";
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import logo from "../../../src/assets/images/logo.png";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const data = await getAllQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des quiz :", error);
      }
    }
    fetchQuizzes();
  }, []);

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={studentMenuItems}
      />
      <div className="quiz-list">
        <h2>🎯 Liste des Quiz</h2>
        {quizzes.length === 0 ? (
          <p>Aucun quiz disponible.</p>
        ) : (
          <ul className="quiz-items">
            {quizzes.map((quiz) => (
              <li key={quiz.id} className="quiz-item">
                <div className="quiz-info">
                  <strong>{quiz.title}</strong>
                </div>
                <button onClick={() => navigate(`/quiz/${quiz.id}`)}>
                  ▶ Commencer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuizList;
