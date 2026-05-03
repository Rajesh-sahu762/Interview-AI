import axios from "axios";

/**
 * Create an axios instance with global interceptors and configuration
 */
export function createAxiosInstance(baseURL, options = {}) {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 30000, // 30 second timeout
    ...options,
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle specific error cases
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        if (status === 401) {
          // Unauthorized - redirect to login
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          return Promise.reject(
            new Error("Session expired. Please log in again.")
          );
        } else if (status === 403) {
          // Forbidden
          return Promise.reject(
            new Error(data.message || "You don't have permission to access this resource.")
          );
        } else if (status === 404) {
          // Not found
          return Promise.reject(new Error(data.message || "Resource not found."));
        } else if (status === 400) {
          // Bad request
          return Promise.reject(
            new Error(data.message || "Invalid request. Please check your input.")
          );
        } else if (status >= 500) {
          // Server error
          return Promise.reject(
            new Error(
              data.message || "Server error. Please try again later."
            )
          );
        }

        return Promise.reject(
          new Error(data.message || error.message || "An error occurred")
        );
      } else if (error.request) {
        // Request made but no response
        console.error("No response received:", error.request);
        return Promise.reject(
          new Error("No response from server. Please check your internet connection.")
        );
      } else if (error.code === "ECONNABORTED") {
        // Timeout
        return Promise.reject(
          new Error("Request timeout. Please try again.")
        );
      } else {
        // Other errors
        console.error("Error:", error);
        return Promise.reject(
          new Error(error.message || "An unexpected error occurred")
        );
      }
    }
  );

  return instance;
}

export default createAxiosInstance;
