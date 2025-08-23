import React from 'react';
import { Text } from "@/components/ui/typography/Typography";
import { Shield, Mail } from "lucide-react";
import styles from "./VerifyLoading.module.css";

export const VerifyLoading: React.FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.spinner}></div>
      <Text variant="h2" className={styles.title}>
        Verifying your email...
      </Text>
      <Text color="muted" className={styles.subtitle}>
        Please wait while we securely verify your email address.
      </Text>
      
      <div className={styles.verificationSteps}>
        <div className={styles.step}>
          <div className={styles.stepIcon}>
            <Shield size={18} />
          </div>
          <div className={styles.stepContent}>
            <Text variant="h4" className={styles.stepTitle}>Security Check</Text>
            <Text color="muted" className={styles.stepDescription}>
              Validating your verification token
            </Text>
          </div>
        </div>
        
        <div className={styles.step}>
          <div className={styles.stepIcon}>
            <Mail size={18} />
          </div>
          <div className={styles.stepContent}>
            <Text variant="h4" className={styles.stepTitle}>Email Verification</Text>
            <Text color="muted" className={styles.stepDescription}>
              Confirming your email address
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
