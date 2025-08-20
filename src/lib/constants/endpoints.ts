export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/v1";

export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    verifyEmail: (token: string) => `/auth/verify-email?token=${encodeURIComponent(token)}`,
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  status: {
    health: "/health",
  },
} as const;

export type Endpoints = typeof ENDPOINTS;

