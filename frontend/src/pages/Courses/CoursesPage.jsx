import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Pour la navigation
import {
  getAllCourses,
  updateCourseStatus,
} from "../../services/course/courseService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import "./CoursesPage.scss";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCourses();
        console.log("✅ Cours récupérés :", data); // Debugging
        setCourses(data);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des cours :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleStatusChange = async (courseId, newStatus) => {
    try {
      await updateCourseStatus(courseId, newStatus);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, status: newStatus } : course
        )
      );
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du statut :", error);
    }
  };

  if (loading) {
    return <p>⏳ Chargement des cours...</p>;
  }

  // return (
  //   <div className="courses-page">
  //     <h2 className="courses-title">📚 Liste des cours</h2>

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
            src="src/assets/images/logo.png"
            alt="Logo"
            className="logo-image"
          />
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-item" onClick={() => navigate("/dashboard")}>
            <HomeIcon className="sidebar-icon" /> Accueil
          </li>
          <li className="sidebar-item" onClick={() => navigate("/courses")}>
            <CalendarDaysIcon className="sidebar-icon" /> Cours
          </li>
          <li
            className="sidebar-item"
            onClick={() => navigate("/QuizExamsPage")}
          >
            <CalendarDaysIcon className="sidebar-icon" /> Examens
          </li>
          <li className="sidebar-item" onClick={() => navigate("/students")}>
            <UsersIcon className="sidebar-icon" /> Étudiants
          </li>
          <li className="sidebar-item" onClick={() => navigate("/grades")}>
            <UsersIcon className="sidebar-icon" /> Notes
          </li>
        </ul>
      </aside>
      <div className="courses-page">
        <h2>Liste des cours</h2>

        {/* ✅ Affichage de tous les cours */}
        <div className="course-list">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="course-card">
                <h3 className="course-title">📖 {course.title}</h3>
                <p className="course-info">
                  📅 <strong>Date :</strong>{" "}
                  {course.date
                    ? new Date(course.date).toLocaleString()
                    : "Non définie"}
                </p>
                <label>Statut :</label>
                <select
                  value={course.status}
                  onChange={(e) =>
                    handleStatusChange(course.id, e.target.value)
                  }
                >
                  <option value="PENDING">À venir</option>
                  <option value="ONGOING">En cours</option>
                  <option value="COMPLETED">Passé</option>
                </select>
              </div>
            ))
          ) : (
            <p>Aucun cours disponible.</p> // Added fallback message for empty course list
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
