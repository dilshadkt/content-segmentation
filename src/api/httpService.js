import axios from "axios";

const API = axios.create({
  baseURL:
    "https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net//api/", // Backend base URL
  withCredentials: true, // To include cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to dynamically add clientId or branchId to headers
API.interceptors.request.use(
  (config) => {
    const clientId = localStorage.getItem("clientId");
    const branchId = localStorage.getItem("branchId");

    if (clientId) {
      config.headers["clientID"] = clientId;
    }
    if (branchId) {
      config.headers["branchID"] = branchId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default API;
