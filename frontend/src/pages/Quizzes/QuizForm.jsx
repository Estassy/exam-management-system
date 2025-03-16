import React, { useEffect, useState } from "react";
import "./QuizForm.scss";
import { getAllQuizTemplates } from "../../services/quiz/quizTemplateService";
import { getPromotions } from "../../services/promotion/promotionService";
import { createQuiz } from "../../services/quiz/quizService";

const QuizForm = () => {
  const [templates, setTemplates] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [useTemplate, setUseTemplate] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setTemplates(await getAllQuizTemplates());
      setPromotions(await getPromotions());
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPromotion) {
      alert("Veuillez choisir une promotion !");
      return;
    }

    const quizData = {
      title: quizTitle,
      promotionId: selectedPromotion,
      templateId: useTemplate ? selectedTemplate : null,
      questionIds: useTemplate ? [] : selectedQuestions,
    };

    await createQuiz(quizData);
    alert("Quiz créé avec succès !");
  };

  return (
    <div className="quiz-form">
      <h2>Créer un Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom du Quiz</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Choisir une promotion</label>
          <select
            value={selectedPromotion}
            onChange={(e) => setSelectedPromotion(e.target.value)}
          >
            <option value="">-- Sélectionnez une promotion --</option>
            {promotions.map((promo) => (
              <option key={promo.id} value={promo.id}>
                {promo.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={useTemplate}
              onChange={() => setUseTemplate(!useTemplate)}
            />
            Utiliser un modèle existant
          </label>
        </div>

        {useTemplate ? (
          <div className="form-group">
            <label>Choisir un modèle</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="">-- Sélectionnez un modèle --</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="form-group">
            <label>Ajouter des questions manuellement</label>
            <input
              type="text"
              placeholder="Ajoutez l'ID des questions (séparées par des virgules)"
              onChange={(e) =>
                setSelectedQuestions(
                  e.target.value.split(",").map((id) => id.trim())
                )
              }
            />
          </div>
        )}

        <button type="submit">Créer le Quiz</button>
      </form>
    </div>
  );
};

export default QuizForm;
