import React from 'react';
import Link from 'next/link';
import { Home, Rss, Video, Store, Settings, User } from 'lucide-react';
import styles from './FeedNavigation.module.css';

export const FeedNavigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navSection}>
        <h3 className={styles.sectionTitle}>Navigation</h3>
        <ul className={styles.navList}>
          <li>
            <Link href="/feed" className={styles.navLink}>
              <Home size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/feed" className={styles.navLink}>
              <Rss size={20} />
              <span>Feed</span>
            </Link>
          </li>
          <li>
            <Link href="/streams" className={styles.navLink}>
              <Video size={20} />
              <span>Streams</span>
            </Link>
          </li>
          <li>
            <Link href="/marketplace" className={styles.navLink}>
              <Store size={20} />
              <span>Marketplace</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className={styles.navLink}>
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <User size={20} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Nina Egremin</div>
          <div className={styles.userHandle}>@nina_streams</div>
        </div>
      </div>
    </nav>
  );
};
