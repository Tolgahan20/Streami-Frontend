// Debug: Log the API base URL to help troubleshoot
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/v1";
console.log("🔧 API Base URL:", {
  fromEnv: process.env.NEXT_PUBLIC_API_BASE_URL,
  final: apiBaseUrl,
  hasProtocol: apiBaseUrl.startsWith("http"),
});

export const API_BASE_URL = apiBaseUrl;

export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    verifyEmail: (token: string) => `/auth/verify-email?token=${encodeURIComponent(token)}`,
    login: "/auth/login",
    refresh: "/auth/refresh",
    resendVerification: "/auth/resend-verification",
    logout: "/auth/logout",
    me: "/auth/me",
    google: "/auth/google",
    checkUsername: "/auth/check-username",
    setUsername: "/auth/set-username",
  },
  status: {
    health: "/health",
  },
} as const;

export type Endpoints = typeof ENDPOINTS;

