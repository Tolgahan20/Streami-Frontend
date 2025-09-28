"use client";

import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input/Input';
import { Label } from '@/components/ui/form/Label/Label';
import { Button } from '@/components/ui/button/Button';
import { Text } from '@/components/ui/typography/Typography';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useSocialLinks } from '@/features/profile/hooks/useSocialLinks';
import { 
  Youtube, 
  Twitch, 
  Twitter, 
  Instagram, 
  Music, 
  MessageCircle,
  Github,
  Globe
} from 'lucide-react';
import styles from './SocialLinks.module.css';

interface SocialLinkConfig {
  platform: string;
  icon: React.ReactNode;
  placeholder: string;
}

const socialPlatforms: SocialLinkConfig[] = [
  {
    platform: 'youtube',
    icon: <Youtube size={20} />,
    placeholder: 'https://youtube.com/@yourchannel'
  },
  {
    platform: 'twitch',
    icon: <Twitch size={20} />,
    placeholder: 'https://twitch.tv/yourchannel'
  },
  {
    platform: 'twitter',
    icon: <Twitter size={20} />,
    placeholder: 'https://twitter.com/yourhandle'
  },
  {
    platform: 'instagram',
    icon: <Instagram size={20} />,
    placeholder: 'https://instagram.com/yourhandle'
  },
  {
    platform: 'tiktok',
    icon: <Music size={20} />,
    placeholder: 'https://tiktok.com/@yourhandle'
  },
  {
    platform: 'discord',
    icon: <MessageCircle size={20} />,
    placeholder: 'https://discord.gg/yourserver'
  },
  {
    platform: 'github',
    icon: <Github size={20} />,
    placeholder: 'https://github.com/yourusername'
  },
  {
    platform: 'website',
    icon: <Globe size={20} />,
    placeholder: 'https://yourwebsite.com'
  }
];

export const SocialLinks: React.FC = () => {
  const { socialLinks, updateSocialLinks } = useProfile();
  const {
    links,
    isLoading,
    error,
    success,
    hasChanges,
    handleLinkChange,
    handleSave,
  } = useSocialLinks({
    socialLinks,
    onSave: updateSocialLinks,
  });

  // Ref for the social links container
  const socialLinksRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation handler for social links
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys when a form element is focused within social links
      const activeElement = document.activeElement;
      const isSocialLinksElement = activeElement && socialLinksRef.current?.contains(activeElement);
      
      if (!isSocialLinksElement) return;

      const isFormElement = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'BUTTON'
      );

      if (!isFormElement) return;

      // Get all focusable elements in the social links section
      const focusableElements = socialLinksRef.current?.querySelectorAll(
        'input:not([disabled]), button:not([disabled])'
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

  return (
    <div className={styles.container} ref={socialLinksRef}>
      {/* Success/Error Messages */}
      {success && (
        <div className={styles.successMessage}>
          <Text color="muted" variant="small">Social links updated successfully!</Text>
        </div>
      )}
      {error && (
        <div className={styles.errorMessage}>
          <Text color="destructive" variant="small">{error}</Text>
        </div>
      )}

      <div className={styles.grid}>
        {socialPlatforms.map((platform, index) => (
          <div key={platform.platform} className={styles.linkGroup}>
            <Label htmlFor={platform.platform} className={styles.label}>
              <div className={styles.labelContent}>
                {platform.icon}
                <span className={styles.platformName}>
                  {platform.platform.charAt(0).toUpperCase() + platform.platform.slice(1)}
                </span>
              </div>
            </Label>
            <Input
              id={platform.platform}
              type="url"
              value={links[platform.platform] || ''}
              onChange={(e) => handleLinkChange(platform.platform, e.target.value)}
              placeholder={platform.placeholder}
              className={styles.input}
              disabled={isLoading}
              tabIndex={8 + index}
            />
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button 
          onClick={handleSave} 
          className={styles.saveButton}
          disabled={isLoading || !hasChanges}
          tabIndex={8 + socialPlatforms.length}
        >
          {isLoading ? 'Saving...' : 'Save Social Links'}
        </Button>
      </div>
    </div>
  );
};
