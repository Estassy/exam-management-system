import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../services/user/userService";
import { getGradesByStudent } from "../../services/exam/gradeService";
import { useNavigate } from "react-router-dom";
import "./StudentListPage.scss";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentData = await getAllStudents();
        setStudents(studentData);

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

  // Filtrer les étudiants selon la recherche
  const filteredStudents = students.filter((student) =>
    `${student.lastName} ${student.firstName} ${
      student.promotion ? student.promotion.name : ""
    }`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-list-page">
      <h1>Liste complète des étudiants</h1>

      {/* Barre de recherche */}
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
                    {student.promotion ? student.promotion.name : "Non assigné"}
                  </td>
                  <td>Pas encore noté</td>
                  <td>-</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5">Aucun étudiant trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListPage;
