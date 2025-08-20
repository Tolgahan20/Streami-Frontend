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

