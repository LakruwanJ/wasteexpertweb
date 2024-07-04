import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Update with your backend URL

const apiService = {
  register: (data) => axios.post(`${API_URL}/admin/register`, data),
  login: (data) => axios.post(`${API_URL}/admin/login`, data),
};

export default apiService;
