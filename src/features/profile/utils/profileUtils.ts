import type { SocialLink, SocialLinksFormData, ProfileFormData, Profile } from '../types';

/**
 * Convert social links array to form data object
 */
export const socialLinksToFormData = (socialLinks: SocialLink[] | undefined | null): SocialLinksFormData => {
  const formData: SocialLinksFormData = {};
  
  // Handle case where socialLinks is not an array
  if (!socialLinks || !Array.isArray(socialLinks)) {
    console.warn('socialLinksToFormData: socialLinks is not an array:', socialLinks);
    return formData;
  }
  
  socialLinks.forEach(link => {
    if (link && link.platform && link.url) {
      formData[link.platform] = link.url;
    }
  });
  return formData;
};

/**
 * Convert form data object to social links array for API
 */
export const formDataToSocialLinks = (formData: SocialLinksFormData): Array<{ platform: string; url: string }> => {
  return Object.entries(formData)
    .filter(([, url]) => url && url.trim() !== '') // Only include non-empty URLs
    .map(([platform, url]) => ({ platform, url: url.trim() }));
};

/**
 * Convert profile data to form data object
 */
export const profileToFormData = (profile: Profile): ProfileFormData => {
  const formData = {
    username: profile.username || '',
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    bio: profile.bio || '',
    location: profile.location || '',
    website: profile.website || '',
  };
  
  console.log('profileToFormData - Input profile:', profile);
  console.log('profileToFormData - Output formData:', formData);
  
  return formData;
};

/**
 * Validate file type for avatar upload
 */
export const validateAvatarFile = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please select a valid image file (JPG, PNG, WebP, or GIF)'
    };
  }
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 5MB'
    };
  }
  
  return { isValid: true };
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Generate avatar placeholder URL
 */
export const generateAvatarPlaceholder = (name: string): string => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  const colors = [
    'FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7',
    'DDA0DD', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E9'
  ];
  
  const colorIndex = name.length % colors.length;
  const backgroundColor = colors[colorIndex];
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${backgroundColor}&color=fff&size=120`;
};

/**
 * Validate and clean avatar URL
 */
export const validateAvatarUrl = (url: string | undefined | null): string | null => {
  if (!url || url.includes('undefined') || url.trim() === '') {
    return null;
  }
  
  // Check if it's a valid URL
  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
};

/**
 * Get safe avatar URL with fallback
 */
export const getSafeAvatarUrl = (avatarUrl: string | undefined | null, fallbackName?: string): string | null => {
  const validUrl = validateAvatarUrl(avatarUrl);
  if (validUrl) {
    return validUrl;
  }
  
  // Return placeholder if we have a name
  if (fallbackName) {
    return generateAvatarPlaceholder(fallbackName);
  }
  
  return null;
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate social media URL format
 */
export const validateSocialUrl = (platform: string, url: string): { isValid: boolean; error?: string } => {
  if (!url.trim()) {
    return { isValid: true }; // Empty URLs are allowed
  }
  
  if (!isValidUrl(url)) {
    return {
      isValid: false,
      error: 'Please enter a valid URL'
    };
  }
  
  const platformPatterns: Record<string, RegExp> = {
    youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/,
    twitch: /^(https?:\/\/)?(www\.)?twitch\.tv/,
    twitter: /^(https?:\/\/)?(www\.)?twitter\.com/,
    instagram: /^(https?:\/\/)?(www\.)?instagram\.com/,
    tiktok: /^(https?:\/\/)?(www\.)?tiktok\.com/,
    discord: /^(https?:\/\/)?(www\.)?discord\.(gg|com)/,
    github: /^(https?:\/\/)?(www\.)?github\.com/,
    website: /^https?:\/\//,
  };
  
  const pattern = platformPatterns[platform];
  if (pattern && !pattern.test(url)) {
    return {
      isValid: false,
      error: `Please enter a valid ${platform} URL`
    };
  }
  
  return { isValid: true };
};

/**
 * Debounce function for form inputs
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if profile data has changed
 */
export const hasProfileChanged = (original: ProfileFormData, current: ProfileFormData): boolean => {
  console.log('hasProfileChanged - original:', original);
  console.log('hasProfileChanged - current:', current);
  
  const changes = Object.keys(original).map(key => {
    const originalValue = original[key as keyof ProfileFormData];
    const currentValue = current[key as keyof ProfileFormData];
    const hasChanged = originalValue !== currentValue;
    console.log(`hasProfileChanged - ${key}: "${originalValue}" !== "${currentValue}" = ${hasChanged}`);
    return hasChanged;
  });
  
  const hasAnyChanges = changes.some(change => change);
  console.log('hasProfileChanged - hasAnyChanges:', hasAnyChanges);
  
  return hasAnyChanges;
};

/**
 * Check if social links data has changed
 */
export const hasSocialLinksChanged = (original: SocialLinksFormData, current: SocialLinksFormData): boolean => {
  const allKeys = new Set([...Object.keys(original), ...Object.keys(current)]);
  
  return Array.from(allKeys).some(key => 
    (original[key] || '') !== (current[key] || '')
  );
};
