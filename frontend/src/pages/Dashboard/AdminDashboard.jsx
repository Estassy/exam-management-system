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


const AdminDashboard = () => {
  const [recentActions, setRecentActions] = useState([
    "Ajout d'un nouvel utilisateur",
    "Mise à jour des résultats d'examen",
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [teacher, setTeachers] = useState([]);

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
    async function fetchTeachers() { // Correction du nom de la fonction pour plus de clarté
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
            {/* Bouton Menu / Fermer */}
            <button className="menu-button" onClick={toggleSidebar}>
              {isSidebarOpen ? "✖ Fermer" : "☰ Menu"}
            </button>

            {/* Sidebar */}
          <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
              {/* Logo */}
              <div className="sidebar-logo">
                <img
                  src="src/assets/images/logo.png" // Remplacez par le chemin de votre logo
                  alt="Logo"
                  className="logo-image"
                />
              </div>
              <ul className="sidebar-menu">
                <li className="sidebar-item" onClick={() => navigate("/dashboard")}>
                  <HomeIcon className="sidebar-icon" /> Accueil
                </li>
                <li className="sidebar-item" onClick={() => navigate("/exams/manage")}>
                  <CalendarDaysIcon className="sidebar-icon" /> Examens
                </li>
                <li className="sidebar-item" onClick={() => navigate("/users/manage")}>
                  <UsersIcon className="sidebar-icon" /> Utilisateurs
                </li>
              </ul>
            </aside>

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

          <div className="recentActions">
            <h2>📝 Actions récentes</h2>
            <ul>
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
