import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe, loginUser, logoutUser, registerUser, refreshToken, resendVerification, checkUsernameAvailability, setUsername } from "../api";
import type { LoginDto, RegisterDto } from "../types";

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterDto) => registerUser(payload),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: LoginDto) => {
      const result = await loginUser(payload);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      return result;
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: refreshToken,
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: resendVerification,
  });
}

export function useCheckUsername() {
  return useMutation({
    mutationFn: checkUsernameAvailability,
  });
}

export function useSetUsername() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setUsername,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

