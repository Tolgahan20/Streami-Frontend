import { useState, useRef, useEffect } from 'react';
import { validateAvatarFile } from '../utils/profileUtils';

interface UseAvatarUploadProps {
  currentAvatar?: string;
  onUpload: (file: File) => Promise<unknown>;
  onRemove: () => Promise<void>;
  onAvatarChange?: (avatarUrl: string) => void;
}

export function useAvatarUpload({ 
  currentAvatar, 
  onUpload, 
  onRemove, 
  onAvatarChange 
}: UseAvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when currentAvatar changes (e.g., after profile update)
  useEffect(() => {
    console.log('useAvatarUpload - currentAvatar changed:', currentAvatar);
    if (currentAvatar && currentAvatar !== preview) {
      console.log('useAvatarUpload - Updating preview to:', currentAvatar);
      setPreview(currentAvatar);
    }
  }, [currentAvatar, preview]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateAvatarFile(file);
    if (!validation.isValid) {
      setError(validation.error!);
      return;
    }

    // Clear previous errors
    setError(null);
    setIsUploading(true);

    try {
      // Create preview first
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const result = await onUpload(file);
      const avatarUrl = typeof result === 'string' ? result : (result as { avatarUrl?: string })?.avatarUrl;
      
      // Only update preview if we got a valid URL from server
      if (avatarUrl && !avatarUrl.includes('undefined')) {
        setPreview(avatarUrl);
        onAvatarChange?.(avatarUrl);
      } else {
        // Keep the local preview if server URL is invalid
        console.warn('Invalid avatar URL from server:', avatarUrl);
        setError('Upload successful but received invalid image URL');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar');
      // Reset preview on error
      setPreview(currentAvatar || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = async () => {
    setIsUploading(true);
    setError(null);
    
    try {
      await onRemove();
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onAvatarChange?.('');
    } catch (err: unknown) {
      console.error('Remove avatar error:', err);
      
      // Handle specific error cases
      if (err && typeof err === 'object' && 'response' in err) {
        const apiError = err as { response?: { status?: number } };
        if (apiError.response?.status === 401) {
          setError('Authentication required. Please log in again.');
          // Optionally redirect to login
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          }
        } else if (apiError.response?.status === 404) {
          setError('Avatar not found. It may have already been removed.');
          // Still clear the preview since avatar doesn't exist
          setPreview(null);
          onAvatarChange?.('');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to remove avatar');
        }
      } else {
        setError(err instanceof Error ? err.message : 'Failed to remove avatar');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleCrop = () => {
    // TODO: Implement client-side cropping
    console.log('Crop functionality to be implemented');
  };

  const clearError = () => {
    setError(null);
  };

  return {
    preview,
    isUploading,
    error,
    fileInputRef,
    handleFileSelect,
    handleUpload,
    handleRemove,
    handleCrop,
    clearError,
  };
}
