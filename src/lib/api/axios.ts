import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/lib/constants/endpoints";

let isRefreshing = false;
let pendingRequestsQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

// With httpOnly cookies set by the backend, we do not read or write access tokens on the client.

// Debug function to check cookies
export const debugCookies = () => {
  if (typeof document !== 'undefined') {
    console.log('🍪 Current cookies:', document.cookie);
    console.log('🍪 All cookies:', document.cookie.split(';').map(c => c.trim()));
  }
};

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// No Authorization header injection; rely on server reading httpOnly cookies
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log('🍪 Making request with credentials:', {
    url: config.url,
    withCredentials: config.withCredentials,
    method: config.method,
    baseURL: config.baseURL
  });
  return config;
});

const plainClient = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

async function refreshAccessToken(): Promise<string> {
  const response = await plainClient.post<{ accessToken: string }>("/auth/refresh");
  return response.data.accessToken;
}

api.interceptors.response.use(
  (response) => {
    console.log('🍪 Response received:', {
      url: response.config.url,
      status: response.status,
      headers: response.headers,
      setCookie: response.headers['set-cookie']
    });
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!originalRequest) throw error;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Check if this is a /me request - if so, don't retry to prevent infinite loops
      if (originalRequest.url?.includes('/auth/me')) {
        console.log('🚫 Skipping retry for /me request to prevent infinite loop');
        throw error;
      }

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
        // Only redirect to login if we're not already on a protected route
        // This prevents redirect loops when the user is already authenticated via Firebase
        if (typeof window !== "undefined" && !window.location.pathname.startsWith('/feed')) {
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

