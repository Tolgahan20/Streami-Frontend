"use client";

import { Suspense } from "react";
import { useEmailVerification } from "@/features/auth/hooks/useEmailVerification";
import { VerifyLoading, VerifySuccess, VerifyError } from "@/features/auth/components/Verify";
import Link from "next/link";
import styles from "./verify.module.css";

function VerifyPageContent() {
  const { verificationStatus, errorMessage, verificationTime } = useEmailVerification();

  const renderContent = () => {
    switch (verificationStatus) {
      case "loading":
        return <VerifyLoading />;
      case "success":
        return <VerifySuccess verificationTime={verificationTime} />;
      case "error":
        return <VerifyError errorMessage={errorMessage} />;
      default:
        return <VerifyLoading />;
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>S</span>
            <span className={styles.logoText}>Streami</span>
          </Link>
        </div>
        
        <div className={styles.main}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
