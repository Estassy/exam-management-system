import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TeacherDashboard.scss";
import { getAllStudents } from "../../services/user/userService";
import { getAllExams } from "../../services/exam/examService";
import { getGradesByStudent } from "../../services/exam/gradeService";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { getCoursesByTeacher } from "../../services/course/courseService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [grades, setGrades] = useState({});

  const { user } = useContext(AuthContext); // ✅ Récupération de l'utilisateur connecté
  const teacherId = user?.id; // 🏷️ Assure-toi que `id` est bien l'ID du professeur

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
    async function fetchStudents() {
      try {
        const studentData = await getAllStudents();
        const courseData = await getCoursesByTeacher(teacherId);
        setCourses(courseData.length);
        console.log("👩‍🎓 course récupérés :", courseData);
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
        console.log("📝 Examens récupérés :", examData);
        setExams(examData);
      } catch (error) {
        console.error("Erreur lors du chargement des examens :", error);
      }
    }

    fetchExams();
  }, []);

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
      <div className="dashboard bg-gray-100 p-6">
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
            <p className="text-3xl mt-2">{courses.length}</p>
          </div>
        </div>

        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          logoSrc={logo}
          menuItems={teacherMenuItems}
        />

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
