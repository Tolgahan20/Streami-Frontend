"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Upload, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { Text } from '@/components/ui/typography/Typography';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useAvatarUpload } from '@/features/profile/hooks/useAvatarUpload';
import { validateAvatarUrl, validateAvatarFile } from '@/features/profile/utils/profileUtils';
import { AvatarCropModal } from './AvatarCropModal';
import type { AvatarUploadResponse } from '@/features/profile/types';
import styles from './AvatarUpload.module.css';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange?: (avatarUrl: string) => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  onAvatarChange
}) => {
  const { 
    profile, 
    loading: profileLoading,
    uploadAvatar, 
    removeAvatar, 
    isUploadingAvatar, 
    isRemovingAvatar 
  } = useProfile();
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>('');
  

  // Use profile avatar URL instead of prop to ensure we get the latest data
  const avatarUrl = profile?.avatarUrl || currentAvatar;
  
  const {
    preview,
    isUploading,
    error,
    fileInputRef,
    handleUpload,
    handleRemove,
    handleCrop,
  } = useAvatarUpload({
    currentAvatar: avatarUrl,
    onUpload: uploadAvatar,
    onRemove: removeAvatar,
    onAvatarChange,
  });

  // Use TanStack Query loading states
  const isLoading = isUploading || isUploadingAvatar || isRemovingAvatar || profileLoading;
  
  // Debug preview value

  const handleFileSelectWithCrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if profile is loaded
    if (profileLoading || !profile?.userId) {
  
      return;
    }

    // Validate file
    const validation = validateAvatarFile(file);
    if (!validation.isValid) {
      return;
    }

    // Create preview and open crop modal
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageToCrop(result);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    try {
      // Check if profile is loaded
      if (profileLoading || !profile?.userId) {
        throw new Error('Profile not loaded. Please wait and try again.');
      }

      // Convert blob to file with proper name
      const fileName = `avatar_${Date.now()}.jpg`;
      const file = new File([croppedBlob], fileName, { 
        type: 'image/jpeg',
        lastModified: Date.now()
      });
      
      
      // Upload the cropped image
      const result = await uploadAvatar(file);
      const avatarUrl = typeof result === 'string' ? result : (result as AvatarUploadResponse).avatarUrl;
      
      if (avatarUrl && !avatarUrl.includes('undefined')) {
        onAvatarChange?.(avatarUrl);
      }
    } catch (err) {
      console.error('Failed to upload cropped image:', err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          <Text color="destructive" variant="small">{error}</Text>
        </div>
      )}

      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          {validateAvatarUrl(preview) ? (
            <Image 
              key={preview} // Force re-render when preview changes
              src={preview!} 
              alt="Profile" 
              width={120}
              height={120}
              className={styles.avatarImage}
              onError={(e) => {
                // Fallback to user icon if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = parent.querySelector('.avatar-fallback');
                  if (fallback) {
                    (fallback as HTMLElement).style.display = 'flex';
                  }
                }
              }}
            />
          ) : (
            <User size={48} className={styles.avatarIcon} />
          )}
          {/* Hidden fallback icon */}
          <User size={48} className={`${styles.avatarIcon} avatar-fallback`} style={{ display: 'none' }} />
          {isLoading && (
            <div className={styles.uploadingOverlay}>
              <div className={styles.uploadingSpinner}></div>
            </div>
          )}
        </div>
        
        <div className={styles.avatarActions}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleUpload}
            disabled={isLoading}
            className={styles.uploadButton}
          >
            <Upload size={16} />
            {isLoading ? 'Uploading...' : (preview ? 'Change' : 'Upload')}
          </Button>
          
          {preview && !isLoading && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCrop}
                className={styles.cropButton}
              >
                <Camera size={16} />
                Crop
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={isLoading}
                className={styles.removeButton}
              >
                <X size={16} />
                Remove
              </Button>
            </>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <Text variant="small" color="muted" className={styles.infoText}>
          Upload a profile picture. Recommended size: 400x400px. Max file size: 5MB.
          Supported formats: JPG, PNG, WebP, GIF.
        </Text>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelectWithCrop}
        className={styles.hiddenInput}
        disabled={isLoading}
      />

      {/* Crop Modal */}
      <AvatarCropModal
        imageSrc={imageToCrop}
        isOpen={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        onCrop={handleCropComplete}
      />
    </div>
  );
};
