import api from '@/lib/api/axios';
import { formDataToSocialLinks } from '../utils/profileUtils';
import type { 
  Profile, 
  SocialLink, 
  UpdateProfileDto, 
  UpdateSocialLinksDto, 
  AvatarUploadResponse 
} from '../types';

// Profile API functions
export const profileApi = {
  // Get user profile with social links
  async getProfile(): Promise<Profile & { socialLinks: SocialLink[] }> {

    try {
      const response = await api.get('/profiles');

      return response.data;
    } catch (error) {

      throw error;
    }
  },

  // Update profile information
  async updateProfile(data: UpdateProfileDto): Promise<Profile> {
    try {
      const response = await api.put('/profiles', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload avatar (with Cloudinary fallback to backend)
  async uploadAvatar(file: File, userId: string): Promise<AvatarUploadResponse> {

    try {
      // Try Cloudinary first
      const formData = new FormData();
      formData.append('avatar', file, file.name);
      formData.append('userId', userId);
      
      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        
        // Update the profile record with the new avatar URL

        try {
          await this.updateProfile({ avatarUrl: result.avatarUrl });

        } catch {
          // Don't throw here, still return the Cloudinary result
        }
        
      
        
        return {
          avatarUrl: result.avatarUrl,
          publicId: result.publicId,
        };
      } else {
        // If Cloudinary fails, fallback to backend
        console.warn('Cloudinary upload failed, falling back to backend:', await response.text());
        throw new Error('Cloudinary not configured');
      }
    } catch {
     
      // Fallback to backend upload
      const formData = new FormData();
      formData.append('avatar', file, file.name);
      formData.append('filename', file.name);

      const response = await api.post('/profiles/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
  },

  // Remove avatar
  async removeAvatar(): Promise<void> {
    
    try {
      await api.delete('/profiles/avatar');

    } catch {
     
     
      throw Error('Failed to remove avatar');
    }
  },

  // Get social links
  async getSocialLinks(): Promise<SocialLink[]> {
    const response = await api.get('/profiles/social-links');
    return response.data;
  },

  // Update all social links
  async updateSocialLinks(data: UpdateSocialLinksDto): Promise<SocialLink[]> {
    // Convert object format to array format for backend
    const socialLinksArray = formDataToSocialLinks(data);
    const response = await api.put('/profiles/social-links', { socialLinks: socialLinksArray });
    return response.data;
  },

  // Add single social link
  async addSocialLink(platform: string, url: string): Promise<SocialLink> {
    const response = await api.post('/profiles/social-links', { platform, url });
    return response.data;
  },

  // Remove social link
  async removeSocialLink(id: string): Promise<void> {
    await api.delete(`/profiles/social-links/${id}`);
  },
};
