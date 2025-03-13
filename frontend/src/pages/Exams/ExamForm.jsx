// src/pages/ExamForm.jsx
import React from "react";
import "./ExamForm.scss";

const ExamForm = () => {
  return (
    <div className="exam-form">
      <h2>Formulaire d'examen</h2>
      <form>
        <div className="form-group">
          <label htmlFor="examTitle">Titre de l'examen</label>
          <input
            type="text"
            id="examTitle"
            name="examTitle"
            placeholder="Entrez le titre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="examDate">Date de l'examen</label>
          <input type="date" id="examDate" name="examDate" />
        </div>
        <button type="submit">Créer / Mettre à jour</button>
      </form>
    </div>
  );
};

export default ExamForm;
