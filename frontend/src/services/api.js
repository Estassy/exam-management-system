import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL de votre back-end
});

// Ajout d'un intercepteur pour insérer le token dans chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Vérifier si l'erreur est un 403 et que la requête n'est pas celle de login
    if (
      error.response &&
      error.response.status === 403 &&
      error.config &&
      error.config.url !== "/login"
    ) {
      console.warn("Token expiré. Suppression du token et redirection vers login.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // Redirection vers la page de connexion
    }
    return Promise.reject(error);
  }
);



export default api;
