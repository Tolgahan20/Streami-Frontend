import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Username } from '../Username/Username';
import { PostContent } from '../PostContent/PostContent';
import { EngagementStats } from '../EngagementStats/EngagementStats';
import { Reply } from '../Reply/Reply';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { Attachment } from '../Attachment/Attachment';
import styles from './PostCard.module.css';

interface PostCardProps {
  username: string;
  content: string;
  likes: number;
  comments: number;
  reply?: {
    username: string;
    content: string;
  };
  hasVideo?: boolean;
  attachment?: string;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  username,
  content,
  likes,
  comments,
  reply,
  hasVideo = false,
  attachment,
  className = ''
}) => {
  return (
    <div className={`${styles.postCard} ${className}`}>
      <div className={styles.postHeader}>
        <Avatar size="sm" />
        <Username username={username} />
      </div>
      
      <PostContent content={content} />
      
      {reply && (
        <Reply 
          username={reply.username} 
          content={reply.content} 
        />
      )}
      
      {hasVideo && <VideoPlayer />}
      
      {attachment && (
        <Attachment filename={attachment} />
      )}
      
      <EngagementStats 
        likes={likes} 
        comments={comments} 
      />
    </div>
  );
};
