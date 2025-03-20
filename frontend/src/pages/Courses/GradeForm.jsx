import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../services/user/userService";
import { getAllCourses } from "../../services/course/courseService"; // ✅ Correction ici
import { addGrade } from "../../services/exam/gradeService";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import "./GradeForm.scss";
import { getAllExams } from "../../services/exam/examService";

function GradeForm() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]); // ✅ Correction ici
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture

  // ✅ Charger les étudiants et les cours au montage du composant
  useEffect(() => {
    async function fetchData() {
      try {
        const studentData = await getAllStudents();
        const courseData = await getAllCourses();
        const examData = await getAllExams();

        setStudents(studentData);
        setCourses(courseData);
        setExams(examData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedCourse || !selectedExam || score === "") {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await addGrade(
        selectedStudent,
        selectedCourse,
        selectedExam,
        parseFloat(score)
      );
      setMessage("Note attribuée avec succès !");
      setScore("");
    } catch (error) {
      setMessage("Erreur lors de l’attribution de la note.");
    }
  };

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

      <div>
        <div className="grade-page">
          <div className="header">
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
                <option value="">Sélectionner un Cours</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>

              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                <option value="">Sélectionner un examen</option>
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.title}
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
        </div>
      </div>
    </div>
  );
}

export default GradeForm;
