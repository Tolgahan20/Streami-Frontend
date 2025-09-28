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
import { toastSuccess, toastError } from '@/components/ui/toast';
import api from '@/lib/api/axios';
import { AvatarManager } from '@/lib/utils/avatarManager';

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
      
      // Check if user already has a custom avatar before Google sign-in
      let shouldPreserveAvatar = false;
      try {
        const currentProfile = await api.get('/profiles');
        shouldPreserveAvatar = AvatarManager.shouldPreserveCustomAvatar(currentProfile.data);
        console.log('Google Auth - Custom avatar detected:', shouldPreserveAvatar);
      } catch {
        console.log('Google Auth - No existing profile found, will use Google avatar');
      }
      
      // Send user data to your backend using the configured axios instance
      await api.post(ENDPOINTS.auth.google, {
        idToken: idToken,
        firstName: googleUser.displayName?.split(' ')[0] || '',
        lastName: googleUser.displayName?.split(' ').slice(1).join(' ') || '',
        preserveCustomAvatar: shouldPreserveAvatar
      });

      // With cookie-based auth, the backend should set cookies automatically
      
      try {
        // Verify authentication by making a request to /me
        await api.get(ENDPOINTS.auth.me);
      } catch {
        // Error handling for /me request
      }
      
      
      // Invalidate auth queries to refresh user data
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      
      toastSuccess(AUTH_MESSAGES.GOOGLE_SIGNIN_SUCCESS);
      
      // Check if user has username, if not, we'll handle it in the feed layout
      // For now, always redirect to feed and let the feed page handle username setup
      router.push('/feed');
      
      return result;
    } catch (error: unknown) {
      
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
      
      toastError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toastSuccess(AUTH_MESSAGES.LOGOUT_SUCCESS);
      router.push('/');
    } catch {
      toastError(AUTH_MESSAGES.LOGOUT_FAILED);
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
