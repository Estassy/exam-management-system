import { useEffect, useState } from "react";
import examService from "../../services/examService";

const ManageExams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await examService.getAllExams(); // Appel API backend
        setExams(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des examens", error);
      }
    };

    fetchExams();
  }, []);

  return (
    <div>
      <h1>📌 Gérer les Examens</h1>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>{exam.title} - {exam.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageExams;
