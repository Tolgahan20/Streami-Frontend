import { useState, useEffect } from 'react';
import { useMe } from './hooks';
import { useAuth as useFirebaseAuth } from '@/app/providers/AuthProvider';

export function useUnifiedAuth() {
  const firebaseAuth = useFirebaseAuth();
  const { data: backendUser, isLoading: backendLoading } = useMe();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // User is authenticated if either:
    // 1. Backend user exists (form login) - prioritize this
    // 2. Firebase user exists (Google sign-in)
    const firebaseAuthenticated = firebaseAuth.isAuthenticated;
    const backendAuthenticated = !!backendUser;
    
    // Prioritize backend authentication since that's what the login form uses
    const authenticated = backendAuthenticated || firebaseAuthenticated;
    setIsAuthenticated(authenticated);
    
    // Loading is true if either system is still loading
    const stillLoading = firebaseAuth.loading || backendLoading;
    setLoading(stillLoading);
    
    console.log('Unified auth state:', {
      firebaseAuth: firebaseAuthenticated,
      backendAuth: backendAuthenticated,
      unifiedAuth: authenticated,
      loading: stillLoading,
      backendUser: backendUser ? { id: backendUser.id, username: backendUser.username } : null
    });
  }, [firebaseAuth.isAuthenticated, firebaseAuth.loading, backendUser, backendLoading]);

  return {
    isAuthenticated,
    loading,
    user: backendUser || firebaseAuth.user,
    // Include Firebase methods for Google sign-in
    signInWithGoogle: firebaseAuth.signInWithGoogle,
    signOut: firebaseAuth.signOut,
  };
}
