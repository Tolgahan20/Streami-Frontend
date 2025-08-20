import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe, loginUser, logoutUser, registerUser } from "./api";
import type { LoginDto, RegisterDto } from "./types";

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

