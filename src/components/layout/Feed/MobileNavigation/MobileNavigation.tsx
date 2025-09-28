"use client";

import React from 'react';
import Link from 'next/link';
import { Home, Rss, Video, Store, Settings, User, X } from 'lucide-react';
import { useUnifiedAuth } from '@/features/auth/hooks/useUnifiedAuth';
import { getUserDisplayName, getUserHandle } from '@/lib/utils/userUtils';
import styles from './MobileNavigation.module.css';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const { user } = useUnifiedAuth();

  console.log('MobileNavigation - isOpen:', isOpen);
  console.log('MobileNavigation - onClose:', onClose);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />
      
      {/* Mobile Navigation */}
      <nav className={`${styles.mobileNav} ${isOpen ? styles.open : ''}`} role="navigation" aria-label="Mobile navigation">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>S</div>
            <span className={styles.logoText}>Streami</span>
          </div>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className={styles.navSection}>
          <h3 className={styles.sectionTitle}>Navigation</h3>
          <ul className={styles.navList} role="list">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} role="listitem">
                  <Link 
                    href={item.href} 
                    className={styles.navLink} 
                    aria-label={item.label}
                    onClick={onClose}
                  >
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

        {/* User Profile */}
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
    </>
  );
};
