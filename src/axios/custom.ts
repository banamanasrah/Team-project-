import axios from "axios";

const customFetch = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        Accept: "application/json",
    },
});

// Automatically attach JWT Bearer token to every request if available
customFetch.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default customFetch;