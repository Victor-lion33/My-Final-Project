import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://lion-note-app-backend.vercel.app/api"
});

export default axiosInstance;