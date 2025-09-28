import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profileApi';
import type { Profile, SocialLink } from '../types';
import { toastSuccess, toastError } from '@/components/ui/toast';
import { AvatarManager } from '@/lib/utils/avatarManager';

// Query keys for consistent caching
export const profileKeys = {
  all: ['profile'] as const,
  profile: () => [...profileKeys.all, 'profile'] as const,
  socialLinks: () => [...profileKeys.all, 'socialLinks'] as const,
};

export function useProfile() {
  const queryClient = useQueryClient();

  // Fetch profile data with TanStack Query
  const {
    data: profileData,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: profileKeys.profile(),
    queryFn: async () => {
      return await profileApi.getProfile();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2, // Retry 2 times
    retryDelay: 1000, // Wait 1 second before retry
  });

  // Handle the actual API response structure
  const profile = profileData || null;
  const socialLinks = profileData?.socialLinks || [];

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (updatedProfile) => {
      // Update the cache with new profile data
      queryClient.setQueryData(profileKeys.profile(), (oldData: (Profile & { socialLinks: SocialLink[] }) | undefined) => ({
        ...oldData,
        ...updatedProfile,
      }));
      toastSuccess("Profile updated successfully!");
    },
    onError: (error) => {
      console.error('Update profile error:', error);
      toastError("Failed to update profile. Please try again.");
    },
  });

  // Upload avatar mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      // Get user ID from current query data or profile
      const currentData = queryClient.getQueryData(profileKeys.profile()) as (Profile & { socialLinks: SocialLink[] }) | undefined;
      const userId = currentData?.userId || profile?.userId;
      
      if (!userId) {
        console.error('Profile data:', profile);
        console.error('Query data:', currentData);
        throw new Error('User ID not found. Please refresh the page and try again.');
      }
      
      console.log('Uploading avatar for user:', userId);
      return AvatarManager.updateAvatar(file, userId);
    },
    onSuccess: (result) => {
      console.log('Avatar upload successful, updating cache with new URL:', result.avatarUrl);
      
      // Update the cache with new avatar URL
      queryClient.setQueryData(profileKeys.profile(), (oldData: (Profile & { socialLinks: SocialLink[] }) | undefined) => {
        if (!oldData) {
          console.warn('No old data found in cache, cannot update avatar URL');
          return oldData;
        }
        
        const updatedData = {
          ...oldData,
          avatarUrl: result.avatarUrl,
        };
        
        console.log('Updated cache data:', updatedData);
        return updatedData;
      });
      
      // Also invalidate the query to force a refetch
      queryClient.invalidateQueries({ queryKey: profileKeys.profile() });
      toastSuccess("Profile picture updated successfully!");
    },
    onError: (error) => {
      console.error('Upload avatar error:', error);
      toastError("Failed to upload profile picture. Please try again.");
    },
  });

  // Remove avatar mutation
  const removeAvatarMutation = useMutation({
    mutationFn: AvatarManager.removeAvatar,
    onSuccess: () => {
      // Update the cache to remove avatar URL
      queryClient.setQueryData(profileKeys.profile(), (oldData: (Profile & { socialLinks: SocialLink[] }) | undefined) => ({
        ...oldData,
        avatarUrl: undefined,
      }));
      toastSuccess("Profile picture removed successfully!");
    },
    onError: (error) => {
      console.error('Remove avatar error:', error);
      toastError("Failed to remove profile picture. Please try again.");
    },
  });

  // Update social links mutation
  const updateSocialLinksMutation = useMutation({
    mutationFn: profileApi.updateSocialLinks,
    onSuccess: (updatedLinks) => {
      // Update the cache with new social links
      queryClient.setQueryData(profileKeys.profile(), (oldData: (Profile & { socialLinks: SocialLink[] }) | undefined) => ({
        ...oldData,
        socialLinks: updatedLinks,
      }));
      toastSuccess("Social links updated successfully!");
    },
    onError: (error) => {
      console.error('Update social links error:', error);
      toastError("Failed to update social links. Please try again.");
    },
  });

  return {
    profile,
    socialLinks,
    loading,
    error: error?.message || null,
    updateProfile: updateProfileMutation.mutateAsync,
    uploadAvatar: uploadAvatarMutation.mutateAsync,
    removeAvatar: removeAvatarMutation.mutateAsync,
    updateSocialLinks: updateSocialLinksMutation.mutateAsync,
    refetch,
    // Mutation states for UI feedback
    isUpdatingProfile: updateProfileMutation.isPending,
    isUploadingAvatar: uploadAvatarMutation.isPending,
    isRemovingAvatar: removeAvatarMutation.isPending,
    isUpdatingSocialLinks: updateSocialLinksMutation.isPending,
  };
}
