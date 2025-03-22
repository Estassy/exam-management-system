import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../services/user/userService";
import { getGradesByStudent } from "../../services/exam/gradeService";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import "./StudentListPage.scss";
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Gérer l'ouverture/fermeture
  const teacherMenuItems = [
    { label: "Accueil", icon: HomeIcon, onClick: () => navigate("/dashboard") },
    {
      label: "Cours",
      icon: CalendarDaysIcon,
      onClick: () => navigate("/courses"),
    },
    {
      label: "Créer un cours", // ✅ Nouveau bouton
      icon: PlusCircleIcon,
      onClick: () => navigate("/create-course"),
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
    {
      label: "Notes",
      icon: UsersIcon,
      onClick: () => navigate("/grades"),
    },
  ];

  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentData = await getAllStudents();
        setStudents(studentData);
        console.log("👩‍🎓 Étudiants récupérés :", studentData);

        const gradesData = {};
        for (const student of studentData) {
          gradesData[student.id] = await getGradesByStudent(student.id);
        }
        console.log("📊 Notes récupérées :", gradesData);
        setGrades(gradesData);
      } catch (error) {
        console.error("Erreur lors du chargement des étudiants :", error);
      }
    }
    fetchStudents();
  }, []);

  // Filtrer les étudiants selon la recherche
  const filteredStudents = students.filter((student) =>
    `${student.lastName} ${student.firstName} ${
      student.promotion ? student.promotion.name : ""
    }`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={teacherMenuItems}
      />
      <div className="student-list-page">
        <div className="title">Liste complète des étudiants</div>

        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher par nom, prénom ou promotion..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="back-button" onClick={() => navigate(-1)}>
          Retour
        </button>

        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Promotion</th>
              <th>Examens</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) =>
                grades[student.id]?.length > 0 ? (
                  grades[student.id].map((grade) => (
                    <tr key={`${student.id}-${grade.exam.id}`}>
                      <td>{student.lastName}</td>
                      <td>{student.firstName}</td>
                      <td>
                        {student.promotion
                          ? student.promotion.name
                          : "Non assigné"}
                      </td>
                      <td>{grade.exam.title}</td>
                      <td>{grade.score} / 20</td>
                    </tr>
                  ))
                ) : (
                  <tr key={student.id}>
                    <td>{student.lastName}</td>
                    <td>{student.firstName}</td>
                    <td>
                      {student.promotion
                        ? student.promotion.name
                        : "Non assigné"}
                    </td>
                    <td>Pas encore noté</td>
                    <td>-</td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  Aucun étudiant trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentListPage;
