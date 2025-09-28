import { useState, useEffect } from 'react';
import type { SocialLink, SocialLinksFormData } from '../types';
import { socialLinksToFormData, hasSocialLinksChanged } from '../utils/profileUtils';

interface UseSocialLinksProps {
  socialLinks: SocialLink[];
  onSave: (data: SocialLinksFormData) => Promise<any>;
}

export function useSocialLinks({ socialLinks, onSave }: UseSocialLinksProps) {
  const [links, setLinks] = useState<SocialLinksFormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize links from API data
  useEffect(() => {
    console.log('useSocialLinks: socialLinks received:', socialLinks, 'type:', typeof socialLinks, 'isArray:', Array.isArray(socialLinks));
    const linksMap = socialLinksToFormData(socialLinks);
    setLinks(linksMap);
  }, [socialLinks]);

  // Check for changes
  useEffect(() => {
    const originalData = socialLinksToFormData(socialLinks);
    setHasChanges(hasSocialLinksChanged(originalData, links));
  }, [links, socialLinks]);

  const handleLinkChange = (platform: string, url: string) => {
    setLinks(prev => ({ ...prev, [platform]: url }));
    // Clear success message when user starts typing
    if (success) {
      setSuccess(false);
    }
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSave = async () => {
    if (!hasChanges) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await onSave(links);
      setSuccess(true);
      setHasChanges(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save social links');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    const originalData = socialLinksToFormData(socialLinks);
    setLinks(originalData);
    setError(null);
    setSuccess(false);
    setHasChanges(false);
  };

  return {
    links,
    isLoading,
    error,
    success,
    hasChanges,
    handleLinkChange,
    handleSave,
    resetForm,
  };
}
