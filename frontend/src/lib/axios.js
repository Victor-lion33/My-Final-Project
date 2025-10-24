import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api", //"https://lion-note-app-backend.vercel.app/api"
});

export default axiosInstance;

// VITE_API_URL=https://lion-note-app-backend.vercel.app/api
// # VITE_API_URL=http://localhost:8000/api