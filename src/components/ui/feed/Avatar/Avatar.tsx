import React from 'react';
import { User } from 'lucide-react';
import styles from './Avatar.module.css';

interface AvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const sizeMap = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32
};

export const Avatar: React.FC<AvatarProps> = ({ 
  size = 'sm', 
  className = '', 
  children 
}) => {
  const iconSize = sizeMap[size];
  
  return (
    <div className={`${styles.avatar} ${styles[size]} ${className}`}>
      {children || <User size={iconSize} />}
    </div>
  );
};
