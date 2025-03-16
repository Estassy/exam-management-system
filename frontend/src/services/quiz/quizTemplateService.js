import api from "../api"; 

const API_URL = "/quiz-templates";

/**
 * 📌 Récupérer tous les modèles de quiz
 */
export async function getAllQuizTemplates() {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des modèles de quiz :", error);
    return [];
  }
}

/**
 * 📌 Créer un modèle de quiz
 */
export async function createQuizTemplate(title, questionIds) {
  try {
    const response = await api.post(API_URL, {
      title,
      questionIds,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la création du modèle de quiz :", error);
    return null;
  }
}

export default {
  getAllQuizTemplates,
  createQuizTemplate,
};
