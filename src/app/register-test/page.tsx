"use client";

import { useRegisterForm } from "@/features/auth/hooks/useAuthForms";
import { Register } from "@/features/auth/components/Register";
import { Text } from "@/components/ui/typography/Typography";
import styles from "./register.module.css";

export default function RegisterPage() {
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div className={styles.root}>
      {/* Left Panel - Promotional */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.brandSection}>
            <div className={styles.brandLogo}>
              <span className={styles.brandIcon}>S</span>
              <span className={styles.brandText}>Streami</span>
            </div>
            <Text variant="h1" className={styles.brandTitle}>
              The AI platform for streamers
            </Text>
            <Text color="muted" className={styles.brandDescription}>
              Get our all-in-one streaming platform that simplifies the way you create, engage, and grow your audience with AI-powered tools.
            </Text>
          </div>
          
          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>Active streamers</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>1M+</div>
              <div className={styles.statLabel}>Hours streamed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <Register
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
