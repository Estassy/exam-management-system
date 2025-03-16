 import api from "../api";

 const API_URL = "/api/notifications";

// 🔹 Récupérer les notifications d'un utilisateur (étudiant, enseignant, admin)
export const fetchNotifications = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    console.error("Erreur : `user.id` est undefined.");
    return [];
  }

  try {
    const response = await api.get(`/api/notifications/user/${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error);
    return [];
  }
};

// 🔹 Envoyer une notification à un utilisateur spécifique
export const sendNotificationToUser = async (userId, message) => {
  try {
    const response = await api.post("/api/notifications/send", null, {
      params: { userId, message },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification :", error);
  }
};

// 🔹 Envoyer une notification à tous les utilisateurs d'un rôle (Étudiants, Enseignants, Admins)
export const sendNotificationToRole = async (role, message) => {
  try {
    const response = await api.post("/api/notifications/send-to-role", null, {
      params: { role, message },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications aux " + role + "s :", error);
  }
};

/**
 * Récupère la liste des notifications pour un étudiant donné
 */
export async function getNotifications(studentId) {
  try {
    const response = await api.get(`${API_URL}/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error);
    return [];
  }
}

export default {
  getNotifications,
};