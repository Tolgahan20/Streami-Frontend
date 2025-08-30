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
import toast from 'react-hot-toast';

export function useGoogleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      const result = await signInWithPopup(auth, provider);
      
      // Get user info from Google
      const { user: googleUser } = result;
      const idToken = await googleUser.getIdToken();
      
      // Send user data to your backend for registration
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ENDPOINTS.auth.google}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken: idToken,
          displayName: googleUser.displayName || ''
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || AUTH_MESSAGES.BACKEND_ERRORS.backend_registration_failed);
      }

      const backendResponse = await response.json();
      console.log('Backend registration successful:', backendResponse);
      
      toast.success(AUTH_MESSAGES.GOOGLE_SIGNIN_SUCCESS);
      
      // Redirect to dashboard/feed after successful backend registration
      router.push('/feed');
      
      return result;
    } catch (error: unknown) {
      console.error('Google sign-in error:', error);
      
      let errorMessage: string = AUTH_MESSAGES.GOOGLE_SIGNIN_FAILED;
      
      if ((error as AuthError).code) {
        // Firebase error
        const firebaseCode = (error as AuthError).code;
        errorMessage = AUTH_MESSAGES.FIREBASE_ERRORS[firebaseCode as keyof typeof AUTH_MESSAGES.FIREBASE_ERRORS] || errorMessage;
      } else if (error instanceof Error) {
        // Backend error
        const backendMessage = error.message;
        errorMessage = AUTH_MESSAGES.BACKEND_ERRORS[backendMessage as keyof typeof AUTH_MESSAGES.BACKEND_ERRORS] || backendMessage;
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
