import { useState, useEffect } from 'react';
import { useMe } from './hooks';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export function useUsernameSetupFlow() {
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const { data: user, isLoading, refetch } = useMe();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Only show username modal if:
    // 1. User is authenticated
    // 2. User doesn't have a username
    // 3. User is on the feed page (dashboard area)
    const isFeedPage = pathname.startsWith('/feed');
    
    console.log('Username setup flow check:', {
      isLoading,
      user: user ? { id: user.id, username: user.username } : null,
      isFeedPage,
      pathname
    });
    
    // Check if username is missing (null, undefined, or empty string)
    const hasUsername = user?.username && user.username.trim().length > 0;
    
    if (!isLoading && user && !hasUsername && isFeedPage) {
      console.log('Showing username modal - user has no username');
      setShowUsernameModal(true);
    } else {
      console.log('Hiding username modal', { hasUsername, userUsername: user?.username });
      setShowUsernameModal(false);
    }
  }, [user, isLoading, pathname]);

  const handleUsernameSetupSuccess = async () => {
    console.log('Username setup success - forcing query refresh');
    setShowUsernameModal(false);
    
    // Force refresh the user data to ensure we have the latest username
    await queryClient.invalidateQueries({ queryKey: ["me"] });
    const refreshedData = await refetch();
    
    console.log('After refetch, user data:', refreshedData.data);
    
    // Small delay to ensure the query has time to update
    setTimeout(() => {
      console.log('Username setup complete - checking user again:', user);
    }, 500);
  };

  const handleModalClose = () => {
    // For social sign-in, we don't allow closing without setting username
    // But we could implement a "skip for now" option if needed
    setShowUsernameModal(false);
    router.push('/');
  };

  return {
    showUsernameModal,
    handleUsernameSetupSuccess,
    handleModalClose,
    user,
    isLoading,
  };
}
