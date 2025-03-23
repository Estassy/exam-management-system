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
import {
  deleteNotification,
  markNotificationAsRead,
} from "../../services/notification/notificationService";

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

  const uniqueNotifications = notifications.filter(
    (notif, index, self) => index === self.findIndex((n) => n.id === notif.id)
  );

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
    <div
      className={`admin-dashboard-container ${isSidebarOpen ? "shifted" : ""}`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={adminMenuItems}
      />

      <div className="admin-dashboard-wrapper">
        <div className="admin-stats">
          <div className="admin-stat-box">
            <h3>Examens</h3>
            <p>{exams.length}</p>
          </div>
          <div className="admin-stat-box">
            <h3>Étudiants</h3>
            <p>{students.length}</p>
          </div>
          <div className="admin-stat-box">
            <h3>Enseignants</h3>
            <p>{teacher.length}</p>
          </div>
        </div>

        <div className="admin-notifications">
          <h2 className="admin-notif-title">🔔 Actions récentes</h2>
          <ul className="admin-notif-list">
            {uniqueNotifications.map((notif) => (
              <li
                key={notif.id}
                className={`admin-notif-item ${notif.read ? "read" : ""}`}
              >
                <span className="admin-notif-message">📢 {notif.message}</span>
                <div className="admin-notif-buttons">
                  <button
                    className="admin-notif-btn read"
                    onClick={async () => {
                      await markNotificationAsRead(notif.id);
                    }}
                  >
                    Lu
                  </button>
                  <button
                    className="admin-notif-btn delete"
                    onClick={async () => {
                      await deleteNotification(notif.id);
                    }}
                  >
                    ❌ Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
