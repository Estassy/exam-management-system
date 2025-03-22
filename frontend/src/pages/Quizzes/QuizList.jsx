import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuizzes } from "../../services/quiz/quizService";
import "./QuizList.scss";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const data = await getAllQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des quiz :", error);
      }
    }
    fetchQuizzes();
  }, []);

  return (
    <div className="quiz-list">
      <h2>🎯 Liste des Quiz</h2>
      {quizzes.length === 0 ? (
        <p>Aucun quiz disponible.</p>
      ) : (
        <ul className="quiz-items">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="quiz-item">
              <div className="quiz-info">
                <strong>{quiz.title}</strong>
              </div>
              <button onClick={() => navigate(`/quiz/${quiz.id}`)}>
                ▶ Commencer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
