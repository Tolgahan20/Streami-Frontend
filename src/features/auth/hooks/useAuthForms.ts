import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister, useLogin } from "./hooks";
import type { RegisterDto, LoginDto } from "../types";
import { AUTH_MESSAGES } from "@/lib/constants/messages";
import { toastSuccess, toastError } from "@/components/ui/toast";

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterDto>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
  });
  const [errors, setErrors] = useState<Partial<RegisterDto>>({});
  
  const registerMutation = useRegister();
  const router = useRouter();

  const handleInputChange = (field: keyof RegisterDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterDto> = {};

    if (!formData.email) {
      newErrors.email = AUTH_MESSAGES.VALIDATION.REQUIRED_FIELD;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = AUTH_MESSAGES.VALIDATION.INVALID_EMAIL;
    }

    if (!formData.password) {
      newErrors.password = AUTH_MESSAGES.VALIDATION.REQUIRED_FIELD;
    } else if (formData.password.length < 6) {
      newErrors.password = AUTH_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT;
    }

    if (!formData.firstName) {
      newErrors.firstName = AUTH_MESSAGES.VALIDATION.REQUIRED_FIELD;
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName) {
      newErrors.lastName = AUTH_MESSAGES.VALIDATION.REQUIRED_FIELD;
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.username) {
      newErrors.username = AUTH_MESSAGES.VALIDATION.REQUIRED_FIELD;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await registerMutation.mutateAsync(formData);
      // Show success toast
      toastSuccess(AUTH_MESSAGES.REGISTER_SUCCESS);
      // Redirect to login page after successful registration
      router.push("/login?message=Registration successful! Please check your email for verification.");
    } catch (error: unknown) {
      // Show error toast with user-friendly message
      let errorMessage: string = AUTH_MESSAGES.REGISTER_FAILED;
      
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      
      // Map backend error messages to user-friendly ones
      const friendlyMessage = AUTH_MESSAGES.BACKEND_ERRORS[errorMessage as keyof typeof AUTH_MESSAGES.BACKEND_ERRORS] || errorMessage;
      toastError(friendlyMessage);
      
      console.error("Registration failed:", error);
    }
  };

  return {
    formData,
    errors,
    isLoading: registerMutation.isPending,
    handleInputChange,
    handleSubmit,
  };
}

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginDto>({
    emailOrUsername: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginDto>>({});
  
  const loginMutation = useLogin();
  const router = useRouter();

  const handleInputChange = (field: keyof LoginDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginDto> = {};

    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername = AUTH_MESSAGES.VALIDATION.REQUIRED_FIELD;
    }

    if (!formData.password) {
      newErrors.password = AUTH_MESSAGES.VALIDATION.REQUIRED_FIELD;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await loginMutation.mutateAsync(formData);
      // Show success toast
      toastSuccess(AUTH_MESSAGES.LOGIN_SUCCESS);
      // Redirect to dashboard or home page
      router.push("/feed");
    } catch (error: unknown) {
      // Show error toast with user-friendly message
      let errorMessage: string = AUTH_MESSAGES.LOGIN_FAILED;
      
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      
      // Map backend error messages to user-friendly ones
      const friendlyMessage = AUTH_MESSAGES.BACKEND_ERRORS[errorMessage as keyof typeof AUTH_MESSAGES.BACKEND_ERRORS] || errorMessage;
      toastError(friendlyMessage);
      
      console.error("Login failed:", error);
    }
  };

  return {
    formData,
    errors,
    isLoading: loginMutation.isPending,
    handleInputChange,
    handleSubmit,
  };
}
