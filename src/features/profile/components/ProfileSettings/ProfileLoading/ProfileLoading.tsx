import React from 'react';
import { Text } from '@/components/ui/typography/Typography';
import styles from './ProfileLoading.module.css';

export const ProfileLoading: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text variant="h1" className={styles.title}>Profile Settings</Text>
        <Text color="muted" className={styles.subtitle}>
          Loading your profile...
        </Text>
      </div>
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <Text color="muted">Loading profile data...</Text>
      </div>
    </div>
  );
};
