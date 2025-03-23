import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.scss";
import Button from "../../components/UI/Button";
import { getAllStudents } from "../../services/user/userService";
import { getAllTeachers } from "../../services/user/userService";
import { getAllExams } from "../../services/exam/examService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../../components/UI/Sidebar";

import logo from "../../../src/assets/images/logo.png";
import { useNotifications } from "../../context/NotificationContext";

const AdminDashboard = () => {
  const [recentActions, setRecentActions] = useState([]);
  const { notifications } = useNotifications();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [teacher, setTeachers] = useState([]);

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
    const mapped = notifications.map((n) => ` ${n.message}`);

    setRecentActions((prev) => {
      const unique = new Set([...mapped, ...prev]); // filtre les doublons
      return Array.from(unique);
    });
  }, [notifications]);

  // Utilisation des useEffect et fonctions async proprement organisées
  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentData = await getAllStudents();
        setStudents(studentData);
      } catch (error) {
        console.error("Erreur lors du chargement des étudiants :", error);
      }
    }

    fetchStudents();
  }, []);

  useEffect(() => {
    async function fetchExams() {
      try {
        const examData = await getAllExams();
        setExams(examData); // Assurez-vous d'avoir défini `setExams` correctement
      } catch (error) {
        console.error("Erreur lors du chargement des examens :", error);
      }
    }

    fetchExams();
  }, []);

  useEffect(() => {
    async function fetchTeachers() {
      // Correction du nom de la fonction pour plus de clarté
      try {
        const teacherData = await getAllTeachers();
        setTeachers(teacherData); // Assurez-vous d'avoir défini `setTeachers` correctement
      } catch (error) {
        console.error("Erreur lors du chargement des enseignants :", error); // Message d'erreur corrigé
      }
    }

    fetchTeachers();
  }, []);

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={adminMenuItems}
      />

      <div className="dashboard bg-gray-100 p-6">
        <div className="stats grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="statBox bg-orange-400 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Examens</h3>
            <p className="text-3xl mt-2">{exams.length}</p>
          </div>
          <div className="statBox bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Étudiants</h3>
            <p className="text-3xl mt-2">{students.length}</p>
          </div>
          <div className="statBox bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Enseignants</h3>
            <p className="text-3xl mt-2">{teacher.length}</p>
          </div>
        </div>
        <div className="recentActions bg-white rounded-lg shadow-md p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">🔔 Actions récentes</h2>
          <ul className="list-disc list-inside text-gray-700">
            {recentActions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
