import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const fetchAppointments = async (tiendaId) => {
  try {
    const response = await axios.get(`${API_URL}appointments/tienda/${tiendaId}/appointments-vuecal/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(`${API_URL}appointments/delete/${appointmentId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};
