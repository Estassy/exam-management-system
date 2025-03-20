import api from "../api"; 

const API_URL = "/exam-templates";

/**
 * Récupère la liste de tous les modèles d'examen
 */
export async function getExamTemplates() {
  try {
    const response = await api.get(API_URL);
    console.log("🔍 Templates reçus de l'API :", response.data); 
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des modèles d'examen :", error);
    return [];
  }
}

/**
 * Crée un examen à partir d'un modèle
 */
export async function createExamFromTemplate(templateId, date, teacherId, courseId, promotionId) {
  console.log("🛠 Envoi de la requête createExamFromTemplate avec :", {
    templateId,
    date,
    teacherId,
    courseId,
    promotionId,
  });

  try {
    const response = await api.post(`${API_URL}/from-template`, null, {
      params: { templateId, date, teacherId, courseId, promotionId }
    });

    console.log("✅ Réponse reçue :", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la création de l'examen à partir du modèle ${templateId} :`, error.response ? error.response.data : error);
    return null;
  }
}

export default {
  getExamTemplates,
  createExamFromTemplate,
};
