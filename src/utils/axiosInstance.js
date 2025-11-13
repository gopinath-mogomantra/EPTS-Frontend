import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// Interceptor to attach the correct JWT automatically
axiosInstance.interceptors.request.use(
  (config) => {
    // Pick whichever token key exists first
    const token =
      localStorage.getItem("access_token") || localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Attached Authorization Header →", config.headers.Authorization.slice(0, 40) + "...");
    } else {
      console.warn("No JWT token found in localStorage");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Debug failed responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error Response:", error?.response?.status, error?.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;
