import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getAllExams } from "../../services/exam/examService";

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExams() {
      try {
        const data = await getAllExams();
        setExams(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des examens :", error);
      }
    }
    fetchExams();
  }, []);

  return (
    <div className="exam-list">
      <h2>📘 Liste des Examens</h2>
      {exams.length === 0 ? (
        <p>Aucun examen disponible.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam.id}>
              {exam.title} - {new Date(exam.date).toLocaleDateString()}
              <button onClick={() => navigate(`/exam/${exam.id}`)}>
                📄 Voir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamList;
