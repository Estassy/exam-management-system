import api from "../api";

const API_URL = "/grades";

/**
 * Ajouter une note à un étudiant
 */
/**
 * Ajouter une note à un étudiant
 */
export async function addGrade(studentId, courseId, examId, score) {
  try {
    const response = await api.post(`/grades`, null, {
      params: { studentId, courseId, examId, score },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout de la note :", error);
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

/**
 * Récupère la liste des notes d'un étudiant
 */
export async function getStudentResults(studentId) {
    try {
      const response = await api.get(`${API_URL}/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des résultats :", error);
      return [];
    }
}

export default {
  addGrade,
  getGradesByStudent,
  updateGrade,
  getStudentResults,
};

