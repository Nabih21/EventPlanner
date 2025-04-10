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
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Events services
export const eventService = {
  createEvent: async (eventData) => {
    const response = await api.post('/manage/createEvent', eventData);
    return response.data;
  },

  getEvents: async () => {
    const response = await api.get('/manage/viewEvents');
    return response.data;
  },

  getEventById: async (eventId) => {
    const response = await api.get(`/manage/viewEvent/${eventId}`);
    return response.data;
  },

  updateEvent: async (eventId, eventData) => {
    const response = await api.put(`/manage/events/${eventId}`, eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await api.delete(`/manage/events/${eventId}`);
    return response.data;
  },

  getMyEvents: async () => {
    const response = await api.get('/manage/my-events');
    return response.data;
  }
};

export const venueService = {
  getVenues: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.searchTerm) params.append('search', filters.searchTerm);
      if (filters.venueType) params.append('type', filters.venueType);

      const response = await api.get(`/venues?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching venues:', error);
      throw error;
    }
  },
  
  getVenue: async (id) => {
    try {
      const response = await api.get(`/venues/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching venue with id ${id}:`, error);
      throw error;
    }
  },
  
  createVenue: async (venueData) => {
    try {
      console.log("Sending venue data to API:", venueData);
      const response = await api.post('/venues', venueData);
      console.log("API creation response:", response);
      return response.data;
    } catch (error) {
      console.error('Error creating venue:', error);
      throw error;
    }
  },
  
  updateVenue: async (id, venueData) => {
    try {
      console.log(`Updating venue ${id} with data:`, venueData);
      const response = await api.put(`/venues/${id}`, venueData);
      console.log("API update response:", response);
      return response.data;
    } catch (error) {
      console.error(`Error updating venue with id ${id}:`, error);
      throw error;
    }
  },

  deleteVenue: async (venueId) => {
    const response = await api.delete(`/venues/${venueId}`);
    return response.data;
  }
};

export default api;