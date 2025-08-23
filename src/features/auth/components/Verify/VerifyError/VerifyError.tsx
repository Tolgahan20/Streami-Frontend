import React from 'react';
import { Text } from "@/components/ui/typography/Typography";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { XCircle, Shield, Mail } from "lucide-react";
import styles from "./VerifyError.module.css";

interface VerifyErrorProps {
  errorMessage: string;
}

export const VerifyError: React.FC<VerifyErrorProps> = ({ errorMessage }) => {
  return (
    <div className={styles.content}>
      <div className={styles.errorIcon}>
        <XCircle size={40} />
      </div>
      
      <Text variant="h2" className={styles.title}>
        Verification failed
      </Text>
      
      <Text color="muted" className={styles.subtitle}>
        {errorMessage}
      </Text>

      <div className={styles.errorHelp}>
        <div className={styles.helpItem}>
          <Shield size={14} />
          <span>Check if the link is still valid</span>
        </div>
        <div className={styles.helpItem}>
          <Mail size={14} />
          <span>Ensure you&apos;re using the latest email</span>
        </div>
      </div>
      
      <div className={styles.actions}>
        <Link href="/register">
          <Button variant="outline" size="lg">
            Try Again
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="primary" size="lg">
            Sign In
          </Button>
        </Link>
      </div>

      <div className={styles.support}>
        <Text color="muted" className={styles.supportText}>
          Need help? Contact our support team
        </Text>
        <Link href="/support" className={styles.supportLink}>
          Get Support
        </Link>
      </div>
    </div>
  );
};
