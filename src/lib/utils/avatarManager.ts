import { profileApi } from '@/features/profile/api/profileApi';
import type { Profile } from '@/features/profile/types';

/**
 * Smart avatar update that prevents Google from overriding custom avatars
 */
export class AvatarManager {
  private static readonly GOOGLE_AVATAR_PATTERNS = [
    'lh3.googleusercontent.com',
    'lh4.googleusercontent.com',
    'lh5.googleusercontent.com',
    'lh6.googleusercontent.com',
    'googleusercontent.com'
  ];

  /**
   * Check if an avatar URL is from Google
   */
  static isGoogleAvatar(avatarUrl: string | undefined | null): boolean {
    if (!avatarUrl) return false;
    
    return this.GOOGLE_AVATAR_PATTERNS.some(pattern => 
      avatarUrl.includes(pattern)
    );
  }

  /**
   * Check if user has a custom avatar (not Google)
   */
  static hasCustomAvatar(profile: Profile | null): boolean {
    if (!profile?.avatarUrl) return false;
    return !this.isGoogleAvatar(profile.avatarUrl);
  }

  /**
   * Get the appropriate avatar URL for display
   * Prioritizes custom avatars over Google avatars
   */
  static getDisplayAvatar(profile: Profile | null, googleAvatarUrl?: string): string | null {
    // If user has a custom avatar, use it
    if (this.hasCustomAvatar(profile)) {
      return profile!.avatarUrl!;
    }

    // Otherwise, use Google avatar if available
    if (googleAvatarUrl) {
      return googleAvatarUrl;
    }

    // Fallback to profile avatar
    return profile?.avatarUrl || null;
  }

  /**
   * Update avatar with protection against Google override
   */
  static async updateAvatar(file: File, userId: string): Promise<{ avatarUrl: string; publicId?: string }> {
    console.log('AvatarManager - Uploading custom avatar, protecting against Google override');
    return await profileApi.uploadAvatar(file, userId);
  }

  /**
   * Remove avatar (sets to null, not Google avatar)
   */
  static async removeAvatar(): Promise<void> {
    console.log('AvatarManager - Removing avatar, preventing Google override');
    return await profileApi.removeAvatar();
  }

  /**
   * Check if we should preserve custom avatar during Google sign-in
   */
  static shouldPreserveCustomAvatar(currentProfile: Profile | null): boolean {
    return this.hasCustomAvatar(currentProfile);
  }
}
