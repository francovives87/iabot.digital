import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export async function fetchTienda() {
  try {
    const accessToken = localStorage.getItem('access_token');
    const config = {
      method: 'get',
      url: `${API_URL}tienda/user/token`, // Asegúrate de que la URL es correcta
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    const response = await axios.request(config);
    localStorage.setItem('store', response.data[0].id);
    return response.data;
  } catch (error) {
    console.error('Error fetching tienda:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error; // Propagar el error para manejarlo en la llamada
  }
}
