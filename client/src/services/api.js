import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// Service APIs
export const getAllServices = () => api.get('/services');
export const getServiceById = (id) => api.get(`/services/${id}`);
export const createService = (serviceData) => api.post('/services', serviceData);
export const updateService = (id, serviceData) => api.put(`/services/${id}`, serviceData);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Booking APIs
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getUserBookings = () => api.get('/bookings/user');
export const getAllBookings = () => api.get('/bookings/admin');
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}/status`, { status });
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

export default api;