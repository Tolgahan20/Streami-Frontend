import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "../api";
import { AUTH_MESSAGES } from "@/lib/constants/messages";
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
      setErrorMessage(AUTH_MESSAGES.BACKEND_ERRORS.token_not_found);
      setVerificationStatus('error');
      return;
    }

    const startTime = Date.now();
    
    const verifyEmailToken = async () => {
      try {
        await verifyEmail(token);
        setVerificationStatus('success');
        setVerificationTime(Date.now() - startTime);
        toast.success(AUTH_MESSAGES.EMAIL_VERIFIED);
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
        
        // Map backend error messages to user-friendly ones using centralized messages
        const finalMessage = backendMessage ? 
          AUTH_MESSAGES.BACKEND_ERRORS[backendMessage as keyof typeof AUTH_MESSAGES.BACKEND_ERRORS] || 
          backendMessage : 
          AUTH_MESSAGES.VERIFICATION_FAILED;
        
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
