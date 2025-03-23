import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExams, deleteExam } from "../../services/exam/examService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import "./ManageExams.scss";
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const adminMenuItems = [
    { label: "Accueil", icon: HomeIcon, onClick: () => navigate("/dashboard") },
    {
      label: "Examens",
      icon: CalendarDaysIcon,
      onClick: () => navigate("/exams/manage"),
    },
    {
      label: "Utilisateurs",
      icon: UsersIcon,
      onClick: () => navigate("/users/manage"),
    },
  ];

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
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={adminMenuItems}
      />
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
