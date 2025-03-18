import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TeacherDashboard.scss";
import { getAllStudents } from "../../services/user/userService";
import { getAllExams } from "../../services/exam/examService";
import { getGradesByStudent } from "../../services/exam/gradeService";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [grades, setGrades] = useState({});
  const [showAllStudents, setShowAllStudents] = useState(false); // État pour gérer l'affichage des étudiants

  // Récupérer les étudiants
  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentData = await getAllStudents();
        setStudents(studentData);

        // Charger les notes pour chaque étudiant
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

  // Récupérer les examens et les cours
  useEffect(() => {
    async function fetchExams() {
      try {
        const examData = await getAllExams();
        setExams(examData);
      } catch (error) {
        console.error("Erreur lors du chargement des examens :", error);
      }
    }

    fetchExams();

    setCourses(5);
    setNotifications([
      { id: 1, message: "Nouvel étudiant inscrit", type: "info" },
      { id: 2, message: "Mise à jour de l'examen Physique", type: "warning" },
    ]);
  }, []);

  return (
    <div className="dashboard">
        <h1 className="dashboard-title">
                🎓 Bienvenue sur votre espace enseignant
        </h1>

      {/* Section des statistiques */}
      <div className="stats">
        <div className="statBox">
          <h3>Examens à venir</h3>
          <p>{exams.length}</p>
        </div>
        <div className="statBox">
          <h3>Étudiants</h3>
          <p>{students.length}</p>
        </div>
        <div className="statBox">
          <h3>Cours</h3>
          <p>{courses}</p>
        </div>
      </div>

      <div className="main-content">
        {/* Section calendrier */}
        <div className="calendar-container">
          <h2>Calendrier des Examens</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <p>
            Examens programmés :
            {exams.map((exam) => (
              <span key={exam.id} className="block">
                📌 {exam.title} - {new Date(exam.date).toLocaleDateString()}
              </span>
            ))}
          </p>
        </div>

        {/* Notifications */}
        <div className="notifications">
          <h2>Notifications récentes</h2>
          <ul>
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={notif.type === "info" ? "info" : "warning"}
              >
                {notif.message}
              </li>
            ))}
          </ul>
          <button>Voir toutes les notifications</button>
        </div>

        {/* Section de suivi des étudiants avec notes
        /*<div className="student-progress">
          <h2>Suivi des étudiants</h2>
          <table>
            <thead>
              <tr>
                <th>Étudiant</th>
                <th>Examen</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {students
                .slice(0, showAllStudents ? students.length : 5) // Afficher 5 étudiants par défaut
                .map((student) =>
                  grades[student.id]?.length > 0 ? (
                    grades[student.id].map((grade) => (
                      <tr key={`${student.id}-${grade.exam.id}`}>
                        <td>{student.username}</td>
                        <td>{grade.exam.title}</td>
                        <td>{grade.score} / 20</td>
                      </tr>
                    ))
                  ) : (
                    <tr key={student.id}>
                      <td>{student.username}</td>
                      <td>Pas encore noté</td>
                      <td>-</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>

          Bouton Voir plus / Voir moins
          <button
            className="toggle-students"
            onClick={() => navigate("/students")}
          >
            Voir plus
          </button>
        </div>*/}
      </div>
     </div>
  );
}

export default TeacherDashboard;