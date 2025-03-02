import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    console.log("response.data" , response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
