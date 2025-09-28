import { useEffect, useRef } from 'react';
import { getTokenExpiration } from '@/lib/api/axios';
import { refreshToken } from '@/features/auth/api';

/**
 * Hook that proactively refreshes tokens before they expire
 * This prevents the user from being logged out due to expired tokens
 * Works with cookie-based authentication
 */
export function useTokenRefresh() {
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleTokenRefresh = () => {
    // Get token from cookie - try different possible cookie names
    const cookies = document.cookie.split(';').map(c => c.trim());
    const possibleTokenCookies = [
      'at',           // Your backend uses 'at' for access token
      'accessToken',
      'access_token', 
      'token',
      'jwt',
      'auth_token'
    ];
    
    let accessTokenCookie = null;
    let token = null;
    
    for (const cookieName of possibleTokenCookies) {
      const cookie = cookies.find(c => c.startsWith(`${cookieName}=`));
      if (cookie) {
        accessTokenCookie = cookie;
        token = cookie.split('=')[1];
        console.log(`🔑 Found access token in ${cookieName} cookie`);
        break;
      }
    }
    
    if (!accessTokenCookie || !token) {
     
      return;
    }

    const expiration = getTokenExpiration(token);
    if (!expiration) {
     
      return;
    }

    // Clear any existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    // Calculate time until expiration (in milliseconds)
    const timeUntilExpiration = expiration.getTime() - Date.now();
    
    // Refresh token 5 minutes before expiration
    const refreshTime = Math.max(timeUntilExpiration - (5 * 60 * 1000), 0);


    refreshTimeoutRef.current = setTimeout(async () => {
      try {

        await refreshToken();

        
        // Schedule the next refresh
        scheduleTokenRefresh();
      } catch {

        // If proactive refresh fails, the interceptor will handle it on the next request
      }
    }, refreshTime);
  };

  useEffect(() => {
    // Only schedule refresh if we're in the browser
    if (typeof window !== 'undefined') {
      // Schedule initial refresh
      scheduleTokenRefresh();
    }

    // Cleanup timeout on unmount
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return a function to manually trigger refresh
  return {
    scheduleRefresh: scheduleTokenRefresh,
    refreshNow: async () => {
      try {
        await refreshToken();
        scheduleTokenRefresh();
      } catch (error) {
        console.error('❌ Manual token refresh failed:', error);
        throw error;
      }
    }
  };
}
