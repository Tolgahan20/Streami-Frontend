"use client";

import { FeedLayout } from "@/components/layout/Feed/FeedLayout";
import { FeedHeader } from "@/components/layout/Feed/FeedHeader/FeedHeader";
import { ProfileSettings } from "@/features/profile/components/ProfileSettings/ProfileSettings";
import { MobileNavigationProvider } from "@/features/profile/hooks/useMobileNavigationContext";
import { RightSidebarProvider } from "@/features/profile/hooks/useRightSidebar";
import styles from "./settings.module.css";

export default function SettingsPage() {
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
            <FeedLayout showRightSidebar={false}>
              <ProfileSettings />
            </FeedLayout>
          </div>
        </div>
      </RightSidebarProvider>
    </MobileNavigationProvider>
  );
}
