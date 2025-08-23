"use client";

import { FeedLayout } from "@/components/layout/Feed/FeedLayout";
import { FeedContent } from "@/features/feed/components/FeedContent/FeedContent";
import { FeedSidebar } from "@/components/layout/Feed/FeedSidebar/FeedSidebar";
import { FeedHeader } from "@/components/layout/Feed/FeedHeader/FeedHeader";
import styles from "./feed.module.css";

export default function FeedPage() {
  return (
    <div className={styles.root}>
      <FeedHeader />
      <div className={styles.main}>
        <FeedLayout>
          <FeedContent />
          <FeedSidebar />
        </FeedLayout>
      </div>
    </div>
  );
}
