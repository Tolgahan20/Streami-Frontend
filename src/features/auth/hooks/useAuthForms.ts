import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister, useLogin } from "./hooks";
import type { RegisterDto, LoginDto } from "../types";
import toast from "react-hot-toast";

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterDto>({
    email: "",
    password: "",
    displayName: "",
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
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.displayName) {
      newErrors.displayName = "Display name is required";
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = "Display name must be at least 2 characters";
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
      toast.success("Account created successfully! Please check your email for verification.");
      // Redirect to login page after successful registration
      router.push("/login?message=Registration successful! Please check your email for verification.");
    } catch (error: unknown) {
      // Show error toast with user-friendly message
      let errorMessage = "Registration failed. Please try again.";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      
      // Map backend error messages to user-friendly ones
      const userFriendlyErrors: Record<string, string> = {
        'email_in_use': 'An account with this email already exists. Please sign in instead.',
        'email_already_exists': 'An account with this email already exists. Please sign in instead.',
        'invalid_email': 'Please enter a valid email address.',
        'password_too_weak': 'Password is too weak. Please choose a stronger password.',
        'display_name_taken': 'This display name is already taken. Please choose another one.',
        'user_already_exists': 'An account with this information already exists. Please sign in instead.',
        'validation_failed': 'Please check your input and try again.',
        'server_error': 'Something went wrong on our end. Please try again later.',
      };
      
      const friendlyMessage = userFriendlyErrors[errorMessage] || errorMessage;
      toast.error(friendlyMessage);
      
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
    email: "",
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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
      toast.success("Welcome back! You've been successfully signed in.");
      // Redirect to dashboard or home page
      router.push("/feed");
    } catch (error: unknown) {
      // Show error toast with user-friendly message
      let errorMessage = "Login failed. Please try again.";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      
      // Map backend error messages to user-friendly ones
      const userFriendlyErrors: Record<string, string> = {
        'invalid_credentials': 'Invalid email or password. Please check your credentials.',
        'email_not_verified': 'Please verify your email address before signing in.',
        'account_locked': 'Your account has been locked. Please contact support.',
        'too_many_attempts': 'Too many login attempts. Please try again later.',
        'user_not_found': 'No account found with this email. Please check your email or register.',
        'invalid_email': 'Please enter a valid email address.',
        'validation_failed': 'Please check your input and try again.',
        'server_error': 'Something went wrong on our end. Please try again later.',
      };
      
      const friendlyMessage = userFriendlyErrors[errorMessage] || errorMessage;
      toast.error(friendlyMessage);
      
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
