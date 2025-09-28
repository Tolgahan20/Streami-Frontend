import React from 'react';
import { Search, Filter, Plus, Bell, Menu, User } from 'lucide-react';
import { useMobileNavigation } from '@/features/profile/hooks/useMobileNavigationContext';
import { useRightSidebar } from '@/features/profile/hooks/useRightSidebar';
import styles from './FeedHeader.module.css';

export const FeedHeader: React.FC = () => {
  const { isMobile, toggleMobileMenu } = useMobileNavigation();
  const { isMobile: isMobileForRightSidebar, toggleRightSidebar } = useRightSidebar();

  console.log('FeedHeader - isMobile:', isMobile);
  console.log('FeedHeader - toggleMobileMenu:', toggleMobileMenu);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        )}

        <div className={styles.logo}>
          <div className={styles.logoIcon}>S</div>
          <span className={styles.logoText}>Streami</span>
        </div>

        {/* Search Section - Hidden on mobile */}
        {!isMobile && (
          <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search Streami..."
                className={styles.searchInput}
              />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {/* Filter Button - Hidden on mobile */}
          {!isMobile && (
            <button className={styles.filterButton}>
              <Filter size={16} />
              Filter
            </button>
          )}
          
          {/* Mobile Right Sidebar Button */}
          {isMobileForRightSidebar && (
            <button 
              className={styles.mobileRightSidebarButton}
              onClick={toggleRightSidebar}
              aria-label="Open user profile and stats"
            >
              <User size={20} />
            </button>
          )}
          
          <button className={styles.actionButton}>
            <Plus size={20} />
          </button>
          <button className={styles.actionButton}>
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
