// src/services/api.js
import axios from "axios";

// Base URL of your backend server
const API = axios.create({
  baseURL: "http://localhost:5000", // change to your backend URL
});

// If using token-based auth
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// News APIs
export const fetchNews = () => API.get("/api/media/news");
export const addNews = (data) => API.post("/api/media/news", data);

// Video APIs
export const fetchVideos = () => API.get("/api/media/videos");
export const addVideo = (data) => API.post("/api/media/videos", data);

// Auth APIs
export const registerUser = (data) => API.post("/api/auth/register", data);
export const loginUser = (data) => API.post("/api/auth/login", data);
