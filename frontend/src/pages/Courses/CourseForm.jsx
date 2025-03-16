import React, { useState, useEffect } from "react";
import { createCourse } from "../../services/course/courseService";
import "./CourseForm.scss";
import { getPromotions } from "../../services/promotion/promotionService";

function CourseForm({ onCourseCreated }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [selectedPromotions, setSelectedPromotions] = useState([]);
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
    if (selectedPromotions.length === 0)
      errors.promotions = "Sélectionnez au moins une promotion.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const newCourse = {
        title,
        date: date || null,
        promotionIds: selectedPromotions,
      };

      await createCourse(newCourse);
      setConfirmation("Cours créé avec succès !");
      setError("");
      setFieldErrors({});
      setTitle("");
      setDate("");
      setSelectedPromotions([]);
      if (onCourseCreated) onCourseCreated();
    } catch (err) {
      console.error("Erreur lors de la création du cours", err);
      setError("Erreur lors de la création du cours.");
      setConfirmation("");
    }
  };

  return (
    <div className="course-form">
      <h2>Créer un cours</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {fieldErrors.title && (
            <span className="error-text">{fieldErrors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label>Date :</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {fieldErrors.date && (
            <span className="error-text">{fieldErrors.date}</span>
          )}
        </div>

        <div className="form-group">
          <label>Choisir les promotions :</label>
          <select
            multiple
            value={selectedPromotions}
            onChange={(e) =>
              setSelectedPromotions(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {promotions.map((promo) => (
              <option key={promo.id} value={promo.id}>
                {promo.name}
              </option>
            ))}
          </select>
          {fieldErrors.promotions && (
            <span className="error-text">{fieldErrors.promotions}</span>
          )}
        </div>

        <button type="submit">Créer le cours</button>
      </form>
      {confirmation && <p className="message success">{confirmation}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
}

export default CourseForm;
