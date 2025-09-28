import React, { useState } from 'react';
import { Text } from "@/components/ui/typography/Typography";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/form/Label/Label";
import Link from "next/link";
import { XCircle, Shield, Mail, RefreshCw } from "lucide-react";
import { useResendVerification } from "@/features/auth/hooks/hooks";
import { AUTH_MESSAGES } from "@/lib/constants/messages";
import { toastSuccess, toastError } from "@/components/ui/toast";
import styles from "./VerifyError.module.css";

interface VerifyErrorProps {
  errorMessage: string;
}

export const VerifyError: React.FC<VerifyErrorProps> = ({ errorMessage }) => {
  const [email, setEmail] = useState("");
  const [showResendForm, setShowResendForm] = useState(false);
  const resendVerification = useResendVerification();

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toastError("Please enter a valid email address");
      return;
    }

    try {
      await resendVerification.mutateAsync(email);
      toastSuccess(AUTH_MESSAGES.VERIFICATION_EMAIL_SENT);
      setShowResendForm(false);
    } catch (error: unknown) {
      let errorMessage = "Failed to resend verification email. Please try again.";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      
      toastError(errorMessage);
    }
  };

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

      {/* Resend Verification Section */}
      <div className={styles.resendSection}>
        {!showResendForm ? (
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setShowResendForm(true)}
            className={styles.resendButton}
          >
            <RefreshCw size={16} />
            Resend Verification Email
          </Button>
        ) : (
          <form onSubmit={handleResendVerification} className={styles.resendForm}>
            <div className={styles.formGroup}>
              <Label htmlFor="resendEmail">Email Address</Label>
              <Input
                id="resendEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={resendVerification.isPending}
              />
            </div>
            <div className={styles.formActions}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={resendVerification.isPending}
                isLoading={resendVerification.isPending}
              >
                {resendVerification.isPending ? "Sending..." : "Send Verification Email"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setShowResendForm(false)}
                disabled={resendVerification.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
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
