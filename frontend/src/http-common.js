import axios from "axios";

const http = axios.create({
  // 18.189.30.220 is the AWS server, localhost is the local machine
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});

// Request Authorization Interceptor - user authentication
http.interceptors.request.use(
  (config) => {
    // Add token or any other configurations
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Error Handling Interceptor
http.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data
  },
  (error) => {
    // Handle specific error statuses
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Redirect to login or show an alert
          alert("Your session has expired. Please log in again.");
          break;
        case 404:
          alert("Requested resource not found.");
          break;
        case 500:
          alert("An internal server error occurred. Please try again later.");
          break;
        default:
          alert("An error occurred. Please try again.");
      }
    }
    return Promise.reject(error);
  }
);

export default http;