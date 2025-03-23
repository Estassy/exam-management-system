
import api from '../api'; 

const API_URL = "/exams";

/**
 * Récupère la liste de tous les examens
 */
export async function getAllExams() {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des examens :", error);
    return [];
  }
}

/**
 * Récupère un examen par son ID
 */
export async function getExamById(id) {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'examen ${id} :`, error);
    return null;
  }
}

/**
 * Crée un nouvel examen
 */
export async function createExam(examData) {
  try {
    const response = await api.post(API_URL, examData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'examen :", error);
    return null;
  }
}

/**
 * Met à jour un examen existant
 */
export async function updateExam(id, examData) {
  try {
    const response = await api.put(`${API_URL}/${id}`, examData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'examen ${id} :`, error);
    return null;
  }
}

/**
 * Supprime un examen
 */
export async function deleteExam(id) {
  try {
    await api.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'examen ${id} :`, error);
    return false;
  }
}

/**
 * Ajoute un étudiant à un examen
 */
export async function addStudentToExam(examId, studentId) {
  try {
    const response = await api.post(`${API_URL}/${examId}/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de l'ajout de l'étudiant ${studentId} à l'examen ${examId} :`, error);
    return null;
  }
}

/**
 * Retire un étudiant d'un examen
 */
export async function removeStudentFromExam(examId, studentId) {
  try {
    const response = await api.delete(`${API_URL}/${examId}/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors du retrait de l'étudiant ${studentId} de l'examen ${examId} :`, error);
    return null;
  }
}

/**
 * Assigne un cours à un examen
 */
export async function assignCourseToExam(examId, courseId) {
  try {
    const response = await api.post(`${API_URL}/${examId}/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de l'assignation du cours ${courseId} à l'examen ${examId} :`, error);
    return null;
  }
}

/**
 * Récupère la liste des examens à venir pour un étudiant donné
 */
export async function getUpcomingExams(studentId) {
  try {
    const response = await api.get(`${API_URL}/upcoming/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des examens à venir :", error);
    return [];
  }
}

export default {
  getAllExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  addStudentToExam,
  removeStudentFromExam,
  assignCourseToExam,
  getUpcomingExams,
};
