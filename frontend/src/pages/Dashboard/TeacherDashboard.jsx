import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TeacherDashboard.scss";
import { getAllStudents } from "../../services/user/userService";
import { getAllExams } from "../../services/exam/examService";
import { getGradesByStudent } from "../../services/exam/gradeService";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [grades, setGrades] = useState({});

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture

  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentData = await getAllStudents();
        const courseData = await getCourseByTeacher(teacherId);
        setStudents(studentData);

        const gradesData = {};
        for (const student of studentData) {
          gradesData[student.id] = await getGradesByStudent(student.id);
        }
        setGrades(gradesData);
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
        setExams(examData);
      } catch (error) {
        console.error("Erreur lors du chargement des examens :", error);
      }
    }

    fetchExams();

    setCourses(5);
    setNotifications([
      { id: 1, message: "Nouvel étudiant inscrit", type: "info" },
      { id: 2, message: "Mise à jour de l'examen Physique", type: "warning" },
    ]);
  }, []);

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
      {/* Navbar dynamic */}
      {!isSidebarOpen && (
        <button className="menu-button" onClick={toggleSidebar}>
          ☰ Menu
        </button>
      )}

      {/* Bouton Menu / Fermer */}
      <button className="menu-button" onClick={toggleSidebar}>
        {isSidebarOpen ? "✖ Fermer" : "☰ Menu"}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <h2 className="sidebar-title">Tableau de Bord</h2>
        <ul className="sidebar-menu">
          <li className="sidebar-item" onClick={() => navigate("/dashboard")}>
            <HomeIcon className="sidebar-icon" /> Accueil
          </li>
          <li className="sidebar-item" onClick={() => navigate("/exams")}>
            <CalendarDaysIcon className="sidebar-icon" /> Examens
          </li>
          <li className="sidebar-item" onClick={() => navigate("/students")}>
            <UsersIcon className="sidebar-icon" /> Étudiants
          </li>
          <li className="sidebar-item" onClick={() => navigate("/settings")}>
            <Cog6ToothIcon className="sidebar-icon" /> Paramètres
          </li>
        </ul>
      </aside>

      <div className="dashboard bg-gray-100 p-6">
        <h1 className="dashboard-title text-3xl font-bold mb-6 text-orange-500">
          🎓 Bienvenue sur votre espace enseignant
        </h1>

        <div className="stats grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="statBox bg-orange-400 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Examens à venir</h3>
            <p className="text-3xl mt-2">{exams.length}</p>
          </div>
          <div className="statBox bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Étudiants</h3>
            <p className="text-3xl mt-2">{students.length}</p>
          </div>
          <div className="statBox bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Cours</h3>
            <p className="text-3xl mt-2">{courses}</p>
          </div>
        </div>

        <div className="main-content grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="calendar-container">
            <h2 className="text-lg font-bold mb-4">Calendrier des Examens</h2>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="custom-calendar"
            />
            <div className="mt-4">
              <h3 className="font-medium">Examens programmés :</h3>
              {exams.map((exam) => (
                <p key={exam.id} className="mt-2 text-gray-600">
                  📌 {exam.title} - {new Date(exam.date).toLocaleDateString()}
                </p>
              ))}
            </div>
          </div>

          <div className="notifications bg-white p-6 notifications-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Notifications récentes</h2>
            <ul className="space-y-2">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`p-3 rounded-lg ${
                    notif.type === "info"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {notif.message}
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Voir toutes les notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
