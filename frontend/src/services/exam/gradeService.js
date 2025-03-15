import api from "../api";

const API_URL = "/grades";

/**
 * Ajouter une note à un étudiant
 */
export async function addGrade(studentId, examId, score) {
  try {
    const response = await api.post(`${API_URL}`, null, {
      params: { studentId, examId, score },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la note :", error);
    throw error;
  }
}

/**
 * Récupérer les notes d'un étudiant
 */
export async function getGradesByStudent(studentId) {
  try {
    const response = await api.get(`${API_URL}/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des notes :", error);
    throw error;
  }
}

/**
 * Modifier une note
 */
export async function updateGrade(gradeId, newScore) {
  try {
    const response = await api.put(`${API_URL}/${gradeId}`, null, {
      params: { newScore },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification de la note :", error);
    throw error;
  }
}
