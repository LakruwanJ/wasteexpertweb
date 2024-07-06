import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Update with your backend URL

const apiService = {
  register: (data) => axios.post(`${API_URL}/admin/register`, data),
  login: (data) => axios.post(`${API_URL}/admin/login`, data),
  dispatcherLogin: (data) => axios.post(`${API_URL}/dispatcher/login`, data),
  collectorLogin: (data) => axios.post(`${API_URL}/collector/login`, data),
};

export default apiService;
