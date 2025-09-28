import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Rss, Video, Store, Settings, User } from 'lucide-react';
import { useUnifiedAuth } from '@/features/auth/hooks/useUnifiedAuth';
import { getUserDisplayName, getUserHandle } from '@/lib/utils/userUtils';
import styles from './FeedNavigation.module.css';

// Navigation data structure
const navigationItems = [
  {
    id: 'home',
    href: '/feed',
    label: 'Go to Home',
    text: 'Home',
    icon: Home
  },
  {
    id: 'feed',
    href: '/feed',
    label: 'Go to Feed',
    text: 'Feed',
    icon: Rss
  },
  {
    id: 'streams',
    href: '/streams',
    label: 'Go to Streams',
    text: 'Streams',
    icon: Video
  },
  {
    id: 'marketplace',
    href: '/marketplace',
    label: 'Go to Marketplace',
    text: 'Marketplace',
    icon: Store
  },
  {
    id: 'settings',
    href: '/settings',
    label: 'Go to Settings',
    text: 'Settings',
    icon: Settings
  }
];

export const FeedNavigation: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useUnifiedAuth();

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsCollapsed(true);
    }
  };

  return (
    <nav 
      className={`${styles.navigation} ${isCollapsed ? styles.collapsed : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      role="navigation"
      aria-label="Main navigation"
      tabIndex={0}
    >
      <div className={styles.navSection}>
        <h3 className={styles.sectionTitle}>Navigation</h3>
        <ul className={styles.navList} role="list">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id} role="listitem">
                <Link href={item.href} className={styles.navLink} aria-label={item.label}>
                  <div className={styles.iconContainer}>
                    <IconComponent size={20} />
                  </div>
                  <span className={styles.navText}>{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <User size={20} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{getUserDisplayName(user)}</div>
          <div className={styles.userHandle}>{getUserHandle(user)}</div>
        </div>
      </div>
    </nav>
  );
};
