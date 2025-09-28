import React from 'react';
import { Button } from '@/components/ui/button/Button';
import { Text } from '@/components/ui/typography/Typography';
import { RefreshCw, AlertCircle } from 'lucide-react';
import styles from './ProfileError.module.css';

interface ProfileErrorProps {
  error: string;
  onRetry?: () => void;
}

export const ProfileError: React.FC<ProfileErrorProps> = ({ error, onRetry }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text variant="h1" className={styles.title}>Profile Settings</Text>
        <Text color="muted" className={styles.subtitle}>
          Error loading profile
        </Text>
      </div>
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>
          <AlertCircle size={48} />
        </div>
        <Text color="destructive" className={styles.errorMessage}>
          {error}
        </Text>
        <Text color="muted" className={styles.errorDescription}>
          We couldn't load your profile data. Please try again.
        </Text>
        {onRetry && (
          <Button onClick={onRetry} className={styles.retryButton}>
            <RefreshCw size={16} />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
