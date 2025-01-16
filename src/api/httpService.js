import axios from "axios";

const API = axios.create({
  baseURL:
    "https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net//api/", // Backend base URL
  withCredentials: true, // To include cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});

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
