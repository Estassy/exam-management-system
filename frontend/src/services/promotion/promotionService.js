import api from "../api";

const API_URL = "/api/promotions";

export async function getPromotions() {
  try {
    const response = await api.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des promotions :", error);
    throw error;
  }
}