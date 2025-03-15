import api from "../api";

const API_URL = "/users";

/**
 * Récupère tous les utilisateurs
 */
export async function getAllUsers() {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
}

/**
 * Récupère un utilisateur par ID
 */
export async function getUserById(userId) {
  try {
    const response = await api.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw error;
  }
}

/**
 * Récupère uniquement les étudiants
 */
export async function getAllStudents() {
  try {
    const users = await getAllUsers();
    return users.filter(user => user.role === "STUDENT");
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants :", error);
    throw error;
  }
}
