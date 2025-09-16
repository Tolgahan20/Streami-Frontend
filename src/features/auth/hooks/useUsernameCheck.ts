import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import api from '@/lib/api/axios';

export type UsernameCheckStatus = 'idle' | 'checking' | 'available' | 'taken' | 'error';

export interface UseUsernameCheckResult {
  status: UsernameCheckStatus;
  isAvailable: boolean;
  isChecking: boolean;
  error: string | null;
  checkUsername: (username: string) => void;
  reset: () => void;
}

export function useUsernameCheck(debounceMs: number = 500): UseUsernameCheckResult {
  const [status, setStatus] = useState<UsernameCheckStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const checkUsernameAvailability = useCallback(async (username: string) => {
    if (!username || username.length < 3) {
      setStatus('idle');
      setError(null);
      return;
    }

    try {
      setStatus('checking');
      setError(null);
      
      const response = await api.get(`/auth/check-username?username=${encodeURIComponent(username)}`);
      
      if (response.data.available) {
        setStatus('available');
      } else {
        setStatus('taken');
      }
    } catch (err: unknown) {
      console.error('Username check error:', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to check username availability');
    }
  }, []);

  // Create debounced version of the check function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCheck = useCallback(
    debounce(checkUsernameAvailability, debounceMs),
    [checkUsernameAvailability, debounceMs]
  );

  const checkUsername = useCallback((username: string) => {
    debouncedCheck(username);
  }, [debouncedCheck]);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    debouncedCheck.cancel();
  }, [debouncedCheck]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedCheck.cancel();
    };
  }, [debouncedCheck]);

  return {
    status,
    isAvailable: status === 'available',
    isChecking: status === 'checking',
    error,
    checkUsername,
    reset,
  };
}
