import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "@/lib/constants/endpoints";

let isRefreshing = false;
let pendingRequestsQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

// Cookie-based authentication - no need for localStorage
// The browser automatically handles cookies with withCredentials: true

// Utility function to check if a JWT token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true; // If we can't parse it, consider it expired
  }
};

// Utility function to get token expiration time
export const getTokenExpiration = (token: string): Date | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return new Date(payload.exp * 1000);
  } catch {
    return null;
  }
};


// Function to check current authentication status
export const checkAuthStatus = async () => {
  try {
    // Try to make a request to /me to see if we're authenticated
    const response = await api.get("/auth/me");
    return { authenticated: true, user: response.data };
  } catch (error) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { data?: unknown; status?: number };
      };
    }

    return { authenticated: false, error };
  }
};

// Function to force re-authentication
export const forceReAuth = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};


// Make debug functions available globally for manual debugging
if (typeof window !== "undefined") {
  const globalWindow = window as typeof window & {
    forceReAuth: typeof forceReAuth;
    isTokenExpired: typeof isTokenExpired;
    getTokenExpiration: typeof getTokenExpiration;
    checkAuthStatus: typeof checkAuthStatus;
  };

  globalWindow.forceReAuth = forceReAuth;
  globalWindow.isTokenExpired = isTokenExpired;
  globalWindow.getTokenExpiration = getTokenExpiration;
  globalWindow.checkAuthStatus = checkAuthStatus;
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

const plainClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

async function refreshAccessToken(): Promise<void> {
  try {
    const response = await plainClient.post<{ accessToken: string }>(
      "/auth/refresh"
    );

    // With cookie-based auth, the backend automatically sets new cookies
    // We just need to confirm the refresh was successful
    if (!response.data.accessToken) {
      throw new Error("No access token received from refresh endpoint");
    }
  } catch (error) {
    throw error;
  }
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) throw error;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequestsQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }

      isRefreshing = true;

      try {
        await refreshAccessToken();

        // Process all pending requests
        pendingRequestsQueue.forEach(({ resolve, config }) => {
          resolve(api.request(config));
        });
        pendingRequestsQueue = [];

        // Retry the original request
        return api.request(originalRequest);
      } catch (refreshError) {
        // Reject all pending requests
        pendingRequestsQueue.forEach(({ reject }) => reject(refreshError));
        pendingRequestsQueue = [];

        // Only redirect to login if we're not already on a protected route
        // This prevents redirect loops when the user is already authenticated via Firebase
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.startsWith("/feed")
        ) {
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
