import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Student services
export const studentService = {
  getStudents: (params) => api.get('/students', { params }),
  getStudent: (id) => api.get(`/students/${id}`),
  createStudent: (data) => api.post('/students', data),
  updateStudent: (id, data) => api.put(`/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/students/${id}`),
  getStatistics: () => api.get('/students/statistics'),
};

export default api;
