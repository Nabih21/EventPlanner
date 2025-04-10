import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3001', // Corrected port to match backend server
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login: async (credentials) => {
    const { username, password, role } = credentials;
    const response = await api.post('/auth/login', { 
      username,
      password,
      role
    });
    return response.data;
  },
  
  register: async (userData) => {
    const { username, password } = userData;
    const response = await api.post('/auth/register', {
      username,
      password
    });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }
};

// Event services
export const eventService = {
  createEvent: async (eventData) => {
    const response = await api.post('/manage/createEvent', eventData);
    return response.data;
  },

  getEvents: async () => {
    const response = await api.get('/manage/viewEvents');
    return response.data;
  },

  getEvent: async (id) => {
    const response = await api.get(`/manage/viewEvent/${id}`);
    return response.data;
  },

  editEvent: async (id, eventData) => {
    const response = await api.patch(`/manage/editEvent/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/manage/deleteEvent/${id}`);
    return response.data;
  },

  promoteEvent: async (id) => {
    const response = await api.patch(`/manage/promoteEvent/${id}`);
    return response.data;
  },

  getTicket: async (id) => {
    const response = await api.patch(`/manage/getTicket/${id}`);
    return response.data;
  }
};

export default api;