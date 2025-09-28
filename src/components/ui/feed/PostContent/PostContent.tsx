import React from 'react';
import styles from './PostContent.module.css';

interface PostContentProps {
  content: string;
  className?: string;
}

export const PostContent: React.FC<PostContentProps> = ({ 
  content, 
  className = '' 
}) => {
  return (
    <div className={`${styles.content} ${className}`}>
      {content}
    </div>
  );
};
