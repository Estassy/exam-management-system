import React, { useEffect, useState } from "react";
import { createExam } from "../../services/exam/examService";
import {
  createExamFromTemplate,
  getExamTemplates,
} from "../../services/exam/templeteService";
import { getPromotions } from "../../services/promotion/promotionService";
import "./ExamForm.scss"; // Importation du style

const ExamForm = () => {
  const [templates, setTemplates] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [message, setMessage] = useState(""); // Pour afficher un message de confirmation

  useEffect(() => {
    async function fetchData() {
      try {
        const templateData = await getExamTemplates();
        console.log("📌 Templates reçus :", templateData);
        const promotionData = await getPromotions();
        setTemplates(templateData);
        setPromotions(promotionData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPromotion) {
      setMessage("⚠️ Veuillez choisir une promotion !");
      return;
    }

    try {
      if (selectedTemplate) {
        await createExamFromTemplate(
          selectedTemplate,
          examDate,
          selectedPromotion
        );
        setMessage("✅ Examen créé à partir d'un modèle !");
      } else {
        await createExam({
          title: examTitle,
          date: examDate,
          promotionId: selectedPromotion,
        });
        setMessage("✅ Examen personnalisé créé !");
      }

      // Réinitialisation du formulaire après soumission
      setSelectedTemplate("");
      setSelectedPromotion("");
      setExamTitle("");
      setExamDate("");
    } catch (error) {
      setMessage(
        "❌ Une erreur s'est produite lors de la création de l'examen."
      );
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="exam-form">
      <div className="exam-title">Créer un examen</div>

      <form onSubmit={handleSubmit}>
        {/* Choix du modèle */}
        <div className="form-group">
          <label className="form-label">Utiliser un modèle :</label>
          <select
            className="form-input"
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

        {/* Choix de la promotion */}
        <div className="form-group">
          <label className="form-label">Associer à une promotion :</label>
          <select
            className="form-input"
            value={selectedPromotion}
            onChange={(e) => setSelectedPromotion(e.target.value)}
          >
            <option value="">-- Sélectionnez une promotion --</option>
            {promotions.map((promotion) => (
              <option key={promotion.id} value={promotion.id}>
                {promotion.name}
              </option>
            ))}
          </select>
        </div>

        {/* Saisie manuelle du titre */}
        <div className="form-group">
          <label className="form-label">Titre de l'examen :</label>
          <input
            className="form-input"
            type="text"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            disabled={selectedTemplate} // Désactiver si un modèle est choisi
          />
        </div>

        {/* Sélection de la date */}
        <div className="form-group">
          <label className="form-label">Date de l'examen :</label>
          <input
            className="form-input"
            type="datetime-local"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </div>

        {/* Bouton de soumission */}
        <button type="submit" className="submit-btn">
          Créer l'examen
        </button>

        {/* Affichage des messages d'erreur ou succès */}
        {message && (
          <p className={message.includes("✅") ? "success" : "error"}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ExamForm;
