// src/services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://utoopy-backend.onrender.com/api',   // aponta para o Express
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
