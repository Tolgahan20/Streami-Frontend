// Profile types matching backend DTOs
export interface Profile {
  id: string;
  userId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  profileId: string;
  platform: 'youtube' | 'twitch' | 'twitter' | 'instagram' | 'tiktok' | 'discord' | 'github' | 'website';
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileDto {
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
}

export interface UpdateSocialLinksDto {
  [platform: string]: string;
}

export interface ProfileResponseDto {
  profile: Profile;
  socialLinks: SocialLink[];
}

export interface AvatarUploadResponse {
  avatarUrl: string;
  publicId?: string;
}

// Social platform configuration
export interface SocialPlatformConfig {
  platform: string;
  icon: React.ReactNode;
  placeholder: string;
}

// Form data interfaces
export interface ProfileFormData {
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  website: string;
}

export interface SocialLinksFormData {
  [platform: string]: string;
}

// Error types
export interface ProfileError {
  message: string;
  code?: string;
  field?: string;
}

// Loading states
export interface ProfileLoadingStates {
  profile: boolean;
  avatar: boolean;
  socialLinks: boolean;
  save: boolean;
}
