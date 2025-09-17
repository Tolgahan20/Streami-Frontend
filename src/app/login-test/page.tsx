"use client";

import { Suspense } from "react";
import { useLoginForm } from "@/features/auth/hooks/useAuthForms";
import { Login } from "@/features/auth/components/Login";
import { Text } from "@/components/ui/typography/Typography";
import { useSearchParams } from "next/navigation";
import styles from "./login.module.css";

function LoginPageContent() {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } = useLoginForm();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div className={styles.root}>
      {/* Left Panel - Promotional content */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          {message && (
            <div className={styles.message}>
              <Text variant="base" color="muted" className={styles.messageText}>
                {message}
              </Text>
            </div>
          )}
          
          <div className={styles.brandSection}>
            <div className={styles.brandLogo}>
              <span className={styles.brandIcon}>S</span>
              <span className={styles.brandText}>Streami</span>
            </div>
            <Text variant="h1" className={styles.brandTitle}>
              Welcome back to your creative journey
            </Text>
            <Text color="muted" className={styles.brandDescription}>
              Continue building your audience, engaging with fans, and creating amazing content with our AI-powered tools.
            </Text>
          </div>

          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Active Creators</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Languages</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>99.9%</div>
              <div className={styles.statLabel}>Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <Login
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
