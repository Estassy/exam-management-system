import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExams, deleteExam } from "../../services/exam/examService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import "./ManageExams.scss";

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examsData = await getAllExams();
        setExams(examsData);
      } catch (error) {
        console.error("Erreur lors du chargement des examens :", error);
      }
    };
    fetchExams();
  }, []);

  const handleDelete = async (examId) => {
    try {
      await deleteExam(examId);
      setExams((prevExams) => prevExams.filter((exam) => exam.id !== examId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'examen :", error);
    }
  };

  return (
    <div
      className={`manage-exams-dashboard-container ${
        isSidebarOpen ? "shifted" : ""
      }`}
    >
      {/* Bouton Menu / Fermer */}
      <button className="menu-button" onClick={toggleSidebar}>
        {isSidebarOpen ? "✖ Fermer" : "☰ Menu"}
      </button>

      {/* Sidebar */}
      <aside
        className={`manage-exams-sidebar ${
          isSidebarOpen ? "open" : "closed"
        }`}
      >
        <div className="manage-exams-sidebar-logo">
          <img
            src="src/assets/images/logo.png"
            alt="Logo"
            className="manage-exams-logo-image"
          />
        </div>
        <ul className="manage-exams-sidebar-menu">
          <li
            className="manage-exams-sidebar-item"
            onClick={() => navigate("/dashboard")}
          >
            <HomeIcon className="manage-exams-sidebar-icon" /> Accueil
          </li>
          <li
            className="manage-exams-sidebar-item"
            onClick={() => navigate("/exams/manage")}
          >
            <CalendarDaysIcon className="manage-exams-sidebar-icon" /> Examens
          </li>
          <li
            className="manage-exams-sidebar-item"
            onClick={() => navigate("/users/manage")}
          >
            <UsersIcon className="manage-exams-sidebar-icon" /> Utilisateurs
          </li>
        </ul>
      </aside>
      <div className="manage-exams-container">
        <h2>Gestion des examens</h2>
        <table className="manage-exams-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Date</th>
              <th>Enseignant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.title}</td>
                <td>{new Date(exam.date).toLocaleDateString()}</td>
                <td>
                  {exam.teacher
                    ? `${exam.teacher.firstName} ${exam.teacher.lastName}`
                    : "N/A"}
                </td>
                <td>
                  <button
                    className="manage-exams-delete-btn"
                    onClick={() => handleDelete(exam.id)}
                  >
                    ❌ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageExams;
