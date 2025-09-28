import type { AuthUser } from '@/features/auth/types';
import type { Profile } from '@/features/profile/types';
import type { User } from 'firebase/auth';

type UserType = AuthUser | Profile | User | null | undefined;

/**
 * Get display name from user data
 * Priority: firstName + lastName > firstName > Firebase displayName > email prefix > 'User'
 */
export const getUserDisplayName = (user: UserType): string => {
  if (!user) return 'User';
  
  // Handle Firebase User type
  if ('displayName' in user && user.displayName) {
    return user.displayName;
  }
  
  // Handle AuthUser/Profile types
  if ('firstName' in user && 'lastName' in user) {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
  }
  
  // Fallback to email
  if ('email' in user && user.email) {
    return user.email.split('@')[0];
  }
  
  return 'User';
};

/**
 * Get user initials for avatars
 * Priority: firstName + lastName initials > firstName initial > Firebase displayName initials > email initial > 'U'
 */
export const getUserInitials = (user: UserType): string => {
  if (!user) return 'U';
  
  // Handle Firebase User type
  if ('displayName' in user && user.displayName) {
    const nameParts = user.displayName.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.displayName[0].toUpperCase();
  }
  
  // Handle AuthUser/Profile types
  if ('firstName' in user && 'lastName' in user) {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) {
      return user.firstName[0].toUpperCase();
    }
  }
  
  // Fallback to email
  if ('email' in user && user.email) {
    return user.email[0].toUpperCase();
  }
  
  return 'U';
};

/**
 * Get user handle (username with @ prefix)
 */
export const getUserHandle = (user: UserType): string => {
  if (!user) return '@user';
  
  if ('username' in user && user.username) {
    return `@${user.username}`;
  }
  
  return '@user';
};

/**
 * Get full name (firstName + lastName) or fallback to display name
 */
export const getFullName = (user: UserType): string => {
  if (!user) return 'User';
  
  // Handle Firebase User type
  if ('displayName' in user && user.displayName) {
    return user.displayName;
  }
  
  // Handle AuthUser/Profile types
  if ('firstName' in user && 'lastName' in user) {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
  }
  
  return getUserDisplayName(user);
};

/**
 * Check if user has complete name information
 */
export const hasCompleteName = (user: UserType): boolean => {
  if (!user) return false;
  
  // Firebase User with displayName
  if ('displayName' in user && user.displayName) {
    return user.displayName.split(' ').length >= 2;
  }
  
  // AuthUser/Profile with firstName and lastName
  if ('firstName' in user && 'lastName' in user) {
    return !!(user.firstName && user.lastName);
  }
  
  return false;
};
