import React from 'react';
import { Text } from '@/components/ui/typography/Typography';
import { User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon = <User size={48} />
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <Text variant="h3" className={styles.title}>
        {title}
      </Text>
      <Text color="muted" className={styles.description}>
        {description}
      </Text>
      {actionLabel && onAction && (
        <Button onClick={onAction} className={styles.actionButton}>
          <Plus size={16} />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
