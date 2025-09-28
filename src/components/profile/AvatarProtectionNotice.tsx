"use client";

import React from 'react';
import { AvatarManager } from '@/lib/utils/avatarManager';
import { Text } from '@/components/ui/typography/Typography';
import { Shield, AlertCircle } from 'lucide-react';
import type { Profile } from '@/features/profile/types';

interface AvatarProtectionNoticeProps {
  profile: Profile | null;
}

export const AvatarProtectionNotice: React.FC<AvatarProtectionNoticeProps> = ({ profile }) => {
  const hasCustomAvatar = AvatarManager.hasCustomAvatar(profile);
  const isGoogleAvatar = AvatarManager.isGoogleAvatar(profile?.avatarUrl);

  if (!profile?.avatarUrl) {
    return null;
  }

  return (
    <div className="mt-2 p-3 rounded-lg border">
      {hasCustomAvatar ? (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border-green-200">
          <Shield size={16} />
          <Text variant="small" className="font-medium">
            Custom Avatar Protected
          </Text>
        </div>
      ) : isGoogleAvatar ? (
        <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border-amber-200">
          <AlertCircle size={16} />
          <Text variant="small">
            Using Google Avatar - Upload a custom one to prevent override
          </Text>
        </div>
      ) : null}
    </div>
  );
};
