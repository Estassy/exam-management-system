import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../services/user/userService";
import { getAllCourses } from "../../services/course/courseService";
import { addGrade } from "../../services/exam/gradeService";
import { getAllExams } from "../../services/exam/examService";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";
import "./GradeForm.scss";

function GradeForm() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
    async function fetchData() {
      try {
        const [studentData, courseData, examData] = await Promise.all([
          getAllStudents(),
          getAllCourses(),
          getAllExams(),
        ]);
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
      setMessage("✅ Note attribuée avec succès !");
      setScore("");
      setSelectedStudent("");
      setSelectedCourse("");
      setSelectedExam("");
    } catch (error) {
      setMessage("❌ Erreur lors de l’attribution de la note.");
    }
  };

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={teacherMenuItems}
      />

      <div className="grade-page">
        <h2>Attribuer une note</h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="student">Étudiant</label>
            <select
              id="student"
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
          </div>

          <div className="form-group">
            <label htmlFor="course">Cours</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Sélectionner un cours</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="exam">Examen</label>
            <select
              id="exam"
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
          </div>

          <div className="form-group">
            <label htmlFor="score">Note</label>
            <input
              id="score"
              type="number"
              placeholder="Note"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
              max="20"
            />
          </div>

          <button type="submit">Attribuer la note</button>

          {message && (
            <div
              className={`feedback ${
                message.startsWith("❌") ? "error" : "success"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default GradeForm;
