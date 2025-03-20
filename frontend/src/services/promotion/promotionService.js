import api from "../api";

const API_URL = "/api/promotions";

/**
 * ✅ Récupérer toutes les promotions
 */
export async function getPromotions() {
  try {
    const response = await api.get(`${API_URL}/all`);
    console.log("✅ Promotions reçues :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des promotions :", error);
    throw error;
  }
}

/**
 * ✅ Récupérer une promotion par son ID
 */
export async function getPromotionById(promotionId) {
  try {
    const response = await api.get(`${API_URL}/${promotionId}`);
    console.log("✅ Promotion récupérée :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de la promotion :", error);
    throw error;
  }
}
