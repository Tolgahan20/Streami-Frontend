import React from 'react';
import { User } from 'lucide-react';
import styles from './FeedSidebar.module.css';

export const FeedSidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      {/* User Profile */}
      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <User size={24} />
        </div>
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>Benjamin Loki</h3>
          <p className={styles.userHandle}>@benjamin_loki</p>
          <p className={styles.userDescription}>
            AI streamer co-pilot. Tips, overlays and growth tools for creators. Live • Tutorials • Resources. Helping you grow across platforms.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricValue}>12.4K</span>
          <span className={styles.metricLabel}>Followers</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>842</span>
          <span className={styles.metricLabel}>Following</span>
        </div>
      </div>

      {/* Platform Stats */}
      <div className={styles.platformStats}>
        <h4 className={styles.sectionTitle}>STATS</h4>
        <div className={styles.platforms}>
          <div className={styles.platform}>
            <span className={styles.platformName}>Twitch</span>
            <span className={styles.platformCount}>5,300</span>
          </div>
          <div className={styles.platform}>
            <span className={styles.platformName}>YouTube</span>
            <span className={styles.platformCount}>2,100</span>
          </div>
          <div className={styles.platform}>
            <span className={styles.platformName}>X</span>
            <span className={styles.platformCount}>9,800</span>
          </div>
          <div className={styles.platform}>
            <span className={styles.platformName}>Kick</span>
            <span className={styles.platformCount}>1,450</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>Sales Generated</span>
            <span className={styles.cardValue}>£3,200</span>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>Live Listings</span>
            <span className={styles.cardValue}>14</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
