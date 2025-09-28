"use client";

import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/components/ui/button/Button';
import { Text } from '@/components/ui/typography/Typography';
import { getUserDisplayName, getUserInitials } from '@/lib/utils/userUtils';

export function UserProfile() {
  const { user, signOut, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
        {getUserInitials(user)}
      </div>
      
      <div className="flex-1 min-w-0">
        <Text variant="base" className="font-medium truncate">
          {getUserDisplayName(user)}
        </Text>
        <Text variant="base" color="muted" className="truncate">
          {user.email}
        </Text>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={signOut}
        className="shrink-0"
      >
        Sign Out
      </Button>
    </div>
  );
}
