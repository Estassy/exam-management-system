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
 * Crée un nouvel utilisateur
 */
export async function createUser(userData) {    
  try {
    const response = await api.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
}

/**
 * Récupère un utilisateur par ID
 */
export async function getUserById(userId) {
  try {
    const response = await api.get(`${API_URL}/${userId}`);
    console.log("🔍 Utilisateur reçu de l'API :", response.data);
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
    console.log("👨‍🏫 Utilisateurs récupérés :", users);
    return users.filter(user => user.role === "STUDENT");
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants :", error);
    throw error;
  }
}

/**
 * Récupère uniquement les enseignants
 */
export async function getAllTeachers() {
  try {
    const users = await getAllUsers();
    return users.filter(user => user.role === "TEACHER");
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants :", error);
    throw error;
  }
}

/**
 * Met à jour un utilisateur
 */
export async function updateUser(userId, userData) {
  try {
    const response = await api.put(`${API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    throw error;
  }
}

/**
 * Supprime un utilisateur
 */
export async function deleteUser(userId) {
  try {
    await api.delete(`${API_URL}/${userId}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    throw error;
  } 
  
}

/**
 * Récupère uniquement les enseignants
 */
export async function getAllTeachers() {
  try {
    const users = await getAllUsers();
    return users.filter(user => user.role === "TEACHER"); // ✅ Filtre les enseignants
  } catch (error) {
    console.error("Erreur lors de la récupération des enseignants :", error);
    throw error;
  }
}

