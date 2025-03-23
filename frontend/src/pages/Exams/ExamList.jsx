import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExams } from "../../services/exam/examService";
import "./ExamList.scss";
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const groupByMonth = (exams) => {
  return exams.reduce((acc, exam) => {
    const month = new Date(exam.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(exam);
    return acc;
  }, {});
};

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

  useEffect(() => {
    async function fetchExams() {
      try {
        const data = await getAllExams();
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setExams(sorted);
      } catch (error) {
        console.error("Erreur lors de la récupération des examens :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchExams();
  }, []);

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedExams = groupByMonth(filteredExams);

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={studentMenuItems}
      />
      <div className="exam-list-container">
        <h2 className="exam-title">📘 Examens à venir</h2>

        <input
          className="exam-search"
          type="text"
          placeholder="🔍 Rechercher un examen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p className="loading">Chargement des examens...</p>
        ) : filteredExams.length === 0 ? (
          <p className="empty">Aucun examen trouvé.</p>
        ) : (
          Object.entries(groupedExams).map(([month, exams]) => (
            <div key={month} className="exam-month-group">
              <h3 className="month-heading">{month}</h3>
              <ul className="exam-list">
                {exams.map((exam) => (
                  <li key={exam.id} className="exam-item">
                    <div className="exam-info">
                      <span className="exam-name">{exam.title}</span>
                      <span className="exam-date">
                        {new Date(exam.date).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className="view-button"
                      onClick={() => navigate(`/exam/${exam.id}`)}
                    >
                      📄 Voir
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExamList;
