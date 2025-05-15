import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 403) {
      window.location.href = "/forbidden"; // redirect to your 403 page
    }
    if (error.response?.status >= 500) {
      window.location.href = "/server-error"; // redirect to your 403 page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
