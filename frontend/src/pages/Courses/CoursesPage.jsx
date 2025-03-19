import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Pour la navigation
import {
  getAllCourses,
  updateCourseStatus,
} from "../../services/course/courseService";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Hook pour rediriger

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
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
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>Liste des cours</h2>

      {/* ✅ Bouton pour ajouter un cours */}
      <button
        onClick={() => navigate("/create-course")}
        className="add-course-btn"
      >
        ➕ Ajouter un cours
      </button>

      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <h3>{course.title}</h3>
          <p>
            📅 Date :{" "}
            {course.date
              ? new Date(course.date).toLocaleString()
              : "Non définie"}
          </p>
          <label>📌 Statut :</label>
          <select
            value={course.status}
            onChange={(e) => handleStatusChange(course.id, e.target.value)}
          >
            <option value="PENDING">À venir</option>
            <option value="ONGOING">En cours</option>
            <option value="COMPLETED">Passé</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default CoursesPage;
