import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../services/user/userService";
import { getAllCourses } from "../../services/course/courseService";
import { addGrade } from "../../services/exam/gradeService";
import { getAllExams } from "../../services/exam/examService";

function GradeForm() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Récupérer uniquement les étudiants et les cours
  useEffect(() => {
    async function fetchData() {
      try {
        const studentData = await getAllStudents();
        setStudents(studentData);
        const courseData = await getAllExams();
        setCourses(courseData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedCourse || score === "") {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await addGrade(selectedStudent, selectedCourse, parseFloat(score));
      setMessage("Note attribuée avec succès !");
      setScore("");
    } catch (error) {
      setMessage("Erreur lors de l’attribution de la note.");
    }
  };

  return (
    <div>
      <h2>Attribuer une note</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Sélectionner un étudiant</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Sélectionner un Examen</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Note"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          min="0"
          max="20"
        />

        <button type="submit">Attribuer la note</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default GradeForm;
