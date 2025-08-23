import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/lib/constants/endpoints";

let isRefreshing = false;
let pendingRequestsQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

// With httpOnly cookies set by the backend, we do not read or write access tokens on the client.

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// No Authorization header injection; rely on server reading httpOnly cookies
api.interceptors.request.use((config: InternalAxiosRequestConfig) => config);

const plainClient = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

async function refreshAccessToken(): Promise<string> {
  const response = await plainClient.post<{ accessToken: string }>("/auth/refresh");
  return response.data.accessToken;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!originalRequest) throw error;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequestsQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        await refreshAccessToken();

        pendingRequestsQueue.forEach(({ resolve, config }) => {
          resolve(api.request(config));
        });
        pendingRequestsQueue = [];

        return api.request(originalRequest);
      } catch (refreshError) {
        pendingRequestsQueue.forEach(({ reject }) => reject(refreshError));
        pendingRequestsQueue = [];
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  }
);

export default api;

