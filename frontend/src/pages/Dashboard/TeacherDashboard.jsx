import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TeacherDashboard.scss";
import { getAllStudents } from "../../services/user/userService";
import { getAllExams } from "../../services/exam/examService";
import { getGradesByStudent } from "../../services/grade/gradeService";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { getCoursesByTeacher } from "../../services/course/courseService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";
import {
  deleteNotification,
  getNotificationsByUser,
  markNotificationAsRead,
} from "../../services/notification/notificationService";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [grades, setGrades] = useState({});

  const { user } = useContext(AuthContext);
  const teacherId = user?.id;
  const getExamDays = () => {
    return exams.map((exam) => new Date(exam.date).toDateString());
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const teacherMenuItems = [
    {
      label: "Accueil",
      icon: HomeIcon,
      onClick: () => navigate("/dashboard"),
    },
    {
      label: "Cours",
      icon: ClipboardDocumentListIcon,
      onClick: () => navigate("/courses"),
    },
    {
      label: "Créer un cours",
      icon: PlusCircleIcon,
      onClick: () => navigate("/create-course"),
    },
    {
      label: "Examens",
      icon: CalendarDaysIcon,
      onClick: () => navigate("/QuizExamsPage"),
    },
    {
      label: "Créer un examen",
      icon: PencilSquareIcon,
      onClick: () => navigate("/create-exam"),
    },
    {
      label: "Créer un quiz",
      icon: DocumentDuplicateIcon,
      onClick: () => navigate("/create-quiz"),
    },
    {
      label: "Étudiants",
      icon: UsersIcon,
      onClick: () => navigate("/students"),
    },
    {
      label: "Notes",
      icon: AcademicCapIcon,
      onClick: () => navigate("/grades"),
    },
  ];

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentData = await getAllStudents();
        const courseData = await getCoursesByTeacher(teacherId);
        const notifs = await getNotificationsByUser(teacherId);
        console.log("🔔 Notifications récupérées :", notifs);
        setNotifications(notifs);
        setCourses(courseData);
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
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={teacherMenuItems}
      />
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

        <div className="main-content grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="calendar-container">
            <h2 className="text-lg font-bold mb-4">Calendrier des Examens</h2>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="custom-calendar"
              tileContent={({ date, view }) => {
                if (view === "month") {
                  const examDays = exams.map((exam) =>
                    new Date(exam.date).toDateString()
                  );

                  if (examDays.includes(date.toDateString())) {
                    return <div className="exam-dot" />;
                  }
                }
                return null;
              }}
            />

            <div className="exam-list">
              <h3 className="exam-title">Examens programmés :</h3>
              {exams.map((exam) => (
                <div key={exam.id} className="exam-item">
                  {exam.title} – {new Date(exam.date).toLocaleDateString()}
                </div>
              ))}
            </div>
          </div>

          <div className="teacher-notifications">
            <h2 className="notif-title">🔔 Notifications récentes</h2>
            <ul className="notif-list">
              {notifications
                .filter((notif) => !notif.read)
                .map((notif) => (
                  <li key={notif.id} className="notif-card">
                    <span className="notif-message">📣 {notif.message}</span>
                    <div className="notif-buttons">
                      <button
                        className="notif-btn read"
                        onClick={async () => {
                          await markNotificationAsRead(notif.id);
                          setNotifications((prev) =>
                            prev.map((n) =>
                              n.id === notif.id ? { ...n, read: true } : n
                            )
                          );
                        }}
                      >
                        Lu
                      </button>
                      <button
                        className="notif-btn delete"
                        onClick={async () => {
                          await deleteNotification(notif.id);
                          setNotifications((prev) =>
                            prev.filter((n) => n.id !== notif.id)
                          );
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
    </div>
  );
}

export default TeacherDashboard;
