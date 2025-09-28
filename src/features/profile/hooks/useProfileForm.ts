import { useState, useEffect } from 'react';
import type { ProfileFormData, Profile } from '../types';
import { profileToFormData, hasProfileChanged } from '../utils/profileUtils';

interface UseProfileFormProps {
  profile: Profile | null;
  onSave: (data: ProfileFormData) => Promise<Profile>;
}

export function useProfileForm({ profile, onSave }: UseProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    website: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Check if required fields are filled
  const isFormValid = () => {
    return formData.firstName.trim() !== '' && formData.lastName.trim() !== '';
  };

  // Check if form can be saved (has changes AND is valid)
  const canSave = () => {
    return hasChanges && isFormValid();
  };

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      const initialData = profileToFormData(profile);
      setFormData(initialData);
    }
  }, [profile]);

  // Check for changes
  useEffect(() => {
    if (profile) {
      const originalData = profileToFormData(profile);
      const hasChangesResult = hasProfileChanged(originalData, formData);
      
      setHasChanges(hasChangesResult);
    } else {
      setHasChanges(false);
    }
  }, [formData, profile]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      return newData;
    });
  };

  const handleSave = async () => {
    if (!canSave()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onSave(formData);
      setHasChanges(false);
    } catch (err) {
      // Error handling is now done in the useProfile hook with toasts
      console.error('Profile save error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    if (profile) {
      setFormData(profileToFormData(profile));
      setHasChanges(false);
    }
  };

  return {
    formData,
    isLoading,
    hasChanges,
    isFormValid: isFormValid(),
    canSave: canSave(),
    handleInputChange,
    handleSave,
    resetForm,
  };
}
