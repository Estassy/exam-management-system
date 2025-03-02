import api from './api/api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    console.log("Réponse complète de l'API :", response); // 👀 Vérifier tout l'objet réponse
    console.log("Données reçues :", response.data); // 👀 Vérifier si on reçoit un token et un user
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Déconnexion
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};