import axios from "axios";
import { auth } from "./firebase";

/**
 * Backend base URL
 * - Local: http://localhost:5000/api
 * - Production (Vercel): set VITE_API_URL
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* =========================
   AXIOS INSTANCE
========================= */

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
   → Attach Firebase ID token
========================= */

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
   → Handle auth errors
========================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized – redirecting to login");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/* =========================
   CLASSIFICATION API
========================= */

/**
 * Analyze uploaded image
 * @param {File} imageFile
 */
export const analyzeImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await api.post(
      "/classification/analyze",
      formData
      // DO NOT set Content-Type manually
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Failed to analyze image" }
    );
  }
};

/**
 * Validate user corrections
 */
export const validateCorrections = async (corrections) => {
  try {
    const response = await api.post(
      "/classification/validate",
      corrections
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Failed to validate corrections" }
    );
  }
};

/* =========================
   LISTINGS / WASTE API
========================= */

export const createListing = async (listingData) => {
  try {
    const response = await api.post(
      "/waste/listings",
      listingData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Failed to create listing" }
    );
  }
};

export const getListings = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(
      `/waste/listings?${params}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Failed to fetch listings" }
    );
  }
};

export const getListingById = async (id) => {
  try {
    const response = await api.get(
      `/waste/listings/${id}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Failed to fetch listing" }
    );
  }
};

export const updateListing = async (id, updates) => {
  try {
    const response = await api.put(
      `/waste/listings/${id}`,
      updates
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Failed to update listing" }
    );
  }
};

export const deleteListing = async (id) => {
  try {
    const response = await api.delete(
      `/waste/listings/${id}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Failed to delete listing" }
    );
  }
};

export const getUserListings = async () => {
  try {
    const response = await api.get(
      "/waste/my-listings"
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Failed to fetch user listings",
      }
    );
  }
};

export const getUserStats = async () => {
  try {
    const response = await api.get("/waste/stats");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Failed to fetch user stats",
      }
    );
  }
};

/* =========================
   BUYERS API (OPTIONAL)
========================= */

export const getBuyers = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(
      `/buyers?${params}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Failed to fetch buyers" }
    );
  }
};

export const contactBuyer = async (buyerId, message) => {
  try {
    const response = await api.post(
      `/buyers/${buyerId}/contact`,
      { message }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Failed to contact buyer",
      }
    );
  }
};

/* =========================
   EXPORT AXIOS INSTANCE
========================= */

export default api;
