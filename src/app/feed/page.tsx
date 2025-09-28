"use client";

import { FeedLayout } from "@/components/layout/Feed/FeedLayout";
import { FeedContent } from "@/features/feed/components/FeedContent/FeedContent";
import { FeedHeader } from "@/components/layout/Feed/FeedHeader/FeedHeader";
import { MobileNavigationProvider } from "@/features/profile/hooks/useMobileNavigationContext";
import { RightSidebarProvider } from "@/features/profile/hooks/useRightSidebar";
import styles from "./feed.module.css";

export default function FeedPage() {

  return (
    <MobileNavigationProvider>
      <RightSidebarProvider>
        <div className={styles.root}>
          {/* Skip link for accessibility */}
          <a href="#main-content" className={styles.skipLink}>
            Skip to main content
          </a>
          <FeedHeader />
          <div className={styles.main} id="main-content">
            <FeedLayout showRightSidebar={true}>
              <FeedContent />
            </FeedLayout>
          </div>
        </div>
      </RightSidebarProvider>
    </MobileNavigationProvider>
  );
}
