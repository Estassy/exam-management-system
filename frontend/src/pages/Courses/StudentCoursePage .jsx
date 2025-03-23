import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getCoursesByStudent } from "../../services/course/courseService";
import "./StudentCoursePage.scss";
import Sidebar from "../../components/UI/Sidebar";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from "../../../src/assets/images/logo.png";

const StudentCoursePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
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
    async function fetchCourses() {
      if (user?.id) {
        try {
          const data = await getCoursesByStudent(user.id);
          setCourses(data);
        } catch (error) {
          console.error("Erreur lors du chargement des cours :", error);
        }
      }
    }
    fetchCourses();
  }, [user?.id]);

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={studentMenuItems}
      />
      <div className="student-course-page">
        <h2 className="student-course-title">📘 Mes cours</h2>
        {courses.length === 0 ? (
          <p className="no-course-msg">Aucun cours disponible.</p>
        ) : (
          <div className="course-list">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <h3 className="course-name">{course.title}</h3>
                <p className="course-date">
                  📅 {new Date(course.date).toLocaleString()}
                </p>
                <p
                  className={`course-status status-${course.status.toLowerCase()}`}
                >
                  Statut : {course.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCoursePage;
