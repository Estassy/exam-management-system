import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExamById } from "../../services/exam/examService";
import "./TakeExamPage.scss";

const TakeExamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchExam() {
      const data = await getExamById(id);
      console.log("📦 Exam reçu :", data);
      setExam(data);
    }
    fetchExam();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log("📝 Réponses envoyées :", answers);
    setSubmitted(true);
  };

  if (!exam) return <p className="exam-loading">Chargement de l'examen...</p>;
  if (!exam.questions?.length)
    return <p className="exam-empty">Aucune question disponible.</p>;

  return (
    <div className="take-exam-page">
      <h2 className="exam-title">{exam.title}</h2>

      <div className="questions-list">
        {exam.questions.map((q, index) => (
          <div key={q.id} className="question-card">
            <p className="question-text">
              <strong>
                {index + 1}. {q.questionText}
              </strong>
            </p>
            <div className="options-list">
              {[q.option1, q.option2, q.option3, q.option4].map((option, i) => (
                <label key={i} className="option-item">
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleAnswerChange(q.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="submit-exam-btn"
        onClick={handleSubmit}
        disabled={submitted}
      >
        {submitted ? "Examen terminé ✅" : "Soumettre"}
      </button>
    </div>
  );
};

export default TakeExamPage;
