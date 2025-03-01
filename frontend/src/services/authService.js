import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data; // On attend un objet contenant le token, par exemple { token: "..." }
  } catch (error) {
    throw error;
  }
};
