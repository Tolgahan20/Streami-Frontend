import React from 'react';
import { Search, Filter, Plus, Bell } from 'lucide-react';
import styles from './FeedHeader.module.css';

export const FeedHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>S</div>
          <span className={styles.logoText}>Streami</span>
        </div>

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

        <div className={styles.actions}>
          <button className={styles.filterButton}>
            <Filter size={16} />
            Filter
          </button>
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
