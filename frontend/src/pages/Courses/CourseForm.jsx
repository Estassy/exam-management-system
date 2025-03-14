import React, { useState } from "react";
import { createCourse } from "../../services/course/courseService";
import "./CourseForm.scss";

function CourseForm({ onCourseCreated }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  // Nouvel état pour stocker les erreurs de champs
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On vérifie manuellement les champs requis
    let errors = {};
    if (!title.trim()) {
      errors.title = "Le titre est obligatoire.";
    }
    if (!date) {
      errors.date = "La date est obligatoire.";
    }
    if (!status) {
      errors.status = "Le statut est obligatoire.";
    }

    // Si on détecte des erreurs, on les affiche et on arrête
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const newCourse = {
        title,
        date: date || null,
        status,
      };
      const response = await createCourse(newCourse);
      setConfirmation("Cours créé avec succès !");
      setError("");
      setFieldErrors({});
      setTitle("");
      setDate("");
      setStatus("PENDING");
    } catch (err) {
      console.error("Erreur lors de la création du cours", err);
      setError("Erreur lors de la création du cours.", err);
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

        {/* <div className="form-group">
          <label>Statut :</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">-- Sélectionnez un statut --</option>
            <option value="ONGOING">En cours</option>
            <option value="COMPLETED">Passés</option>
            <option value="CANCELLED">A venir</option>
          </select>
          {fieldErrors.status && (
            <span className="error-text">{fieldErrors.status}</span>
          )}
        </div> */}

        {/* Il faudrait gérer le statut du cours : lorsque le prof créé le cours, son statut est automatiquement 'à venir'. 
        Le prof a la possibilité (plus tard) de modifier le statut du cours de 'à venir' à 'en cours' lorsque le prof décide de le rendre visible aux étudiants. 
        Puis lorsque les étudiants ont passé l'exam. Le statut du cours passe de 'en cours' à 'passé'*/}

        <button type="submit">Créer le cours</button>
      </form>
      {confirmation && <p className="message success">{confirmation}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
}

export default CourseForm;
