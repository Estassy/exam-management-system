import React, { useState, useEffect } from "react";
import { createCourse } from "../../services/course/courseService";
import { getPromotions } from "../../services/promotion/promotionService";
import "./CourseForm.scss";

function CourseForm({ onCourseCreated }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState(""); // ✅ Unique promotion sélectionnée
  const [promotions, setPromotions] = useState([]);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Charger les promotions disponibles
  useEffect(() => {
    getPromotions().then((data) => {
      setPromotions(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!title.trim()) errors.title = "Le titre est obligatoire.";
    if (!date) errors.date = "La date est obligatoire.";
    if (!selectedPromotion)
      errors.promotion = "Veuillez sélectionner une promotion.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const newCourse = {
        title,
        date: date || null,
        promotions: selectedPromotion ? [{ id: selectedPromotion }] : [], // ✅ Envoie un tableau d'objets avec l'ID de la promotion.
      };
      console.log("📤 Données envoyées au backend :", newCourse);

      await createCourse(newCourse);
      setConfirmation("Cours créé avec succès !");
      setError("");
      setFieldErrors({});
      setTitle("");
      setDate("");
      setSelectedPromotion("");
      if (onCourseCreated) onCourseCreated();
    } catch (err) {
      console.error("Erreur lors de la création du cours", err);
      setError("Erreur lors de la création du cours.");
      setConfirmation("");
    }
  };

  return (
    <div className="course-form">
      <div className="course-title">Créer un cours</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Titre :</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {fieldErrors.title && (
            <span className="error-text">{fieldErrors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Date :</label>
          <input
            type="datetime-local"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {fieldErrors.date && (
            <span className="error-text">{fieldErrors.date}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Sélectionner une promotion :</label>
          <select
            className="form-select"
            value={selectedPromotion}
            onChange={(e) => setSelectedPromotion(e.target.value)}
          >
            <option value="">-- Choisissez une promotion --</option>
            {promotions.map((promo) => (
              <option key={promo.id} value={promo.id}>
                {promo.name}
              </option>
            ))}
          </select>
          {fieldErrors.promotion && (
            <span className="error-text">{fieldErrors.promotion}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Créer le cours
        </button>
      </form>
      {confirmation && <p className="message success">{confirmation}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
}

export default CourseForm;
