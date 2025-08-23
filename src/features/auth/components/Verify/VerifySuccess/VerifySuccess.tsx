import React from 'react';
import { Text } from "@/components/ui/typography/Typography";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { CheckCircle, Zap, Shield, Users } from "lucide-react";
import styles from "./VerifySuccess.module.css";

interface VerifySuccessProps {
  verificationTime: number;
}

export const VerifySuccess: React.FC<VerifySuccessProps> = ({ verificationTime }) => {
  return (
    <div className={styles.content}>
      <div className={styles.successIcon}>
        <CheckCircle size={40} />
      </div>
      
      <Text variant="h2" className={styles.title}>
        Email verified successfully!
      </Text>
      
      <Text color="muted" className={styles.subtitle}>
        Welcome to Streami! Your account is now active and ready to use.
      </Text>

      {verificationTime > 0 && (
        <div className={styles.verificationStats}>
          <div className={styles.stat}>
            <Zap size={14} />
            <span>Verified in {(verificationTime / 1000).toFixed(1)}s</span>
          </div>
          <div className={styles.stat}>
            <Shield size={14} />
            <span>Account secured</span>
          </div>
        </div>
      )}

      <div className={styles.successFeatures}>
        <div className={styles.feature}>
          <Users size={18} />
          <Text variant="h4" weight="bold" color="accent">Join the Community</Text>
          <Text color="muted">Connect with creators</Text>
        </div>
        <div className={styles.feature}>
          <Zap size={18} />
          <Text variant="h4" weight="bold" color="accent">Start Creating</Text>
          <Text color="muted">Access all tools</Text>
        </div>
      </div>
      
      <div className={styles.actions}>
        <Link href="/login">
          <Button variant="primary" size="lg">
            Sign In to Streami
          </Button>
        </Link>
      </div>
    </div>
  );
};
