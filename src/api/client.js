import axios from "axios";

const apiClient = axios.create({
  // baseURL:
  // "https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api",
  baseURL:
    "https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api",
  // baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "Invalid token"
    ) {
      // localStorage.removeItem("token");
      if (!window.location.href.includes("/auth/login")) {
        // window.location.href = "/auth/signin";
      }
    }
    return Promise.reject(
      error.response?.data?.error || "Something went wrong"
    );
  }
);

export default apiClient;
