import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { ENDPOINTS } from '@/lib/constants/endpoints';
import { AUTH_MESSAGES } from '@/lib/constants/messages';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api, { debugCookies } from '@/lib/api/axios';

export function useGoogleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      
      // Force account selection every time
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      
      // Get user info from Google
      const { user: googleUser } = result;
      const idToken = await googleUser.getIdToken();
      
      // Send user data to your backend using the configured axios instance
      const response = await api.post(ENDPOINTS.auth.google, {
        idToken: idToken,
        displayName: googleUser.displayName || ''
      });

      const backendResponse = response.data;
      console.log('Backend Google auth successful:', backendResponse);
      
      // Debug cookies after successful auth
      console.log('🍪 Checking cookies after Google auth:');
      debugCookies();
      
      // Invalidate auth queries to refresh user data
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      
      toast.success(AUTH_MESSAGES.GOOGLE_SIGNIN_SUCCESS);
      
      // Check if user has username, if not, we'll handle it in the feed layout
      // For now, always redirect to feed and let the feed page handle username setup
      router.push('/feed');
      
      return result;
    } catch (error: unknown) {
      console.error('Google sign-in error:', error);
      
      let errorMessage: string = AUTH_MESSAGES.GOOGLE_SIGNIN_FAILED;
      
      if ((error as AuthError).code) {
        // Firebase error
        const firebaseCode = (error as AuthError).code;
        errorMessage = AUTH_MESSAGES.FIREBASE_ERRORS[firebaseCode as keyof typeof AUTH_MESSAGES.FIREBASE_ERRORS] || errorMessage;
      } else if (error && typeof error === 'object' && 'response' in error) {
        // Axios error - backend error
        const axiosError = error as { response?: { data?: { message?: string } } };
        const backendMessage = axiosError.response?.data?.message;
        if (backendMessage) {
          errorMessage = AUTH_MESSAGES.BACKEND_ERRORS[backendMessage as keyof typeof AUTH_MESSAGES.BACKEND_ERRORS] || backendMessage;
        }
      } else if (error instanceof Error) {
        // Generic error
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success(AUTH_MESSAGES.LOGOUT_SUCCESS);
      router.push('/');
    } catch (error) {
      console.error('Sign-out error:', error);
      toast.error(AUTH_MESSAGES.LOGOUT_FAILED);
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user
  };
}
