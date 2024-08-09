// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/', // Sesuaikan dengan base URL backend Anda
  timeout: 10000,
});

export default api;
