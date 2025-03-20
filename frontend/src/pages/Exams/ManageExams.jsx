import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExams, deleteExam } from "../../services/exam/examService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import "./ManageExams.scss";

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture

  useEffect(() => {
    async function fetchExams() {
      const examsData = await getAllExams();
      setExams(examsData);
    }
    fetchExams();
  }, []);

  const handleDelete = async (examId) => {
    await deleteExam(examId);
    setExams(exams.filter((exam) => exam.id !== examId));
  };

  return (
    <div className="manage-exams">
      <h2>Gérer les Examens</h2>
      <table>
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
                  className="delete-btn"
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
  );
};

export default ManageExams;
