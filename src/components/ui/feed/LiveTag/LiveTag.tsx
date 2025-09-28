import React from 'react';
import styles from './LiveTag.module.css';

interface LiveTagProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const LiveTag: React.FC<LiveTagProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  return (
    <div className={`${styles.liveTag} ${styles[size]} ${className}`}>
      LIVE
    </div>
  );
};
