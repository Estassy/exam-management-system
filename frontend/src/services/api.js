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

export default api;
