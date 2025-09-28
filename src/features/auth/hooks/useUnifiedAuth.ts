import { useState, useEffect } from 'react';
import { useMe } from './hooks';
import { useAuth as useFirebaseAuth } from '@/app/providers/AuthProvider';

export function useUnifiedAuth() {
  const firebaseAuth = useFirebaseAuth();
  const { data: backendUser, isLoading: backendLoading, error: backendError } = useMe();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // User is authenticated if either:
    // 1. Backend user exists (form login) - prioritize this
    // 2. Firebase user exists (Google sign-in)
    const firebaseAuthenticated = firebaseAuth.isAuthenticated;
    const backendAuthenticated = !!backendUser;
    
    // Special case: If Firebase is authenticated but backend fails with 401 or network error,
    // we should still consider the user authenticated (Google sign-in worked)
    const hasBackendError = backendError && (
      ('response' in backendError && (backendError as { response?: { status?: number } }).response?.status === 401) ||
      ('code' in backendError && (backendError as { code?: string }).code === 'NETWORK_ERROR') ||
      ('message' in backendError && (backendError as { message?: string }).message?.includes('Network Error'))
    );
    
    // Prioritize backend authentication, but if Firebase is authenticated and backend fails,
    // still consider user authenticated (Google sign-in scenario)
    const authenticated = backendAuthenticated || (firebaseAuthenticated && hasBackendError) || firebaseAuthenticated;
    setIsAuthenticated(authenticated);
    
    // Loading is true if either system is still loading
    const stillLoading = firebaseAuth.loading || backendLoading;
    setLoading(stillLoading);
    
  
  }, [firebaseAuth.isAuthenticated, firebaseAuth.loading, backendUser, backendLoading, backendError]);

  return {
    isAuthenticated,
    loading,
    user: backendUser || firebaseAuth.user,
    // Include Firebase methods for Google sign-in
    signInWithGoogle: firebaseAuth.signInWithGoogle,
    signOut: firebaseAuth.signOut,
  };
}
