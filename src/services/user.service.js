import axios from 'axios';
import { fetchTienda } from '@/services/tienda.service';

const API_URL = process.env.VUE_APP_API_URL;
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, {
      email,
      password
    });
    const data = response.data;
    localStorage.setItem('access_token', data.tokens.access);
    localStorage.setItem('refresh_token', data.tokens.refresh);
    localStorage.setItem('username', data.username);
    localStorage.setItem('email', data.email);
    localStorage.setItem('id', data.credentials.cod_ref);
    fetchTienda()
    return data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    const response = await axios.post(`${API_URL}token/refresh/`, {
      refresh: refresh_token
    });
    const data = response.data;
    localStorage.setItem('access_token', data.access);
    return data;
  } catch (error) {
    console.error('Error al renovar el token:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('id');
};
