// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your ngrok URL if needed
});

export default api;
