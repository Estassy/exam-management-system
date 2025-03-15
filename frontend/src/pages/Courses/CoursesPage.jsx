import React, { useEffect, useState } from "react";
import {
  getAllCourses,
  updateCourseStatus,
} from "../../services/course/courseService";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
