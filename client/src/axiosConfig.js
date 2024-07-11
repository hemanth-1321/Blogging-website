// src/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your actual API base URL
});

export default axiosInstance;
