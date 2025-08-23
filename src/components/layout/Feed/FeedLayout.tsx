import React from 'react';
import { FeedNavigation } from './FeedNavigation/FeedNavigation';
import styles from './FeedLayout.module.css';

interface FeedLayoutProps {
  children: React.ReactNode;
}

export const FeedLayout: React.FC<FeedLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <FeedNavigation />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
