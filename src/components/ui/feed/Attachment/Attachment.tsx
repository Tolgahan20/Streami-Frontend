import React from 'react';
import styles from './Attachment.module.css';

interface AttachmentProps {
  filename: string;
  className?: string;
}

export const Attachment: React.FC<AttachmentProps> = ({ 
  filename, 
  className = '' 
}) => {
  return (
    <div className={`${styles.attachment} ${className}`}>
      <div className={styles.attachmentIcon}>📎</div>
      <span>{filename}</span>
    </div>
  );
};
