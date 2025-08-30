import api from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/constants/endpoints";
import type { RegisterDto, LoginDto, LoginResponse, MeResponse } from "./types";

export async function registerUser(payload: RegisterDto): Promise<{ message: string }> {
  const { data } = await api.post(ENDPOINTS.auth.register, payload);
  return data;
}

export async function loginUser(payload: LoginDto): Promise<LoginResponse> {
  const { data } = await api.post(ENDPOINTS.auth.login, payload);
  return data;
}

export async function fetchMe(): Promise<MeResponse> {
  const { data } = await api.get(ENDPOINTS.auth.me);
  return data;
}

export async function logoutUser(): Promise<{ message: string }> {
  const { data } = await api.post(ENDPOINTS.auth.logout);
  return data;
}

export async function refreshToken(): Promise<{ accessToken: string }> {
  const { data } = await api.post(ENDPOINTS.auth.refresh);
  return data;
}

export async function resendVerification(email: string): Promise<{ message: string }> {
  const { data } = await api.post(ENDPOINTS.auth.resendVerification, { email });
  return data;
}

export const verifyEmail = async (token: string): Promise<{ message: string }> => {
  const response = await api.get(ENDPOINTS.auth.verifyEmail(token));
  return response.data;
};

