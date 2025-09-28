import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Username } from '../Username/Username';
import { PostContent } from '../PostContent/PostContent';
import styles from './Reply.module.css';

interface ReplyProps {
  username: string;
  content: string;
  className?: string;
}

export const Reply: React.FC<ReplyProps> = ({ 
  username, 
  content, 
  className = '' 
}) => {
  return (
    <div className={`${styles.reply} ${className}`}>
      <div className={styles.replyHeader}>
        <Avatar size="xs" />
        <Username username={username} size="sm" />
      </div>
      <PostContent content={content} />
    </div>
  );
};
