"use client";

import React, { useEffect, useRef } from 'react';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useProfileForm } from '@/features/profile/hooks/useProfileForm';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Label } from '@/components/ui/form/Label/Label';
import { Text } from '@/components/ui/typography/Typography';
import { AvatarUpload } from './AvatarUpload/AvatarUpload';
import { SocialLinks } from './SocialLinks/SocialLinks';
import { ProfileLoading } from './ProfileLoading/ProfileLoading';
import { ProfileError } from './ProfileError/ProfileError';
import { AvatarProtectionNotice } from '@/components/profile/AvatarProtectionNotice';
import styles from './ProfileSettings.module.css';

export const ProfileSettings: React.FC = () => {
  const { 
    profile, 
    loading: profileLoading, 
    error: profileError, 
    updateProfile, 
    refetch
  } = useProfile();
  const {
    formData,
    isLoading,
    hasChanges,
    handleInputChange,
    handleSave,
  } = useProfileForm({
    profile,
    onSave: updateProfile,
  });

  // Refs for form elements
  const formRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys when a form element is focused
      const activeElement = document.activeElement;
      const isFormElement = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'BUTTON'
      );

      if (!isFormElement) return;

      // Get all focusable elements in the form
      const focusableElements = formRef.current?.querySelectorAll(
        'input:not([disabled]), textarea:not([disabled]), button:not([disabled])'
      ) as NodeListOf<HTMLElement>;

      if (!focusableElements || focusableElements.length === 0) return;

      const currentIndex = Array.from(focusableElements).indexOf(activeElement as HTMLElement);
      
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          nextIndex = (currentIndex + 1) % focusableElements.length;
          break;
        case 'ArrowUp':
          event.preventDefault();
          nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          nextIndex = focusableElements.length - 1;
          break;
        default:
          return; // Don't prevent default for other keys
      }

      focusableElements[nextIndex]?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);


  // Show loading state while profile is loading
  if (profileLoading) {
    return <ProfileLoading />;
  }

  // Show error state if profile failed to load
  if (profileError) {
    return <ProfileError error={profileError} onRetry={refetch} />;
  }

  return (
    <div className={styles.container} ref={formRef}>
      <div className={styles.header}>
        <Text variant="h1" className={styles.title}>Profile Settings</Text>
        <Text color="muted" className={styles.subtitle}>
          Manage your profile information and preferences
        </Text>
      </div>

      <div className={styles.content}>
        {/* Avatar Section - Full Width */}
        <div className={styles.avatarSection}>
          <div className={styles.sectionHeader}>
            <Text variant="h2" className={styles.sectionTitle}>Profile Picture</Text>
            <Text color="muted" className={styles.sectionDescription}>
              Upload a profile picture to personalize your account
            </Text>
          </div>
          <AvatarUpload 
            currentAvatar={profile?.avatarUrl} 
            onAvatarChange={() => refetch()} 
          />
          <AvatarProtectionNotice profile={profile} />
        </div>

        {/* Basic Information and Social Links in Same Row */}
        <div className={styles.infoRow}>
          {/* Basic Information */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Text variant="h2" className={styles.sectionTitle}>Basic Information</Text>
              <Text color="muted" className={styles.sectionDescription}>
                Update your basic profile information
              </Text>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  disabled={true}
                  placeholder="Username cannot be changed"
                  tabIndex={1}
                />
                <Text color="muted" className={styles.fieldNote}>
                  Username cannot be changed after account creation
                </Text>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  tabIndex={2}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  tabIndex={3}
                />
              </div>


              <div className={styles.formGroup}>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className={styles.textarea}
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  tabIndex={4}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                  tabIndex={5}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  tabIndex={6}
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Text variant="h2" className={styles.sectionTitle}>Social Links</Text>
              <Text color="muted" className={styles.sectionDescription}>
                Connect your social media accounts
              </Text>
            </div>
            <SocialLinks />
          </div>
        </div>

      {/* Save Button */}
      <div className={styles.actions}>
        <Button 
          onClick={handleSave} 
          disabled={isLoading || !hasChanges}
          className={styles.saveButton}
          tabIndex={7}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      </div>
    </div>
  );
};
