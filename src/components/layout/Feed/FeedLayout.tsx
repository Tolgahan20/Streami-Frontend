import React from 'react';
import { FeedNavigation } from './FeedNavigation/FeedNavigation';
import { FeedSidebar } from './FeedSidebar/FeedSidebar';
import { MobileNavigation } from './MobileNavigation/MobileNavigation';
import { MobileRightSidebar } from './MobileRightSidebar/MobileRightSidebar';
import { useMobileNavigation } from '@/features/profile/hooks/useMobileNavigationContext';
import { useRightSidebar } from '@/features/profile/hooks/useRightSidebar';
import styles from './FeedLayout.module.css';

interface FeedLayoutProps {
  children: React.ReactNode;
  showRightSidebar?: boolean;
}

export const FeedLayout: React.FC<FeedLayoutProps> = ({ children, showRightSidebar = true }) => {
  const { isMobileMenuOpen, closeMobileMenu } = useMobileNavigation();
  const { isRightSidebarOpen, closeRightSidebar } = useRightSidebar();

  console.log('FeedLayout - isMobileMenuOpen:', isMobileMenuOpen);
  console.log('FeedLayout - closeMobileMenu:', closeMobileMenu);
  console.log('FeedLayout - isRightSidebarOpen:', isRightSidebarOpen);
  console.log('FeedLayout - closeRightSidebar:', closeRightSidebar);

  return (
    <div className={styles.layout}>
      <FeedNavigation />
      <MobileNavigation isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <MobileRightSidebar isOpen={isRightSidebarOpen} onClose={closeRightSidebar} />
      <div className={styles.content}>
        {children}
      </div>
      {showRightSidebar && <FeedSidebar />}
    </div>
  );
}
