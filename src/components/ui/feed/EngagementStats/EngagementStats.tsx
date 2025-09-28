import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import styles from './EngagementStats.module.css';

interface EngagementStatsProps {
  likes: number;
  comments: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const EngagementStats: React.FC<EngagementStatsProps> = ({ 
  likes, 
  comments, 
  className = '', 
  size = 'md' 
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <div className={`${styles.stats} ${styles[size]} ${className}`}>
      <span className={styles.stat}>
        <Heart size={iconSize} />
        <span>{formatNumber(likes)}</span>
      </span>
      <span className={styles.stat}>
        <MessageCircle size={iconSize} />
        <span>{formatNumber(comments)}</span>
      </span>
    </div>
  );
};
