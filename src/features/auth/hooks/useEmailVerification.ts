import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "../api";
import toast from "react-hot-toast";

export type VerificationStatus = 'loading' | 'success' | 'error';

export function useEmailVerification() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [verificationTime, setVerificationTime] = useState<number>(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setErrorMessage('No verification token provided.');
      setVerificationStatus('error');
      return;
    }

    const startTime = Date.now();
    
    const verifyEmailToken = async () => {
      try {
        await verifyEmail(token);
        setVerificationStatus('success');
        setVerificationTime(Date.now() - startTime);
        toast.success('Email verified successfully! Welcome to Streami!');
      } catch (error: unknown) {
        setVerificationStatus('error');
        
        // Extract error message from the error object
        let backendMessage: string | undefined;
        
        if (error && typeof error === 'object' && 'response' in error) {
          const response = (error as { response?: { data?: { message?: string } } }).response;
          if (response?.data?.message) {
            backendMessage = response.data.message;
          }
        }
        
        // Map backend error messages to user-friendly ones
        const errorMessages: Record<string, string> = {
          'invalid_or_expired_token': 'This verification link has expired or is invalid. Please request a new one.',
          'token_not_found': 'Verification link not found. Please check your email and try again.',
          'email_already_verified': 'This email has already been verified. You can sign in now.',
          'user_not_found': 'User account not found. Please register again.',
          'verification_failed': 'Email verification failed. Please try again or contact support.',
          'email_in_use': 'This email is already associated with another account.',
          'invalid_token': 'The verification link is invalid. Please check your email for the correct link.',
          'token_expired': 'This verification link has expired. Please request a new one.',
          'server_error': 'Something went wrong on our end. Please try again later.',
        };
        
        const userFriendlyMessage = backendMessage ? errorMessages[backendMessage] : undefined;
        const finalMessage = userFriendlyMessage || backendMessage || "Verification failed. Please try again.";
        
        setErrorMessage(finalMessage);
        toast.error(finalMessage);
      }
    };

    verifyEmailToken();
  }, [searchParams]);

  return {
    verificationStatus,
    errorMessage,
    verificationTime,
    isLoading: verificationStatus === 'loading'
  };
}
