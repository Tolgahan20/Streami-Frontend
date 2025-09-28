import React from 'react';
import styles from './Username.module.css';

interface UsernameProps {
  username: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Username: React.FC<UsernameProps> = ({ 
  username, 
  className = '', 
  size = 'md' 
}) => {
  return (
    <span className={`${styles.username} ${styles[size]} ${className}`}>
      {username}
    </span>
  );
};
