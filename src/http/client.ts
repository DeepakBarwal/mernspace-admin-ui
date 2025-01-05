import axios from "axios";
import { useAuthStore } from "../store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originaRequest = error.config;

    if (error.response.status === 401 && !originaRequest._isRetry) {
      try {
        originaRequest._isRetry = true;
        const headers = { ...originaRequest.headers };
        await refreshToken();
        return api.request({ ...originaRequest, headers });
      } catch (err) {
        console.error("Token refresh error", err);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
