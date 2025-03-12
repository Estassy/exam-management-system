import axios from "axios";

const API_URL = "http://localhost:8080/exams";

const getAllExams = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des examens :", error);
    return [];
  }
};

const getExamById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'examen ${id} :", error);
    return null;
  }
};

const createExam = async (examData) => {
  try {
    const response = await axios.post(API_URL, examData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'examen :", error);
    return null;
  }
};

const updateExam = async (id, examData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, examData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'examen ${id} :", error);
    return null;
  }
};

const deleteExam = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'examen ${id} :", error);
    return false;
  }
};

// Ajouter un étudiant à un examen
const addStudentToExam = async (examId, studentId) => {
  try {
    const response = await axios.post(`${API_URL}/${examId}/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'étudiant ${studentId} à l'examen ${examId} :", error);
    return null;
  }
};

// Retirer un étudiant d'un examen
const removeStudentFromExam = async (examId, studentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${examId}/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du retrait de l'étudiant ${studentId} de l'examen ${examId} :", error);
    return null;
  }
};

// Assigner un cours à un examen
const assignCourseToExam = async (examId, courseId) => {
  try {
    const response = await axios.post(`${API_URL}/${examId}/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'assignation du cours ${courseId} à l'examen ${examId} :", error);
    return null;
  }
};

export default {
  getAllExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  addStudentToExam,
  removeStudentFromExam,
  assignCourseToExam
};
