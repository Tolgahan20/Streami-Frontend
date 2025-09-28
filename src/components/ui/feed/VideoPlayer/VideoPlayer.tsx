import React from 'react';
import { MoreHorizontal, Play } from 'lucide-react';
import { LiveTag } from '../LiveTag/LiveTag';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`${styles.videoPlayer} ${className}`}>
      <div className={styles.videoHeader}>
        <LiveTag />
        <button className={styles.videoMenu}>
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div className={styles.videoContent}>
        <div className={styles.playButton}>
          <Play size={24} />
        </div>
      </div>
      <div className={styles.videoProgress}>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  );
};
