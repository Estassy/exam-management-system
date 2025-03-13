// src/services/courseService.js
import api from '../api'; // <-- Ton instance Axios avec interceptors

/**
 * Récupère tous les cours
 */
export async function getAllCourses() {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Récupère un cours par son ID
 */
export async function getCourseById(id) {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Crée un nouveau cours
 */
export async function createCourse(course) {
  try {
    // Grâce à l’interceptor, le token sera automatiquement ajouté
    const response = await api.post('/courses', course);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Met à jour un cours existant
 */
export async function updateCourse(id, course) {
  try {
    const response = await api.put(`/courses/${id}`, course);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Supprime un cours
 */
export async function deleteCourse(id) {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Récupère la liste des cours d'un étudiant
 */
export async function getCoursesByStudent(studentId) {
  try {
    const response = await api.get(`/courses/student/${studentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Ajoute un étudiant à un cours
 */
export async function addStudentToCourse(courseId, studentId) {
  try {
    const response = await api.post(`/courses/${courseId}/students/${studentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Retire un étudiant d'un cours
 */
export async function removeStudentFromCourse(courseId, studentId) {
  try {
    const response = await api.delete(`/courses/${courseId}/students/${studentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
