import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Pour la navigation
import {
  getAllCourses,
  updateCourseStatus,
} from "../../services/course/courseService";
import "./CoursesPage.scss";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Hook pour rediriger

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

  return (
    <div className="courses-page">
      <h2 className="courses-title">📚 Liste des cours</h2>

      {/* ✅ Bouton pour ajouter un cours */}
      <button
        onClick={() => navigate("/create-course")}
        className="add-course-btn"
      >
        ➕ Ajouter un cours
      </button>

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

              {/* ✅ Affichage des promotions associées */}
              <p className="course-info">
                🏫 <strong>Promotion :</strong>{" "}
                {course.promotions && course.promotions.length > 0
                  ? course.promotions.map((promo) => promo.name).join(", ")
                  : "Aucune"}
              </p>

              {/* ✅ Affichage des étudiants du cours */}
              <p className="course-info">
                👨‍🎓 <strong>Étudiants :</strong>{" "}
                {course.students && course.students.length > 0
                  ? course.students
                      .map(
                        (student) => `${student.firstName} ${student.lastName}`
                      )
                      .join(", ")
                  : "Aucun étudiant inscrit"}
              </p>

              {/* ✅ Sélecteur pour changer le statut */}
              <div className="course-status">
                <label className="status-label">
                  📌 <strong>Statut :</strong>
                </label>
                <select
                  className="status-select"
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
            </div>
          ))
        ) : (
          <p className="no-courses-message">⚠️ Aucun cours trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
