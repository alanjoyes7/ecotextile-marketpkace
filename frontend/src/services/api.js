import axios from 'axios';
import { auth } from './firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============== Classification API ==============

export const analyzeImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post('/classification/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to analyze image' };
  }
};

export const validateCorrections = async (corrections) => {
  try {
    const response = await api.post('/classification/validate', corrections);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to validate corrections' };
  }
};

// ============== Listings API ==============

export const createListing = async (listingData) => {
  try {
    const response = await api.post('/waste/listings', listingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create listing' };
  }
};

export const getListings = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/waste/listings?${queryParams}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch listings' };
  }
};

export const getListingById = async (id) => {
  try {
    const response = await api.get(`/waste/listings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch listing' };
  }
};

export const updateListing = async (id, updates) => {
  try {
    const response = await api.put(`/waste/listings/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update listing' };
  }
};

export const deleteListing = async (id) => {
  try {
    const response = await api.delete(`/waste/listings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete listing' };
  }
};

export const getUserListings = async () => {
  try {
    const response = await api.get('/waste/my-listings');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch user listings' };
  }
};

export const getUserStats = async () => {
  try {
    const response = await api.get('/waste/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch user stats' };
  }
};

// ============== Buyers API (if you create this endpoint) ==============

export const getBuyers = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/buyers?${queryParams}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch buyers' };
  }
};

export const contactBuyer = async (buyerId, message) => {
  try {
    const response = await api.post(`/buyers/${buyerId}/contact`, { message });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to contact buyer' };
  }
};

export default api;