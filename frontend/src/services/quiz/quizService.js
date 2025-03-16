import api from "../api"; 

const API_URL = "/quizzes";

/**
 * 📌 Récupérer tous les quiz
 */
export async function getAllQuizzes() {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des quiz :", error);
    return [];
  }
}

/**
 * 📌 Récupérer un quiz par son ID
 */
export async function getQuizById(id) {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération du quiz ${id} :`, error);
    return null;
  }
}

/**
 * 📌 Créer un quiz (soit manuellement, soit à partir d'un modèle)
 */
export async function createQuiz(quizData) {
  try {
    const response = await api.post(API_URL, quizData);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la création du quiz :", error);
    return null;
  }
}

/**
 * 📌 Mettre à jour un quiz existant (changement de titre ou questions)
 */
export async function updateQuiz(quizId, newTitle, questionIds) {
  try {
    const response = await api.put(`${API_URL}/${quizId}`, {
      title: newTitle,
      questionIds,
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour du quiz ${quizId} :`, error);
    return null;
  }
}

/**
 * 📌 Supprimer un quiz
 */
export async function deleteQuiz(quizId) {
  try {
    await api.delete(`${API_URL}/${quizId}`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression du quiz ${quizId} :`, error);
    return false;
  }
}

/**
 * 📌 Ajouter une question à un quiz
 */
export async function addQuestionToQuiz(quizId, questionId) {
  try {
    const response = await api.post(`${API_URL}/${quizId}/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de l'ajout de la question ${questionId} au quiz ${quizId} :`, error);
    return null;
  }
}

/**
 * 📌 Retirer une question d'un quiz
 */
export async function removeQuestionFromQuiz(quizId, questionId) {
  try {
    const response = await api.delete(`${API_URL}/${quizId}/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors du retrait de la question ${questionId} du quiz ${quizId} :`, error);
    return null;
  }
}

export default {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestionToQuiz,
  removeQuestionFromQuiz,
};
