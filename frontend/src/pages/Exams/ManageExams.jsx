// src/pages/ManageExams.jsx
import { useEffect, useState } from "react";
import { getAllExams } from "../../services/exam/examService";
import "./ManageExams.scss";

const ManageExams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getAllExams(); // Supposé que le service renvoie directement le tableau
        setExams(data);
      } catch (error) {
        console.error("Erreur lors du chargement des examens", error);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="manage-exams">
      <h1>📌 Gérer les Examens</h1>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>
            {exam.title} - {exam.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageExams;
